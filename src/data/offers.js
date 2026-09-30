// Coupon offers and promo codes
export const coupons = [
  {
    code: 'FRESH50',
    description: 'Rs 50 off on orders above Rs 399',
    type: 'flat',
    value: 50,
    minOrder: 399,
    color: '#16a34a',
  },
  {
    code: 'NEW20',
    description: '20% off (max Rs 100)',
    type: 'percent',
    value: 20,
    maxDiscount: 100,
    minOrder: 0,
    color: '#facc15',
  },
]

export const getCoupon = (code) => coupons.find(c => c.code === code)

// Hero carousel banners
export const banners = [
  {
    id: 'b1',
    title: 'Fresh in 10 mins',
    subtitle: 'Groceries delivered lightning fast',
    gradient: 'from-primary-500 to-primary-700',
    emoji: '🚀',
    bg: 'linear-gradient(135deg, #16a34a, #22c55e)',
  },
  {
    id: 'b2',
    title: 'Flat 30% off Fruits',
    subtitle: 'Fresh fruits at unbeatable prices',
    gradient: 'from-accent-400 to-accent-500',
    emoji: '🍎',
    bg: 'linear-gradient(135deg, #facc15, #f59e0b)',
  },
  {
    id: 'b3',
    title: 'Free delivery above Rs 199',
    subtitle: 'No hidden charges, just fresh food',
    gradient: 'from-primary-400 to-primary-600',
    emoji: '🚚',
    bg: 'linear-gradient(135deg, #4ade80, #16a34a)',
  },
]

// AI prompt chips
export const aiPrompts = [
  { label: 'Plan dinner', icon: 'utensils', prompt: 'Plan a quick dinner for 2 people with Indian flavors' },
  { label: 'High protein', icon: 'dumbbell', prompt: 'Suggest high protein foods for my workout diet' },
  { label: 'Party for 6', icon: 'party-popper', prompt: 'I am hosting a party for 6 people, suggest snacks and drinks' },
  { label: 'Under Rs 500', icon: 'wallet', prompt: 'Show me meals I can make under Rs 500 total' },
  { label: 'Healthy week', icon: 'salad', prompt: 'Plan a healthy meal plan for the whole week' },
]

// How it works steps
export const howItWorks = [
  { step: 1, title: 'Browse & Add', description: 'Pick from 5000+ products or let AI suggest', emoji: '🛒' },
  { step: 2, title: 'Quick Checkout', description: 'Pay securely and track your order live', emoji: '⚡' },
  { step: 3, title: 'Delivered in 10', description: 'Fresh groceries at your door in minutes', emoji: '🚀' },
]

// Trust badges
export const trustBadges = [
  { emoji: '⚡', text: '10 min delivery' },
  { emoji: '🌱', text: '100% fresh' },
  { emoji: '🔒', text: 'Secure payment' },
  { emoji: '↩️', text: 'Easy returns' },
]
