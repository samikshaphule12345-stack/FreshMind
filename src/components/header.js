// Sticky glass header with logo, delivery pill, search, login, theme toggle, cart
import { getState, dispatch, subscribe, getCartCount } from '../store.js'
import { toast } from './toast.js'
import { debounce } from '../utils/debounce.js'
import { search } from '../services/productService.js'
import { openCartDrawer } from './cartDrawer.js'
import { openAIAssistant } from './aiAssistant.js'
import { openLocationModal } from './locationModal.js'

const placeholders = [
  "Search 'milk'",
  "Try 'ingredients for pasta tonight'",
  "healthy breakfast under ₹300",
  "Search 'bananas'",
  "Try 'high protein snacks'",
]

let placeholderIdx = 0

export function header() {
  const state = getState()
  const count = getCartCount()
  const isDark = state.theme === 'dark'

  return `
    <header class="sticky top-0 z-50 glass border-b border-ink-100 dark:border-ink-700/50">
      <div class="max-w-7xl mx-auto px-3 md:px-6 py-2.5">
        <div class="flex items-center gap-2 md:gap-4">
          <!-- Logo -->
          <a href="#/" class="flex items-center gap-1.5 shrink-0 no-tap">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg shadow-glow">F</div>
            <span class="hidden sm:block font-heading font-extrabold text-lg text-ink-900 dark:text-ink-50">FreshMind</span>
          </a>

          <!-- Delivery pill -->
          <button class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition shrink-0" data-location-btn>
            <span class="relative flex">
              <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse-dot"></span>
            </span>
            <div class="text-left">
              <p class="text-xs text-ink-500 dark:text-ink-400 leading-none">Delivery in 9 mins</p>
              <p class="text-sm font-semibold text-ink-900 dark:text-ink-50 leading-tight truncate max-w-[140px]">${state.address.label} • ${state.address.pincode}</p>
            </div>
            <i data-lucide="chevron-down" class="w-4 h-4 text-ink-400"></i>
          </button>

          <!-- Search bar -->
          <div class="flex-1 relative">
            <div class="relative">
              <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400"></i>
              <input
                type="text"
                id="search-input"
                class="w-full pl-10 pr-20 py-2.5 rounded-xl bg-ink-100 dark:bg-ink-800 border border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-ink-700 outline-none text-sm transition-all"
                placeholder="${placeholders[0]}"
              />
              <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button class="w-7 h-7 rounded-lg hover:bg-ink-200 dark:hover:bg-ink-600 flex items-center justify-center transition" data-ai-search title="AI Search">
                  <i data-lucide="sparkles" class="w-4 h-4 text-primary-600"></i>
                </button>
                <button class="w-7 h-7 rounded-lg hover:bg-ink-200 dark:hover:bg-ink-600 flex items-center justify-center transition" data-mic title="Voice search">
                  <i data-lucide="mic" class="w-4 h-4 text-ink-500"></i>
                </button>
              </div>
            </div>
            <div id="search-suggestions" class="hidden absolute top-full mt-1 w-full bg-white dark:bg-ink-800 rounded-xl shadow-soft border border-ink-100 dark:border-ink-700 max-h-64 overflow-y-auto z-50"></div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-1.5 shrink-0">
            <button class="w-9 h-9 rounded-xl bg-ink-100 dark:bg-ink-800 flex items-center justify-center hover:bg-ink-200 dark:hover:bg-ink-700 transition" data-theme-toggle title="Toggle theme">
              <i data-lucide="${isDark ? 'sun' : 'moon'}" class="w-4 h-4 text-ink-700 dark:text-ink-200"></i>
            </button>
            <button class="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-ink-100 dark:bg-ink-800 hover:bg-ink-200 dark:hover:bg-ink-700 transition text-sm font-medium" data-login-btn>
              <i data-lucide="user" class="w-4 h-4"></i>
              <span>Login</span>
            </button>
            <button class="relative w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center hover:bg-primary-700 transition" data-cart-btn title="Cart">
              <i data-lucide="shopping-cart" class="w-4 h-4 text-white"></i>
              <span class="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-coral-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 ${count > 0 ? '' : 'hidden'}" data-cart-count>${count}</span>
            </button>
          </div>
        </div>

        <!-- Mobile delivery pill -->
        <button class="md:hidden flex items-center gap-2 mt-2 px-3 py-1.5 rounded-xl bg-primary-50 dark:bg-primary-900/30 w-full" data-location-btn>
          <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse-dot shrink-0"></span>
          <p class="text-xs font-semibold text-ink-900 dark:text-ink-50 truncate">Delivery in 9 mins • ${state.address.label}, ${state.address.pincode}</p>
          <i data-lucide="chevron-down" class="w-3 h-3 text-ink-400 ml-auto shrink-0"></i>
        </button>
      </div>
    </header>
  `
}

