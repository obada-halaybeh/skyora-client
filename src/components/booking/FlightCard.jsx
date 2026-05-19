import { useNavigate } from 'react-router-dom'

function StopsBadge({ stops }) {
  const isNonStop = stops === 'Non-stop'
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
        isNonStop
          ? 'bg-emerald-50 text-emerald-700'
          : 'bg-amber-50 text-amber-700'
      }`}
    >
      {stops}
    </span>
  )
}

export default function FlightCard({ flight, onSelect }) {
  const navigate = useNavigate()
  const {
    id, airline, airlineLogo,
    from, to, depart, arrive,
    duration, stops, price, seats,
  } = flight

  function handleSelect() {
    if (onSelect) onSelect(flight)
    navigate(`/flights/${id}`)
  }

  return (
    <div className="bg-white border border-hairline rounded-xl p-5 hover:shadow-card-hover transition-shadow flex items-center gap-6">
      {/* Airline logo */}
      <div className="shrink-0">
        {airlineLogo ? (
          <img
            src={airlineLogo}
            alt={airline}
            className="w-10 h-10 rounded-lg object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-white font-bold text-base">
            {airline[0]}
          </div>
        )}
      </div>

      {/* Departure */}
      <div className="shrink-0 text-center">
        <p className="font-bold text-ink text-lg leading-tight">{depart}</p>
        <p className="text-xs text-ash mt-0.5">{from}</p>
      </div>

      {/* Flight path */}
      <div className="flex-1 flex flex-col items-center gap-1 min-w-0">
        <p className="text-xs text-ash">{duration}</p>
        <div className="w-full flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full border-2 border-hairline shrink-0" />
          <div className="flex-1 h-px bg-hairline" />
          <div className="w-2 h-2 rounded-full gradient-bg shrink-0" />
        </div>
        <StopsBadge stops={stops} />
      </div>

      {/* Arrival */}
      <div className="shrink-0 text-center">
        <p className="font-bold text-ink text-lg leading-tight">{arrive}</p>
        <p className="text-xs text-ash mt-0.5">{to}</p>
      </div>

      {/* Price + select */}
      <div className="shrink-0 flex flex-col items-end gap-2 ml-auto">
        <p className="text-2xl font-extrabold text-ink">${price.toLocaleString()}</p>
        {seats <= 10 && (
          <p className="text-xs text-rausch font-medium">Only {seats} seats left</p>
        )}
        <button
          onClick={handleSelect}
          className="gradient-bg text-white rounded-lg px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Select
        </button>
      </div>
    </div>
  )
}
