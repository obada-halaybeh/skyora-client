import { useParams } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import BookingPanel from '../../components/booking/BookingPanel'
import { HOTELS } from '../../data/mockData'

export default function HotelDetail() {
  const { id } = useParams()
  const hotel = HOTELS.find(h => h.id === id) ?? HOTELS[0]

  return (
    <div className="min-h-screen flex flex-col bg-cloud">
      <Navbar />
      {/* Hero image grid */}
      <div className="grid grid-cols-4 gap-2 h-72 overflow-hidden px-4 sm:px-6 pt-4 max-w-7xl mx-auto w-full">
        <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden">
          <img src={hotel.imgs?.[0] ?? hotel.img} alt={hotel.name} className="w-full h-full object-cover" />
        </div>
        {hotel.imgs?.slice(1, 5).map((src, i) => (
          <div key={i} className="relative rounded-xl overflow-hidden">
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex gap-8 items-start">
          <div className="flex-1 min-w-0 space-y-6">
            <div className="bg-white rounded-xl border border-hairline p-6">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-2xl font-extrabold text-ink">{hotel.name}</h1>
                <span>{'⭐'.repeat(hotel.stars)}</span>
              </div>
              <div className="flex items-center gap-1 text-ash text-sm mb-3">
                <MapPin className="w-4 h-4" />
                <span>{hotel.city}</span>
              </div>
              <p className="text-ash text-sm mb-4">{hotel.desc}</p>
              <div className="flex items-center gap-2 text-sm text-ash">
                <span className="text-amber-500 font-semibold">★ {hotel.rating}</span>
                <span>·</span>
                <span>{hotel.reviews.toLocaleString()} reviews</span>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-hairline p-6">
              <h2 className="text-lg font-bold text-ink mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map(a => (
                  <span key={a} className="bg-cloud text-ash text-sm px-3 py-1.5 rounded-full border border-hairline">
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-hairline p-6">
              <h2 className="text-lg font-bold text-ink mb-4">Room Options</h2>
              <div className="flex flex-col gap-4">
                {hotel.rooms?.map(room => (
                  <div key={room.id} className="flex items-center gap-4 border border-hairline rounded-lg p-4">
                    <img src={room.img} alt={room.type} className="w-20 h-14 object-cover rounded-lg shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-ink">{room.type}</p>
                      <p className="text-sm text-ash">{room.size} · Up to {room.guests} guests</p>
                    </div>
                    <p className="text-lg font-extrabold text-ink shrink-0">${room.price.toLocaleString()}<span className="text-sm font-normal text-ash">/night</span></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[360px] shrink-0 sticky top-24">
            <BookingPanel price={hotel.price} unit="per night" type="hotel" itemId={hotel.id} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
