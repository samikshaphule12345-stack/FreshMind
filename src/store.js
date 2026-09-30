// Pub/sub store with localStorage sync
// Actions: ADD_ITEM, REMOVE_ITEM, SET_QTY, APPLY_COUPON, SET_ADDRESS, TOGGLE_WISHLIST, TOGGLE_THEME, CLEAR_CART, PLACE_ORDER

const STORAGE_KEY = 'freshmind_state_v1'

const defaultState = {
  cart: [],          // [{ id, qty, weight }]
  coupon: null,      // coupon code or null
  address: {
    label: 'Home',
    line1: '12 MG Road, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    lat: 12.9716,
    lng: 77.5946,
  },
  wishlist: [],      // product IDs
  theme: 'light',
  orders: [],        // [{ id, items, total, status, placedAt, eta, address }]
  user: null,
}

let state = loadState()
const listeners = new Map() // key -> Set<callback>

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return { ...defaultState, ...parsed }
    }
  } catch (e) {
    console.warn('Failed to load state', e)
  }
  return { ...defaultState }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('Failed to persist state', e)
  }
}

export function getState() {
  return state
}

export function subscribe(key, callback) {
  if (!listeners.has(key)) listeners.set(key, new Set())
  listeners.get(key).add(callback)
  return () => listeners.get(key).delete(callback)
}

function notify(changedKeys) {
  changedKeys.forEach((key) => {
    const cbs = listeners.get(key)
    if (cbs) cbs.forEach((cb) => cb(state))
  })
}

export function dispatch(action, payload) {
  const changed = new Set()

  switch (action) {
    case 'ADD_ITEM': {
      const { id, qty = 1, weight } = payload
      const existing = state.cart.find((c) => c.id === id && c.weight === weight)
      if (existing) {
        existing.qty += qty
      } else {
        state.cart.push({ id, qty, weight: weight || null })
      }
      changed.add('cart')
      break
    }
    case 'REMOVE_ITEM': {
      const { id, weight } = payload
      state.cart = state.cart.filter((c) => !(c.id === id && c.weight === weight))
      changed.add('cart')
      break
    }
    case 'SET_QTY': {
      const { id, weight, qty } = payload
      const item = state.cart.find((c) => c.id === id && c.weight === weight)
      if (item) {
        item.qty = qty
        if (item.qty <= 0) {
          state.cart = state.cart.filter((c) => !(c.id === id && c.weight === weight))
        }
      }
      changed.add('cart')
      break
    }
    case 'CLEAR_CART': {
      state.cart = []
      state.coupon = null
      changed.add('cart')
      changed.add('coupon')
      break
    }
    case 'APPLY_COUPON': {
      state.coupon = payload
      changed.add('coupon')
      break
    }
    case 'SET_ADDRESS': {
      state.address = { ...state.address, ...payload }
      changed.add('address')
      break
    }
    case 'TOGGLE_WISHLIST': {
      const id = payload
      if (state.wishlist.includes(id)) {
        state.wishlist = state.wishlist.filter((w) => w !== id)
      } else {
        state.wishlist.push(id)
      }
      changed.add('wishlist')
      break
    }
    case 'TOGGLE_THEME': {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      changed.add('theme')
      break
    }
    case 'PLACE_ORDER': {
      const order = payload
      state.orders.unshift(order)
      state.cart = []
      state.coupon = null
      changed.add('orders')
      changed.add('cart')
      changed.add('coupon')
      break
    }
    case 'SET_USER': {
      state.user = payload
      changed.add('user')
      break
    }
    default:
      return
  }

  persist()
  notify(changed)
}

// Derived selectors
import { getProduct } from './data/products.js'

export function getCartCount() {
  return state.cart.reduce((sum, c) => sum + c.qty, 0)
}

export function getCartSubtotal() {
  return state.cart.reduce((sum, c) => {
    const p = getProduct(c.id)
    return sum + (p ? p.price * c.qty : 0)
  }, 0)
}

export function getCartItems() {
  return state.cart
    .map((c) => {
      const p = getProduct(c.id)
      return p ? { ...p, qty: c.qty, weight: c.weight } : null
    })
    .filter(Boolean)
}
