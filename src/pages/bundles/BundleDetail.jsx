import { useParams } from 'react-router-dom'
import { Plane, BedDouble } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import BookingPanel from '../../components/booking/BookingPanel'
import { BUNDLES } from '../../data/mockData'
import { useReviews } from '../../context/ReviewsContext'

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} className={`text-sm ${n <= rating ? 'text-amber-400' : 'text-hairline'}`}>★</span>
      ))}
    </div>
  )
}

const TIMELINE_DOT = {
  flight: 'bg-rausch border-rausch',
  hotel: 'bg-blue-500 border-blue-500',
  activity: 'bg-emerald-500 border-emerald-500',
}

const TIMELINE_ICON = {
  flight: '✈',
  hotel: '🏨',
  activity: '✨',
}

export default function BundleDetail() {
  const { id } = useParams()
  const bundle = BUNDLES.find(b => b.id === id) ?? BUNDLES[0]
  const { getReviews } = useReviews()
  const reviews = getReviews('bundle', bundle.id)

  const flightPrice = 1240
  const hotelPrice = 980
  const taxesPrice = 402
  const savings = bundle.originalPrice - bundle.price

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={bundle.img}
          alt={bundle.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Tags */}
        <div className="absolute top-6 left-6 flex gap-2">
          {bundle.tags?.map(tag => (
            <span key={tag} className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
              {tag}
            </span>
          ))}
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-8 left-8">
          <p className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-2">
            {bundle.destination} &nbsp;·&nbsp; {bundle.nights} nights &nbsp;·&nbsp; {bundle.travelers} travelers
          </p>
          <h1 className="text-4xl font-extrabold text-white leading-tight">{bundle.title}</h1>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex gap-10 items-start">
          {/* Left */}
          <div className="flex-1 min-w-0">
            {/* Eyebrow + title */}
            <p className="text-xs font-semibold uppercase tracking-widest text-ash mb-2">
              {bundle.destination.toUpperCase()} &nbsp;·&nbsp; {bundle.nights} NIGHTS &nbsp;·&nbsp; {bundle.travelers} TRAVELERS
            </p>
            <h2 className="text-3xl font-extrabold text-ink mb-4">{bundle.title}</h2>

            {/* Badge row */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="bg-rausch text-white text-xs font-bold px-3 py-1.5 rounded-full">
                Save {bundle.savings}%
              </span>
              <span className="bg-cloud border border-hairline text-ink text-xs font-semibold px-3 py-1.5 rounded-full">
                Flight + Hotel
              </span>
              {bundle.cancellation?.includes('Free') && (
                <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  Flexible Cancellation
                </span>
              )}
            </div>

            {/* Flight + Hotel cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Flight card */}
              <div className="border border-hairline rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {bundle.flight?.airline?.[0] ?? '✈'}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-ash uppercase tracking-wide">Flight</p>
                    <p className="text-sm font-bold text-ink">{bundle.flight?.airline}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-lg font-extrabold text-ink">{bundle.flight?.depart}</p>
                    <p className="text-xs text-ash">{bundle.flight?.from}</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <Plane className="w-4 h-4 text-ash" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-extrabold text-ink">{bundle.flight?.arrive}</p>
                    <p className="text-xs text-ash">{bundle.flight?.to}</p>
                  </div>
                </div>
                <p className="text-xs text-ash mt-2 text-center">{bundle.flight?.flightNo}</p>
              </div>

              {/* Hotel card */}
              <div className="border border-hairline rounded-xl overflow-hidden">
                <div className="h-20 overflow-hidden">
                  <img
                    src={bundle.hotel?.img}
                    alt={bundle.hotel?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-ash uppercase tracking-wide mb-1">Hotel</p>
                  <p className="text-sm font-bold text-ink leading-tight">{bundle.hotel?.name}</p>
                  <p className="text-xs text-amber-500 mt-1">{'★'.repeat(bundle.hotel?.stars ?? 0)}</p>
                </div>
              </div>
            </div>

            {/* Itinerary timeline */}
            {bundle.itinerary?.length > 0 && (
              <div className="mt-8">
                <h2 className="font-bold text-xl text-ink mb-6">Itinerary</h2>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-3 top-0 bottom-0 w-px bg-hairline" />
                  <div className="flex flex-col gap-6">
                    {bundle.itinerary.map((item, i) => (
                      <div key={i} className="flex gap-5 items-start">
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-white text-xs shrink-0 z-10 ${TIMELINE_DOT[item.type] ?? 'bg-ash border-ash'}`}>
                          {TIMELINE_ICON[item.type]}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-ash uppercase tracking-wide mb-0.5">Day {item.day}</p>
                          <p className="font-semibold text-ink">{item.title}</p>
                          <p className="text-sm text-ash mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Package Breakdown */}
            <div className="mt-8 bg-cloud rounded-2xl p-6">
              <h2 className="font-bold text-xl text-ink mb-5">Package Breakdown</h2>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm text-ink">
                  <span>Flight</span>
                  <span>${flightPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-ink">
                  <span>Hotel ({bundle.nights} nights)</span>
                  <span>${hotelPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-ink">
                  <span>Taxes &amp; fees</span>
                  <span>${taxesPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-emerald-600 font-semibold">
                  <span>You save</span>
                  <span>-${savings.toLocaleString()}</span>
                </div>
                <div className="border-t border-hairline pt-3 mt-1 flex justify-between items-center">
                  <span className="font-bold text-ink">Total</span>
                  <span className="text-xl font-extrabold text-ink">${bundle.price.toLocaleString()}</span>
                </div>
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

          {/* Right: Booking panel */}
          <div className="w-80 shrink-0 sticky top-24">
            <div className="bg-white rounded-2xl border border-hairline shadow-card p-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-ash text-sm line-through">${bundle.originalPrice.toLocaleString()}</span>
                <span className="bg-rausch text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {bundle.savings}% off
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 mb-5">
                <span className="text-3xl font-extrabold text-ink">${bundle.price.toLocaleString()}</span>
                <span className="text-sm text-ash">/ package</span>
              </div>
              <p className="text-xs text-emerald-600 font-semibold mb-5">
                You save ${savings.toLocaleString()} vs booking separately
              </p>
            </div>
            <div className="mt-3">
              <BookingPanel price={bundle.price} unit="total" type="bundle" itemId={bundle.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
