import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import { useToast } from '../context/ToastContext'

const EXPERIENCES = [
  { name: 'Desert Safari', price: '$89', img: 'https://picsum.photos/seed/exp1/320/200' },
  { name: 'Dubai Frame', price: '$32', img: 'https://picsum.photos/seed/exp2/320/200' },
  { name: 'Dhow Cruise', price: '$65', img: 'https://picsum.photos/seed/exp3/320/200' },
]

export default function Confirmation() {
  const toast = useToast()

  return (
    <div className="bg-cloud min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 py-16 w-full flex-1 text-center">

        {/* ── Check icon ────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 bg-rausch/10 rounded-full flex items-center justify-center">
            <div className="w-14 h-14 bg-rausch rounded-full flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l4.5 4.5L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-ink mt-6">Booking Confirmed!</h1>
        <p className="text-ash mt-3 text-lg">
          Your trip to Dubai, UAE is all set. A confirmation has been sent to{' '}
          <span className="text-ink font-medium">sarah@example.com</span>
        </p>

        {/* ── Booking reference ─────────────────────────────────────────────── */}
        <div className="bg-cloud rounded-2xl border border-hairline p-6 mt-8 text-center">
          <p className="text-xs font-semibold text-ash uppercase tracking-wider">Booking Reference</p>
          <p className="text-4xl font-extrabold text-ink tracking-widest mt-2">SKY-8492</p>
        </div>

        {/* ── Trip Summary ──────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-hairline p-6 mt-4 text-left">
          <h2 className="font-bold text-ink mb-4">Trip Summary</h2>

          <div className="space-y-3">
            <div className="bg-cloud rounded-xl px-4 py-3 flex items-start gap-3">
              <span className="text-xl shrink-0">✈</span>
              <div>
                <p className="text-sm font-semibold text-ink">EK 202 · LHR→DXB</p>
                <p className="text-xs text-ash">May 15, 08:30–18:45</p>
              </div>
            </div>
            <div className="bg-cloud rounded-xl px-4 py-3 flex items-start gap-3">
              <span className="text-xl shrink-0">🏨</span>
              <div>
                <p className="text-sm font-semibold text-ink">Burj Al Arab Jumeirah</p>
                <p className="text-xs text-ash">7 nights · May 15–22</p>
              </div>
            </div>
          </div>

          <div className="border-t border-hairline mt-4 pt-4 flex items-center justify-between">
            <span className="text-sm text-ash font-medium">Total paid</span>
            <span className="text-xl font-extrabold text-rausch">$2,622</span>
          </div>
        </div>

        {/* ── Action buttons ────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Button
            variant="secondary"
            size="md"
            onClick={() => toast('Downloading your e-ticket…')}
          >
            ⬇ Download E-ticket
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => toast('Trip added to your calendar!')}
          >
            📅 Add to Calendar
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => toast('Share link copied to clipboard!')}
          >
            🔗 Share Itinerary
          </Button>
        </div>

        {/* ── You might also like ───────────────────────────────────────────── */}
        <div className="mt-12 text-left">
          <h2 className="text-xl font-bold text-ink mb-4">You might also like</h2>
          <div className="grid grid-cols-3 gap-4">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.name}
                className="bg-white rounded-xl border border-hairline overflow-hidden hover:shadow-card-hover transition-shadow"
              >
                <img
                  src={exp.img}
                  alt={exp.name}
                  className="w-full object-cover"
                  style={{ height: 120 }}
                />
                <div className="p-3">
                  <p className="font-semibold text-ink text-sm">{exp.name}</p>
                  <p className="text-ash text-xs mt-0.5 mb-3">From {exp.price} pp</p>
                  <button
                    onClick={() => toast('Added to your trip!')}
                    className="w-full text-xs font-semibold gradient-bg text-white rounded-lg py-1.5 hover:opacity-90 transition-opacity"
                  >
                    Add to Trip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
