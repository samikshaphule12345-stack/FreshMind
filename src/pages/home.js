// Home page - assembles all home sections
import { heroCarousel, initHeroCarousel } from '../components/heroCarousel.js'
import { categoryGrid } from '../components/categoryGrid.js'
import { snapRow, initSnapRow } from '../components/snapRow.js'
import { productCard, initProductCards } from '../components/productCard.js'
import { recipeCard, initRecipeCards } from '../components/recipeCard.js'
import { dealsCountdown, initDealsCountdown } from '../components/dealsCountdown.js'
import { getRecommendations, getBuyAgain, getDeals, getTrending } from '../services/productService.js'
import { recipes } from '../data/recipes.js'
import { aiPrompts, howItWorks, trustBadges } from '../data/offers.js'
import { openAIAssistant } from '../components/aiAssistant.js'
import { observeFadeUp } from '../utils/animations.js'
import { formatPrice } from '../utils/format.js'

export function homePage() {
  const recommended = getRecommendations(10)
  const buyAgain = getBuyAgain(6)
  const deals = getDeals(8)
  const trending = getTrending(8)

  return `
    <div class="max-w-7xl mx-auto px-3 md:px-6 py-4 space-y-8 pb-20 md:pb-8">
      ${heroCarousel()}

      <!-- AI Smart Bar -->
      <div class="card p-4 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-primary-200 dark:border-primary-800" data-fade-up>
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shrink-0">
            <i data-lucide="sparkles" class="w-5 h-5 text-white"></i>
          </div>
          <div>
            <h3 class="font-bold font-heading text-base">AI Smart Bar</h3>
            <p class="text-xs text-ink-500">Let AI plan your groceries</p>
          </div>
        </div>
        <div class="flex gap-2 flex-wrap">
          ${aiPrompts.map((p) => `
            <button class="chip bg-white dark:bg-ink-800 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition" data-ai-prompt="${p.prompt}">
              <i data-lucide="${p.icon}" class="w-3.5 h-3.5"></i>
              ${p.label}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Shop by Category -->
      <section data-fade-up>
        <h3 class="section-title mb-4">Shop by Category</h3>
        ${categoryGrid()}
      </section>

      <!-- Recommended for you -->
      <section data-fade-up>
        ${snapRow(
          recommended.map((p) => `<div class="w-40">${productCard(p, { compact: true })}</div>`).join(''),
          { title: 'Recommended for you' }
        )}
      </section>

      <!-- Buy it again -->
      <section data-fade-up>
        <div class="flex items-center justify-between mb-3">
          <h3 class="section-title">Buy it again</h3>
          <span class="text-xs text-ink-500">Predicted reorders</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          ${buyAgain.map((p) => `
            <div class="card p-3 relative">
              <div class="absolute top-2 right-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Runs out in ~${p.runsOutIn}d</div>
              ${productCard(p)}
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Deals of the day -->
      <section data-fade-up>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <h3 class="section-title">Deals of the day</h3>
            ${dealsCountdown()}
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          ${deals.map((p) => productCard(p)).join('')}
        </div>
      </section>

      <!-- Recipe cards -->
      <section data-fade-up>
        <div class="flex items-center justify-between mb-3">
          <h3 class="section-title">Cook with FreshMind</h3>
          <span class="text-xs text-ink-500">Add all ingredients at once</span>
        </div>
        ${snapRow(
          recipes.map((r) => recipeCard(r)).join(''),
          { showArrows: true }
        )}
      </section>

      <!-- Trending near you -->
      <section data-fade-up>
        ${snapRow(
          trending.map((p) => `<div class="w-40">${productCard(p, { compact: true })}</div>`).join(''),
          { title: 'Trending near you' }
        )}
      </section>

      <!-- How it works -->
      <section data-fade-up class="card p-6 bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-ink-800">
        <h3 class="section-title text-center mb-6">How FreshMind Works</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${howItWorks.map((step, i) => `
            <div class="flex flex-col items-center text-center gap-2">
              <div class="w-16 h-16 rounded-2xl bg-white dark:bg-ink-700 flex items-center justify-center text-3xl shadow-card">${step.emoji}</div>
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center">${step.step}</span>
                <h4 class="font-bold font-heading">${step.title}</h4>
              </div>
              <p class="text-sm text-ink-500 max-w-xs">${step.description}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- App download banner -->
      <section data-fade-up class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 p-6 md:p-8 text-white">
        <div class="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 blur-3xl"></div>
        <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 class="text-xl md:text-2xl font-extrabold font-heading">Get groceries in 10 minutes</h3>
            <p class="text-sm opacity-90 mt-1">Download the FreshMind app for the best experience</p>
          </div>
          <div class="flex gap-2">
            <button class="bg-white text-ink-900 font-semibold text-sm px-4 py-2.5 rounded-xl hover:scale-105 transition flex items-center gap-2">
              <i data-lucide="apple" class="w-5 h-5"></i>
              App Store
            </button>
            <button class="bg-white text-ink-900 font-semibold text-sm px-4 py-2.5 rounded-xl hover:scale-105 transition flex items-center gap-2">
              <i data-lucide="play" class="w-5 h-5"></i>
              Google Play
            </button>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="pt-8 border-t border-ink-100 dark:border-ink-700">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <h4 class="font-bold font-heading text-sm mb-3">Categories</h4>
            <ul class="space-y-1.5 text-xs text-ink-500">
              <li><a href="#/category/fruits-veg" class="hover:text-primary-600">Fruits & Veg</a></li>
              <li><a href="#/category/dairy" class="hover:text-primary-600">Dairy</a></li>
              <li><a href="#/category/snacks" class="hover:text-primary-600">Snacks</a></li>
              <li><a href="#/category/beverages" class="hover:text-primary-600">Beverages</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold font-heading text-sm mb-3">Company</h4>
            <ul class="space-y-1.5 text-xs text-ink-500">
              <li><a href="#/" class="hover:text-primary-600">About Us</a></li>
              <li><a href="#/" class="hover:text-primary-600">Careers</a></li>
              <li><a href="#/" class="hover:text-primary-600">Blog</a></li>
              <li><a href="#/" class="hover:text-primary-600">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold font-heading text-sm mb-3">Help</h4>
            <ul class="space-y-1.5 text-xs text-ink-500">
              <li><a href="#/" class="hover:text-primary-600">Contact</a></li>
              <li><a href="#/" class="hover:text-primary-600">FAQs</a></li>
              <li><a href="#/" class="hover:text-primary-600">Returns</a></li>
              <li><a href="#/" class="hover:text-primary-600">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold font-heading text-sm mb-3">Trust</h4>
            <div class="flex flex-wrap gap-2">
              ${trustBadges.map((t) => `
                <div class="flex items-center gap-1 text-xs text-ink-500 bg-ink-100 dark:bg-ink-800 px-2 py-1 rounded-lg">
                  <span>${t.emoji}</span>
                  <span>${t.text}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="text-center text-xs text-ink-400 pb-8">
          <p>FreshMind © 2026 — Groceries that think ahead</p>
        </div>
      </footer>
    </div>
  `
}

export function initHomePage() {
  initHeroCarousel()
  initSnapRow()
  initProductCards()
  initRecipeCards()
  initDealsCountdown()
  observeFadeUp()

  // AI prompt chips
  document.querySelectorAll('[data-ai-prompt]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openAIAssistant(btn.dataset.aiPrompt)
    })
  })
}
