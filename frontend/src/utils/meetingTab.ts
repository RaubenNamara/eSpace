/**
 * Opening a live class in its own tab. A tab opened after waiting for the server (the join link)
 * is no longer part of the user's click, so the browser blocks it as a pop-up and nothing seems to
 * happen. Instead the tab opens at once, on the click, showing "Opening the class…", and the class
 * is loaded into it when the link arrives. If the browser still refuses a tab (or there was no
 * click, e.g. joining from a notification), the class opens in this tab instead.
 */

/** Call synchronously in the click handler, before any await */
export function openMeetingTab(): Window | null {
  const w = window.open('', '_blank')
  if (w) {
    try {
      w.document.title = 'Opening the class…'
      w.document.body.style.cssText = 'margin:0;display:flex;align-items:center;justify-content:center;height:100vh;font:600 16px system-ui,sans-serif;color:#334155;background:#f8fafc'
      w.document.body.textContent = 'Opening the live class…'
    } catch { /* a blank tab is fine too */ }
  }
  return w
}

/** Send the tab from openMeetingTab() to the class (or this tab, if there is none) */
export function sendToMeeting(tab: Window | null, url: string): Window | null {
  if (tab && !tab.closed) {
    tab.location.href = url
    return tab
  }
  window.location.href = url
  return null
}

/** The join failed: close the waiting tab */
export function closeMeetingTab(tab: Window | null): void {
  try { if (tab && !tab.closed) tab.close() } catch { /* already gone */ }
}
