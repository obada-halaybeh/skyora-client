import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../context/ToastContext'

function InputField({ label, type = 'text', placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-ash uppercase tracking-wider">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-hairline rounded-lg px-3.5 py-3 text-sm text-ink placeholder:text-ash focus:outline-none focus:ring-2 focus:ring-rausch/30 focus:border-rausch transition-colors"
      />
    </div>
  )
}

function SignInForm({ onSwitchTab }) {
  const navigate = useNavigate()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    toast('Welcome to Skyora! ✈')
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-ink text-center">Welcome back</h1>
        <p className="text-ash text-sm text-center mt-1 mb-6">Sign in to your account</p>
      </div>
      <InputField
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-ash uppercase tracking-wider">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-hairline rounded-lg px-3.5 py-3 text-sm text-ink placeholder:text-ash focus:outline-none focus:ring-2 focus:ring-rausch/30 focus:border-rausch transition-colors"
        />
        <div className="flex justify-end mt-0.5">
          <button type="button" className="text-info text-xs hover:underline">Forgot password?</button>
        </div>
      </div>
      <button
        type="submit"
        className="gradient-bg w-full rounded-lg py-3 text-white font-semibold text-sm hover:opacity-90 transition-opacity mt-1"
      >
        Sign In
      </button>
      <p className="text-center text-sm text-ash">
        New to Skyora?{' '}
        <button type="button" onClick={onSwitchTab} className="text-rausch font-semibold hover:underline">
          Create account
        </button>
      </p>
    </form>
  )
}

function SignUpForm({ onSwitchTab }) {
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' })

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    toast('Welcome to Skyora! ✈')
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-ink text-center">Create your account</h1>
        <p className="text-ash text-sm text-center mt-1 mb-6">Join thousands of happy travellers</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <InputField label="First Name" placeholder="Sarah" value={form.firstName} onChange={set('firstName')} />
        <InputField label="Last Name" placeholder="Mitchell" value={form.lastName} onChange={set('lastName')} />
      </div>
      <InputField label="Email Address" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
      <InputField label="Password" type="password" placeholder="••••••••" value={form.password} onChange={set('password')} />
      <InputField label="Confirm Password" type="password" placeholder="••••••••" value={form.confirm} onChange={set('confirm')} />
      <button
        type="submit"
        className="gradient-bg w-full rounded-lg py-3 text-white font-semibold text-sm hover:opacity-90 transition-opacity mt-1"
      >
        Create Account
      </button>
      <p className="text-center text-sm text-ash">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchTab} className="text-rausch font-semibold hover:underline">
          Sign in
        </button>
      </p>
    </form>
  )
}

export default function Auth() {
  const [activeTab, setActiveTab] = useState('signin')

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-black">
      <img
        src="https://picsum.photos/seed/authbg/1440/900"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.35 }}
      />
      <div
        className="relative z-10 w-full bg-white rounded-3xl shadow-auth p-12"
        style={{ maxWidth: 460 }}
      >
        {/* Wordmark */}
        <p className="gradient-text text-2xl font-extrabold text-center mb-6">✈ Skyora</p>

        {/* Tab toggle */}
        <div className="bg-cloud rounded-xl p-1 flex mb-8">
          {['signin', 'signup'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                'flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-150',
                activeTab === tab
                  ? 'bg-white shadow-sm text-ink'
                  : 'text-ash hover:text-ink',
              ].join(' ')}
            >
              {tab === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {activeTab === 'signin' ? (
          <SignInForm onSwitchTab={() => setActiveTab('signup')} />
        ) : (
          <SignUpForm onSwitchTab={() => setActiveTab('signin')} />
        )}
      </div>
    </div>
  )
}
