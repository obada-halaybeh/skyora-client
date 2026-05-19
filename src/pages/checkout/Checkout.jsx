import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

// ── Helpers ────────────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-ash uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}

function TextInput({ className = '', ...props }) {
  return (
    <input
      className={`w-full border border-hairline rounded-lg px-3 py-2.5 text-sm text-ink placeholder:text-ash focus:outline-none focus:ring-2 focus:ring-rausch/25 focus:border-rausch transition-colors ${className}`}
      {...props}
    />
  )
}

// ── Step indicator ─────────────────────────────────────────────────────────
const STEP_LABELS = ['Traveler Info', 'Seat & Room', 'Payment']

function StepIndicator({ current }) {
  return (
    <div className="flex items-center mb-8">
      {STEP_LABELS.map((label, i) => {
        const num = i + 1
        const done = current > num
        const active = current === num
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2 shrink-0">
              <div
                className={[
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
                  done || active ? 'gradient-bg text-white' : 'border-2 border-hairline text-ash bg-white',
                ].join(' ')}
              >
                {done ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : num}
              </div>
              <span className={`text-sm font-semibold hidden sm:block ${active ? 'text-ink' : 'text-ash'}`}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 ${done ? 'bg-rausch' : 'bg-hairline'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Seat grid constants ────────────────────────────────────────────────────
const ROWS = 6
const COLS = ['A', 'B', 'C', 'D', 'E', 'F']
const TAKEN_SEATS = new Set(['1A', '1C', '2B', '2E', '3D', '4A', '4F', '5C', '6B'])

const ROOM_OPTIONS = [
  { id: 'r1', type: 'Deluxe Suite', size: '170 sqm', guests: 2, price: 980 },
  { id: 'r2', type: 'Panoramic Suite', size: '250 sqm', guests: 3, price: 1580 },
  { id: 'r3', type: 'Premium Suite', size: '400 sqm', guests: 4, price: 2200 },
]

// ── Add-on options ─────────────────────────────────────────────────────────
const ADDONS = [
  { id: 'insurance', icon: '✅', title: 'Travel Insurance', desc: '$45 pp · Covers cancellation & medical', price: 45 },
  { id: 'boarding', icon: '🚶', title: 'Priority Boarding', desc: '$18 pp · Skip the queue', price: 18 },
  { id: 'baggage', icon: '🧳', title: 'Extra Baggage', desc: '$35 pp · Additional 23kg', price: 35 },
]

// ── Step 1 — Traveler Info ─────────────────────────────────────────────────
function Step1({ form, onChange, addons, onAddonToggle, onNext }) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-hairline rounded-2xl p-6">
        <h2 className="text-base font-bold text-ink mb-4 pb-3 border-b border-hairline">Passenger 1</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First Name">
            <TextInput name="firstName" value={form.firstName} onChange={onChange} placeholder="Sarah" />
          </Field>
          <Field label="Last Name">
            <TextInput name="lastName" value={form.lastName} onChange={onChange} placeholder="Mitchell" />
          </Field>
          <Field label="Date of Birth">
            <TextInput name="dob" value={form.dob} onChange={onChange} placeholder="DD / MM / YYYY" />
          </Field>
          <Field label="Passport No.">
            <TextInput name="passport" value={form.passport} onChange={onChange} placeholder="GB1234567" />
          </Field>
          <Field label="Nationality">
            <TextInput name="nationality" value={form.nationality} onChange={onChange} placeholder="British" />
          </Field>
          <Field label="Passport Expiry">
            <TextInput name="passportExpiry" value={form.passportExpiry} onChange={onChange} placeholder="MM / YYYY" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Email Address">
              <TextInput name="email" type="email" value={form.email} onChange={onChange} placeholder="sarah@example.com" />
            </Field>
          </div>
        </div>
      </div>

      {/* Add-ons */}
      <div className="bg-white border border-hairline rounded-2xl p-6">
        <h2 className="text-base font-bold text-ink mb-4">Add-ons</h2>
        <div className="space-y-3">
          {ADDONS.map((addon) => (
            <label
              key={addon.id}
              className="flex items-center gap-4 p-3 rounded-xl border border-hairline cursor-pointer hover:bg-cloud transition-colors"
            >
              <input
                type="checkbox"
                checked={addons.includes(addon.id)}
                onChange={() => onAddonToggle(addon.id)}
                className="w-4 h-4 accent-rausch shrink-0"
              />
              <span className="text-xl shrink-0">{addon.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink">{addon.title}</p>
                <p className="text-xs text-ash">{addon.desc}</p>
              </div>
              <span className="text-sm font-bold text-ink shrink-0">${addon.price}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        className="gradient-bg w-full rounded-lg py-3 text-white font-semibold hover:opacity-90 transition-opacity"
      >
        Continue to Seat &amp; Room →
      </button>
    </div>
  )
}

// ── Step 2 — Seat & Room ───────────────────────────────────────────────────
function Step2({ selectedSeat, onSeatSelect, selectedRoom, onRoomSelect, onBack, onNext }) {
  return (
    <div className="space-y-6">
      {/* Seat grid */}
      <div className="bg-white border border-hairline rounded-2xl p-6">
        <h2 className="text-base font-bold text-ink mb-4">Select Your Seat</h2>

        {/* Legend */}
        <div className="flex gap-4 mb-4 text-xs text-ash">
          <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-emerald-100 border border-emerald-300 inline-block" /> Available</span>
          <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-hairline inline-block" /> Taken</span>
          <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-rausch inline-block" /> Selected</span>
        </div>

        {/* Column labels */}
        <div className="flex gap-1 mb-1 pl-8">
          {COLS.map((col, i) => (
            <div key={col} className={`w-9 text-center text-xs font-semibold text-ash ${i === 2 ? 'mr-3' : ''}`}>
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: ROWS }, (_, r) => r + 1).map((row) => (
          <div key={row} className="flex items-center gap-1 mb-1">
            <span className="w-7 text-right text-xs text-ash font-medium mr-1">{row}</span>
            {COLS.map((col, i) => {
              const seatId = `${row}${col}`
              const taken = TAKEN_SEATS.has(seatId)
              const sel = selectedSeat === seatId
              return (
                <button
                  key={seatId}
                  disabled={taken}
                  onClick={() => onSeatSelect(sel ? null : seatId)}
                  className={[
                    'w-9 h-9 rounded text-xs font-semibold transition-colors border',
                    i === 2 ? 'mr-3' : '',
                    taken
                      ? 'bg-hairline border-hairline text-ash cursor-not-allowed'
                      : sel
                        ? 'bg-rausch border-rausch text-white'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100',
                  ].join(' ')}
                >
                  {seatId}
                </button>
              )
            })}
          </div>
        ))}

        {selectedSeat && (
          <p className="mt-3 text-sm font-semibold text-ink">
            Selected: <span className="text-rausch">Seat {selectedSeat}</span> — Economy Window
          </p>
        )}
      </div>

      {/* Room picker */}
      <div className="bg-white border border-hairline rounded-2xl p-6">
        <h2 className="text-base font-bold text-ink mb-4">Select Your Room</h2>
        <div className="space-y-3">
          {ROOM_OPTIONS.map((room) => {
            const sel = selectedRoom === room.id
            return (
              <button
                key={room.id}
                onClick={() => onRoomSelect(room.id)}
                className={[
                  'w-full text-left p-4 rounded-xl border-2 transition-all',
                  sel
                    ? 'border-rausch bg-rausch/5'
                    : 'border-hairline hover:border-ash',
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink text-sm">{room.type}</p>
                    <p className="text-xs text-ash mt-0.5">{room.size} · Up to {room.guests} guests</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-base font-extrabold text-rausch">${room.price.toLocaleString()}</p>
                    <p className="text-xs text-ash">per night</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border border-hairline text-ink font-semibold py-3 rounded-lg hover:bg-cloud transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 gradient-bg text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Continue to Payment →
        </button>
      </div>
    </div>
  )
}

// ── Step 3 — Payment ───────────────────────────────────────────────────────
function Step3({ form, onChange, onBack, onSubmit }) {
  function formatCard(val) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }

  function handleCardChange(e) {
    const formatted = formatCard(e.target.value)
    onChange({ target: { name: 'card', value: formatted } })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-hairline rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-bold text-ink mb-1">Card Details</h2>

        {/* Card number */}
        <Field label="Card Number">
          <div className="relative">
            <TextInput
              name="card"
              value={form.card}
              onChange={handleCardChange}
              placeholder="1234 5678 9012 3456"
              className="pr-10"
              maxLength={19}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg">💳</span>
          </div>
        </Field>

        {/* 3-col row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <Field label="Cardholder Name">
              <TextInput name="cardName" value={form.cardName} onChange={onChange} placeholder="Sarah Mitchell" />
            </Field>
          </div>
          <Field label="Expiry">
            <TextInput name="expiry" value={form.expiry} onChange={onChange} placeholder="MM / YY" maxLength={7} />
          </Field>
          <Field label="CVV">
            <TextInput name="cvv" value={form.cvv} onChange={onChange} placeholder="•••" maxLength={4} type="password" />
          </Field>
        </div>

        {/* Billing */}
        <div className="pt-2 border-t border-hairline">
          <h3 className="text-sm font-bold text-ink mb-3">Billing Address</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Field label="Address">
                <TextInput name="address" value={form.address} onChange={onChange} placeholder="123 Main Street" />
              </Field>
            </div>
            <Field label="City">
              <TextInput name="city" value={form.city} onChange={onChange} placeholder="London" />
            </Field>
            <Field label="Postcode">
              <TextInput name="postcode" value={form.postcode} onChange={onChange} placeholder="SW1A 1AA" />
            </Field>
            <div className="col-span-2">
              <Field label="Country">
                <TextInput name="country" value={form.country} onChange={onChange} placeholder="United Kingdom" />
              </Field>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 border-t border-hairline">
          {['🔒 SSL', '💳 PCI-DSS', '🛡 Fraud Protection', '↩ Free Cancellation'].map((badge) => (
            <span key={badge} className="text-ash text-xs">{badge}</span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="border border-hairline text-ink font-semibold py-3.5 px-6 rounded-lg hover:bg-cloud transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          className="flex-1 gradient-bg text-white font-bold py-3.5 rounded-lg text-lg hover:opacity-90 transition-opacity"
        >
          Confirm Booking — $2,622
        </button>
      </div>
    </div>
  )
}

// ── Order Summary sidebar ──────────────────────────────────────────────────
function OrderSummary() {
  return (
    <div className="sticky top-24 w-80 shrink-0 hidden lg:block">
      <div className="bg-white rounded-2xl shadow-card p-6">
        <img
          src="https://picsum.photos/seed/bundle1/640/480"
          alt="Dubai Luxury Escape"
          className="w-full rounded-xl object-cover mb-4"
          style={{ height: 160 }}
        />
        <h3 className="font-bold text-ink text-base mb-4">Dubai Luxury Escape</h3>

        <div className="space-y-2 mb-4">
          {[
            { label: 'Flight (2 pax)', value: '$1,240' },
            { label: 'Hotel (7 nights)', value: '$980' },
            { label: 'Taxes & fees', value: '$402' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <span className="text-ash">{label}</span>
              <span className="text-ink font-medium">{value}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-hairline pt-3 flex items-center justify-between">
          <span className="font-bold text-ink">Total</span>
          <span className="font-extrabold text-ink text-lg">$2,622</span>
        </div>

        <p className="text-ash text-xs text-center mt-4">🔒 Secure checkout</p>
      </div>
    </div>
  )
}

// ── Main Checkout component ────────────────────────────────────────────────
export default function Checkout() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    firstName: '', lastName: '', dob: '', passport: '', nationality: '',
    passportExpiry: '', email: '',
    card: '', cardName: '', expiry: '', cvv: '',
    address: '', city: '', postcode: '', country: '',
  })
  const [addons, setAddons] = useState(['insurance'])
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState('r1')

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function toggleAddon(id) {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  function handleConfirm() {
    navigate('/booking/SKY-8492/confirmation')
  }

  return (
    <div className="bg-cloud min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10 w-full flex-1">
        <div className="flex gap-8 items-start">
          {/* Left column */}
          <div className="flex-1 min-w-0">
            <StepIndicator current={step} />

            {step === 1 && (
              <Step1
                form={form}
                onChange={handleChange}
                addons={addons}
                onAddonToggle={toggleAddon}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <Step2
                selectedSeat={selectedSeat}
                onSeatSelect={setSelectedSeat}
                selectedRoom={selectedRoom}
                onRoomSelect={setSelectedRoom}
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
              />
            )}
            {step === 3 && (
              <Step3
                form={form}
                onChange={handleChange}
                onBack={() => setStep(2)}
                onSubmit={handleConfirm}
              />
            )}
          </div>

          {/* Right column: sticky order summary */}
          <OrderSummary />
        </div>
      </main>

      <Footer />
    </div>
  )
}
