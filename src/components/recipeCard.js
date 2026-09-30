// Recipe card component with "Add all ingredients"
import { getRecipe } from '../data/recipes.js'
import { getProduct } from '../data/products.js'
import { dispatch } from '../store.js'
import { formatPrice } from '../utils/format.js'
import { toast } from './toast.js'
import { confettiBurst } from '../utils/animations.js'

export function recipeCard(recipe) {
  const ingredients = recipe.ingredients.map((id) => getProduct(id)).filter(Boolean)
  const total = ingredients.reduce((s, p) => s + p.price, 0)

  return `
    <div class="card overflow-hidden w-72 shrink-0" data-recipe="${recipe.id}">
      <div class="relative h-32 overflow-hidden">
        <img src="${recipe.image}" alt="${recipe.name}" class="w-full h-full object-cover" onerror="this.style.display='none';this.parentElement.innerHTML='<div class=\\'w-full h-full flex items-center justify-center text-5xl\\'>${recipe.emoji}</div>'">
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div class="absolute bottom-2 left-3 text-white">
          <h4 class="font-bold font-heading">${recipe.name}</h4>
          <p class="text-xs opacity-90">⏱ ${recipe.time} • ${recipe.serves} servings</p>
        </div>
      </div>
      <div class="p-3">
        <p class="text-xs text-ink-500 mb-2">${recipe.description}</p>
        <div class="flex items-center gap-1 mb-3 flex-wrap">
          ${ingredients.slice(0, 4).map((p) => `<span class="text-xs bg-ink-100 dark:bg-ink-700 px-2 py-0.5 rounded-full">${p.emoji || '📦'} ${p.name.split(' ')[0]}</span>`).join('')}
          ${ingredients.length > 4 ? `<span class="text-xs text-ink-500">+${ingredients.length - 4} more</span>` : ''}
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm font-bold tabular-nums">${formatPrice(total)}</span>
          <button class="btn-primary text-xs py-1.5 px-3" data-recipe-add="${recipe.id}">
            <i data-lucide="plus" class="w-3 h-3 inline mr-1"></i>
            Add all
          </button>
        </div>
      </div>
    </div>
  `
}

export function initRecipeCards(scope = document) {
  scope.querySelectorAll('[data-recipe-add]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const recipe = getRecipe(btn.dataset.recipeAdd)
      if (!recipe) return
      recipe.ingredients.forEach((id) => {
        const p = getProduct(id)
        if (p) dispatch('ADD_ITEM', { id, qty: 1, weight: p.weight?.[0] })
      })
      toast(`${recipe.name} ingredients added!`)
      const rect = btn.getBoundingClientRect()
      confettiBurst(rect.left + rect.width / 2, rect.top)
    })
  })
}
