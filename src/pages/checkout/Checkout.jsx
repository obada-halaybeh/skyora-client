import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

export default function Checkout() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', card: '', expiry: '', cvv: '' })

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const ref = bookingId ?? `SKY-${Math.floor(9000 + Math.random() * 1000)}`
    navigate(`/booking/${ref}/confirmation`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-cloud">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-12">
        <h1 className="text-2xl font-extrabold text-ink mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {['Passenger Details', 'Payment'].map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step > i ? 'gradient-bg text-white' : step === i + 1 ? 'border-2 border-rausch text-rausch' : 'border border-hairline text-ash'}`}>
                {i + 1}
              </div>
              <span className={`text-sm font-medium ${step === i + 1 ? 'text-ink' : 'text-ash'}`}>{label}</span>
              {i < 1 && <div className="flex-1 h-px bg-hairline" />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <div className="bg-white rounded-xl border border-hairline p-6 space-y-4">
              <h2 className="text-lg font-bold text-ink">Passenger Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-ash uppercase tracking-wide block mb-1">First Name</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} required
                    className="w-full border border-hairline rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-rausch transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ash uppercase tracking-wide block mb-1">Last Name</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} required
                    className="w-full border border-hairline rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-rausch transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-ash uppercase tracking-wide block mb-1">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required
                  className="w-full border border-hairline rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-rausch transition-colors" />
              </div>
              <button type="button" onClick={() => setStep(2)}
                className="gradient-bg text-white font-semibold py-3 rounded-lg w-full hover:opacity-90 transition-opacity">
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-xl border border-hairline p-6 space-y-4">
              <h2 className="text-lg font-bold text-ink">Payment</h2>
              <div>
                <label className="text-xs font-semibold text-ash uppercase tracking-wide block mb-1">Card Number</label>
                <input name="card" value={form.card} onChange={handleChange} placeholder="•••• •••• •••• ••••" required
                  className="w-full border border-hairline rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-rausch transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-ash uppercase tracking-wide block mb-1">Expiry</label>
                  <input name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM / YY" required
                    className="w-full border border-hairline rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-rausch transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ash uppercase tracking-wide block mb-1">CVV</label>
                  <input name="cvv" value={form.cvv} onChange={handleChange} placeholder="•••" required
                    className="w-full border border-hairline rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-rausch transition-colors" />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 border border-hairline text-ink font-semibold py-3 rounded-lg hover:bg-cloud transition-colors">
                  Back
                </button>
                <button type="submit"
                  className="flex-1 gradient-bg text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity">
                  Confirm &amp; Pay
                </button>
              </div>
            </div>
          )}
        </form>
      </main>
      <Footer />
    </div>
  )
}
