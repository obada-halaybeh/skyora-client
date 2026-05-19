import { useState } from 'react'

const AIRLINES = ['Emirates', 'Air France', 'Singapore Airlines', 'British Airways', 'Qatar Airways']
const DEPARTURE_TIMES = [
  { label: 'Morning', sub: '06–12' },
  { label: 'Afternoon', sub: '12–18' },
  { label: 'Evening', sub: '18–00' },
  { label: 'Night', sub: '00–06' },
]

function SectionTitle({ children }) {
  return <p className="text-sm font-semibold text-ink mb-3">{children}</p>
}

function Divider() {
  return <div className="border-t border-hairline my-4" />
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded accent-rausch cursor-pointer"
      />
      <span className="text-sm text-ink group-hover:text-rausch transition-colors">{label}</span>
    </label>
  )
}

export default function FilterSidebar({ type = 'flights', filters = {}, onChange }) {
  const [local, setLocal] = useState({
    priceMin: filters.priceMin ?? 0,
    priceMax: filters.priceMax ?? 5000,
    stops: filters.stops ?? 'Any',
    airlines: filters.airlines ?? [],
    departureTimes: filters.departureTimes ?? [],
    starRatings: filters.starRatings ?? [],
    amenities: filters.amenities ?? [],
    durations: filters.durations ?? [],
  })

  function update(patch) {
    const next = { ...local, ...patch }
    setLocal(next)
    if (onChange) onChange(next)
  }

  function toggleArray(key, value) {
    const arr = local[key]
    const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]
    update({ [key]: next })
  }

  function clearAll() {
    const reset = {
      priceMin: 0,
      priceMax: 5000,
      stops: 'Any',
      airlines: [],
      departureTimes: [],
      starRatings: [],
      amenities: [],
      durations: [],
    }
    setLocal(reset)
    if (onChange) onChange(reset)
  }

  return (
    <aside className="w-[280px] bg-white rounded-xl border border-hairline p-5 shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-ink">Filters</h2>
        <button
          onClick={clearAll}
          className="text-sm text-rausch hover:underline font-medium"
        >
          Clear all
        </button>
      </div>

      {/* Price Range */}
      <SectionTitle>Price Range</SectionTitle>
      <div className="mb-1">
        <input
          type="range"
          min={0}
          max={5000}
          step={50}
          value={local.priceMax}
          onChange={e => update({ priceMax: Number(e.target.value) })}
          className="w-full accent-rausch"
        />
      </div>
      <div className="flex justify-between text-sm text-ash mt-1">
        <span>${local.priceMin.toLocaleString()}</span>
        <span>${local.priceMax.toLocaleString()}</span>
      </div>

      {/* ── FLIGHTS ── */}
      {type === 'flights' && (
        <>
          <Divider />
          <SectionTitle>Stops</SectionTitle>
          <div className="flex flex-col gap-2">
            {['Any', 'Non-stop', '1 Stop', '2+ Stops'].map(opt => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="stops"
                  checked={local.stops === opt}
                  onChange={() => update({ stops: opt })}
                  className="w-4 h-4 accent-rausch cursor-pointer"
                />
                <span className="text-sm text-ink group-hover:text-rausch transition-colors">{opt}</span>
              </label>
            ))}
          </div>

          <Divider />
          <SectionTitle>Airlines</SectionTitle>
          <div className="flex flex-col gap-2">
            {AIRLINES.map(airline => (
              <Checkbox
                key={airline}
                label={airline}
                checked={local.airlines.includes(airline)}
                onChange={() => toggleArray('airlines', airline)}
              />
            ))}
          </div>

          <Divider />
          <SectionTitle>Departure Time</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            {DEPARTURE_TIMES.map(({ label, sub }) => {
              const active = local.departureTimes.includes(label)
              return (
                <button
                  key={label}
                  onClick={() => toggleArray('departureTimes', label)}
                  className={`flex flex-col items-center py-2 px-1 rounded-lg border text-xs transition-colors ${
                    active
                      ? 'border-rausch bg-red-50 text-rausch font-semibold'
                      : 'border-hairline text-ash hover:border-ash'
                  }`}
                >
                  <span className="font-medium">{label}</span>
                  <span className="opacity-70">{sub}</span>
                </button>
              )
            })}
          </div>
        </>
      )}

      {/* ── HOTELS ── */}
      {type === 'hotels' && (
        <>
          <Divider />
          <SectionTitle>Star Rating</SectionTitle>
          <div className="flex flex-col gap-2">
            {[5, 4, 3].map(star => (
              <Checkbox
                key={star}
                label={'★'.repeat(star)}
                checked={local.starRatings.includes(star)}
                onChange={() => toggleArray('starRatings', star)}
              />
            ))}
          </div>

          <Divider />
          <SectionTitle>Amenities</SectionTitle>
          <div className="flex flex-col gap-2">
            {['Pool', 'Spa', 'Free Wi-Fi', 'Restaurant', 'Gym'].map(amenity => (
              <Checkbox
                key={amenity}
                label={amenity}
                checked={local.amenities.includes(amenity)}
                onChange={() => toggleArray('amenities', amenity)}
              />
            ))}
          </div>
        </>
      )}

      {/* ── BUNDLES ── */}
      {type === 'bundles' && (
        <>
          <Divider />
          <SectionTitle>Duration</SectionTitle>
          <div className="flex flex-col gap-2">
            {['3–5 nights', '6–8 nights', '9+ nights'].map(dur => (
              <Checkbox
                key={dur}
                label={dur}
                checked={local.durations.includes(dur)}
                onChange={() => toggleArray('durations', dur)}
              />
            ))}
          </div>
        </>
      )}
    </aside>
  )
}
