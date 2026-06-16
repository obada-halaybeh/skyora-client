import TopNav from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import BookingPanel from "../components/common/BookingPanel";
import SeatMap from "../components/flights/SeatMap";
import { useParams } from "react-router-dom";
import { API } from "../config";
import ReviewsSection from "../components/common/ReviewsSection";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FlightDetail() {
  const { id } = useParams();

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState(null);

  // Load this flight from the backend
  useEffect(() => {
    fetchFlight();
  }, [id]);

  const fetchFlight = async () => {
    try {
      const res = await fetch(`${API}/flights/${id}`);
      const data = await res.json();
      setFlight(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSeat) {
      localStorage.setItem("skyora_seat", selectedSeat);
    }
  }, [selectedSeat]);

  if (loading) {
    return <p className="p-10 text-center">Loading flight...</p>;
  }

  if (!flight || !flight.id) {
    return <p className="p-10 text-center">Flight not found.</p>;
  }

  const baggage = [
    { icon: "👜", title: "Hand Luggage", desc: "1 piece, 7kg, cabin" },
    { icon: "🧳", title: "Checked Bag", desc: "1 piece, 23kg included" },
    { icon: "🎒", title: "Personal Item", desc: "1 small bag, free" },
  ];

  return (
    <div className="bg-canvas min-h-screen">
      <TopNav activeTab="Flights" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* LEFT: main content */}
          <div className="flex-1">
            {/* Route header */}
            <div className="mb-8">
              <p className="text-[13px] text-ash font-medium mb-2">
                {flight.airline} · Economy · {flight.flight_no}
              </p>
              <div className="flex items-center gap-3 sm:gap-6 mb-4">
                {/* Departure */}
                <div>
                  <p className="text-3xl sm:text-5xl font-extrabold">{flight.depart}</p>
                  <p className="text-base font-bold mt-1">{flight.from_city}</p>
                  <p className="text-sm text-ash">{flight.from_terminal}</p>
                </div>

                {/* Middle */}
                <div className="flex-1 text-center">
                  <p className="text-[13px] text-ash font-medium">
                    {flight.duration} ·{" "}
                    {flight.direct ? "Non-stop" : flight.stops}
                  </p>
                  <div className="flex items-center gap-1 my-2">
                    <div className="h-0.5 flex-1 bg-hairline" />
                    <span className="text-lg">✈</span>
                    <div className="h-0.5 flex-1 bg-hairline" />
                  </div>
                  {flight.direct && (
                    <p className="text-[11px] text-success font-bold">
                      DIRECT FLIGHT
                    </p>
                  )}
                </div>

                {/* Arrival */}
                <div className="text-right">
                  <p className="text-3xl sm:text-5xl font-extrabold">{flight.arrive}</p>
                  <p className="text-base font-bold mt-1">{flight.to_city}</p>
                  <p className="text-sm text-ash">{flight.to_terminal}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-3">
                {[flight.flight_date, flight.aircraft].map((t) => (
                  <span
                    key={t}
                    className="bg-cloud text-ash text-[13px] font-medium px-3 py-1.5 rounded-lg"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Baggage */}
            <div className="border-t border-hairline pt-8 mb-8">
              <h2 className="text-xl font-bold mb-4">Baggage Policy</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {baggage.map((b) => (
                  <div key={b.title} className="bg-cloud rounded-xl p-4">
                    <div className="text-2xl mb-2">{b.icon}</div>
                    <p className="text-sm font-bold">{b.title}</p>
                    <p className="text-[13px] text-ash font-medium mt-1">
                      {b.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Seat map */}
            <div className="border-t border-hairline pt-8">
              <h2 className="text-xl font-bold mb-5">Select Your Seat</h2>
              <SeatMap selected={selectedSeat} setSelected={setSelectedSeat} />
            </div>
            <div className="mt-8">
              <ReviewsSection
                title="Traveler Reviews"
                reviews={flight.reviews}
              />
            </div>
          </div>

          {/* RIGHT: sticky booking panel */}
          <div className="lg:shrink-0">
            <div className="lg:sticky lg:top-[100px]">
              <Link to={`/checkout/flight/${flight.id}`}>
                <BookingPanel
                  price={flight.price}
                  unit="per person"
                  cta="Reserve Now"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
