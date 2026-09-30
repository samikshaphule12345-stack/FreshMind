// Bottom navigation for mobile
import { getState } from '../store.js'
import { getCartCount, getCartSubtotal, subscribe } from '../store.js'
import { formatPrice } from '../utils/format.js'
import { openCartDrawer } from './cartDrawer.js'
import { openAIAssistant } from './aiAssistant.js'

export function bottomNav() {
  return `
    <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-ink-100 dark:border-ink-700/50">
      <div class="flex items-center justify-around py-1.5 px-2">
        <a href="#/" class="nav-item flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition" data-nav="home">
          <i data-lucide="home" class="w-5 h-5"></i>
          <span class="text-[10px] font-medium">Home</span>
        </a>
        <a href="#/category/fruits-veg" class="nav-item flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition" data-nav="categories">
          <i data-lucide="layout-grid" class="w-5 h-5"></i>
          <span class="text-[10px] font-medium">Categories</span>
        </a>
        <button class="nav-item flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition" data-nav="ai">
          <div class="w-5 h-5 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <i data-lucide="sparkles" class="w-3 h-3 text-white"></i>
          </div>
          <span class="text-[10px] font-medium">AI Chef</span>
        </button>
        <a href="#/orders" class="nav-item flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition" data-nav="orders">
          <i data-lucide="package" class="w-5 h-5"></i>
          <span class="text-[10px] font-medium">Orders</span>
        </a>
        <button class="nav-item flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition relative" data-nav="cart" data-cart-btn>
          <i data-lucide="shopping-cart" class="w-5 h-5"></i>
          <span class="text-[10px] font-medium">Cart</span>
          <span class="absolute top-0 right-1 min-w-[16px] h-4 bg-coral-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 hidden" data-cart-count-nav></span>
        </button>
      </div>
    </nav>
  `
}

export function initBottomNav() {
  // AI Chef
  document.querySelectorAll('[data-nav="ai"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      openAIAssistant()
    })
  })

  // Cart
  document.querySelectorAll('[data-nav="cart"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      openCartDrawer()
    })
  })

  // Active nav highlighting
  updateActiveNav()
  window.addEventListener('hashchange', updateActiveNav)

  // Cart count
  subscribe('cart', updateCartBadge)
  updateCartBadge()
}

function updateActiveNav() {
  const hash = window.location.hash || '#/'
  document.querySelectorAll('.nav-item').forEach((el) => {
    el.classList.remove('text-primary-600')
    el.classList.add('text-ink-500')
  })
  if (hash.startsWith('#/category')) {
    document.querySelector('[data-nav="categories"]')?.classList.add('text-primary-600')
  } else if (hash.startsWith('#/orders')) {
    document.querySelector('[data-nav="orders"]')?.classList.add('text-primary-600')
  } else if (hash === '#/' || hash === '') {
    document.querySelector('[data-nav="home"]')?.classList.add('text-primary-600')
  }
}

function updateCartBadge() {
  const count = getCartCount()
  document.querySelectorAll('[data-cart-count-nav]').forEach((el) => {
    el.textContent = count
    el.classList.toggle('hidden', count === 0)
  })
}

// Floating "View Cart" bar
export function cartBar() {
  const count = getCartCount()
  const subtotal = getCartSubtotal()
  if (count === 0) return '<div id="cart-bar-wrap"></div>'

  return `
    <div id="cart-bar-wrap" class="fixed bottom-16 md:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-md animate-slide-up">
      <button class="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-soft hover:shadow-glow transition" data-cart-bar>
        <div class="flex items-center gap-2">
          <div class="relative">
            <i data-lucide="shopping-cart" class="w-5 h-5"></i>
            <span class="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-white text-primary-600 text-[9px] font-bold rounded-full flex items-center justify-center px-1">${count}</span>
          </div>
          <span class="font-semibold">${count} item${count > 1 ? 's' : ''}</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="font-bold tabular-nums">${formatPrice(subtotal)}</span>
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </div>
      </button>
    </div>
  `
}

export function initCartBar() {
  document.querySelectorAll('[data-cart-bar]').forEach((btn) => {
    btn.addEventListener('click', () => openCartDrawer())
  })
}

export function renderCartBar() {
  const existing = document.getElementById('cart-bar-wrap')
  const html = cartBar()
  if (existing) {
    existing.outerHTML = html
  } else {
    const div = document.createElement('div')
    div.innerHTML = html
    document.body.appendChild(div.firstElementChild)
  }
  initCartBar()
  if (window.lucide) window.lucide.createIcons()
}
