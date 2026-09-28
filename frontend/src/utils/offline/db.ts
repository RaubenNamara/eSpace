// A small promise wrapper over IndexedDB for the offline copies of eNotes (see offline/enotes.ts).
//   topics - one record per downloaded topic (its pages, as the reader receives them, plus bookkeeping)
//   kv     - small keyed values: the shelf's topic list, each page's note and highlights
//   queue  - changes made while offline (notes, highlights, reading place), sent when back online

const DB_NAME = 'espace-offline'
const DB_VERSION = 1

let opening: Promise<IDBDatabase> | null = null

function open(): Promise<IDBDatabase> {
  if (!opening) {
    opening = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)
      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains('topics')) db.createObjectStore('topics', { keyPath: 'id' })
        if (!db.objectStoreNames.contains('kv')) db.createObjectStore('kv')
        if (!db.objectStoreNames.contains('queue')) db.createObjectStore('queue', { keyPath: 'seq', autoIncrement: true })
      }
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => {
        opening = null
        reject(request.error)
      }
    })
  }
  return opening
}

type StoreName = 'topics' | 'kv' | 'queue'

function run<T>(store: StoreName, mode: IDBTransactionMode, work: (s: IDBObjectStore) => IDBRequest | void): Promise<T> {
  return open().then(db => new Promise<T>((resolve, reject) => {
    const tx = db.transaction(store, mode)
    const request = work(tx.objectStore(store))
    tx.oncomplete = () => resolve(request ? request.result as T : undefined as T)
    tx.onerror = () => reject(tx.error)
    tx.onabort = () => reject(tx.error)
  }))
}

export const idbGet = <T>(store: StoreName, key: IDBValidKey) => run<T | undefined>(store, 'readonly', s => s.get(key))
export const idbAll = <T>(store: StoreName) => run<T[]>(store, 'readonly', s => s.getAll())
export const idbPut = (store: StoreName, value: unknown, key?: IDBValidKey) => run<IDBValidKey>(store, 'readwrite', s => s.put(value, key))
export const idbDelete = (store: StoreName, key: IDBValidKey) => run<void>(store, 'readwrite', s => s.delete(key))
