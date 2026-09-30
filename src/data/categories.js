// 16 categories with pastel colors and emoji icons
export const categories = [
  { id: 'fruits-veg',    name: 'Fruits & Veg',     emoji: '🥬', color: '#dcfce7', icon: 'leaf' },
  { id: 'dairy',         name: 'Dairy',            emoji: '🥛', color: '#dbeafe', icon: 'milk' },
  { id: 'bakery',        name: 'Bakery',           emoji: '🍞', color: '#fef3c7', icon: 'bread' },
  { id: 'snacks',        name: 'Snacks',           emoji: '🍿', color: '#fce7f3', icon: 'cookie' },
  { id: 'beverages',     name: 'Beverages',        emoji: '🥤', color: '#cffafe', icon: 'cup-soda' },
  { id: 'staples',       name: 'Staples',          emoji: '🍚', color: '#fef9c3', icon: 'wheat' },
  { id: 'meat-fish',     name: 'Meat & Fish',      emoji: '🍗', color: '#fee2e2', icon: 'beef' },
  { id: 'frozen',        name: 'Frozen',           emoji: '🧊', color: '#e0f2fe', icon: 'snowflake' },
  { id: 'baby',          name: 'Baby',             emoji: '🍼', color: '#f3e8ff', icon: 'baby' },
  { id: 'pet',           name: 'Pet',              emoji: '🐾', color: '#fef3c7', icon: 'paw-print' },
  { id: 'personal-care', name: 'Personal Care',    emoji: '🧴', color: '#dbeafe', icon: 'shower-head' },
  { id: 'cleaning',      name: 'Cleaning',         emoji: '🧽', color: '#dcfce7', icon: 'spray-can' },
  { id: 'breakfast',     name: 'Breakfast',        emoji: '🥣', color: '#fef9c3', icon: 'cereal' },
  { id: 'sweets',        name: 'Sweets',           emoji: '🍫', color: '#fce7f3', icon: 'candy' },
  { id: 'organic',       name: 'Organic',          emoji: '🌱', color: '#dcfce7', icon: 'sprout' },
  { id: 'household',     name: 'Household',        emoji: '🏠', color: '#e2e8f0', icon: 'lamp' },
]

export const getCategory = (id) => categories.find(c => c.id === id)
