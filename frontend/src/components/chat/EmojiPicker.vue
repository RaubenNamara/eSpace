<template>
  <div class="absolute bottom-full left-0 mb-2 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col z-20" style="height: 320px;">
    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 flex-shrink-0 overflow-x-auto">
      <button
        v-for="cat in categories"
        :key="cat.label"
        @click="activeCategory = cat.label"
        class="px-3 py-2 text-lg flex-shrink-0 border-b-2 transition-colors"
        :class="activeCategory === cat.label ? 'border-emerald-600' : 'border-transparent opacity-50 hover:opacity-100'"
        :title="cat.label"
      >
        {{ cat.icon }}
      </button>
    </div>
    <div class="flex-1 overflow-y-auto p-2 grid grid-cols-8 gap-0.5 content-start">
      <button
        v-for="(emoji, idx) in activeEmojis"
        :key="idx"
        @click="$emit('select', emoji)"
        class="text-xl leading-none w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {{ emoji }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineEmits<{ select: [string] }>()

const categories = [
  {
    label: 'Smileys', icon: '😀',
    emojis: ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕']
  },
  {
    label: 'Gestures', icon: '👍',
    emojis: ['👍','👎','👌','🤌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','👋','🤚','🖐️','✋','🖖','👏','🙌','🤝','🙏','✍️','💪','🦾','🖖','👊','✊','🤛','🤜','👐','🤲']
  },
  {
    label: 'Hearts', icon: '❤️',
    emojis: ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','🔥','✨','⭐','🌟','💯','💢','💥','💫','💦','💨']
  },
  {
    label: 'School', icon: '📚',
    emojis: ['📚','📖','📝','✏️','🖊️','🖋️','📓','📒','📔','📕','📗','📘','📙','🎓','🏫','🔬','🧪','🧮','📐','📏','✂️','📌','📍','🗓️','📅','⏰','💻','🖥️','⌨️','🖱️','📱','☎️','✅','❌','❓','❗','💡','🔍','📊','📈','📉','🗂️','📁','📂','📎']
  },
  {
    label: 'Animals', icon: '🐶',
    emojis: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔','🐧','🐦','🐤','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐢','🐍','🦖','🐳','🐬','🐟','🐙','🦀']
  },
  {
    label: 'Food', icon: '🍎',
    emojis: ['🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥕','🌽','🍕','🍔','🍟','🌭','🥪','🌮','🍿','🍩','🍪','🍰','🎂','🍫','🍬','🍭','☕','🍵','🥤']
  }
]

const activeCategory = ref(categories[0].label)
const activeEmojis = computed(() => categories.find(c => c.label === activeCategory.value)?.emojis || [])
</script>
