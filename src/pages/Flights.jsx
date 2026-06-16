import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { API } from "../config";
import TopNav from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import FilterSidebar from "../components/common/FilterSidebar";
import FlightCard from "../components/flights/FlightCard";

export default function Flights() {
  const [searchParams] = useSearchParams();
  const where = searchParams.get("where") || "";

  // Data from the backend
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [maxPrice, setMaxPrice] = useState(2000);
  const [checks, setChecks] = useState({});

  // Load flights from the API on mount
  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await fetch(`${API}/flights`);
      const data = await res.json();
      setFlights(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load flights");
      setLoading(false);
    }
  };

  const toggle = (label) => {
    setChecks({ ...checks, [label]: !checks[label] });
  };

  const checkedAirlines = Object.keys(checks).filter((label) => checks[label]);

  const airlines = [...new Set(flights.map((f) => f.airline))].sort();

  const visibleFlights = flights.filter((f) => {
    const okStatus = f.status === "Active";
    const okPrice = f.price <= maxPrice;
    const okAirline =
      checkedAirlines.length === 0 || checkedAirlines.includes(f.airline);
    const okWhere =
      where === "" || f.country.toLowerCase().includes(where.toLowerCase());
    return okStatus && okPrice && okAirline && okWhere;
  });

  return (
    <div className="bg-canvas min-h-screen">
      <TopNav activeTab="Flights" />

      <div className="flex gap-8 px-8 py-8 max-w-[1200px] mx-auto">
        <FilterSidebar
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          checks={checks}
          toggle={toggle}
          groupTitle="Airlines"
          options={airlines}
        />

        <div className="flex-1">
          <h2 className="text-lg font-bold mb-5">
            {where ? `Results for "${where}"` : "All Flights"}{" "}
            <span className="text-sm text-ash font-medium">
              ({visibleFlights.length} found)
            </span>
          </h2>

          {/* Loading / error / data states */}
          {loading ? (
            <p className="text-ash py-10 text-center">Loading flights...</p>
          ) : error ? (
            <p className="text-error py-10 text-center">{error}</p>
          ) : visibleFlights.length > 0 ? (
            visibleFlights.map((f) => <FlightCard key={f.id} {...f} />)
          ) : (
            <p className="text-ash py-10 text-center">
              No flights found{where && ` for "${where}"`}.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
