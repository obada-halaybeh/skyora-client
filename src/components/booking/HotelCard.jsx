import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'

export default function HotelCard({ hotel, onSelect }) {
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const { id, name, city, stars, rating, reviews, price, img, amenities = [] } = hotel

  function handleClick() {
    if (onSelect) onSelect(hotel)
    navigate(`/hotels/${id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-hairline rounded-xl overflow-hidden hover:shadow-card-hover transition-shadow cursor-pointer group"
    >
      {/* Image */}
      <div className="relative" style={{ height: 200 }}>
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Heart button */}
        <button
          onClick={e => { e.stopPropagation(); setLiked(l => !l) }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-card hover:scale-110 transition-transform"
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <span className={`text-base leading-none ${liked ? 'text-rausch' : 'text-ash'}`}>
            {liked ? '♥' : '♡'}
          </span>
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Name + stars */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-ink text-sm leading-snug line-clamp-1">{name}</h3>
          <span className="text-xs shrink-0 mt-0.5">{'⭐'.repeat(stars)}</span>
        </div>

        {/* City */}
        <div className="flex items-center gap-1 text-ash text-xs mb-2">
          <MapPin className="w-3 h-3 shrink-0" />
          <span>{city}</span>
        </div>

        {/* Rating */}
        <p className="text-sm text-ash mb-3">
          <span className="text-amber-500 font-semibold">★ {rating}</span>
          <span className="mx-1">·</span>
          <span>{reviews.toLocaleString()} reviews</span>
        </p>

        {/* Amenity chips */}
        <div className="flex flex-wrap gap-1 mb-3">
          {amenities.slice(0, 3).map(a => (
            <span key={a} className="bg-cloud text-ash text-xs px-2 py-0.5 rounded-full">
              {a}
            </span>
          ))}
        </div>

        {/* Price */}
        <p className="text-xl font-extrabold text-ink">
          ${price.toLocaleString()}
          <span className="text-sm font-normal text-ash ml-1">/night</span>
        </p>
      </div>
    </div>
  )
}
