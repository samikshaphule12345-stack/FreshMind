// Product card component
import { getProduct } from '../data/products.js'
import { dispatch, getState } from '../store.js'
import { formatPrice, discountPercent, formatRating } from '../utils/format.js'
import { toast } from './toast.js'
import { flyToCart, bounceBadge } from '../utils/animations.js'
import { openQuickView } from './quickView.js'

export function productCard(product, opts = {}) {
  const state = getState()
  const inWishlist = state.wishlist.includes(product.id)
  const disc = discountPercent(product.price, product.mrp)
  const cartItem = state.cart.find((c) => c.id === product.id)

  return `
    <div class="card relative p-3 flex flex-col gap-2 group hover:shadow-soft transition-all duration-300 ${opts.compact ? 'w-40' : 'w-full'}" data-product-card="${product.id}">
      ${disc > 0 ? `<div class="absolute top-2 left-2 bg-coral-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg z-10">${disc}% OFF</div>` : ''}
      <button class="wishlist-btn absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-ink-800/90 flex items-center justify-center shadow-sm hover:scale-110 transition" data-wishlist="${product.id}">
        <i data-lucide="${inWishlist ? 'heart' : 'heart'}" class="w-4 h-4 ${inWishlist ? 'text-coral-500 fill-coral-500' : 'text-ink-400'}"></i>
      </button>
      <div class="cursor-pointer product-img-wrap" data-quickview="${product.id}">
        <div class="skeleton aspect-square w-full rounded-xl hidden"></div>
        <img src="${product.image}" alt="${product.name}" loading="lazy" class="aspect-square w-full object-cover rounded-xl bg-ink-100 dark:bg-ink-700" onerror="this.style.display='none';this.previousElementSibling.classList.remove('hidden');this.nextElementSibling.classList.remove('hidden')">
        <div class="hidden aspect-square w-full rounded-xl flex items-center justify-center text-5xl bg-ink-100 dark:bg-ink-700">${product.emoji || '📦'}</div>
      </div>
      <div class="flex flex-col gap-1 flex-1">
        <div class="flex items-center gap-1.5">
          <span class="${product.veg ? 'veg-dot' : 'nonveg-dot'}"></span>
          <span class="text-xs text-ink-500 dark:text-ink-400 truncate">${product.brand}</span>
        </div>
        <h4 class="text-sm font-semibold text-ink-900 dark:text-ink-50 leading-tight line-clamp-2 cursor-pointer" data-quickview="${product.id}">${product.name}</h4>
        <div class="flex items-center gap-1 text-xs text-ink-500 dark:text-ink-400">
          <i data-lucide="star" class="w-3 h-3 text-accent-400 fill-accent-400"></i>
          <span class="font-medium">${formatRating(product.rating)}</span>
          ${product.weight ? `<span>•</span><span>${product.weight[0]}</span>` : ''}
        </div>
        <div class="flex items-center justify-between mt-auto pt-1">
          <div class="flex flex-col">
            <span class="text-base font-bold tabular-nums text-ink-900 dark:text-ink-50">${formatPrice(product.price)}</span>
            ${disc > 0 ? `<span class="text-xs text-ink-400 line-through tabular-nums">${formatPrice(product.mrp)}</span>` : ''}
          </div>
          ${cartItem
            ? `<div class="flex items-center gap-1.5 bg-primary-50 dark:bg-primary-900/30 rounded-xl p-0.5">
                <button class="qty-minus w-7 h-7 rounded-lg bg-white dark:bg-ink-700 flex items-center justify-center text-primary-600 font-bold hover:bg-primary-100 transition" data-qty-minus="${product.id}">−</button>
                <span class="w-6 text-center text-sm font-bold text-primary-600 tabular-nums">${cartItem.qty}</span>
                <button class="qty-plus w-7 h-7 rounded-lg bg-primary-600 text-white font-bold hover:bg-primary-700 transition" data-qty-plus="${product.id}">+</button>
              </div>`
            : `<button class="add-btn btn-primary text-sm py-1.5 px-3" data-add="${product.id}">ADD</button>`
          }
        </div>
      </div>
    </div>
  `
}

export function initProductCards(scope = document) {
  // Add to cart
  scope.querySelectorAll('[data-add]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const id = btn.dataset.add
      const product = getProduct(id)
      if (!product) return
      dispatch('ADD_ITEM', { id, qty: 1, weight: product.weight?.[0] })
      toast(`${product.name} added to cart`)
      const card = btn.closest('[data-product-card]')
      const cartBtn = document.querySelector('[data-cart-btn]')
      if (card && cartBtn) flyToCart(card, cartBtn)
      bounceBadge('[data-cart-count]')
      // Re-render just this card
      const newCard = productCard(product, { compact: btn.closest('[data-product-card]')?.classList.contains('w-40') })
      const wrapper = document.createElement('div')
      wrapper.innerHTML = newCard
      card?.replaceWith(wrapper.firstElementChild)
      initProductCards(card?.parentElement || scope)
    })
  })

  // Wishlist toggle
  scope.querySelectorAll('[data-wishlist]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const id = btn.dataset.wishlist
      dispatch('TOGGLE_WISHLIST', id)
      const isNow = getState().wishlist.includes(id)
      toast(isNow ? 'Added to wishlist' : 'Removed from wishlist')
      const icon = btn.querySelector('i')
      if (icon) {
        icon.classList.toggle('text-coral-500', isNow)
        icon.classList.toggle('fill-coral-500', isNow)
        icon.classList.toggle('text-ink-400', !isNow)
      }
    })
  })

  // Quick view
  scope.querySelectorAll('[data-quickview]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation()
      openQuickView(el.dataset.quickview)
    })
  })

  // Quantity controls
  scope.querySelectorAll('[data-qty-minus]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const id = btn.dataset.qtyMinus
      const product = getProduct(id)
      const item = getState().cart.find((c) => c.id === id)
      if (item) {
        dispatch('SET_QTY', { id, weight: item.weight, qty: item.qty - 1 })
        if (item.qty - 1 <= 0) {
          const card = btn.closest('[data-product-card]')
          const newCard = productCard(product)
          const wrapper = document.createElement('div')
          wrapper.innerHTML = newCard
          card?.replaceWith(wrapper.firstElementChild)
          initProductCards(card?.parentElement || scope)
        } else {
          const qtySpan = btn.parentElement.querySelector('.tabular-nums')
          if (qtySpan) qtySpan.textContent = item.qty - 1
        }
      }
    })
  })

  scope.querySelectorAll('[data-qty-plus]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const id = btn.dataset.qtyPlus
      const item = getState().cart.find((c) => c.id === id)
      if (item) {
        dispatch('SET_QTY', { id, weight: item.weight, qty: item.qty + 1 })
        const qtySpan = btn.parentElement.querySelector('.tabular-nums')
        if (qtySpan) qtySpan.textContent = item.qty + 1
      }
    })
  })
}
