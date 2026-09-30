// Hash router: #/, #/category/:id, #/search?q=, #/checkout, #/orders, #/track/:id
import { header, initHeader } from './components/header.js'
import { bottomNav, initBottomNav, renderCartBar } from './components/bottomNav.js'
import { homePage, initHomePage } from './pages/home.js'
import { categoryPage, initCategoryPage } from './pages/category.js'
import { searchPage, initSearchPage } from './pages/search.js'
import { checkoutPage, initCheckoutPage } from './pages/checkout.js'
import { ordersPage, initOrdersPage } from './pages/orders.js'
import { trackPage, initTrackPage } from './pages/track.js'
import { subscribe } from './store.js'

let currentRoute = null

export function router() {
  const hash = window.location.hash || '#/'
  const app = document.querySelector('#app')

  // Parse route
  let route = hash.slice(1) // remove #
  let page = ''
  let param = null
  let query = null

  if (route === '/' || route === '') {
    page = 'home'
  } else if (route.startsWith('/category/')) {
    page = 'category'
    param = route.split('/category/')[1]
  } else if (route.startsWith('/search')) {
    page = 'search'
    const qParam = route.split('?q=')[1]
    query = qParam ? decodeURIComponent(qParam) : ''
  } else if (route === '/checkout') {
    page = 'checkout'
  } else if (route === '/orders') {
    page = 'orders'
  } else if (route.startsWith('/track/')) {
    page = 'track'
    param = route.split('/track/')[1]
  } else {
    page = 'home'
  }

  currentRoute = { page, param, query }

  // Build page content
  let content = ''
  switch (page) {
    case 'home':
      content = homePage()
      break
    case 'category':
      content = categoryPage(param)
      break
    case 'search':
      content = searchPage(query)
      break
    case 'checkout':
      content = checkoutPage()
      break
    case 'orders':
      content = ordersPage()
      break
    case 'track':
      content = trackPage(param)
      break
  }

  // Render full layout
  app.innerHTML = `
    ${header()}
    <main class="min-h-screen">
      ${content}
    </main>
    ${bottomNav()}
  `

  // Initialize Lucide icons
  if (window.lucide) window.lucide.createIcons()

  // Init components
  initHeader()

  // Init page-specific logic
  switch (page) {
    case 'home':
      initHomePage()
      break
    case 'category':
      initCategoryPage(param)
      break
    case 'search':
      initSearchPage()
      break
    case 'checkout':
      initCheckoutPage()
      break
    case 'orders':
      initOrdersPage()
      break
    case 'track':
      initTrackPage()
      break
  }

  initBottomNav()

  // Render cart bar
  renderCartBar()

  // Scroll to top on route change
  window.scrollTo(0, 0)
}

// Re-render cart bar when cart changes
subscribe('cart', () => {
  renderCartBar()
})
