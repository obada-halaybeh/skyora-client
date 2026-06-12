import { useState } from "react";
import TopNav from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import SearchPill from "../components/home/SearchPill";
import FilterSidebar from "../components/common/FilterSidebar";
import HotelCard from "../components/hotels/HotelCard";

export default function Hotels() {
  const [maxPrice, setMaxPrice] = useState(2000);
  const [checks, setChecks] = useState({});

  const toggle = (label) => {
    setChecks({ ...checks, [label]: !checks[label] });
  };

  const hotels = [
    {
      name: "Burj Al Arab",
      location: "Jumeirah Beach, Dubai",
      stars: 5,
      rating: 4.9,
      reviews: 2840,
      price: 980,
      imgSeed: 251,
      amenities: ["Pool", "Spa", "WiFi", "Restaurant"],
    },
    {
      name: "Atlantis The Palm",
      location: "Palm Jumeirah, Dubai",
      stars: 5,
      rating: 4.7,
      reviews: 5100,
      price: 620,
      imgSeed: 355,
      amenities: ["Waterpark", "Pool", "Spa", "WiFi"],
    },
    {
      name: "Address Downtown",
      location: "Downtown Dubai",
      stars: 5,
      rating: 4.8,
      reviews: 1920,
      price: 450,
      imgSeed: 188,
      amenities: ["Pool", "WiFi", "Gym", "Bar"],
    },
    {
      name: "JW Marriott Marquis",
      location: "Business Bay, Dubai",
      stars: 5,
      rating: 4.6,
      reviews: 3200,
      price: 320,
      imgSeed: 267,
      amenities: ["Pool", "WiFi", "Gym", "Spa"],
    },
    {
      name: "Sofitel Dubai",
      location: "Downtown Dubai",
      stars: 4,
      rating: 4.5,
      reviews: 1400,
      price: 240,
      imgSeed: 312,
      amenities: ["Pool", "WiFi", "Restaurant"],
    },
    {
      name: "Hilton Dubai Creek",
      location: "Deira, Dubai",
      stars: 4,
      rating: 4.4,
      reviews: 890,
      price: 180,
      imgSeed: 433,
      amenities: ["WiFi", "Pool", "Gym"],
    },
  ];

  const checkedStars = Object.keys(checks).filter((label) => checks[label]);

  const visibleHotels = hotels.filter((h) => {
    const okPrice = h.price <= maxPrice;
    const okStars =
      checkedStars.length === 0 || checkedStars.includes(`${h.stars} stars`);
    return okPrice && okStars;
  });
  return (
    <div className="bg-canvas min-h-screen">
      <TopNav activeTab="Hotels" />

      {/* Search strip */}
      <div className="bg-cloud border-b border-hairline px-8 py-4 flex justify-center">
        <SearchPill where="Dubai, UAE" dates="May 15–22" travelers="2 guests" />
      </div>

      {/* Main layout */}
      <div className="flex gap-8 px-8 py-8 max-w-[1300px] mx-auto">
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
          <div className="grid grid-cols-3 gap-6">
            {visibleHotels.map((h) => (
              <HotelCard key={h.name} {...h} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
