import { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import FilterSidebar from '../../components/search/FilterSidebar'
import FlightCard from '../../components/booking/FlightCard'
import { FLIGHTS } from '../../data/mockData'

const SORT_OPTIONS = [
  { key: 'cheapest', label: 'Cheapest', sub: '$389' },
  { key: 'fastest',  label: 'Fastest',  sub: '7h 15m' },
  { key: 'best',     label: 'Best',     sub: 'Best value' },
]

export default function FlightSearch() {
  const [sort, setSort] = useState('cheapest')
  const [filters, setFilters] = useState({})

  return (
    <div className="bg-cloud min-h-screen">
      <Navbar />

      {/* Sticky search context bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-hairline px-6 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">
          London → Dubai &nbsp;·&nbsp; May 15 &nbsp;·&nbsp; 2 travelers
        </span>
        <button className="text-sm font-semibold text-ink border border-hairline rounded-lg px-4 py-1.5 hover:bg-cloud transition-colors">
          Modify Search
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8 items-start">
        {/* Sidebar */}
        <div className="sticky top-24 self-start">
          <FilterSidebar type="flights" filters={filters} onChange={setFilters} />
        </div>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm text-ash">67 flights found</span>
            <div className="flex items-center bg-cloud rounded-xl p-1 gap-0.5 border border-hairline">
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setSort(opt.key)}
                  className={`flex flex-col items-center px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    sort === opt.key
                      ? 'bg-white shadow-sm text-ink'
                      : 'bg-cloud text-ash hover:text-ink'
                  }`}
                >
                  <span className="font-semibold">{opt.label}</span>
                  <span className={`font-normal mt-0.5 ${sort === opt.key ? 'text-rausch' : 'text-ash/70'}`}>
                    {opt.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Flight cards */}
          <div className="flex flex-col gap-4">
            {FLIGHTS.map(flight => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
