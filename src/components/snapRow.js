// Snap scroll row with arrow buttons
export function snapRow(items, opts = {}) {
  return `
    <div class="relative">
      ${opts.title ? `
        <div class="flex items-center justify-between mb-3">
          <h3 class="section-title">${opts.title}</h3>
          ${opts.showArrows !== false ? `
            <div class="flex gap-1">
              <button class="w-8 h-8 rounded-full bg-ink-100 dark:bg-ink-800 flex items-center justify-center hover:bg-ink-200 dark:hover:bg-ink-700 transition" data-scroll-prev>
                <i data-lucide="chevron-left" class="w-4 h-4"></i>
              </button>
              <button class="w-8 h-8 rounded-full bg-ink-100 dark:bg-ink-800 flex items-center justify-center hover:bg-ink-200 dark:hover:bg-ink-700 transition" data-scroll-next>
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
              </button>
            </div>
          ` : ''}
        </div>
      ` : ''}
      <div class="snap-row ${opts.compact ? 'w-auto' : ''}" data-snap-row>
        ${items}
      </div>
    </div>
  `
}

export function initSnapRow(scope = document) {
  scope.querySelectorAll('[data-snap-row]').forEach((row) => {
    const prev = row.parentElement.querySelector('[data-scroll-prev]')
    const next = row.parentElement.querySelector('[data-scroll-next]')
    if (prev) prev.addEventListener('click', () => row.scrollBy({ left: -300, behavior: 'smooth' }))
    if (next) next.addEventListener('click', () => row.scrollBy({ left: 300, behavior: 'smooth' }))
  })
}
