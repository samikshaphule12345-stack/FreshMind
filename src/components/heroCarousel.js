// Hero carousel - auto-playing swipeable banners
import { banners } from '../data/offers.js'

export function heroCarousel() {
  return `
    <div class="relative overflow-hidden rounded-2xl md:rounded-3xl" id="hero-carousel">
      <div class="flex transition-transform duration-500 ease-out" id="hero-track">
        ${banners.map((b, i) => `
          <div class="min-w-full relative h-44 md:h-64 flex items-center justify-center overflow-hidden" style="background:${b.bg}">
            <!-- Animated gradient blobs -->
            <div class="absolute inset-0 opacity-30">
              <div class="absolute top-0 left-0 w-40 h-40 rounded-full bg-white/30 blur-3xl animate-float"></div>
              <div class="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white/20 blur-3xl animate-float" style="animation-delay:1s"></div>
            </div>
            <!-- Floating emojis -->
            <div class="absolute inset-0 pointer-events-none">
              <span class="absolute top-4 left-8 text-3xl animate-float">${b.emoji}</span>
              <span class="absolute bottom-6 left-1/4 text-2xl animate-float" style="animation-delay:0.5s">🥑</span>
              <span class="absolute top-8 right-1/3 text-2xl animate-float" style="animation-delay:1s">🍅</span>
              <span class="absolute bottom-4 right-8 text-3xl animate-float" style="animation-delay:1.5s">🥕</span>
            </div>
            <!-- Content -->
            <div class="relative z-10 text-center text-white px-4">
              <h2 class="text-2xl md:text-4xl font-extrabold font-heading drop-shadow-lg">${b.title}</h2>
              <p class="text-sm md:text-lg mt-1 opacity-90">${b.subtitle}</p>
              <button class="mt-3 bg-white text-primary-600 font-bold text-sm px-5 py-2 rounded-xl hover:scale-105 transition" data-hero-cta="${i}">
                ${i === 0 ? 'Order Now' : i === 1 ? 'Shop Fruits' : 'Learn More'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
      <!-- Dot indicators -->
      <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5" id="hero-dots">
        ${banners.map((_, i) => `
          <button class="w-2 h-2 rounded-full transition-all ${i === 0 ? 'bg-white w-6' : 'bg-white/50'}" data-hero-dot="${i}"></button>
        `).join('')}
      </div>
      <!-- Arrow buttons -->
      <button class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition" data-hero-prev>
        <i data-lucide="chevron-left" class="w-4 h-4"></i>
      </button>
      <button class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition" data-hero-next>
        <i data-lucide="chevron-right" class="w-4 h-4"></i>
      </button>
    </div>
  `
}

export function initHeroCarousel() {
  const track = document.querySelector('#hero-track')
  const dots = document.querySelectorAll('[data-hero-dot]')
  if (!track) return
  let current = 0
  const total = 3

  const go = (idx) => {
    current = ((idx % total) + total) % total
    track.style.transform = `translateX(-${current * 100}%)`
    dots.forEach((d, i) => {
      d.classList.toggle('bg-white', i === current)
      d.classList.toggle('w-6', i === current)
      d.classList.toggle('bg-white/50', i !== current)
    })
  }

  const autoPlay = setInterval(() => go(current + 1), 4000)

  document.querySelector('[data-hero-next]')?.addEventListener('click', () => { clearInterval(autoPlay); go(current + 1) })
  document.querySelector('[data-hero-prev]')?.addEventListener('click', () => { clearInterval(autoPlay); go(current - 1) })
  dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(autoPlay); go(i) }))

  // Touch swipe
  let touchStart = 0
  track.addEventListener('touchstart', (e) => { touchStart = e.touches[0].clientX })
  track.addEventListener('touchend', (e) => {
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      clearInterval(autoPlay)
      go(current + (diff > 0 ? 1 : -1))
    }
  })

  // CTA buttons
  document.querySelectorAll('[data-hero-cta]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.heroCta)
      if (idx === 0) window.location.hash = '#/category/fruits-veg'
      else if (idx === 1) window.location.hash = '#/category/fruits-veg'
      else window.location.hash = '#/'
    })
  })
}
