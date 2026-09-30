// Quick view modal for a product
import { getProduct } from '../data/products.js'
import { dispatch, getState } from '../store.js'
import { formatPrice, discountPercent, formatRating } from '../utils/format.js'
import { toast } from './toast.js'
import { modal } from './modal.js'
import { flyToCart, bounceBadge } from '../utils/animations.js'

export function openQuickView(productId) {
  const product = getProduct(productId)
  if (!product) return
  const state = getState()
  const inWishlist = state.wishlist.includes(productId)
  const disc = discountPercent(product.price, product.mrp)

  const content = `
    <div class="flex flex-col gap-4">
      <div class="flex gap-4">
        <div class="w-32 h-32 rounded-xl bg-ink-100 dark:bg-ink-700 flex items-center justify-center text-6xl shrink-0 overflow-hidden">
          <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" onerror="this.style.display='none'">
          ${product.emoji}
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="${product.veg ? 'veg-dot' : 'nonveg-dot'}"></span>
            <span class="text-sm text-ink-500 dark:text-ink-400">${product.brand}</span>
          </div>
          <h3 class="text-lg font-bold font-heading">${product.name}</h3>
          <div class="flex items-center gap-2 mt-1">
            <div class="flex items-center gap-1 text-sm">
              <i data-lucide="star" class="w-4 h-4 text-accent-400 fill-accent-400"></i>
              <span class="font-bold">${formatRating(product.rating)}</span>
            </div>
            ${disc > 0 ? `<span class="bg-coral-500/10 text-coral-500 text-xs font-bold px-2 py-0.5 rounded-lg">${disc}% OFF</span>` : ''}
          </div>
          <div class="flex items-baseline gap-2 mt-2">
            <span class="text-2xl font-bold tabular-nums">${formatPrice(product.price)}</span>
            ${disc > 0 ? `<span class="text-sm text-ink-400 line-through tabular-nums">${formatPrice(product.mrp)}</span>` : ''}
          </div>
        </div>
      </div>

      ${product.weight?.length ? `
      <div>
        <p class="text-sm font-semibold mb-2">Select weight</p>
        <div class="flex gap-2 flex-wrap" id="qv-weights">
          ${product.weight.map((w, i) => `<button class="chip ${i === 0 ? 'bg-primary-600 text-white' : 'bg-ink-100 dark:bg-ink-700 text-ink-700 dark:text-ink-200'}" data-weight="${w}">${w}</button>`).join('')}
        </div>
      </div>` : ''}

      ${product.tags?.length ? `
      <div>
        <p class="text-sm font-semibold mb-2">Tags</p>
        <div class="flex gap-2 flex-wrap">
          ${product.tags.map((t) => `<span class="chip bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">${t}</span>`).join('')}
        </div>
      </div>` : ''}

      ${product.nutrition ? `
      <div>
        <p class="text-sm font-semibold mb-2">Nutrition (per 100g)</p>
        <div class="grid grid-cols-3 gap-2">
          <div class="card p-2 text-center">
            <p class="text-xs text-ink-500">Calories</p>
            <p class="font-bold tabular-nums">${product.nutrition.cal}</p>
          </div>
          <div class="card p-2 text-center">
            <p class="text-xs text-ink-500">Protein</p>
            <p class="font-bold tabular-nums">${product.nutrition.protein}g</p>
          </div>
          <div class="card p-2 text-center">
            <p class="text-xs text-ink-500">Carbs</p>
            <p class="font-bold tabular-nums">${product.nutrition.carbs}g</p>
          </div>
        </div>
      </div>` : ''}

      <div class="flex gap-2 mt-2">
        <button class="btn-ghost flex-1" data-qv-wishlist="${product.id}">
          <i data-lucide="${inWishlist ? 'heart' : 'heart'}" class="w-4 h-4 inline mr-1 ${inWishlist ? 'text-coral-500 fill-coral-500' : ''}"></i>
          ${inWishlist ? 'Wishlisted' : 'Wishlist'}
        </button>
        <button class="btn-primary flex-1" data-qv-add="${product.id}">
          <i data-lucide="plus" class="w-4 h-4 inline mr-1"></i>
          Add to Cart
        </button>
      </div>
    </div>
  `

  const m = modal({ title: 'Quick View', content })
  let selectedWeight = product.weight?.[0] || null

  // Weight selection
  m.overlay.querySelectorAll('[data-weight]').forEach((btn) => {
    btn.addEventListener('click', () => {
      m.overlay.querySelectorAll('[data-weight]').forEach((b) => {
        b.classList.remove('bg-primary-600', 'text-white')
        b.classList.add('bg-ink-100', 'dark:bg-ink-700', 'text-ink-700', 'dark:text-ink-200')
      })
      btn.classList.add('bg-primary-600', 'text-white')
      btn.classList.remove('bg-ink-100', 'dark:bg-ink-700', 'text-ink-700', 'dark:text-ink-200')
      selectedWeight = btn.dataset.weight
    })
  })

  // Add to cart
  m.overlay.querySelector('[data-qv-add]').addEventListener('click', () => {
    dispatch('ADD_ITEM', { id: product.id, qty: 1, weight: selectedWeight })
    toast(`${product.name} added to cart`)
    const cartBtn = document.querySelector('[data-cart-btn]')
    if (cartBtn) {
      const rect = m.overlay.querySelector('[data-qv-add]').getBoundingClientRect()
      flyToCart({ getBoundingClientRect: () => rect }, cartBtn)
    }
    bounceBadge('[data-cart-count]')
    m.close()
  })

  // Wishlist
  m.overlay.querySelector('[data-qv-wishlist]').addEventListener('click', () => {
    dispatch('TOGGLE_WISHLIST', product.id)
    toast(getState().wishlist.includes(product.id) ? 'Added to wishlist' : 'Removed from wishlist')
    m.close()
  })
}
