// Deals countdown timer
export function dealsCountdown() {
  // Set countdown to end of day
  const now = new Date()
  const end = new Date(now)
  end.setHours(23, 59, 59, 999)
  const diff = end - now
  const hrs = Math.floor(diff / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  const secs = Math.floor((diff % 60000) / 1000)
  return `
    <div class="flex items-center gap-1 text-sm" id="deals-countdown">
      <i data-lucide="clock" class="w-4 h-4 text-coral-500"></i>
      <span class="font-bold tabular-nums text-coral-500">${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}</span>
      <span class="text-ink-500 text-xs">left</span>
    </div>
  `
}

export function initDealsCountdown() {
  const el = document.querySelector('#deals-countdown')
  if (!el) return
  const update = () => {
    const now = new Date()
    const end = new Date(now)
    end.setHours(23, 59, 59, 999)
    const diff = end - now
    const hrs = Math.floor(diff / 3600000)
    const mins = Math.floor((diff % 3600000) / 60000)
    const secs = Math.floor((diff % 60000) / 1000)
    const span = el.querySelector('.tabular-nums')
    if (span) span.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }
  setInterval(update, 1000)
}
