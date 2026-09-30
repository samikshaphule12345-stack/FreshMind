// Category grid - 16 pastel tiles with hover lift
import { categories } from '../data/categories.js'

export function categoryGrid() {
  return `
    <div class="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
      ${categories.map((cat, i) => `
        <a href="#/category/${cat.id}" class="group flex flex-col items-center gap-2" data-fade-up style="animation-delay:${i * 40}ms">
          <div class="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl md:text-4xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-soft" style="background:${cat.color}">
            ${cat.emoji}
          </div>
          <span class="text-xs md:text-sm font-medium text-ink-700 dark:text-ink-200 text-center leading-tight">${cat.name}</span>
        </a>
      `).join('')}
    </div>
  `
}