export function initHeader() {
  // Theme toggle
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      dispatch('TOGGLE_THEME')
      const isDark = getState().theme === 'dark'
      document.documentElement.classList.toggle('dark', isDark)
      const icon = btn.querySelector('i')
      if (icon) {
        icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon')
        if (window.lucide) window.lucide.createIcons()
      }
    })
  })

  // Cart button
  document.querySelectorAll('[data-cart-btn]').forEach((btn) => {
    btn.addEventListener('click', () => openCartDrawer())
  })

  // AI search
  document.querySelectorAll('[data-ai-search]').forEach((btn) => {
    btn.addEventListener('click', () => openAIAssistant())
  })

  // Login
  document.querySelectorAll('[data-login-btn]').forEach((btn) => {
    btn.addEventListener('click', () => toast('Login coming soon!', 'info'))
  })

  // Location
  document.querySelectorAll('[data-location-btn]').forEach((btn) => {
    btn.addEventListener('click', () => openLocationModal())
  })

  // Search
  const searchInput = document.querySelector('#search-input')
  const suggestions = document.querySelector('#search-suggestions')

  // Rotating placeholders
  let rotInterval = setInterval(() => {
    placeholderIdx = (placeholderIdx + 1) % placeholders.length
    if (searchInput && document.activeElement !== searchInput) {
      searchInput.placeholder = placeholders[placeholderIdx]
    }
  }, 3000)

  // Debounced search suggestions
  const showSuggestions = debounce((q) => {
    if (!q.trim()) {
      suggestions?.classList.add('hidden')
      return
    }
    const results = search(q).slice(0, 6)
    if (!results.length) {
      suggestions.classList.add('hidden')
      return
    }
    suggestions.innerHTML = results.map((p) => `
      <a href="#/search?q=${encodeURIComponent(p.name)}" class="flex items-center gap-3 p-2.5 hover:bg-ink-100 dark:hover:bg-ink-700 transition cursor-pointer">
        <div class="w-10 h-10 rounded-lg bg-ink-100 dark:bg-ink-700 flex items-center justify-center text-xl">${p.emoji || '📦'}</div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">${p.name}</p>
          <p class="text-xs text-ink-500">${p.brand} • ₹${p.price}</p>
        </div>
      </a>
    `).join('')
    suggestions.classList.remove('hidden')
  }, 200)

  if (searchInput) {
    searchInput.addEventListener('input', (e) => showSuggestions(e.target.value))
    searchInput.addEventListener('focus', (e) => {
      if (e.target.value.trim()) showSuggestions(e.target.value)
    })
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.value.trim()) {
        window.location.hash = `#/search?q=${encodeURIComponent(e.target.value.trim())}`
        suggestions?.classList.add('hidden')
      }
    })
  }

  document.addEventListener('click', (e) => {
    if (suggestions && !suggestions.contains(e.target) && e.target !== searchInput) {
      suggestions.classList.add('hidden')
    }
  })

  // Voice search (Web Speech API)
  document.querySelectorAll('[data-mic]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        toast('Voice search not supported on this browser', 'warning')
        return
      }
      const recognition = new SpeechRecognition()
      recognition.lang = 'en-IN'
      recognition.interimResults = false
      recognition.onstart = () => toast('Listening...', 'info', 1000)
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        if (searchInput) searchInput.value = transcript
        window.location.hash = `#/search?q=${encodeURIComponent(transcript)}`
      }
      recognition.onerror = () => toast('Could not hear you, try again', 'error')
      recognition.start()
    })
  })

  // Subscribe to cart count changes
  subscribe('cart', () => {
    const count = getCartCount()
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = count
      el.classList.toggle('hidden', count === 0)
    })
  })
}
