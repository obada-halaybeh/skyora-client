import TopNav from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import SearchPill from "../components/home/SearchPill";
import FilterSidebar from "../components/common/FilterSidebar";
import FlightCard from "../components/flights/FlightCard";
import { useState } from "react";

export default function Flights() {
  const [maxPrice, setMaxPrice] = useState(2000);
  const [checks, setChecks] = useState({});
  const toggle = (label) => {
    setChecks({ ...checks, [label]: !checks[label] });
  };
  const flights = [
    {
      airline: "Emirates",
      from: "LHR",
      to: "DXB",
      depart: "08:15",
      arrive: "18:35",
      duration: "7h 20m",
      stops: "1 stop",
      price: 429,
      direct: false,
    },
    {
      airline: "British Airways",
      from: "LHR",
      to: "DXB",
      depart: "10:30",
      arrive: "20:45",
      duration: "7h 15m",
      stops: "1 stop",
      price: 389,
      direct: false,
    },
    {
      airline: "Emirates",
      from: "LHR",
      to: "DXB",
      depart: "14:00",
      arrive: "00:20+1",
      duration: "7h 20m",
      stops: "Non-stop",
      price: 1412,
      direct: true,
    },
    {
      airline: "Lufthansa",
      from: "LHR",
      to: "DXB",
      depart: "06:45",
      arrive: "19:10",
      duration: "9h 25m",
      stops: "1 stop in FRA",
      price: 318,
      direct: false,
    },
    {
      airline: "Singapore Airlines",
      from: "LHR",
      to: "DXB",
      depart: "21:55",
      arrive: "10:15+1",
      duration: "7h 20m",
      stops: "Non-stop",
      price: 580,
      direct: true,
    },
  ];
  const checkedAirlines = Object.keys(checks).filter((label) => checks[label]);
  const visibleFlights = flights.filter((f) => {
    const okPrice = f.price <= maxPrice;
    const okAirline =
      checkedAirlines.length === 0 || checkedAirlines.includes(f.airline);
    return okPrice && okAirline;
  });
  return (
    <div className="bg-canvas min-h-screen">
      <TopNav activeTab="Flights" />

      <div className="bg-cloud border-b border-hairline px-8 py-4 flex justify-center">
        <SearchPill
          where="London → Dubai"
          dates="May 15–22"
          travelers="2 adults"
        />
      </div>

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
          <div className="flex gap-0.5 mb-5 items-stretch">
            <div className="flex-1" />

            <p className="text-sm font-medium text-ash self-center">
              {visibleFlights.length} results found
            </p>
          </div>

          {visibleFlights.map((f, i) => (
            <FlightCard key={i} {...f} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
