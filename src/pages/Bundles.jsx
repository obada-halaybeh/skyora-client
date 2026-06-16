import { useState, useEffect } from "react";
import TopNav from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import SearchPill from "../components/home/SearchPill";
import FilterSidebar from "../components/common/FilterSidebar";
import BundleCard from "../components/home/BundleCard";
import { API } from "../config";
import { useSearchParams } from "react-router-dom";

export default function Bundles() {
  const [maxPrice, setMaxPrice] = useState(2000);
  const [checks, setChecks] = useState({});

  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const where = searchParams.get("where") || "";

  useEffect(() => {
    fetchBundles();
  }, []);

  const fetchBundles = async () => {
    try {
      const res = await fetch(`${API}/bundles`);
      const data = await res.json();
      setBundles(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load bundles");
      setLoading(false);
    }
  };

  const toggle = (label) => {
    setChecks({ ...checks, [label]: !checks[label] });
  };

  const checkedLengths = Object.keys(checks).filter((label) => checks[label]);

  const bucketOf = (nights) => {
    if (nights <= 4) return "Short (1–4 nights)";
    if (nights <= 7) return "Medium (5–7 nights)";
    return "Long (8+ nights)";
  };

  const visibleBundles = bundles.filter((b) => {
    const okStatus = b.status === "Active";
    const okPrice = b.price <= maxPrice;
    const okLength =
      checkedLengths.length === 0 ||
      checkedLengths.includes(bucketOf(b.nights));
    const okWhere =
      where === "" || b.destination.toLowerCase().includes(where.toLowerCase());
    return okStatus && okPrice && okLength && okWhere;
  });

  return (
    <div className="bg-canvas min-h-screen">
      <TopNav activeTab="Bundles" />

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 sm:px-8 py-8 max-w-[1300px] mx-auto">
        <FilterSidebar
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          checks={checks}
          toggle={toggle}
          groupTitle="Trip Length"
          options={[
            "Short (1–4 nights)",
            "Medium (5–7 nights)",
            "Long (8+ nights)",
          ]}
        />

        <div className="flex-1">
          <h2 className="text-lg font-bold mb-5">
            Travel Packages{" "}
            <span className="text-sm text-ash font-medium">
              ({visibleBundles.length} packages)
            </span>
          </h2>

          {/* 2-column grid */}
          {loading ? (
            <p className="text-ash py-10 text-center">Loading bundles...</p>
          ) : error ? (
            <p className="text-error py-10 text-center">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {visibleBundles.map((b) => (
                <BundleCard key={b.id} {...b} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
