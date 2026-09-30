// Search page - search results with query from URL
import { search } from '../services/productService.js'
import { productCard, initProductCards } from '../components/productCard.js'
import { observeFadeUp } from '../utils/animations.js'

export function searchPage(query) {
  const results = search(query)
  return `
    <div class="max-w-7xl mx-auto px-3 md:px-6 py-4 pb-20 md:pb-8">
      <div class="mb-4">
        <h2 class="text-xl font-bold font-heading">Search Results</h2>
        <p class="text-sm text-ink-500">${results.length} results for "${query}"</p>
      </div>
      ${results.length === 0 ? `
        <div class="flex flex-col items-center justify-center py-20 text-center">
          <div class="w-20 h-20 rounded-full bg-ink-100 dark:bg-ink-800 flex items-center justify-center text-4xl mb-4">🔍</div>
          <h3 class="text-lg font-semibold">No products found</h3>
          <p class="text-sm text-ink-500 mt-1">Try a different search term</p>
          <a href="#/" class="btn-primary mt-4">Browse All Products</a>
        </div>
      ` : `
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          ${results.map((p) => `<div data-fade-up>${productCard(p)}</div>`).join('')}
        </div>
      `}
    </div>
  `
}

export function initSearchPage() {
  initProductCards()
  observeFadeUp()
}
