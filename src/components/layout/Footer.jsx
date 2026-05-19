import { Link } from 'react-router-dom'

const COLUMNS = [
  {
    heading: 'Support',
    links: [
      { label: 'Help Center',  href: '/help' },
      { label: 'Contact Us',   href: '/contact' },
      { label: 'Safety',       href: '/safety' },
    ],
  },
  {
    heading: 'Skyora',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers',  href: '/careers' },
      { label: 'Press',    href: '/press' },
    ],
  },
  {
    heading: 'Explore',
    links: [
      { label: 'Flights',  href: '/flights' },
      { label: 'Hotels',   href: '/hotels' },
      { label: 'Packages', href: '/bundles' },
    ],
  },
]

const BOTTOM_LINKS = [
  { label: 'Privacy',  href: '/privacy' },
  { label: 'Terms',    href: '/terms' },
  { label: 'Sitemap',  href: '/sitemap' },
]

export default function Footer() {
  return (
    <footer className="bg-cloud border-t border-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-10">
          {COLUMNS.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-ink mb-3">{heading}</h4>
              <ul className="flex flex-col gap-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link to={href} className="text-sm text-ash hover:text-ink transition-colors duration-150">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-hairline pt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ash">
          <span>© 2026 Skyora</span>
          {BOTTOM_LINKS.map(({ label, href }) => (
            <Link key={label} to={href} className="hover:text-ink transition-colors duration-150">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
