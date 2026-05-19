import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import BookingPanel from '../../components/booking/BookingPanel'
import { FLIGHTS } from '../../data/mockData'
import { useReviews } from '../../context/ReviewsContext'

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F']
const COLS = [1, 2, 3, 4, 5, 6]
const TAKEN_SEATS = new Set(['A1', 'B2', 'C4', 'D3', 'E1', 'F5', 'A4', 'B5', 'C2', 'D6', 'E3', 'F1'])

const BAGGAGE_INFO = [
  { icon: '🎒', label: 'Hand Carry', key: 'hand' },
  { icon: '🧳', label: 'Checked',    key: 'checked' },
  { icon: '👜', label: 'Personal Item', key: 'personal' },
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} className={`text-sm ${n <= rating ? 'text-amber-400' : 'text-hairline'}`}>★</span>
      ))}
    </div>
  )
}

export default function FlightDetail() {
  const { id } = useParams()
  const flight = FLIGHTS.find(f => f.id === id) ?? FLIGHTS[0]
  const { getReviews } = useReviews()
  const reviews = getReviews('flight', flight.id)
  const [selectedSeat, setSelectedSeat] = useState(null)

  function toggleSeat(seat) {
    if (TAKEN_SEATS.has(seat)) return
    setSelectedSeat(prev => prev === seat ? null : seat)
  }

  function getSeatType(col) {
    if (col === 1 || col === 6) return 'Window'
    if (col === 2 || col === 5) return 'Middle'
    return 'Aisle'
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex gap-10 items-start">
          {/* Left column */}
          <div className="flex-1 min-w-0">
            {/* Eyebrow */}
            <p className="text-ash text-sm mb-4">
              {flight.airline} &nbsp;·&nbsp; {flight.class} &nbsp;·&nbsp; {flight.flightNo}
            </p>

            {/* Giant time display */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-5xl font-extrabold text-ink leading-none">{flight.depart}</p>
                <p className="text-ash text-sm mt-1">{flight.fromCity} &nbsp;·&nbsp; {flight.from}</p>
              </div>

              <div className="flex-1 flex flex-col items-center gap-2 min-w-0">
                <p className="text-sm text-ash text-center">{flight.duration} &nbsp;·&nbsp; {flight.stops}</p>
                <div className="w-full flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full border-2 border-ash shrink-0" />
                  <div className="flex-1 h-px bg-hairline relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-px bg-ash" />
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-rausch shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                  </svg>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {flight.stops === 'Non-stop' ? 'DIRECT FLIGHT' : flight.stops.toUpperCase()}
                </span>
              </div>

              <div className="text-right">
                <p className="text-5xl font-extrabold text-ink leading-none">{flight.arrive}</p>
                <p className="text-ash text-sm mt-1">{flight.toCity} &nbsp;·&nbsp; {flight.to}</p>
              </div>
            </div>

            {/* Badge row */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-cloud border border-hairline rounded-full px-3 py-1 text-xs font-semibold text-ink">
                May 15, 2026
              </span>
              <span className="bg-cloud border border-hairline rounded-full px-3 py-1 text-xs font-semibold text-ink">
                {flight.aircraft}
              </span>
              {flight.refundable && (
                <span className="bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 text-xs font-semibold text-emerald-700">
                  Free Cancellation
                </span>
              )}
            </div>

            {/* Baggage Policy */}
            <div className="mt-8 rounded-xl border border-hairline p-5">
              <h2 className="font-bold text-ink mb-4">Baggage Policy</h2>
              <div className="grid grid-cols-3 gap-3">
                {BAGGAGE_INFO.map(b => (
                  <div key={b.key} className="bg-cloud rounded-xl p-4 flex flex-col items-center gap-2 text-center">
                    <span className="text-2xl">{b.icon}</span>
                    <p className="text-xs font-semibold text-ash uppercase tracking-wide">{b.label}</p>
                    <p className="text-lg font-extrabold text-ink">{flight.baggage[b.key]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Seat selection */}
            <div className="mt-8">
              <h2 className="font-bold text-ink text-lg mb-4">Select Your Seat</h2>

              {/* Legend */}
              <div className="flex gap-4 mb-5">
                {[
                  { color: 'bg-emerald-100 border-emerald-200', label: 'Available' },
                  { color: 'bg-hairline border-hairline',        label: 'Taken' },
                  { color: 'bg-rausch border-rausch',            label: 'Selected' },
                ].map(l => (
                  <div key={l.label} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${l.color} border`} />
                    <span className="text-xs text-ash">{l.label}</span>
                  </div>
                ))}
              </div>

              {/* Seat grid */}
              <div className="bg-cloud rounded-xl p-5 inline-block">
                {/* Column headers */}
                <div className="flex gap-2 mb-2 pl-8">
                  {COLS.map(col => (
                    <div key={col} className={`w-9 text-center text-xs text-ash font-semibold ${col === 4 ? 'ml-4' : ''}`}>
                      {col}
                    </div>
                  ))}
                </div>
                {ROWS.map(row => (
                  <div key={row} className="flex items-center gap-2 mb-2">
                    <div className="w-6 text-xs text-ash font-semibold text-right shrink-0">{row}</div>
                    {COLS.map(col => {
                      const seatId = `${row}${col}`
                      const taken = TAKEN_SEATS.has(seatId)
                      const selected = selectedSeat === seatId
                      return (
                        <button
                          key={col}
                          onClick={() => toggleSeat(seatId)}
                          disabled={taken}
                          className={[
                            'w-9 h-9 rounded-md border text-xs font-semibold transition-all',
                            col === 4 ? 'ml-4' : '',
                            taken
                              ? 'bg-hairline border-hairline text-ash cursor-not-allowed'
                              : selected
                                ? 'bg-rausch border-rausch text-white shadow-sm'
                                : 'bg-emerald-100 border-emerald-200 text-emerald-700 hover:bg-emerald-200 cursor-pointer',
                          ].join(' ')}
                        >
                          {seatId}
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>

              {/* Selected seat status */}
              {selectedSeat && (
                <p className="mt-3 text-sm font-semibold text-ink">
                  Selected: Seat {selectedSeat} — {flight.class}{' '}
                  {getSeatType(parseInt(selectedSeat.slice(1)))}
                </p>
              )}
            </div>

            {/* Reviews */}
            <div className="mt-10">
              <h2 className="font-bold text-xl text-ink mb-5">Guest Reviews</h2>
              {reviews.length === 0 ? (
                <div className="border border-hairline rounded-xl p-8 text-center text-ash">
                  No reviews yet
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {reviews.map(review => (
                    <div key={review.id} className="bg-white border border-hairline rounded-xl p-4">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold shrink-0">
                          {review.author[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-ink text-sm">{review.author}</p>
                            <p className="text-xs text-ash">{review.date}</p>
                          </div>
                          <StarRating rating={review.rating} />
                        </div>
                      </div>
                      <p className="text-sm text-ash leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Booking panel */}
          <div className="w-80 shrink-0 sticky top-24">
            <BookingPanel price={flight.price} unit="per person" type="flight" itemId={flight.id} />
          </div>
        </div>
      </main>
    </div>
  )
}
