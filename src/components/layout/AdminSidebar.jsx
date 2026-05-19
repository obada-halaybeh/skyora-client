import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { icon: '📊', label: 'Dashboard', href: '/admin' },
  { icon: '✈',  label: 'Flights',   href: '/admin/flights' },
  { icon: '🏨', label: 'Hotels',    href: '/admin/hotels' },
  { icon: '🎁', label: 'Bundles',   href: '/admin/bundles' },
  { icon: '📋', label: 'Bookings',  href: '/admin/bookings' },
  { icon: '👥', label: 'Users',     href: '/admin/users' },
]

export default function AdminSidebar() {
  const { pathname } = useLocation()

  return (
    <aside
      className="w-[220px] bg-[#222222] min-h-screen flex-shrink-0 flex flex-col"
    >
      {/* Logo */}
      <div className="p-5">
        <span className="gradient-text font-extrabold text-xl select-none">✈ Skyora</span>
      </div>
      <p className="text-[#555] text-[10px] font-semibold tracking-widest px-5 pb-4 uppercase">
        Admin Panel
      </p>

      {/* Nav items */}
      <nav className="flex flex-col">
        {NAV_ITEMS.map(({ icon, label, href }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              to={href}
              className={[
                'flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-rausch/15 border-l-[3px] border-rausch text-white font-semibold'
                  : 'text-[#888] border-l-[3px] border-transparent hover:bg-white/5 hover:text-[#aaa]',
              ].join(' ')}
            >
              <span className="text-base leading-none">{icon}</span>
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
