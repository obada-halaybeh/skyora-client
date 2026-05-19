import { useNavigate } from 'react-router-dom'
import { Calendar, CreditCard, Star } from 'lucide-react'
import StatusPill from '../ui/StatusPill'

function ActionButton({ variant = 'primary', onClick, children, className = '' }) {
  const base = 'text-sm font-semibold px-4 py-2 rounded-lg transition-colors'
  const variants = {
    primary: `gradient-bg text-white hover:opacity-90 ${base}`,
    secondary: `bg-cloud text-ink hover:bg-hairline ${base}`,
    ghost: `text-ash hover:text-red-600 ${base}`,
  }
  return (
    <button onClick={onClick} className={`${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

export default function TripCard({ trip, tab = 'upcoming', onReview }) {
  const navigate = useNavigate()
  const {
    id, status, type, destination, dates, dateShort,
    price, img, subtitle, countdown, refunded,
  } = trip

  return (
    <div className="bg-white border border-hairline rounded-2xl overflow-hidden hover:shadow-card-hover transition-shadow group flex flex-col md:flex-row">
      {/* Left image */}
      <div className="relative w-full md:w-60 shrink-0 overflow-hidden" style={{ minHeight: 200 }}>
        <img
          src={img}
          alt={destination}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 absolute inset-0"
        />

        {/* Upcoming countdown chip */}
        {tab === 'upcoming' && countdown && (
          <span className="absolute top-3 left-3 bg-white/95 text-ink text-xs font-bold px-3 py-1 rounded-full shadow-card">
            🛫 {countdown}
          </span>
        )}

        {/* Refunded chip */}
        {tab === 'cancelled' && refunded && (
          <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Refunded
          </span>
        )}
      </div>

      {/* Right content */}
      <div className="p-5 md:p-6 flex flex-col flex-1 min-w-0">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusPill status={status} />
            <span className="bg-cloud text-ash text-xs font-medium px-2.5 py-1 rounded-full">
              {type}
            </span>
          </div>
          <p className="text-lg font-extrabold text-ink hidden sm:block shrink-0">
            ${price.toLocaleString()}
          </p>
        </div>

        {/* Destination */}
        <h3 className="text-2xl font-extrabold text-ink leading-tight mb-1">{destination}</h3>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-ash text-sm mb-3">{subtitle}</p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-4 text-sm text-ash mb-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            {dates}
            {dateShort && <span className="text-xs text-ash/70 ml-1">· {dateShort}</span>}
          </span>
          <span className="flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 shrink-0" />
            <span>Ref</span>
            <span className="font-mono text-ink">{id}</span>
          </span>
        </div>

        {/* Actions row */}
        <div className="border-t border-hairline mt-auto pt-3 flex items-center gap-2 flex-wrap">
          {tab === 'upcoming' && (
            <>
              <ActionButton variant="primary" onClick={() => navigate(`/trips/${id}`)}>
                View Itinerary
              </ActionButton>
              <ActionButton variant="secondary" onClick={() => navigate(`/trips/${id}/manage`)}>
                Manage Booking
              </ActionButton>
              <ActionButton variant="ghost">
                Cancel
              </ActionButton>
            </>
          )}

          {tab === 'past' && (
            <>
              <ActionButton
                variant="primary"
                onClick={() => onReview && onReview(trip)}
                className="flex items-center gap-1.5"
              >
                <Star className="w-3.5 h-3.5" />
                Leave Review
              </ActionButton>
              <ActionButton variant="secondary" onClick={() => navigate(`/trips/${id}/receipt`)}>
                View Receipt
              </ActionButton>
              <ActionButton variant="secondary">
                Book Again
              </ActionButton>
            </>
          )}

          {tab === 'cancelled' && (
            <>
              <ActionButton variant="secondary" onClick={() => navigate(`/trips/${id}`)}>
                View Details
              </ActionButton>
              <ActionButton variant="secondary">
                Rebook Similar
              </ActionButton>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
