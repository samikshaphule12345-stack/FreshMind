// Cart drawer - slide-in panel from right
import { getState, dispatch, subscribe, getCartCount, getCartSubtotal } from '../store.js'
import { getProduct } from '../data/products.js'
import { getCoupon, coupons } from '../data/offers.js'
import { formatPrice, discountPercent } from '../utils/format.js'
import { toast } from './toast.js'

let drawerEl = null

export function openCartDrawer() {
  if (drawerEl) return
  renderCartDrawer()
}

function renderCartDrawer() {
  const state = getState()
  const items = state.cart.map((c) => {
    const p = getProduct(c.id)
    return p ? { ...p, qty: c.qty, weight: c.weight } : null
  }).filter(Boolean)
  const subtotal = getCartSubtotal()
  const deliveryFee = subtotal >= 199 || subtotal === 0 ? 0 : 25
  const handlingFee = items.length > 0 ? 5 : 0

  let discount = 0
  if (state.coupon) {
    const coupon = getCoupon(state.coupon)
    if (coupon) {
      if (coupon.type === 'flat' && subtotal >= coupon.minOrder) {
        discount = coupon.value
      } else if (coupon.type === 'percent') {
        discount = Math.min((subtotal * coupon.value) / 100, coupon.maxDiscount)
      }
    }
  }

  const total = Math.max(0, subtotal + deliveryFee + handlingFee - discount)

  drawerEl = document.createElement('div')
  drawerEl.className = 'fixed inset-0 z-[9980] flex justify-end'
  drawerEl.innerHTML = `
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" data-drawer-overlay></div>
    <div class="relative w-full max-w-md bg-appbg dark:bg-ink-900 shadow-2xl flex flex-col animate-slide-in h-full">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-ink-100 dark:border-ink-700 shrink-0">
        <div>
          <h3 class="text-lg font-bold font-heading">Your Cart</h3>
          <p class="text-xs text-ink-500">${getCartCount()} item${getCartCount() !== 1 ? 's' : ''}</p>
        </div>
        <button class="w-9 h-9 rounded-full bg-ink-100 dark:bg-ink-800 flex items-center justify-center hover:bg-ink-200 transition" data-drawer-close>
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>

      ${items.length === 0 ? `
        <div class="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <div class="w-20 h-20 rounded-full bg-ink-100 dark:bg-ink-800 flex items-center justify-center text-4xl">🛒</div>
          <div>
            <p class="text-lg font-semibold">Your cart is empty</p>
            <p class="text-sm text-ink-500 mt-1">Add some fresh groceries to get started!</p>
          </div>
          <a href="#/" class="btn-primary" data-drawer-close>Browse Products</a>
        </div>
      ` : `
        <!-- Items -->
        <div class="flex-1 overflow-y-auto p-4 space-y-3">
          ${items.map((item) => {
            const disc = discountPercent(item.price, item.mrp)
            return `
              <div class="card p-3 flex gap-3 items-center" data-cart-item="${item.id}" data-cart-weight="${item.weight}">
                <div class="w-16 h-16 rounded-xl bg-ink-100 dark:bg-ink-700 flex items-center justify-center text-3xl overflow-hidden shrink-0">
                  <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" onerror="this.style.display='none'">
                  ${item.emoji || '📦'}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span class="${item.veg ? 'veg-dot' : 'nonveg-dot'}"></span>
                    <h4 class="text-sm font-semibold truncate">${item.name}</h4>
                  </div>
                  <p class="text-xs text-ink-500">${item.brand}${item.weight ? ' • ' + item.weight : ''}</p>
                  <div class="flex items-center justify-between mt-1.5">
                    <div class="flex items-center gap-1">
                      <span class="font-bold tabular-nums text-sm">${formatPrice(item.price)}</span>
                      ${disc > 0 ? `<span class="text-xs text-ink-400 line-through tabular-nums">${formatPrice(item.mrp)}</span>` : ''}
                    </div>
                    <div class="flex items-center gap-1.5 bg-primary-50 dark:bg-primary-900/30 rounded-lg p-0.5">
                      <button class="w-6 h-6 rounded-md bg-white dark:bg-ink-700 flex items-center justify-center text-primary-600 font-bold hover:bg-primary-100 transition" data-cd-minus="${item.id}" data-cd-weight="${item.weight}">−</button>
                      <span class="w-5 text-center text-xs font-bold text-primary-600 tabular-nums">${item.qty}</span>
                      <button class="w-6 h-6 rounded-md bg-primary-600 text-white font-bold hover:bg-primary-700 transition" data-cd-plus="${item.id}" data-cd-weight="${item.weight}">+</button>
                    </div>
                  </div>
                </div>
                <button class="text-ink-400 hover:text-coral-500 transition shrink-0" data-cd-remove="${item.id}" data-cd-weight="${item.weight}">
                  <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
              </div>
            `
          }).join('')}

          <!-- Coupon section -->
          <div class="card p-3">
            <div class="flex items-center gap-2 mb-2">
              <i data-lucide="ticket" class="w-4 h-4 text-primary-600"></i>
              <p class="text-sm font-semibold">Apply Coupon</p>
            </div>
            ${state.coupon ? `
              <div class="flex items-center justify-between bg-primary-50 dark:bg-primary-900/30 rounded-lg px-3 py-2">
                <div>
                  <p class="text-sm font-bold text-primary-600">${state.coupon}</p>
                  <p class="text-xs text-ink-500">${getCoupon(state.coupon)?.description || ''}</p>
                </div>
                <button class="text-coral-500 text-xs font-medium" data-remove-coupon>Remove</button>
              </div>
            ` : `
              <div class="flex gap-2 flex-wrap">
                ${coupons.map((c) => `
                  <button class="chip border-2 border-dashed border-primary-300 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition" data-apply-coupon="${c.code}">
                    <i data-lucide="ticket" class="w-3 h-3"></i>
                    ${c.code}
                  </button>
                `).join('')}
              </div>
            `}
          </div>

          <!-- Bill details -->
          <div class="card p-3 space-y-2">
            <p class="text-sm font-semibold mb-1">Bill Details</p>
            <div class="flex justify-between text-sm">
              <span class="text-ink-600 dark:text-ink-300">Item total</span>
              <span class="tabular-nums font-medium">${formatPrice(subtotal)}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-ink-600 dark:text-ink-300">Delivery fee</span>
              <span class="tabular-nums font-medium ${deliveryFee === 0 ? 'text-primary-600' : ''}">${deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-ink-600 dark:text-ink-300">Handling fee</span>
              <span class="tabular-nums font-medium">${formatPrice(handlingFee)}</span>
            </div>
            ${discount > 0 ? `
            <div class="flex justify-between text-sm">
              <span class="text-primary-600">Coupon discount</span>
              <span class="tabular-nums font-medium text-primary-600">−${formatPrice(discount)}</span>
            </div>
            ` : ''}
            <div class="border-t border-ink-100 dark:border-ink-700 pt-2 flex justify-between">
              <span class="font-bold">Total</span>
              <span class="font-bold tabular-nums text-lg">${formatPrice(total)}</span>
            </div>
          </div>

          ${subtotal < 199 && subtotal > 0 ? `
            <div class="bg-accent-50 dark:bg-accent-900/20 rounded-xl p-3 flex items-center gap-2">
              <i data-lucide="truck" class="w-4 h-4 text-accent-600"></i>
              <p class="text-xs text-accent-700 dark:text-accent-400">Add ${formatPrice(199 - subtotal)} more for FREE delivery!</p>
            </div>
          ` : ''}
        </div>

        <!-- Checkout button -->
        <div class="p-4 border-t border-ink-100 dark:border-ink-700 shrink-0">
          <a href="#/checkout" class="btn-primary w-full flex items-center justify-between" data-drawer-close data-checkout-btn>
            <span class="font-semibold">Checkout</span>
            <span class="flex items-center gap-1">
              <span class="tabular-nums font-bold">${formatPrice(total)}</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </span>
          </a>
        </div>
      `}
    </div>
  `
  document.body.appendChild(drawerEl)
  if (window.lucide) window.lucide.createIcons()

  // Close handlers
  const close = () => {
    drawerEl.style.transition = 'opacity 0.2s'
    drawerEl.style.opacity = '0'
    setTimeout(() => {
      drawerEl.remove()
      drawerEl = null
    }, 200)
  }

  drawerEl.querySelector('[data-drawer-overlay]').addEventListener('click', close)
  drawerEl.querySelectorAll('[data-drawer-close]').forEach((el) => el.addEventListener('click', close))

  // Quantity controls
  drawerEl.querySelectorAll('[data-cd-minus]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.cdMinus
      const weight = btn.dataset.cdWeight === 'null' ? null : btn.dataset.cdWeight
      const item = getState().cart.find((c) => c.id === id && c.weight == weight)
      if (item) dispatch('SET_QTY', { id, weight: item.weight, qty: item.qty - 1 })
      reRender()
    })
  })

  drawerEl.querySelectorAll('[data-cd-plus]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.cdPlus
      const weight = btn.dataset.cdWeight === 'null' ? null : btn.dataset.cdWeight
      const item = getState().cart.find((c) => c.id === id && c.weight == weight)
      if (item) dispatch('SET_QTY', { id, weight: item.weight, qty: item.qty + 1 })
      reRender()
    })
  })

  drawerEl.querySelectorAll('[data-cd-remove]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.cdRemove
      const weight = btn.dataset.cdWeight === 'null' ? null : btn.dataset.cdWeight
      dispatch('REMOVE_ITEM', { id, weight })
      toast('Item removed from cart')
      reRender()
    })
  })

  // Coupons
  drawerEl.querySelectorAll('[data-apply-coupon]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.applyCoupon
      const coupon = getCoupon(code)
      if (coupon && subtotal >= coupon.minOrder) {
        dispatch('APPLY_COUPON', code)
        toast(`Coupon ${code} applied!`, 'success')
        reRender()
      } else {
        toast(`Minimum order ₹${coupon?.minOrder || 0} required`, 'error')
      }
    })
  })

  const removeCoupon = drawerEl.querySelector('[data-remove-coupon]')
  if (removeCoupon) {
    removeCoupon.addEventListener('click', () => {
      dispatch('APPLY_COUPON', null)
      toast('Coupon removed', 'info')
      reRender()
    })
  }
}

function reRender() {
  if (!drawerEl) return
  drawerEl.remove()
  drawerEl = null
  renderCartDrawer()
}
