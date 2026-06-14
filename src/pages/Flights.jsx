import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import TopNav from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import SearchPill from "../components/home/SearchPill";
import FilterSidebar from "../components/common/FilterSidebar";
import FlightCard from "../components/flights/FlightCard";
import { flights } from "../data/flights";

export default function Flights() {
  // Read ?where= from the URL (set by the search pill)
  const [searchParams] = useSearchParams();
  const where = searchParams.get("where") || "";

  const [maxPrice, setMaxPrice] = useState(2000);
  const [checks, setChecks] = useState({});

  const toggle = (label) => {
    setChecks({ ...checks, [label]: !checks[label] });
  };

  const checkedAirlines = Object.keys(checks).filter((label) => checks[label]);

  const visibleFlights = flights.filter((f) => {
    const okPrice = f.price <= maxPrice;
    const okAirline =
      checkedAirlines.length === 0 || checkedAirlines.includes(f.airline);
    const okWhere =
      where === "" || f.country.toLowerCase().includes(where.toLowerCase());
    return okPrice && okAirline && okWhere;
  });

  return (
    <div className="bg-canvas min-h-screen">
      <TopNav activeTab="Flights" />

      {/* Main layout */}
      <div className="flex gap-8 px-8 py-8 max-w-[1200px] mx-auto">
        <FilterSidebar
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          checks={checks}
          toggle={toggle}
          groupTitle="Airlines"
          options={[
            "Emirates",
            "Lufthansa",
            "British Airways",
            "Singapore Airlines",
            "Qatar Airways",
          ]}
        />

        <div className="flex-1">
          {/* Results heading */}
          <h2 className="text-lg font-bold mb-5">
            {where ? `Results for "${where}"` : "All Flights"}{" "}
            <span className="text-sm text-ash font-medium">
              ({visibleFlights.length} found)
            </span>
          </h2>

          {/* Flight cards */}
          {visibleFlights.length > 0 ? (
            visibleFlights.map((f) => <FlightCard key={f.id} {...f} />)
          ) : (
            <p className="text-ash font-medium py-10 text-center">
              No flights found for "{where}". Try a different destination.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
