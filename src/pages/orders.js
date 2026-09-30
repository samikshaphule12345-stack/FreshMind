// Orders page - list of past orders
import { getState } from '../store.js'
import { formatPrice, formatDate, timeAgo } from '../utils/format.js'
import { observeFadeUp } from '../utils/animations.js'

export function ordersPage() {
  const state = getState()
  const orders = state.orders

  return `
    <div class="max-w-3xl mx-auto px-3 md:px-6 py-4 pb-20 md:pb-8">
      <h2 class="text-2xl font-bold font-heading mb-6">My Orders</h2>

      ${orders.length === 0 ? `
        <div class="flex flex-col items-center justify-center py-20 text-center">
          <div class="w-20 h-20 rounded-full bg-ink-100 dark:bg-ink-800 flex items-center justify-center text-4xl mb-4">📦</div>
          <h3 class="text-lg font-semibold">No orders yet</h3>
          <p class="text-sm text-ink-500 mt-1">Your orders will appear here</p>
          <a href="#/" class="btn-primary mt-4">Start Shopping</a>
        </div>
      ` : `
        <div class="space-y-3">
          ${orders.map((order) => `
            <a href="#/track/${order.id}" class="card p-4 block hover:shadow-soft transition" data-fade-up>
              <div class="flex items-center justify-between mb-3">
                <div>
                  <p class="font-semibold text-sm">Order #${order.id}</p>
                  <p class="text-xs text-ink-500">${formatDate(order.placedAt)} • ${timeAgo(order.placedAt)}</p>
                </div>
                <span class="chip ${order.status === 'delivered' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' : 'bg-accent-100 dark:bg-accent-900/30 text-accent-700'}">
                  ${order.status === 'delivered' ? '✓ Delivered' : order.status === 'confirmed' ? '⏱ Confirmed' : order.status}
                </span>
              </div>
              <div class="flex items-center gap-1.5 mb-3 flex-wrap">
                ${order.items.slice(0, 5).map((i) => `
                  <div class="w-8 h-8 rounded-lg bg-ink-100 dark:bg-ink-700 flex items-center justify-center text-sm">${i.emoji || '📦'}</div>
                `).join('')}
                ${order.items.length > 5 ? `<span class="text-xs text-ink-500">+${order.items.length - 5} more</span>` : ''}
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm text-ink-500">${order.items.length} item${order.items.length > 1 ? 's' : ''}</p>
                <p class="font-bold tabular-nums">${formatPrice(order.total)}</p>
              </div>
            </a>
          `).join('')}
        </div>
      `}
    </div>
  `
}

export function initOrdersPage() {
  observeFadeUp()
}
