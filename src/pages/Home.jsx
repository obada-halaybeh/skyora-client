import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SearchPill from '../components/search/SearchPill'
import BundleCard from '../components/booking/BundleCard'
import { BUNDLES, DESTINATIONS } from '../data/mockData'

const TRUST_ITEMS = [
  { icon: '✈', title: 'Best Flight Prices', caption: 'Compare 500+ airlines' },
  { icon: '🏨', title: 'Luxury Hotels', caption: 'Curated 5-star properties' },
  { icon: '🎁', title: 'Bundle & Save', caption: 'Up to 35% off packages' },
  { icon: '🔒', title: 'Secure Booking', caption: '256-bit SSL encryption' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative flex items-center justify-center" style={{ height: 560 }}>
        <img
          src="https://picsum.photos/seed/hero/1440/560"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.38) 100%)' }}
        />
        <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-3xl mx-auto">
          <p className="text-white text-sm uppercase tracking-wider font-semibold mb-3">
            DISCOVER THE WORLD
          </p>
          <h1
            className="text-5xl md:text-6xl font-extrabold text-white text-center"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.25)' }}
          >
            Your Next Adventure Awaits
          </h1>
          <p className="text-white/80 text-lg text-center mt-3 mb-8">
            Search flights, hotels and curated packages — all in one place.
          </p>
          <div className="w-full">
            <SearchPill onSearch={() => navigate('/flights')} />
          </div>
        </div>
      </section>

      {/* ── Popular Destinations ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-ink">Popular Destinations</h2>
            <p className="text-ash text-sm mt-1">Hand-picked getaways</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
            {DESTINATIONS.map((dest) => (
              <div
                key={dest.name}
                className="relative rounded-xl overflow-hidden cursor-pointer shrink-0 group"
                style={{ width: 200, height: 150 }}
                onClick={() => navigate(`/flights?destination=${encodeURIComponent(dest.name)}`)}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }}
                />
                <span className="absolute bottom-2 left-3 text-white text-sm font-bold drop-shadow">
                  {dest.name}
                </span>
                <span className="absolute bottom-2 right-2 bg-white/90 text-ink text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                  {dest.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Packages ────────────────────────────────────────────────── */}
      <section className="bg-cloud py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-ink">Featured Packages</h2>
            <p className="text-ash text-sm mt-1">Save big on curated travel</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BUNDLES.slice(0, 3).map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Strip ──────────────────────────────────────────────────────── */}
      <section className="bg-cloud py-12 px-6 border-t border-hairline">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center gap-2">
              <span className="text-3xl">{item.icon}</span>
              <p className="font-bold text-ink text-base">{item.title}</p>
              <p className="text-ash text-sm">{item.caption}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
