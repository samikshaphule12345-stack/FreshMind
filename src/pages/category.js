// Category page - shows products in a category with filters
import { getCategory } from '../data/categories.js'
import { getByCat as getByCategory } from '../services/productService.js'
import { sortBy } from '../services/productService.js'
import { productCard, initProductCards } from '../components/productCard.js'
import { observeFadeUp } from '../utils/animations.js'

export function categoryPage(catId) {
  const category = getCategory(catId)
  if (!category) {
    return `<div class="max-w-7xl mx-auto px-4 py-20 text-center"><h2 class="text-xl font-bold">Category not found</h2><a href="#/" class="btn-primary mt-4 inline-block">Go Home</a></div>`
  }
  const products = getByCategory(catId)
  return `
    <div class="max-w-7xl mx-auto px-3 md:px-6 py-4 pb-20 md:pb-8">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm text-ink-500 mb-4">
        <a href="#/" class="hover:text-primary-600">Home</a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-ink-900 dark:text-ink-50 font-medium">${category.name}</span>
      </div>

      <!-- Category header -->
      <div class="flex items-center gap-3 mb-6" data-fade-up>
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style="background:${category.color}">${category.emoji}</div>
        <div>
          <h2 class="text-2xl font-bold font-heading">${category.name}</h2>
          <p class="text-sm text-ink-500">${products.length} products available</p>
        </div>
      </div>

      <!-- Sort bar -->
      <div class="flex items-center gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1">
        <button class="chip bg-primary-600 text-white shrink-0" data-sort="relevance">Relevance</button>
        <button class="chip bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-200 shrink-0" data-sort="price-low">Price: Low to High</button>
        <button class="chip bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-200 shrink-0" data-sort="price-high">Price: High to Low</button>
        <button class="chip bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-200 shrink-0" data-sort="rating">Rating</button>
        <button class="chip bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-200 shrink-0" data-sort="discount">Discount</button>
      </div>

      <!-- Products grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3" id="category-products">
        ${products.map((p) => `<div data-fade-up>${productCard(p)}</div>`).join('')}
      </div>
    </div>
  `
}

export function initCategoryPage(catId) {
  const products = getByCategory(catId)
  initProductCards()
  observeFadeUp()

  // Sort handlers
  document.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active style
      document.querySelectorAll('[data-sort]').forEach((b) => {
        b.classList.remove('bg-primary-600', 'text-white')
        b.classList.add('bg-ink-100', 'dark:bg-ink-800', 'text-ink-700', 'dark:text-ink-200')
      })
      btn.classList.add('bg-primary-600', 'text-white')
      btn.classList.remove('bg-ink-100', 'dark:bg-ink-800', 'text-ink-700', 'dark:text-ink-200')

      const sortType = btn.dataset.sort
      const sorted = sortType === 'relevance' ? products : sortBy(products, sortType)
      const grid = document.querySelector('#category-products')
      if (grid) {
        grid.innerHTML = sorted.map((p) => `<div data-fade-up>${productCard(p)}</div>`).join('')
        initProductCards(grid)
        observeFadeUp(grid)
        if (window.lucide) window.lucide.createIcons()
      }
    })
  })
}
