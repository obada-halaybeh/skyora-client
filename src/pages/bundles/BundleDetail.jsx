import { useParams } from 'react-router-dom'
import { Plane, BedDouble } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import BookingPanel from '../../components/booking/BookingPanel'
import { BUNDLES } from '../../data/mockData'

export default function BundleDetail() {
  const { id } = useParams()
  const bundle = BUNDLES.find(b => b.id === id) ?? BUNDLES[0]

  const ICON_MAP = { flight: Plane, hotel: BedDouble, activity: '✨' }

  return (
    <div className="min-h-screen flex flex-col bg-cloud">
      <Navbar />
      <div className="relative h-72 overflow-hidden">
        <img src={bundle.img} alt={bundle.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 left-6">
          <span className="bg-rausch text-white text-sm font-bold px-3 py-1.5 rounded-full">
            Save {bundle.savings}%
          </span>
        </div>
        <div className="absolute bottom-6 left-6 text-white">
          <p className="text-sm font-semibold opacity-80">{bundle.destination} · {bundle.nights} nights</p>
          <h1 className="text-3xl font-extrabold">{bundle.title}</h1>
          <p className="text-sm opacity-80">{bundle.cancellation}</p>
        </div>
      </div>
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex gap-8 items-start">
          <div className="flex-1 min-w-0 space-y-6">
            <div className="bg-white rounded-xl border border-hairline p-6">
              <h2 className="text-lg font-bold text-ink mb-4">Included in this bundle</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cloud rounded-lg p-4 flex items-start gap-3">
                  <Plane className="w-5 h-5 text-ash mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-ash uppercase tracking-wide mb-1">Flight</p>
                    <p className="font-semibold text-ink text-sm">{bundle.flight?.airline}</p>
                    <p className="text-xs text-ash">{bundle.flight?.flightNo} · {bundle.flight?.from} → {bundle.flight?.to}</p>
                    <p className="text-xs text-ash">{bundle.flight?.depart} – {bundle.flight?.arrive}</p>
                  </div>
                </div>
                <div className="bg-cloud rounded-lg p-4 flex items-start gap-3">
                  <BedDouble className="w-5 h-5 text-ash mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-ash uppercase tracking-wide mb-1">Hotel</p>
                    <p className="font-semibold text-ink text-sm">{bundle.hotel?.name}</p>
                    <p className="text-xs text-ash">{'⭐'.repeat(bundle.hotel?.stars ?? 0)}</p>
                    <p className="text-xs text-ash">{bundle.nights} nights</p>
                  </div>
                </div>
              </div>
            </div>
            {bundle.itinerary?.length > 0 && (
              <div className="bg-white rounded-xl border border-hairline p-6">
                <h2 className="text-lg font-bold text-ink mb-4">Itinerary</h2>
                <div className="flex flex-col gap-4">
                  {bundle.itinerary.map((item, i) => {
                    const Icon = ICON_MAP[item.type]
                    return (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-cloud border border-hairline flex items-center justify-center shrink-0">
                          {typeof Icon === 'string' ? Icon : <Icon className="w-4 h-4 text-ash" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs text-ash">Day {item.day}</span>
                          </div>
                          <p className="font-semibold text-ink text-sm">{item.title}</p>
                          <p className="text-xs text-ash">{item.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="w-[360px] shrink-0 sticky top-24">
            <BookingPanel price={bundle.price} unit="per person" type="bundle" itemId={bundle.id} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
