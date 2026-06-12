import { useState } from "react";
import TopNav from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import SearchPill from "../components/home/SearchPill";
import FilterSidebar from "../components/common/FilterSidebar";
import BundleCard from "../components/home/BundleCard";

export default function Bundles() {
  const [maxPrice, setMaxPrice] = useState(2000);
  const [checks, setChecks] = useState({});

  const toggle = (label) => {
    setChecks({ ...checks, [label]: !checks[label] });
  };

  const bundles = [
    {
      title: "Dubai Luxury Escape",
      dest: "Dubai, UAE",
      flight: "Emirates · Direct",
      hotel: "Burj Al Arab",
      nights: 5,
      price: 1290,
      original: 1680,
      imgSeed: 159,
    },
    {
      title: "Paris City Break",
      dest: "Paris, France",
      flight: "Air France · Direct",
      hotel: "Le Meurice",
      nights: 4,
      price: 980,
      original: 1240,
      imgSeed: 237,
    },
    {
      title: "Tokyo Discovery",
      dest: "Tokyo, Japan",
      flight: "Singapore Air · 1 stop",
      hotel: "Park Hyatt Tokyo",
      nights: 7,
      price: 1840,
      original: 2380,
      imgSeed: 26,
    },
    {
      title: "Bali Retreat",
      dest: "Bali, Indonesia",
      flight: "Qatar Airways · 1 stop",
      hotel: "COMO Uma Ubud",
      nights: 8,
      price: 1420,
      original: 1880,
      imgSeed: 488,
    },
    {
      title: "New York Weekender",
      dest: "New York, USA",
      flight: "British Airways · Direct",
      hotel: "The Plaza Hotel",
      nights: 3,
      price: 870,
      original: 1120,
      imgSeed: 164,
    },
    {
      title: "Maldives Overwater",
      dest: "Maldives",
      flight: "Emirates · Direct",
      hotel: "Soneva Jani",
      nights: 6,
      price: 3200,
      original: 4100,
      imgSeed: 15,
    },
  ];

  const checkedLengths = Object.keys(checks).filter((label) => checks[label]);

  const bucketOf = (nights) => {
    if (nights <= 4) return "Short (1–4 nights)";
    if (nights <= 7) return "Medium (5–7 nights)";
    return "Long (8+ nights)";
  };

  const visibleBundles = bundles.filter((b) => {
    const okPrice = b.price <= maxPrice;
    const okLength =
      checkedLengths.length === 0 ||
      checkedLengths.includes(bucketOf(b.nights));
    return okPrice && okLength;
  });
  return (
    <div className="bg-canvas min-h-screen">
      <TopNav activeTab="Bundles" />

      <div className="bg-cloud border-b border-hairline px-8 py-4 flex justify-center">
        <SearchPill where="Anywhere" dates="May 2026" travelers="2 adults" />
      </div>

      {/* Main layout */}
      <div className="flex gap-8 px-8 py-8 max-w-[1300px] mx-auto">
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
          <div className="grid grid-cols-2 gap-6">
            {visibleBundles.map((b) => (
              <BundleCard key={b.title} {...b} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
