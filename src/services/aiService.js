// AI service - mock AI assistant that generates responses and product suggestions
import { products } from '../data/products.js'
import { recipes } from '../data/recipes.js'

// Keyword-based intent matching
const intents = [
  {
    keywords: ['dinner', 'lunch', 'meal', 'cook', 'recipe'],
    handler: (q) => {
      const mealProducts = products
        .filter((p) => ['staples', 'fruits-veg', 'dairy', 'meat-fish'].includes(p.category))
        .slice(0, 6)
      return {
        text: `Here's a great dinner plan! I found ${mealProducts.length} essentials for a wholesome meal. Want me to add them all to your cart?`,
        products: mealProducts,
        recipe: recipes[0],
      }
    },
  },
  {
    keywords: ['protein', 'gym', 'workout', 'muscle', 'fitness'],
    handler: () => {
      const proteinProducts = products.filter((p) => p.tags.includes('high-protein')).slice(0, 6)
      return {
        text: `Power up! These high-protein picks are perfect for your fitness goals. Each has 15g+ protein per serving.`,
        products: proteinProducts,
      }
    },
  },
  {
    keywords: ['party', 'snack', 'guest', 'friends', 'celebration'],
    handler: () => {
      const partyProducts = products
        .filter((p) => ['snacks', 'beverages', 'sweets'].includes(p.category))
        .slice(0, 8)
      return {
        text: `Party time! I've curated snacks, drinks, and sweets for 6 people. This should be plenty!`,
        products: partyProducts,
      }
    },
  },
  {
    keywords: ['under', 'budget', 'cheap', 'affordable', 'save'],
    handler: () => {
      const budgetProducts = products.filter((p) => p.price < 100).slice(0, 6)
      return {
        text: `Budget-friendly picks! All under ₹100. Your total would be around ₹${budgetProducts.reduce((s, p) => s + p.price, 0)}.`,
        products: budgetProducts,
      }
    },
  },
  {
    keywords: ['healthy', 'salad', 'diet', 'weight', 'nutrition'],
    handler: () => {
      const healthyProducts = products
        .filter((p) => p.tags.includes('vegan') || p.tags.includes('high-protein') || p.tags.includes('gluten-free'))
        .slice(0, 6)
      return {
        text: `Great choice for healthy eating! These nutrient-dense options will keep you energized.`,
        products: healthyProducts,
      }
    },
  },
  {
    keywords: ['breakfast', 'morning', 'oats', 'cereal'],
    handler: () => {
      const breakfastProducts = products.filter((p) => p.category === 'breakfast').slice(0, 6)
      return {
        text: `Start your day right! These breakfast essentials are quick to prepare and packed with energy.`,
        products: breakfastProducts,
      }
    },
  },
  {
    keywords: ['week', 'plan', 'weekly', 'meal prep'],
    handler: () => {
      const weekProducts = products
        .filter((p) => ['staples', 'dairy', 'fruits-veg', 'breakfast'].includes(p.category))
        .slice(0, 8)
      return {
        text: `Here's your healthy week plan! I've included staples, fresh produce, and breakfast items to cover all 7 days.`,
        products: weekProducts,
      }
    },
  },
  {
    keywords: ['vegan', 'plant', 'vegetable'],
    handler: () => {
      const veganProducts = products.filter((p) => p.tags.includes('vegan')).slice(0, 6)
      return {
        text: `Plant-based picks! These vegan options are delicious and sustainable.`,
        products: veganProducts,
      }
    },
  },
  {
    keywords: ['keto', 'low carb', 'diabetic', 'sugar'],
    handler: () => {
      const ketoProducts = products.filter((p) => p.tags.includes('keto') || p.tags.includes('diabetic-friendly')).slice(0, 6)
      return {
        text: `Low-carb friendly! These keto and diabetic-friendly options keep sugar in check.`,
        products: ketoProducts,
      }
    },
  },
]

export function getAIResponse(query) {
  const q = query.toLowerCase()
  const match = intents.find((i) => i.keywords.some((k) => q.includes(k)))
  if (match) {
    return match.handler(q)
  }
  // Fallback: general search
  const fallback = products.slice(0, 6)
  return {
    text: `I found some great options for you! Here are my top picks based on your request. Would you like me to add any of these to your cart?`,
    products: fallback,
  }
}

export function getSmartSuggestions() {
  return [
    'Plan a quick dinner for 2',
    'High protein snacks under ₹200',
    'Ingredients for paneer butter masala',
    'Healthy breakfast options',
    'Party snacks for 6 people',
  ]
}
