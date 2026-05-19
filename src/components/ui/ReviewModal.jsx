import { useState } from 'react'
import { X, CheckCircle } from 'lucide-react'
import StarInput from './StarInput'
import Button from './Button'

const TAG_OPTIONS = ['Great service', 'Clean rooms', 'Tasty food', 'Comfy beds', 'Good location', 'Value for money']
const MAX_CHARS = 600
const MIN_CHARS = 10

export default function ReviewModal({ trip, onClose, onSubmit }) {
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')
  const [tags, setTags] = useState([])
  const [submitted, setSubmitted] = useState(false)

  const toggleTag = (tag) =>
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))

  const canSubmit = rating > 0 && text.trim().length >= MIN_CHARS

  const handleSubmit = () => {
    if (!canSubmit) return
    setSubmitted(true)
    setTimeout(() => {
      onSubmit({ tripId: trip.id, rating, text, tags })
    }, 1100)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(34,34,34,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white overflow-hidden shadow-2xl anim-pop">

        {/* Header image */}
        <div className="relative h-32 overflow-hidden">
          <img src={trip.img} alt={trip.destination} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }} />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-3 left-4 text-white">
            <p className="font-bold text-base leading-tight">{trip.destination}</p>
            <p className="text-xs opacity-80">{trip.dates} · #{trip.id}</p>
          </div>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-12 px-6">
            <CheckCircle size={52} className="text-emerald-500" />
            <p className="text-lg font-bold text-ink">Thanks for your review!</p>
            <p className="text-sm text-ash text-center">Your feedback helps other travellers make better choices.</p>
          </div>
        ) : (
          <>
            {/* Body */}
            <div className="p-6 flex flex-col gap-5">
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-semibold text-ink mb-2">How was your overall experience?</p>
                <StarInput value={rating} onChange={setRating} size={36} />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink mb-2">What stood out? <span className="text-ash font-normal">(optional)</span></p>
                <div className="flex flex-wrap gap-2">
                  {TAG_OPTIONS.map((tag) => {
                    const active = tags.includes(tag)
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={[
                          'rounded-full px-3 py-1.5 text-xs font-semibold border transition-all duration-150',
                          active
                            ? 'bg-rausch text-white border-rausch'
                            : 'bg-white text-ash border-hairline hover:border-ash',
                        ].join(' ')}
                      >
                        {tag}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-ink mb-2">Share details of your experience</p>
                <textarea
                  rows={4}
                  maxLength={MAX_CHARS}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tell us what made your trip memorable…"
                  className="w-full resize-none rounded-lg border border-hairline px-3 py-2.5 text-sm text-ink placeholder:text-ash focus:outline-none focus:ring-2 focus:ring-rausch/30 focus:border-rausch transition-colors"
                />
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs ${text.trim().length > 0 && text.trim().length < MIN_CHARS ? 'text-error' : 'text-ash'}`}>
                    {text.trim().length > 0 && text.trim().length < MIN_CHARS
                      ? `At least ${MIN_CHARS} characters required`
                      : ' '}
                  </span>
                  <span className="text-xs text-ash">{text.length}/{MAX_CHARS}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-cloud border-t border-hairline px-6 py-4 flex justify-end gap-3">
              <Button variant="ghost" size="md" onClick={onClose}>Cancel</Button>
              <Button variant="gradient" size="md" onClick={handleSubmit} disabled={!canSubmit}>
                Submit Review
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
