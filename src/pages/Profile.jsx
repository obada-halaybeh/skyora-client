import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import TripCard from '../components/booking/TripCard'
import ReviewModal from '../components/ui/ReviewModal'
import { useReviews } from '../context/ReviewsContext'
import { useToast } from '../context/ToastContext'
import { MY_TRIPS } from '../data/mockData'

const TABS = [
  { label: 'Upcoming', key: 'upcoming' },
  { label: 'Past Trips', key: 'past' },
  { label: 'Cancelled', key: 'cancelled' },
]

const SETTINGS_CARDS = [
  { icon: '👤', title: 'Personal Info', desc: 'Name, email, passport' },
  { icon: '💳', title: 'Payment Methods', desc: 'Cards & billing' },
  { icon: '🔔', title: 'Notifications', desc: 'Alerts & preferences' },
]

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0)
  const [reviewing, setReviewing] = useState(null)
  const [submitted, setSubmitted] = useState({})
  const { addReview } = useReviews()
  const toast = useToast()

  const { key: tabKey } = TABS[activeTab]
  const trips = (MY_TRIPS[tabKey] || []).slice(0, 2)

  function handleReviewSubmit(data) {
    addReview('hotel', data.tripId, {
      author: 'Sarah M.',
      rating: data.rating,
      text: data.text,
      tags: data.tags,
      date: 'May 2026',
    })
    setSubmitted((prev) => ({ ...prev, [data.tripId]: true }))
    setReviewing(null)
    toast('Review submitted! Thank you.')
  }

  return (
    <div className="bg-cloud min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10 w-full flex-1">

        {/* ── Profile header card ──────────────────────────────────────────── */}
        <div className="bg-cloud rounded-3xl p-8 border border-hairline mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="gradient-bg w-20 h-20 rounded-full flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-white">S</span>
            </div>

            {/* Name + stats */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-ink">Sarah Mitchell</h2>
              <p className="text-ash text-sm mt-0.5">Premium Member · Joined Jan 2024</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="bg-cloud border border-hairline rounded-xl px-4 py-2 text-sm font-semibold text-ink">
                  ✈ 12 Trips
                </span>
                <span className="bg-cloud border border-hairline rounded-xl px-4 py-2 text-sm font-semibold text-ink">
                  💰 $24,500 Total Spent
                </span>
                <span className="bg-cloud border border-hairline rounded-xl px-4 py-2 text-sm font-semibold">
                  <span className="gradient-text">⭐ Luxe Member</span>
                </span>
              </div>
            </div>

            {/* Edit button */}
            <div className="shrink-0 md:self-start">
              <Button variant="secondary" size="md">Edit Profile</Button>
            </div>
          </div>
        </div>

        {/* ── Tabs ─────────────────────────────────────────────────────────── */}
        <div className="flex border-b border-hairline mb-6">
          {TABS.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(i)}
              className={[
                'px-5 py-3 text-sm font-semibold transition-colors relative',
                activeTab === i ? 'text-ink' : 'text-ash hover:text-ink',
              ].join(' ')}
            >
              {tab.label}
              {activeTab === i && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] gradient-bg rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* ── Trip list ─────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {trips.length === 0 && (
            <p className="text-ash text-sm py-8 text-center">No trips in this category.</p>
          )}
          {trips.map((trip) => (
            <div key={trip.id}>
              <TripCard
                trip={trip}
                tab={tabKey}
                onReview={() => setReviewing(trip)}
              />
              {tabKey === 'past' && submitted[trip.id] && (
                <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-emerald-700 text-sm font-semibold flex items-center gap-2">
                  <span>✓</span> Your review has been submitted
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Account Settings ─────────────────────────────────────────────── */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-ink mb-4">Account Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SETTINGS_CARDS.map((card) => (
              <button
                key={card.title}
                className="bg-white rounded-xl border border-hairline p-5 text-left hover:shadow-card-hover transition-shadow group"
              >
                <span className="text-2xl">{card.icon}</span>
                <p className="font-semibold text-ink mt-3 mb-1">{card.title}</p>
                <p className="text-ash text-sm">{card.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </main>

      <Footer />

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
