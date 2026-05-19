import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BookingPanel({
  price,
  unit = 'per person',
  type = 'flight',
  itemId,
  onBook,
}) {
  const navigate = useNavigate()
  const isHotel = type === 'hotel'
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [travelers, setTravelers] = useState(1)

  const taxRate = 0.12
  const baseFare = price ?? 0
  const taxes = Math.round(baseFare * taxRate)
  const total = baseFare + taxes

  function handleBook() {
    if (onBook) onBook({ checkIn, checkOut, travelers })
    navigate(`/checkout/${itemId}`)
  }

  return (
    <div className="bg-white rounded-2xl border border-hairline shadow-card p-6">
      {/* Price */}
      <div className="flex items-baseline gap-1.5 mb-5">
        <span className="text-3xl font-extrabold text-ink">
          ${baseFare.toLocaleString()}
        </span>
        <span className="text-sm text-ash">/ {unit}</span>
      </div>

      {/* Date + travelers grid */}
      <div className="rounded-lg border border-hairline overflow-hidden mb-4">
        {/* Check-in */}
        <div className="grid grid-cols-2 divide-x divide-hairline">
          <div className="p-3">
            <p className="text-xs font-semibold text-ink uppercase tracking-wide mb-1">
              {isHotel ? 'Check-in' : 'Depart'}
            </p>
            <input
              type="date"
              value={checkIn}
              onChange={e => setCheckIn(e.target.value)}
              className="text-sm text-ink w-full outline-none bg-transparent"
            />
          </div>
          <div className="p-3">
            <p className="text-xs font-semibold text-ink uppercase tracking-wide mb-1">
              {isHotel ? 'Check-out' : 'Return'}
            </p>
            <input
              type="date"
              value={checkOut}
              onChange={e => setCheckOut(e.target.value)}
              className="text-sm text-ink w-full outline-none bg-transparent"
            />
          </div>
        </div>
        {/* Travelers */}
        <div className="border-t border-hairline p-3">
          <p className="text-xs font-semibold text-ink uppercase tracking-wide mb-1">Travelers</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTravelers(t => Math.max(1, t - 1))}
              className="w-7 h-7 rounded-full border border-hairline flex items-center justify-center text-ink hover:border-ash transition-colors text-base leading-none"
            >
              −
            </button>
            <span className="text-sm font-semibold text-ink w-6 text-center">{travelers}</span>
            <button
              onClick={() => setTravelers(t => t + 1)}
              className="w-7 h-7 rounded-full border border-hairline flex items-center justify-center text-ink hover:border-ash transition-colors text-base leading-none"
            >
              +
            </button>
            <span className="text-sm text-ash">{travelers === 1 ? 'traveler' : 'travelers'}</span>
          </div>
        </div>
      </div>

      {/* Book button */}
      <button
        onClick={handleBook}
        className="gradient-bg w-full text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
      >
        {type === 'hotel' ? 'Reserve' : 'Book Now'}
      </button>
      <p className="text-xs text-ash text-center mt-2">You won't be charged yet</p>

      {/* Price breakdown */}
      <div className="border-t border-hairline mt-4 pt-4 flex flex-col gap-2">
        <div className="flex justify-between text-sm text-ash">
          <span>Base fare</span>
          <span>${baseFare.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-ash">
          <span>Taxes &amp; fees</span>
          <span>${taxes.toLocaleString()}</span>
        </div>
        <div className="border-t border-hairline mt-2 pt-2 flex justify-between text-sm font-bold text-ink">
          <span>Total</span>
          <span>${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
