import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import TripCard from '../components/booking/TripCard'
import ReviewModal from '../components/ui/ReviewModal'
import { useReviews } from '../context/ReviewsContext'
import { useToast } from '../context/ToastContext'
import { MY_TRIPS } from '../data/mockData'

const TABS = [
  { id: 'upcoming', label: 'Upcoming Trips', count: 3 },
  { id: 'past', label: 'Past Trips', count: 3 },
  { id: 'cancelled', label: 'Cancelled', count: 2 },
]

export default function MyTrips() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [reviewing, setReviewing] = useState(null)
  const [submittedReviews, setSubmittedReviews] = useState({})
  const { addReview } = useReviews()
  const toast = useToast()

  const trips = MY_TRIPS[activeTab] || []

  function handleReviewSubmit(data) {
    addReview('hotel', data.tripId, {
      author: 'Sarah M.',
      rating: data.rating,
      text: data.text,
      tags: data.tags,
      date: 'May 2026',
    })
    setSubmittedReviews((prev) => ({ ...prev, [data.tripId]: true }))
    setReviewing(null)
    toast('Review submitted! Thank you.')
  }

  return (
    <div className="bg-cloud min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10 w-full flex-1">

        {/* ── Header ────────────────────────────────────────────────────────── */}
        <p className="text-xs font-semibold text-ash uppercase tracking-wider mb-1.5">
          DASHBOARD
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink">My Trips</h1>
        <p className="text-ash text-sm mt-1.5 mb-8">
          Review your bookings, manage upcoming travel and share feedback on past adventures.
        </p>

        {/* ── Tabs ──────────────────────────────────────────────────────────── */}
        <div className="flex items-end border-b border-hairline mb-7">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'relative flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors',
                  isActive ? 'text-ink' : 'text-ash hover:text-ink',
                ].join(' ')}
              >
                {tab.label}
                <span
                  className={[
                    'text-xs font-bold px-2 py-0.5 rounded-full',
                    isActive ? 'bg-rausch text-white' : 'bg-cloud text-ash',
                  ].join(' ')}
                >
                  {tab.count}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] gradient-bg rounded-t-full" />
                )}
              </button>
            )
          })}
        </div>

        {/* ── Trip list ─────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {trips.length === 0 && (
            <div className="text-center py-16 text-ash">
              <p className="text-lg font-bold mb-1">No trips here</p>
              <p className="text-sm">Time to plan your next adventure!</p>
            </div>
          )}
          {trips.map((trip) => (
            <div key={trip.id}>
              <TripCard
                trip={trip}
                tab={activeTab}
                onReview={() => setReviewing(trip)}
              />
              {activeTab === 'past' && submittedReviews[trip.id] && (
                <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-emerald-700 text-sm font-semibold flex items-center gap-2">
                  <span>✓</span> Your review has been submitted
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {/* ── Review Modal ──────────────────────────────────────────────────── */}
      {reviewing && (
        <ReviewModal
          trip={reviewing}
          onClose={() => setReviewing(null)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  )
}
