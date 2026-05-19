import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import BookingPanel from '../../components/booking/BookingPanel'
import { HOTELS } from '../../data/mockData'
import { useReviews } from '../../context/ReviewsContext'

const AMENITY_ICONS = {
  'Free Wi-Fi': '📶',
  'Infinity Pool': '🏊',
  'Pool': '🏊',
  'Spa': '💆',
  'Butler Service': '🛎',
  'Private Beach': '🏖',
  'Fine Dining': '🍽',
  'Michelin-star Restaurant': '⭐',
  'Concierge': '🔑',
  'Fitness Center': '🏋',
  'Room Service': '🛏',
  'Over-water Villa': '🌊',
  'Private Pool': '🏊',
  'Snorkeling': '🤿',
  'All-inclusive': '🎁',
  'Cinema': '🎬',
  'Water Slide': '🎢',
  'Yoga Studio': '🧘',
  'Organic Spa': '🌿',
  'Rice Terrace Views': '🌾',
  'COMO Shambhala': '✨',
  'Central Park View': '🌳',
  'Japanese Garden': '🍃',
  'Tea Ceremony': '🍵',
  'River Views': '🏞',
  'Gym': '💪',
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} className={`text-sm ${n <= rating ? 'text-amber-400' : 'text-hairline'}`}>★</span>
      ))}
    </div>
  )
}

export default function HotelDetail() {
  const { id } = useParams()
  const hotel = HOTELS.find(h => h.id === id) ?? HOTELS[0]
  const { getReviews } = useReviews()
  const reviews = getReviews('hotel', hotel.id)
  const [selectedRoom, setSelectedRoom] = useState(null)

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Image hero grid */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden" style={{ height: 480 }}>
          {/* Large left image */}
          <div className="overflow-hidden">
            <img
              src={hotel.imgs?.[0] ?? hotel.img}
              alt={hotel.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* 2×2 right grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-1">
            {(hotel.imgs?.slice(1, 5) ?? []).map((src, i) => (
              <div key={i} className="overflow-hidden">
                <img
                  src={src}
                  alt={`${hotel.name} ${i + 2}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-10 items-start">
          {/* Left column */}
          <div className="flex-1 min-w-0">
            {/* Title row */}
            <div className="flex items-start gap-3 mb-1">
              <h1 className="text-3xl font-extrabold text-ink flex-1">{hotel.name}</h1>
              <div className="flex items-center gap-1 shrink-0 mt-1">
                <span className="text-amber-500 font-bold">{'★'.repeat(hotel.stars)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1 text-ash text-sm">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{hotel.city}</span>
              </div>
              <span className="text-ash">·</span>
              <span className="text-sm text-amber-500 font-semibold">★ {hotel.rating}</span>
              <span className="text-ash text-sm">· {hotel.reviews.toLocaleString()} reviews</span>
            </div>

            {/* Guest Favourite lockup */}
            <div className="border border-hairline rounded-2xl py-6 px-8 mt-6 text-center">
              <p className="text-xs font-semibold tracking-widest text-ash uppercase mb-3">Guest Favourite</p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-rausch text-2xl">✦</span>
                <span className="text-5xl font-extrabold gradient-text">{hotel.rating}</span>
                <span className="text-rausch text-2xl">✦</span>
              </div>
              <p className="text-xs font-semibold tracking-widest text-ash uppercase mt-3">
                RATED TOP BY GUESTS
              </p>
            </div>

            {/* What this place offers */}
            <div className="mt-8">
              <h2 className="font-bold text-xl text-ink mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 gap-3">
                {hotel.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-3 py-2">
                    <span className="text-xl">{AMENITY_ICONS[amenity] ?? '✓'}</span>
                    <span className="text-sm text-ink">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Rooms */}
            <div className="mt-8">
              <h2 className="font-bold text-xl text-ink mb-4">Available Rooms</h2>
              <div className="flex flex-col gap-4">
                {hotel.rooms?.map(room => {
                  const isSelected = selectedRoom === room.id
                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(isSelected ? null : room.id)}
                      className={[
                        'flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-all',
                        isSelected
                          ? 'border-rausch bg-red-50/50 shadow-sm'
                          : 'border-hairline hover:border-ash hover:shadow-sm',
                      ].join(' ')}
                    >
                      <img
                        src={room.img}
                        alt={room.type}
                        className="w-[220px] h-[150px] object-cover rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-ink text-base">{room.type}</p>
                        <div className="flex items-center gap-2 text-ash text-sm mt-1">
                          <span>📐 {room.size}</span>
                          <span>·</span>
                          <span>👥 Up to {room.guests} guests</span>
                        </div>
                        <p className="text-2xl font-extrabold text-ink mt-3">
                          ${room.price.toLocaleString()}
                          <span className="text-sm font-normal text-ash">/night</span>
                        </p>
                      </div>
                      <button
                        className={[
                          'shrink-0 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all',
                          isSelected
                            ? 'gradient-bg text-white'
                            : 'gradient-bg text-white opacity-80 hover:opacity-100',
                        ].join(' ')}
                      >
                        {isSelected ? 'Selected' : 'Reserve'}
                      </button>
                    </div>
                  )
                })}
              </div>
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

          {/* Right: booking panel */}
          <div className="w-80 shrink-0 sticky top-24">
            <BookingPanel price={hotel.price} unit="per night" type="hotel" itemId={hotel.id} />
          </div>
        </div>
      </main>
    </div>
  )
}
