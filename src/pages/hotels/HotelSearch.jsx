import { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import FilterSidebar from '../../components/search/FilterSidebar'
import HotelCard from '../../components/booking/HotelCard'
import { HOTELS } from '../../data/mockData'

export default function HotelSearch() {
  const [sort, setSort] = useState('price-asc')
  const [filters, setFilters] = useState({})

  return (
    <div className="bg-cloud min-h-screen">
      <Navbar />

      {/* Sticky search context bar */}
      <div className="sticky top-16 z-30 bg-white border-b border-hairline px-6 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">
          Dubai&nbsp;&nbsp;·&nbsp;&nbsp;May 15–22&nbsp;&nbsp;·&nbsp;&nbsp;2 guests
        </span>
        <button className="text-sm font-semibold text-ink border border-hairline rounded-lg px-4 py-1.5 hover:bg-cloud transition-colors">
          Modify Search
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <div className="sticky top-24 self-start">
          <FilterSidebar type="hotels" filters={filters} onChange={setFilters} />
        </div>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-center justify-between mb-5">
            <h1 className="font-bold text-ink">42 hotels in Dubai</h1>
            <div className="flex items-center gap-3">
              <button className="text-sm font-semibold text-ink border border-hairline rounded-lg px-4 py-1.5 hover:bg-cloud transition-colors">
                Map View
              </button>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="text-sm border border-hairline rounded-lg px-3 py-1.5 text-ink bg-white focus:outline-none focus:border-ash"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>
          </div>

          {/* Hotel cards grid */}
          <div className="grid grid-cols-3 gap-5">
            {HOTELS.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
