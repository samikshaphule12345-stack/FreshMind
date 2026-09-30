// AI Assistant - slide-up panel with chat-like interface
import { getAIResponse, getSmartSuggestions } from '../services/aiService.js'
import { dispatch } from '../store.js'
import { getProduct } from '../data/products.js'
import { formatPrice } from '../utils/format.js'
import { toast } from './toast.js'
import { productCard, initProductCards } from './productCard.js'

let assistantEl = null

export function openAIAssistant(prefilledPrompt = '') {
  if (assistantEl) {
    if (prefilledPrompt) {
      const input = assistantEl.querySelector('#ai-input')
      if (input) {
        input.value = prefilledPrompt
        sendPrompt(prefilledPrompt)
      }
    }
    return
  }
  renderAssistant(prefilledPrompt)
}

function renderAssistant(prefilledPrompt = '') {
  assistantEl = document.createElement('div')
  assistantEl.className = 'fixed inset-0 z-[9970] flex items-end md:items-center justify-center p-0 md:p-4'
  assistantEl.innerHTML = `
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" data-ai-overlay></div>
    <div class="relative w-full max-w-lg h-[85vh] md:h-[80vh] bg-appbg dark:bg-ink-900 rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col animate-slide-up md:animate-scale-in overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-ink-100 dark:border-ink-700 bg-gradient-to-r from-primary-600 to-primary-500 text-white shrink-0">
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <i data-lucide="sparkles" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="font-bold font-heading">FreshMind AI</h3>
            <p class="text-xs text-white/80">Your smart grocery assistant</p>
          </div>
        </div>
        <button class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition" data-ai-close>
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4" id="ai-messages">
        <div class="flex gap-2 animate-fade-up">
          <div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
            <i data-lucide="sparkles" class="w-4 h-4 text-primary-600"></i>
          </div>
          <div class="bg-white dark:bg-ink-800 rounded-2xl rounded-tl-sm p-3 max-w-[80%] shadow-card">
            <p class="text-sm">Hi! I'm your AI grocery assistant. Tell me what you're looking for and I'll suggest the best products for you. Try "Plan dinner" or "High protein snacks"!</p>
          </div>
        </div>

        <!-- Suggestion chips -->
        <div class="flex gap-2 flex-wrap" id="ai-suggestions">
          ${getSmartSuggestions().map((s) => `
            <button class="chip bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-100 transition" data-ai-suggest="${s}">${s}</button>
          `).join('')}
        </div>
      </div>

      <!-- Input -->
      <div class="p-3 border-t border-ink-100 dark:border-ink-700 shrink-0">
        <div class="flex items-center gap-2">
          <input
            type="text"
            id="ai-input"
            class="flex-1 px-4 py-2.5 rounded-xl bg-ink-100 dark:bg-ink-800 border border-transparent focus:border-primary-500 outline-none text-sm transition"
            placeholder="Ask me anything about groceries..."
          />
          <button class="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition shrink-0" data-ai-send>
            <i data-lucide="send" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </div>
  `
  document.body.appendChild(assistantEl)
  if (window.lucide) window.lucide.createIcons()

  const close = () => {
    assistantEl.style.transition = 'opacity 0.2s'
    assistantEl.style.opacity = '0'
    setTimeout(() => {
      assistantEl.remove()
      assistantEl = null
    }, 200)
  }

  assistantEl.querySelector('[data-ai-overlay]').addEventListener('click', close)
  assistantEl.querySelector('[data-ai-close]').addEventListener('click', close)

  const input = assistantEl.querySelector('#ai-input')
  const sendBtn = assistantEl.querySelector('[data-ai-send]')

  const send = () => {
    const q = input.value.trim()
    if (!q) return
    sendPrompt(q)
  }

  sendBtn.addEventListener('click', send)
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') send()
  })

  assistantEl.querySelectorAll('[data-ai-suggest]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.aiSuggest
      input.value = q
      sendPrompt(q)
    })
  })

  if (prefilledPrompt) {
    input.value = prefilledPrompt
    setTimeout(() => sendPrompt(prefilledPrompt), 300)
  }
}

