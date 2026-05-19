import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Explore',  href: '/' },
  { label: 'Flights',  href: '/flights' },
  { label: 'Hotels',   href: '/hotels' },
  { label: 'Bundles',  href: '/bundles' },
  { label: 'My Trips', href: '/account/trips' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-hairline h-16 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-full">

        {/* Wordmark */}
        <Link to="/" className="flex items-center gap-1.5 text-xl font-extrabold tracking-tight gradient-text select-none">
          ✈ Skyora
        </Link>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                to={href}
                className={[
                  'text-sm font-semibold transition-colors duration-150',
                  active ? 'text-ink' : 'text-ash hover:text-ink',
                ].join(' ')}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Right: avatar + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold select-none">
            S
          </div>
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md text-ash hover:text-ink hover:bg-cloud transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-16 inset-x-0 bg-white border-b border-hairline shadow-card md:hidden">
          <div className="flex flex-col py-2">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href))
              return (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    'px-6 py-3 text-sm font-semibold transition-colors',
                    active ? 'text-ink bg-cloud' : 'text-ash hover:text-ink hover:bg-cloud',
                  ].join(' ')}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
