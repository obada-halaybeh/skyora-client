import { useState, useEffect } from "react";
import TopNav from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import SearchPill from "../components/home/SearchPill";
import FilterSidebar from "../components/common/FilterSidebar";
import HotelCard from "../components/hotels/HotelCard";
import { API } from "../config";
import { useSearchParams } from "react-router-dom";

export default function Hotels() {
  const [maxPrice, setMaxPrice] = useState(2000);
  const [checks, setChecks] = useState({});

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const where = searchParams.get("where") || "";

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await fetch(`${API}/hotels`);
      const data = await res.json();
      setHotels(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load hotels");
      setLoading(false);
    }
  };

  const toggle = (label) => {
    setChecks({ ...checks, [label]: !checks[label] });
  };

  const checkedStars = Object.keys(checks).filter((label) => checks[label]);

  const visibleHotels = hotels.filter((h) => {
    const okStatus = h.status === "Active";
    const okPrice = h.price <= maxPrice;
    const okStars =
      checkedStars.length === 0 || checkedStars.includes(`${h.stars} stars`);
    const okWhere =
      where === "" || h.country.toLowerCase().includes(where.toLowerCase());
    return okStatus && okPrice && okStars && okWhere;
  });

  return (
    <div className="bg-canvas min-h-screen">
      <TopNav activeTab="Hotels" />

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 sm:px-8 py-8 max-w-[1300px] mx-auto">
        <FilterSidebar
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          checks={checks}
          toggle={toggle}
          groupTitle="Star Rating"
          options={["5 stars", "4 stars", "3 stars"]}
        />

        <div className="flex-1">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold">
              Hotels in Dubai{" "}
              <span className="text-sm text-ash font-medium">
                ({visibleHotels.length} properties)
              </span>
            </h2>
          </div>

          {/* 3-column grid */}
          {loading ? (
            <p className="text-ash py-10 text-center">Loading hotels...</p>
          ) : error ? (
            <p className="text-error py-10 text-center">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleHotels.map((h) => (
                <HotelCard key={h.id} {...h} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
