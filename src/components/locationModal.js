// Location modal - address selector
import { getState, dispatch } from '../store.js'
import { modal } from './modal.js'
import { toast } from './toast.js'

const savedAddresses = [
  { label: 'Home', line1: '12 MG Road, Indiranagar', city: 'Bengaluru', pincode: '560038', lat: 12.9716, lng: 77.5946 },
  { label: 'Work', line1: '5th Floor, Prestige Tower', city: 'Bengaluru', pincode: '560001', lat: 12.9756, lng: 77.5993 },
  { label: 'Mom\'s Place', line1: '45 Jayanagar 4th Block', city: 'Bengaluru', pincode: '560011', lat: 12.9250, lng: 77.5938 },
]

export function openLocationModal() {
  const state = getState()
  const content = `
    <div class="space-y-3">
      <div class="flex items-center gap-2 text-sm text-ink-500 mb-2">
        <i data-lucide="map-pin" class="w-4 h-4 text-primary-600"></i>
        <span>Saved addresses</span>
      </div>
      ${savedAddresses.map((addr, i) => `
        <button class="w-full text-left card p-3 hover:border-primary-400 transition ${state.address.label === addr.label ? 'border-primary-500 ring-1 ring-primary-300' : ''}" data-select-address="${i}">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
              <i data-lucide="${addr.label === 'Home' ? 'home' : addr.label === 'Work' ? 'briefcase' : 'map-pin'}" class="w-4 h-4 text-primary-600"></i>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-sm">${addr.label}</p>
              <p class="text-xs text-ink-500">${addr.line1}, ${addr.city} - ${addr.pincode}</p>
            </div>
            ${state.address.label === addr.label ? '<i data-lucide="check" class="w-4 h-4 text-primary-600"></i>' : ''}
          </div>
        </button>
      `).join('')}

      <div class="pt-2">
        <p class="text-sm font-semibold mb-2">Add new address</p>
        <div class="space-y-2">
          <input type="text" id="new-addr-label" placeholder="Label (Home, Work...)" class="w-full px-3 py-2 rounded-xl bg-ink-100 dark:bg-ink-800 border border-transparent focus:border-primary-500 outline-none text-sm" />
          <input type="text" id="new-addr-line" placeholder="Flat / House no, Street, Area" class="w-full px-3 py-2 rounded-xl bg-ink-100 dark:bg-ink-800 border border-transparent focus:border-primary-500 outline-none text-sm" />
          <div class="flex gap-2">
            <input type="text" id="new-addr-city" placeholder="City" class="flex-1 px-3 py-2 rounded-xl bg-ink-100 dark:bg-ink-800 border border-transparent focus:border-primary-500 outline-none text-sm" />
            <input type="text" id="new-addr-pin" placeholder="Pincode" class="w-28 px-3 py-2 rounded-xl bg-ink-100 dark:bg-ink-800 border border-transparent focus:border-primary-500 outline-none text-sm" />
          </div>
          <button class="btn-primary w-full text-sm" data-add-address>
            <i data-lucide="plus" class="w-4 h-4 inline mr-1"></i>
            Save Address
          </button>
        </div>
      </div>
    </div>
  `

  const m = modal({ title: 'Delivery Address', content })

  m.overlay.querySelectorAll('[data-select-address]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const addr = savedAddresses[parseInt(btn.dataset.selectAddress)]
      dispatch('SET_ADDRESS', addr)
      toast(`Delivering to ${addr.label}`)
      m.close()
    })
  })

  m.overlay.querySelector('[data-add-address]').addEventListener('click', () => {
    const label = m.overlay.querySelector('#new-addr-label').value.trim()
    const line1 = m.overlay.querySelector('#new-addr-line').value.trim()
    const city = m.overlay.querySelector('#new-addr-city').value.trim()
    const pincode = m.overlay.querySelector('#new-addr-pin').value.trim()
    if (!label || !line1 || !city || !pincode) {
      toast('Please fill all fields', 'error')
      return
    }
    dispatch('SET_ADDRESS', { label, line1, city, pincode, lat: 12.97, lng: 77.59 })
    toast(`Delivering to ${label}`)
    m.close()
  })
}
