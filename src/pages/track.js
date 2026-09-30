// Track page - live order tracking with delivery steps
import { getState } from '../store.js'
import { formatPrice, formatDate } from '../utils/format.js'
import { observeFadeUp } from '../utils/animations.js'

const deliverySteps = [
  { key: 'confirmed', label: 'Order Confirmed', emoji: '✅', desc: 'Your order has been confirmed' },
  { key: 'packing', label: 'Packing', emoji: '📦', desc: 'We are packing your items with care' },
  { key: 'out_for_delivery', label: 'Out for Delivery', emoji: '🛵', desc: 'Your order is on the way!' },
  { key: 'delivered', label: 'Delivered', emoji: '🎉', desc: 'Order delivered. Enjoy!' },
]

export function trackPage(orderId) {
  const state = getState()
  const order = state.orders.find((o) => o.id === orderId)

  if (!order) {
    return `
      <div class="max-w-md mx-auto px-4 py-20 text-center">
        <div class="w-20 h-20 rounded-full bg-ink-100 dark:bg-ink-800 flex items-center justify-center text-4xl mx-auto mb-4">🔍</div>
        <h2 class="text-xl font-bold">Order not found</h2>
        <a href="#/orders" class="btn-primary mt-4 inline-block">View All Orders</a>
      </div>
    `
  }

  // Simulate progress based on time since order
  const elapsed = Date.now() - new Date(order.placedAt).getTime()
  let currentStep = 0
  if (elapsed > 30000) currentStep = 1 // 30s = packing
  if (elapsed > 90000) currentStep = 2 // 90s = out for delivery
  if (elapsed > 480000) currentStep = 3 // 8 min = delivered

  const etaMs = new Date(order.eta).getTime() - Date.now()
  const etaMins = Math.max(0, Math.ceil(etaMs / 60000))

  return `
    <div class="max-w-2xl mx-auto px-3 md:px-6 py-4 pb-20 md:pb-8">
      <!-- Order header -->
      <div class="card p-4 mb-4" data-fade-up>
        <div class="flex items-center justify-between mb-2">
          <div>
            <h2 class="text-lg font-bold font-heading">Order #${order.id}</h2>
            <p class="text-xs text-ink-500">${formatDate(order.placedAt)}</p>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold tabular-nums">${formatPrice(order.total)}</p>
            <p class="text-xs text-ink-500">${order.items.length} items</p>
          </div>
        </div>
        ${currentStep < 3 ? `
          <div class="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-3 flex items-center gap-2 mt-3">
            <i data-lucide="truck" class="w-5 h-5 text-primary-600"></i>
            <p class="text-sm font-semibold text-primary-700 dark:text-primary-300">Arriving in ~${etaMins} min</p>
          </div>
        ` : `
          <div class="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-3 flex items-center gap-2 mt-3">
            <i data-lucide="check-circle" class="w-5 h-5 text-primary-600"></i>
            <p class="text-sm font-semibold text-primary-700 dark:text-primary-300">Delivered successfully!</p>
          </div>
        `}
      </div>

      <!-- Tracking steps -->
      <div class="card p-4 mb-4" data-fade-up>
        <h3 class="font-semibold mb-4">Order Tracking</h3>
        <div class="space-y-0">
          ${deliverySteps.map((step, i) => `
            <div class="flex gap-3 ${i < deliverySteps.length - 1 ? 'pb-6' : ''} relative">
              <!-- Timeline line -->
              ${i < deliverySteps.length - 1 ? `
                <div class="absolute left-[18px] top-10 bottom-0 w-0.5 ${i < currentStep ? 'bg-primary-500' : 'bg-ink-200 dark:bg-ink-700'}"></div>
              ` : ''}
              <!-- Step icon -->
              <div class="w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 ${i <= currentStep ? 'bg-primary-600' : 'bg-ink-200 dark:bg-ink-700'}">
                <span class="text-sm ${i <= currentStep ? 'opacity-100' : 'opacity-50'}">${step.emoji}</span>
              </div>
              <!-- Step content -->
              <div class="pt-1">
                <p class="font-semibold text-sm ${i <= currentStep ? 'text-ink-900 dark:text-ink-50' : 'text-ink-400'}">${step.label}</p>
                <p class="text-xs text-ink-500 mt-0.5">${step.desc}</p>
                ${i === currentStep && i < 3 ? `<p class="text-xs text-primary-600 font-medium mt-1">In progress...</p>` : ''}
                ${i < currentStep ? `<p class="text-xs text-primary-600 mt-0.5">✓ Done</p>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Delivery address -->
      <div class="card p-4 mb-4" data-fade-up>
        <div class="flex items-center gap-2 mb-2">
          <i data-lucide="map-pin" class="w-4 h-4 text-primary-600"></i>
          <h3 class="font-semibold text-sm">Delivery Address</h3>
        </div>
        <p class="font-semibold text-sm">${order.address.label}</p>
        <p class="text-sm text-ink-600 dark:text-ink-300">${order.address.line1}, ${order.address.city} - ${order.address.pincode}</p>
      </div>

      <!-- Items -->
      <div class="card p-4" data-fade-up>
        <h3 class="font-semibold mb-3">Items in this order</h3>
        <div class="space-y-2">
          ${order.items.map((item) => `
            <div class="flex items-center gap-3 text-sm">
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

      <!-- Actions -->
      <div class="flex gap-2 mt-4">
        <a href="#/orders" class="btn-ghost flex-1 text-center">All Orders</a>
        <a href="#/" class="btn-primary flex-1 text-center">Order Again</a>
      </div>
    </div>
  `
}

export function initTrackPage() {
  observeFadeUp()
}
