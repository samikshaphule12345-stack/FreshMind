// Product service - search, filter, sort, recommendations
import { products, getProduct, getByCategory } from '../data/products.js'
import { fuzzySearch } from '../utils/fuzzy.js'

export function search(query) {
  if (!query || !query.trim()) return []
  return fuzzySearch(products, query, ['name', 'brand', 'category', 'tags'])
}

export function getByCat(catId) {
  return getByCategory(catId)
}

export function getRecommendations(limit = 10) {
  // Mock AI recommendations - shuffle and pick
  const shuffled = [...products].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, limit)
}

export function getBuyAgain(limit = 6) {
  // Mock "buy it again" - pick random products with predicted run-out
  const picks = [...products]
    .filter((p) => ['dairy', 'fruits-veg', 'breakfast'].includes(p.category))
    .sort(() => Math.random() - 0.5)
    .slice(0, limit)
  return picks.map((p) => ({
    ...p,
    runsOutIn: Math.floor(Math.random() * 4) + 1,
  }))
}

export function getDeals(limit = 8) {
  return products
    .filter((p) => p.mrp > p.price)
    .sort((a, b) => {
      const da = (b.mrp - b.price) / b.mrp
      const db = (a.mrp - a.price) / a.mrp
      return da - db
    })
    .slice(0, limit)
}

export function getTrending(limit = 8) {
  return products
    .filter((p) => p.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

export function getById(id) {
  return getProduct(id)
}

export function sortBy(products, type) {
  const sorted = [...products]
  switch (type) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'discount':
      return sorted.sort((a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp)
    default:
      return sorted
  }
}
