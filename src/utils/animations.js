// Animation utilities

// Fade up on scroll using IntersectionObserver
export function observeFadeUp(root = document) {
  const els = root.querySelectorAll('[data-fade-up]:not(.animate-fade-up)')
  if (!els.length) return
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            e.target.classList.add('animate-fade-up')
            e.target.removeAttribute('data-fade-up')
          }, i * 50)
          io.unobserve(e.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '50px' }
  )
  els.forEach((el) => io.observe(el))
}

// Trigger confetti burst at a position
export function confettiBurst(x, y) {
  const colors = ['#16a34a', '#22c55e', '#facc15', '#fb7185', '#4ade80']
  const container = document.createElement('div')
  container.style.cssText = `position:fixed;left:${x}px;top:${y}px;pointer-events:none;z-index:9999;`
  document.body.appendChild(container)
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div')
    const angle = (Math.PI * 2 * i) / 24
    const dist = 80 + Math.random() * 60
    p.style.cssText = `position:absolute;width:8px;height:8px;border-radius:2px;background:${colors[i % colors.length]};left:0;top:0;transform:translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist}px);opacity:0;transition:all 0.8s cubic-bezier(0.2,0.8,0.2,1);`
    container.appendChild(p)
    requestAnimationFrame(() => {
      p.style.opacity = '1'
      p.style.transform = `translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist - 100}px) rotate(${Math.random() * 720}deg) scale(0.3)`
    })
  }
  setTimeout(() => container.remove(), 1000)
}

// Fly-to-cart animation
export function flyToCart(sourceEl, cartEl) {
  if (!sourceEl || !cartEl) return
  const src = sourceEl.getBoundingClientRect()
  const dst = cartEl.getBoundingClientRect()
  const flyer = document.createElement('div')
  flyer.style.cssText = `position:fixed;left:${src.left + src.width / 2}px;top:${src.top + src.height / 2}px;width:40px;height:40px;border-radius:50%;background:#16a34a;z-index:9999;pointer-events:none;transition:all 0.6s cubic-bezier(0.2,0.8,0.2,1);transform:translate(-50%,-50%);`
  document.body.appendChild(flyer)
  requestAnimationFrame(() => {
    flyer.style.left = `${dst.left + dst.width / 2}px`
    flyer.style.top = `${dst.top + dst.height / 2}px`
    flyer.style.transform = 'translate(-50%,-50%) scale(0.2)'
    flyer.style.opacity = '0.3'
  })
  setTimeout(() => flyer.remove(), 600)
}

// Bounce the cart badge
export function bounceBadge(selector) {
  const el = document.querySelector(selector)
  if (!el) return
  el.classList.remove('animate-bounce-badge')
  void el.offsetWidth
  el.classList.add('animate-bounce-badge')
}
