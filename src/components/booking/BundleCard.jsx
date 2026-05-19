import { useNavigate } from 'react-router-dom'
import { Plane, BedDouble } from 'lucide-react'

export default function BundleCard({ bundle, onSelect }) {
  const navigate = useNavigate()
  const { id, title, destination, nights, originalPrice, price, savings, img, flight, hotel } = bundle

  function handleClick() {
    if (onSelect) onSelect(bundle)
    navigate(`/bundles/${id}`)
  }

  return (
    <div className="bg-white border border-hairline rounded-xl overflow-hidden hover:shadow-card-hover transition-shadow group">
      {/* Image */}
      <div className="relative" style={{ height: 180 }}>
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Savings badge */}
        <span className="absolute top-3 left-3 bg-rausch text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
          Save {savings}%
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-ink text-base leading-snug mb-1">{title}</h3>

        {/* Destination + nights */}
        <p className="text-ash text-sm mb-3">
          {destination} · {nights} nights
        </p>

        {/* Flight + Hotel mini cards */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-cloud rounded-lg p-2.5 flex items-center gap-2">
            <Plane className="w-3.5 h-3.5 text-ash shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-ash uppercase tracking-wide leading-none mb-0.5">Flight</p>
              <p className="text-xs text-ink font-medium truncate">{flight?.airline}</p>
            </div>
          </div>
          <div className="bg-cloud rounded-lg p-2.5 flex items-center gap-2">
            <BedDouble className="w-3.5 h-3.5 text-ash shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-ash uppercase tracking-wide leading-none mb-0.5">Hotel</p>
              <p className="text-xs text-ink font-medium truncate">{hotel?.name}</p>
            </div>
          </div>
        </div>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-ash text-sm line-through">${originalPrice.toLocaleString()}</span>
          <span className="text-rausch text-xl font-extrabold">${price.toLocaleString()}</span>
        </div>

        {/* View Bundle button */}
        <button
          onClick={handleClick}
          className="gradient-bg text-white rounded-lg px-4 py-2 text-sm font-semibold w-full text-center hover:opacity-90 transition-opacity"
        >
          View Bundle
        </button>
      </div>
    </div>
  )
}
