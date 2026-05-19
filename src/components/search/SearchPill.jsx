import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Users, Search } from 'lucide-react'

export default function SearchPill({ destination = '', dates = '', travelers = '1 traveler', onSearch }) {
  const navigate = useNavigate()
  const [dest, setDest] = useState(destination)
  const [datesVal, setDatesVal] = useState(dates)
  const [travelersVal, setTravelersVal] = useState(travelers)

  function handleSearch() {
    if (onSearch) onSearch({ destination: dest, dates: datesVal, travelers: travelersVal })
    const params = new URLSearchParams()
    if (dest) params.set('destination', dest)
    if (datesVal) params.set('dates', datesVal)
    if (travelersVal) params.set('travelers', travelersVal)
    navigate(`/flights?${params.toString()}`)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="flex items-center h-16 bg-white rounded-full border border-hairline shadow-card overflow-hidden">
      {/* Where */}
      <div className="flex items-center gap-2.5 px-5 flex-1 min-w-0">
        <MapPin className="w-4 h-4 text-ash shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-ash font-medium leading-none mb-0.5">Where</span>
          <input
            type="text"
            value={dest}
            onChange={e => setDest(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search destinations"
            className="text-sm font-semibold text-ink bg-transparent outline-none placeholder:text-ash placeholder:font-normal truncate w-full"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-hairline shrink-0" />

      {/* Dates */}
      <div className="flex items-center gap-2.5 px-5 flex-1 min-w-0">
        <Calendar className="w-4 h-4 text-ash shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-ash font-medium leading-none mb-0.5">Dates</span>
          <input
            type="text"
            value={datesVal}
            onChange={e => setDatesVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add dates"
            className="text-sm font-semibold text-ink bg-transparent outline-none placeholder:text-ash placeholder:font-normal truncate w-full"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-hairline shrink-0" />

      {/* Travelers */}
      <div className="flex items-center gap-2.5 px-5 flex-1 min-w-0">
        <Users className="w-4 h-4 text-ash shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-ash font-medium leading-none mb-0.5">Travelers</span>
          <input
            type="text"
            value={travelersVal}
            onChange={e => setTravelersVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="1 traveler"
            className="text-sm font-semibold text-ink bg-transparent outline-none placeholder:text-ash placeholder:font-normal truncate w-full"
          />
        </div>
      </div>

      {/* Search button */}
      <div className="pr-2">
        <button
          onClick={handleSearch}
          className="gradient-bg w-12 h-12 rounded-full flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )
}
