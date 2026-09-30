// Main bootstrap - initializes the app
import './style.css'
import { router } from './router.js'
import { getState } from './store.js'
import { subscribe } from './store.js'

// Initialize Lucide icons
import { createIcons, icons } from 'lucide'
window.lucide = { createIcons, icons }

// Apply saved theme
const state = getState()
if (state.theme === 'dark') {
  document.documentElement.classList.add('dark')
}

// Initial render
router()

// Listen for hash changes
window.addEventListener('hashchange', router)

// Prevent body scroll when modals/drawers are open (handled by overlays)
// Service worker registration can go here if needed
