// Modal component - reusable overlay modal
export function modal({ title, content, onClose }) {
  const overlay = document.createElement('div')
  overlay.className = 'fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-scale-in'
  overlay.innerHTML = `
    <div class="card w-full max-w-md max-h-[85vh] overflow-y-auto p-5 animate-fade-up">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold font-heading">${title}</h3>
        <button class="modal-close w-9 h-9 rounded-full bg-ink-100 dark:bg-ink-700 flex items-center justify-center hover:bg-ink-200 dark:hover:bg-ink-600 transition" data-lucide="x"></button>
      </div>
      <div class="modal-body">${content}</div>
    </div>
  `
  document.body.appendChild(overlay)
  if (window.lucide) window.lucide.createIcons()

  const close = () => {
    overlay.style.transition = 'opacity 0.2s'
    overlay.style.opacity = '0'
    setTimeout(() => {
      overlay.remove()
      if (onClose) onClose()
    }, 200)
  }

  overlay.querySelector('.modal-close').addEventListener('click', close)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close()
  })

  return { overlay, close }
}
