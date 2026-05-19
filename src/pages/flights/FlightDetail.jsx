import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import BookingPanel from '../../components/booking/BookingPanel'
import { FLIGHTS } from '../../data/mockData'

export default function FlightDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const flight = FLIGHTS.find(f => f.id === id) ?? FLIGHTS[0]

  return (
    <div className="min-h-screen flex flex-col bg-cloud">
      <Navbar />
      <div className="relative h-72 overflow-hidden">
        <img src={flight.img} alt={flight.airline} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <p className="text-sm font-semibold opacity-80">{flight.flightNo} · {flight.class}</p>
          <h1 className="text-3xl font-extrabold">{flight.fromCity} → {flight.toCity}</h1>
          <p className="opacity-80">{flight.depart} – {flight.arrive} · {flight.duration}</p>
        </div>
      </div>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex gap-8 items-start">
          <div className="flex-1 min-w-0 space-y-6">
            {/* Details */}
            <div className="bg-white rounded-xl border border-hairline p-6">
              <h2 className="text-lg font-bold text-ink mb-4">Flight Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-ash mb-1">Airline</p>
                  <p className="font-semibold text-ink">{flight.airline}</p>
                </div>
                <div>
                  <p className="text-ash mb-1">Aircraft</p>
                  <p className="font-semibold text-ink">{flight.aircraft}</p>
                </div>
                <div>
                  <p className="text-ash mb-1">Stops</p>
                  <p className="font-semibold text-ink">{flight.stops}</p>
                </div>
                <div>
                  <p className="text-ash mb-1">Refundable</p>
                  <p className="font-semibold text-ink">{flight.refundable ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
            {/* Baggage */}
            <div className="bg-white rounded-xl border border-hairline p-6">
              <h2 className="text-lg font-bold text-ink mb-4">Baggage Allowance</h2>
              <div className="grid grid-cols-3 gap-4 text-sm">
                {Object.entries(flight.baggage).map(([key, val]) => (
                  <div key={key}>
                    <p className="text-ash mb-1 capitalize">{key}</p>
                    <p className="font-semibold text-ink">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[360px] shrink-0 sticky top-24">
            <BookingPanel price={flight.price} unit="per person" type="flight" itemId={flight.id} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
