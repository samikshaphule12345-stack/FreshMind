// Checkout page - address, payment, order summary
import { getState, dispatch, getCartItems, getCartSubtotal } from '../store.js'
import { getCoupon, coupons } from '../data/offers.js'
import { formatPrice } from '../utils/format.js'
import { genOrderId } from '../utils/format.js'
import { toast } from '../components/toast.js'
import { confettiBurst } from '../utils/animations.js'

export function checkoutPage() {
  const state = getState()
  const items = getCartItems()
  const subtotal = getCartSubtotal()
  const deliveryFee = subtotal >= 199 ? 0 : 25
  const handlingFee = items.length > 0 ? 5 : 0

  let discount = 0
  if (state.coupon) {
    const coupon = getCoupon(state.coupon)
    if (coupon) {
      if (coupon.type === 'flat' && subtotal >= coupon.minOrder) discount = coupon.value
      else if (coupon.type === 'percent') discount = Math.min((subtotal * coupon.value) / 100, coupon.maxDiscount)
    }
  }
  const total = Math.max(0, subtotal + deliveryFee + handlingFee - discount)

  if (items.length === 0) {
    return `
      <div class="max-w-md mx-auto px-4 py-20 text-center">
        <div class="w-20 h-20 rounded-full bg-ink-100 dark:bg-ink-800 flex items-center justify-center text-4xl mx-auto mb-4">🛒</div>
        <h2 class="text-xl font-bold">Your cart is empty</h2>
        <p class="text-sm text-ink-500 mt-1">Add some products before checking out!</p>
        <a href="#/" class="btn-primary mt-4 inline-block">Browse Products</a>
      </div>
    `
  }

  return `
    <div class="max-w-4xl mx-auto px-3 md:px-6 py-4 pb-20 md:pb-8">
      <h2 class="text-2xl font-bold font-heading mb-6">Checkout</h2>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- Left: Address + Payment -->
        <div class="space-y-4">
          <!-- Delivery address -->
          <div class="card p-4">
            <div class="flex items-center gap-2 mb-3">
              <i data-lucide="map-pin" class="w-4 h-4 text-primary-600"></i>
              <h3 class="font-semibold">Delivery Address</h3>
            </div>
            <div class="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-3">
              <p class="font-semibold text-sm">${state.address.label}</p>
              <p class="text-sm text-ink-600 dark:text-ink-300">${state.address.line1}</p>
              <p class="text-sm text-ink-600 dark:text-ink-300">${state.address.city} - ${state.address.pincode}</p>
            </div>
            <button class="text-sm text-primary-600 font-medium mt-2" data-change-address>Change address</button>
          </div>

          <!-- Payment method -->
          <div class="card p-4">
            <div class="flex items-center gap-2 mb-3">
              <i data-lucide="credit-card" class="w-4 h-4 text-primary-600"></i>
              <h3 class="font-semibold">Payment Method</h3>
            </div>
            <div class="space-y-2">
              <label class="flex items-center gap-3 p-3 rounded-xl border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/20 cursor-pointer">
                <input type="radio" name="payment" value="upi" checked class="accent-primary-600">
                <div class="flex-1">
                  <p class="font-semibold text-sm">UPI</p>
                  <p class="text-xs text-ink-500">Pay via Google Pay, PhonePe, Paytm</p>
                </div>
                <span class="text-2xl">📱</span>
              </label>
              <label class="flex items-center gap-3 p-3 rounded-xl border border-ink-200 dark:border-ink-700 cursor-pointer hover:border-primary-300">
                <input type="radio" name="payment" value="card" class="accent-primary-600">
                <div class="flex-1">
                  <p class="font-semibold text-sm">Card</p>
                  <p class="text-xs text-ink-500">Credit / Debit card</p>
                </div>
                <span class="text-2xl">💳</span>
              </label>
              <label class="flex items-center gap-3 p-3 rounded-xl border border-ink-200 dark:border-ink-700 cursor-pointer hover:border-primary-300">
                <input type="radio" name="payment" value="cod" class="accent-primary-600">
                <div class="flex-1">
                  <p class="font-semibold text-sm">Cash on Delivery</p>
                  <p class="text-xs text-ink-500">Pay when you receive</p>
                </div>
                <span class="text-2xl">💵</span>
              </label>
            </div>
          </div>

          <!-- Delivery instructions -->
          <div class="card p-4">
            <div class="flex items-center gap-2 mb-3">
              <i data-lucide="message-square" class="w-4 h-4 text-primary-600"></i>
              <h3 class="font-semibold">Delivery Instructions (Optional)</h3>
            </div>
            <textarea class="w-full px-3 py-2 rounded-xl bg-ink-100 dark:bg-ink-800 border border-transparent focus:border-primary-500 outline-none text-sm resize-none" rows="2" placeholder="e.g. Leave at the door, ring the bell..."></textarea>
          </div>
        </div>

        <!-- Right: Order summary -->
        <div class="space-y-4">
          <div class="card p-4">
            <h3 class="font-semibold mb-3">Order Summary</h3>
            <div class="space-y-2 max-h-48 overflow-y-auto">
              ${items.map((item) => `
                <div class="flex items-center gap-2 text-sm">
                  <div class="w-10 h-10 rounded-lg bg-ink-100 dark:bg-ink-700 flex items-center justify-center text-lg shrink-0">${item.emoji || '📦'}</div>
                  <div class="flex-1 min-w-0">
                    <p class="font-medium truncate">${item.name}</p>
                    <p class="text-xs text-ink-500">${item.qty} × ${formatPrice(item.price)}${item.weight ? ' • ' + item.weight : ''}</p>
                  </div>
                  <span class="font-semibold tabular-nums">${formatPrice(item.price * item.qty)}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="card p-4 space-y-2">
            <h3 class="font-semibold mb-1">Bill Details</h3>
            <div class="flex justify-between text-sm"><span class="text-ink-600 dark:text-ink-300">Item total</span><span class="tabular-nums font-medium">${formatPrice(subtotal)}</span></div>
            <div class="flex justify-between text-sm"><span class="text-ink-600 dark:text-ink-300">Delivery fee</span><span class="tabular-nums font-medium ${deliveryFee === 0 ? 'text-primary-600' : ''}">${deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span></div>
            <div class="flex justify-between text-sm"><span class="text-ink-600 dark:text-ink-300">Handling fee</span><span class="tabular-nums font-medium">${formatPrice(handlingFee)}</span></div>
            ${discount > 0 ? `<div class="flex justify-between text-sm"><span class="text-primary-600">Coupon (${state.coupon})</span><span class="tabular-nums font-medium text-primary-600">−${formatPrice(discount)}</span></div>` : ''}
            <div class="border-t border-ink-100 dark:border-ink-700 pt-2 flex justify-between"><span class="font-bold">Total</span><span class="font-bold tabular-nums text-lg">${formatPrice(total)}</span></div>
          </div>

          <button class="btn-primary w-full text-base py-3" data-place-order>
            <i data-lucide="check-circle" class="w-5 h-5 inline mr-1"></i>
            Place Order • ${formatPrice(total)}
          </button>

          <p class="text-xs text-center text-ink-500">By placing this order, you agree to FreshMind's Terms & Conditions</p>
        </div>
      </div>
    </div>
  `
}

export function initCheckoutPage() {
  // Change address
  document.querySelector('[data-change-address]')?.addEventListener('click', async () => {
    const { openLocationModal } = await import('../components/locationModal.js')
    openLocationModal()
  })

  // Place order
  document.querySelector('[data-place-order]')?.addEventListener('click', () => {
    const state = getState()
    const items = getCartItems()
    const subtotal = getCartSubtotal()
    const deliveryFee = subtotal >= 199 ? 0 : 25
    const handlingFee = 5
    let discount = 0
    if (state.coupon) {
      const coupon = getCoupon(state.coupon)
      if (coupon) {
        if (coupon.type === 'flat' && subtotal >= coupon.minOrder) discount = coupon.value
        else if (coupon.type === 'percent') discount = Math.min((subtotal * coupon.value) / 100, coupon.maxDiscount)
      }
    }
    const total = Math.max(0, subtotal + deliveryFee + handlingFee - discount)

    const order = {
      id: genOrderId(),
      items: items.map((i) => ({ id: i.id, name: i.name, qty: i.qty, price: i.price, weight: i.weight, emoji: i.emoji })),
      total,
      status: 'confirmed',
      placedAt: new Date().toISOString(),
      eta: new Date(Date.now() + 10 * 60000).toISOString(),
      address: { ...state.address },
    }

    dispatch('PLACE_ORDER', order)
    toast('Order placed successfully!')
    const rect = document.querySelector('[data-place-order]').getBoundingClientRect()
    confettiBurst(rect.left + rect.width / 2, rect.top)
    setTimeout(() => {
      window.location.hash = `#/track/${order.id}`
    }, 800)
  })
}
