import { onMounted, onBeforeUnmount, Ref } from 'vue'

export const useClickOutside = (target: Ref<HTMLElement | null>, callback: () => void) => {
  const handler = (event: MouseEvent) => {
    if (!target.value) return

    if (!target.value.contains(event.target as Node)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handler)
  })
}
