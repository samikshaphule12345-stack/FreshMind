// Toast notification system
import { debounce } from '../utils/debounce.js'

let toastContainer = null

function getContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.className = 'fixed top-20 right-4 z-[9998] flex flex-col gap-2 pointer-events-none'
    document.body.appendChild(toastContainer)
  }
  return toastContainer
}

export function toast(message, type = 'success', duration = 2500) {
  const container = getContainer()
  const colors = {
    success: 'bg-primary-600',
    error: 'bg-coral-500',
    info: 'bg-ink-700',
    warning: 'bg-accent-500',
  }
  const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' }
  const el = document.createElement('div')
  el.className = `${colors[type]} text-white px-4 py-3 rounded-xl shadow-soft flex items-center gap-2 text-sm font-medium animate-slide-up pointer-events-auto max-w-xs`
  el.innerHTML = `<span class="text-lg">${icons[type]}</span><span>${message}</span>`
  container.appendChild(el)
  setTimeout(() => {
    el.style.transition = 'all 0.3s ease'
    el.style.opacity = '0'
    el.style.transform = 'translateX(100%)'
    setTimeout(() => el.remove(), 300)
  }, duration)
}
