import { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import FilterSidebar from '../../components/search/FilterSidebar'
import BundleCard from '../../components/booking/BundleCard'
import { BUNDLES } from '../../data/mockData'

export default function BundleSearch() {
  const [filters, setFilters] = useState({})

  return (
    <div className="bg-cloud min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-extrabold text-3xl text-ink">Curated Travel Packages</h1>
          <p className="text-ash mt-1">Hand-picked flights + hotels with exclusive savings</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="sticky top-24 self-start">
            <FilterSidebar type="bundles" filters={filters} onChange={setFilters} />
          </div>

          {/* Bundle grid */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-2 gap-6">
              {BUNDLES.map(bundle => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
