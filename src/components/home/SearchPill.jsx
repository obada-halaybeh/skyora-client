import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchPill({
  type,
  setType,
  where,
  setWhere,
  dates,
  setDates,
}) {
  return (
    <div className="inline-flex items-center bg-canvas rounded-[40px] border border-hairline shadow-[rgba(0,0,0,0.04)_0_2px_6px] overflow-hidden h-16">
      {/* Type selector */}
      <div className="px-5">
        <p className="text-[11px] font-bold text-ink">Type</p>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="text-sm font-medium text-ash bg-transparent outline-none cursor-pointer -ml-0.5"
        >
          <option value="flights">Flights</option>
          <option value="hotels">Hotels</option>
          <option value="bundles">Bundles</option>
        </select>
      </div>

      <div className="w-px self-stretch bg-hairline my-2.5" />

      {/* Where */}
      <div className="px-5">
        <p className="text-[11px] font-bold text-ink">Where</p>
        <input
          type="text"
          value={where}
          onChange={(e) => setWhere(e.target.value)}
          placeholder="Search destination"
          className="text-sm font-medium text-ash bg-transparent outline-none w-[140px] placeholder:text-ash"
        />
      </div>

      <div className="w-px self-stretch bg-hairline my-2.5" />

      {/* Dates */}
      <div className="px-5">
        <p className="text-[11px] font-bold text-ink">Date</p>
        <input
          type="date"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          className="text-sm font-medium text-ash bg-transparent outline-none cursor-pointer"
        />
      </div>

      {/* Search button → goes to the chosen results page with the query */}
      <Link
        to={`/${type}?where=${encodeURIComponent(where)}`}
        className="w-12 h-12 rounded-full bg-skyora-gradient flex items-center justify-center mx-2 shadow-[0_2px_8px_rgba(255,56,92,0.4)] shrink-0"
      >
        <Search size={18} className="text-white" />
      </Link>
    </div>
  );
}
