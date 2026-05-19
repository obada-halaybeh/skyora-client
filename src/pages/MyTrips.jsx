import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import TripCard from '../components/booking/TripCard'
import ReviewModal from '../components/ui/ReviewModal'
import { MY_TRIPS } from '../data/mockData'

const TABS = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past',     label: 'Past' },
  { key: 'cancelled', label: 'Cancelled' },
]

export default function MyTrips() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [reviewTrip, setReviewTrip] = useState(null)

  const trips = MY_TRIPS[activeTab] ?? []

  return (
    <div className="min-h-screen flex flex-col bg-cloud">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
        <h1 className="text-3xl font-extrabold text-ink mb-6">My Trips</h1>

        {/* Tab bar */}
        <div className="flex gap-1 bg-white rounded-xl border border-hairline p-1 mb-8 w-fit">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === key
                  ? 'gradient-bg text-white shadow-sm'
                  : 'text-ash hover:text-ink'
              }`}
            >
              {label}
              <span className={`ml-1.5 text-xs ${activeTab === key ? 'text-white/80' : 'text-ash'}`}>
                ({MY_TRIPS[key]?.length ?? 0})
              </span>
            </button>
          ))}
        </div>

        {/* Trip cards */}
        <div className="flex flex-col gap-5">
          {trips.length > 0 ? trips.map(trip => (
            <TripCard
              key={trip.id}
              trip={trip}
              tab={activeTab}
              onReview={setReviewTrip}
            />
          )) : (
            <div className="text-center py-20 text-ash">
              <p className="text-xl font-bold mb-2">No {activeTab} trips</p>
              <p className="text-sm">Time to plan your next adventure!</p>
            </div>
          )}
        </div>
      </main>

      {reviewTrip && (
        <ReviewModal trip={reviewTrip} onClose={() => setReviewTrip(null)} />
      )}

      <Footer />
    </div>
  )
}
