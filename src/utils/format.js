// Format prices in Indian Rupees
export const formatPrice = (n) => `₹${Math.round(n)}`

// Format with decimals
export const formatPriceDecimal = (n) => `₹${Number(n).toFixed(2)}`

// Calculate discount percentage
export const discountPercent = (price, mrp) => {
  if (!mrp || mrp <= price) return 0
  return Math.round(((mrp - price) / mrp) * 100)
}

// Format rating
export const formatRating = (r) => r.toFixed(1)

// Format order date
export const formatDate = (d) => {
  const date = new Date(d)
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Format time ago
export const timeAgo = (d) => {
  const diff = Date.now() - new Date(d).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

// Generate order ID
export const genOrderId = () => `FM${Date.now().toString().slice(-8)}`