function sendPrompt(query) {
  if (!assistantEl) return
  const messages = assistantEl.querySelector('#ai-messages')

  // Remove suggestion chips after first message
  const chips = assistantEl.querySelector('#ai-suggestions')
  if (chips) chips.remove()

  // User message
  const userMsg = document.createElement('div')
  userMsg.className = 'flex justify-end animate-fade-up'
  userMsg.innerHTML = `
    <div class="bg-primary-600 text-white rounded-2xl rounded-tr-sm p-3 max-w-[80%] shadow-card">
      <p class="text-sm">${query}</p>
    </div>
  `
  messages.appendChild(userMsg)

  // Typing indicator
  const typing = document.createElement('div')
  typing.className = 'flex gap-2 animate-fade-up'
  typing.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
      <i data-lucide="sparkles" class="w-4 h-4 text-primary-600 animate-spin-slow"></i>
    </div>
    <div class="bg-white dark:bg-ink-800 rounded-2xl rounded-tl-sm p-3 shadow-card">
      <div class="flex gap-1">
        <span class="w-2 h-2 rounded-full bg-ink-300 animate-pulse-dot"></span>
        <span class="w-2 h-2 rounded-full bg-ink-300 animate-pulse-dot" style="animation-delay:0.2s"></span>
        <span class="w-2 h-2 rounded-full bg-ink-300 animate-pulse-dot" style="animation-delay:0.4s"></span>
      </div>
    </div>
  `
  messages.appendChild(typing)
  messages.scrollTop = messages.scrollHeight

  setTimeout(() => {
    typing.remove()
    const response = getAIResponse(query)

    const aiMsg = document.createElement('div')
    aiMsg.className = 'flex gap-2 animate-fade-up'
    aiMsg.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
        <i data-lucide="sparkles" class="w-4 h-4 text-primary-600"></i>
      </div>
      <div class="bg-white dark:bg-ink-800 rounded-2xl rounded-tl-sm p-3 max-w-[85%] shadow-card space-y-3">
        <p class="text-sm">${response.text}</p>
        ${response.products?.length ? `
          <div class="grid grid-cols-2 gap-2 mt-2">
            ${response.products.slice(0, 4).map((p) => `
              <div class="card p-2 flex flex-col gap-1">
                <div class="w-full h-16 rounded-lg bg-ink-100 dark:bg-ink-700 flex items-center justify-center text-2xl overflow-hidden">
                  <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.style.display='none'">
                  ${p.emoji || '📦'}
                </div>
                <p class="text-xs font-semibold truncate">${p.name}</p>
                <p class="text-xs font-bold tabular-nums">${formatPrice(p.price)}</p>
                <button class="btn-primary text-xs py-1 px-2" data-ai-add="${p.id}">Add</button>
              </div>
            `).join('')}
          </div>
          ${response.products.length > 2 ? `
            <button class="btn-ghost w-full text-xs mt-2" data-ai-add-all='${JSON.stringify(response.products.map((p) => p.id))}'>
              <i data-lucide="plus" class="w-3 h-3 inline mr-1"></i>
              Add all ${response.products.length} items
            </button>
          ` : ''}
        ` : ''}
      </div>
    `
    messages.appendChild(aiMsg)
    if (window.lucide) window.lucide.createIcons()
    messages.scrollTop = messages.scrollHeight

    // Bind add buttons
    aiMsg.querySelectorAll('[data-ai-add]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const p = getProduct(btn.dataset.aiAdd)
        if (p) {
          dispatch('ADD_ITEM', { id: p.id, qty: 1, weight: p.weight?.[0] })
          toast(`${p.name} added to cart`)
        }
      })
    })

    const addAllBtn = aiMsg.querySelector('[data-ai-add-all]')
    if (addAllBtn) {
      addAllBtn.addEventListener('click', () => {
        const ids = JSON.parse(addAllBtn.dataset.aiAddAll)
        ids.forEach((id) => {
          const p = getProduct(id)
          if (p) dispatch('ADD_ITEM', { id, qty: 1, weight: p.weight?.[0] })
        })
        toast(`${ids.length} items added to cart!`)
      })
    }
  }, 800)
}
