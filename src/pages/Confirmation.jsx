import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function Confirmation() {
  const { ref } = useParams()

  return (
    <div className="min-h-screen flex flex-col bg-cloud">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl border border-hairline shadow-card p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-3xl">✓</span>
          </div>
          <h1 className="text-2xl font-extrabold text-ink mb-2">Booking Confirmed!</h1>
          <p className="text-ash mb-6">Your booking reference is</p>
          <div className="bg-cloud rounded-lg border border-hairline px-6 py-3 mb-8">
            <span className="font-mono font-bold text-ink text-xl">{ref}</span>
          </div>
          <p className="text-sm text-ash mb-8">
            A confirmation email has been sent. You can view your booking in My Trips.
          </p>
          <div className="flex gap-3">
            <Link to="/account/trips"
              className="flex-1 gradient-bg text-white font-semibold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity text-center">
              View My Trips
            </Link>
            <Link to="/"
              className="flex-1 border border-hairline text-ink font-semibold py-3 rounded-lg text-sm hover:bg-cloud transition-colors text-center">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
