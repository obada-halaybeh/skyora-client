import { useState, useEffect } from "react";
import TopNav from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import TripCard from "../components/trips/TripCard";
import ReviewModal from "../components/trips/ReviewModal";
import { API } from "../config";

export default function Trips() {
  const [tab, setTab] = useState("upcoming");
  const [reviewing, setReviewing] = useState(null);
  const [reviewed, setReviewed] = useState({});

  // Bookings grouped into the three tabs
  const [tripData, setTripData] = useState({
    upcoming: [],
    past: [],
    cancelled: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      const res = await fetch(`${API}/bookings`);
      const all = await res.json();

      // Only this user's bookings
      const mine = all.filter((b) => b.user_email === user.email);

      // Group into upcoming / past / cancelled
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const grouped = { upcoming: [], past: [], cancelled: [] };

      mine.forEach((b) => {
        if (b.status === "Cancelled") {
          grouped.cancelled.push(b);
        } else {
          // Confirmed: future date = upcoming, past date = past
          const tripDate = new Date(b.booking_date);
          if (tripDate >= today) {
            grouped.upcoming.push(b);
          } else {
            grouped.past.push(b);
          }
        }
      });

      setTripData(grouped);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const tabs = [
    {
      id: "upcoming",
      label: "Upcoming Trips",
      count: tripData.upcoming.length,
    },
    { id: "past", label: "Past Trips", count: tripData.past.length },
    { id: "cancelled", label: "Cancelled", count: tripData.cancelled.length },
  ];

  // Submit a review to the backend, then mark this trip reviewed
  const handleSubmitReview = async (data) => {
    const review = {
      type: reviewing.type,
      item_id: reviewing.item_id,
      name: reviewing.customer,
      rating: data.rating,
      text: data.text,
      review_date: new Date().toLocaleDateString(),
    };

    try {
      await fetch(`${API}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });
    } catch (err) {
      console.error("Review failed", err);
    }

    setReviewed({ ...reviewed, [reviewing.id]: data });
    setReviewing(null);
  };

  // Cancel a trip — updates the database, then refreshes
  const handleCancel = async (trip) => {
    try {
      await fetch(`${API}/bookings/${trip.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" }),
      });
    } catch (err) {
      console.error("Cancel failed", err);
    }
    fetchTrips(); // reload from the backend
  };

  return (
    <div className="bg-canvas min-h-screen">
      <TopNav />

      <div className="max-w-[1200px] mx-auto px-8 py-10">
        {/* Heading */}
        <div className="mb-7">
          <p className="text-[11px] font-bold text-ash tracking-wide mb-1.5">
            DASHBOARD
          </p>
          <h1 className="text-4xl font-extrabold">My Trips</h1>
          <p className="text-[15px] text-ash mt-1.5">
            Manage upcoming travel, review past adventures, and share your
            experience.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-hairline mb-7 flex gap-1">
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative px-5 py-3.5 cursor-pointer flex items-center gap-2 text-[15px] font-bold ${
                  active ? "text-ink" : "text-ash"
                }`}
              >
                {t.label}
                <span
                  className={`inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded-full text-[11px] font-extrabold ${
                    active ? "bg-rausch text-white" : "bg-cloud text-ash"
                  }`}
                >
                  {t.count}
                </span>
                {active && (
                  <div className="absolute left-2 right-2 -bottom-px h-0.5 bg-skyora-gradient rounded" />
                )}
              </div>
            );
          })}
        </div>

        {/* Trip list */}
        {loading ? (
          <p className="text-ash py-10 text-center">Loading your trips...</p>
        ) : tripData[tab].length === 0 ? (
          <p className="text-ash py-10 text-center">No trips here yet.</p>
        ) : (
          <div>
            {tripData[tab].map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                tab={tab}
                onReview={setReviewing}
                onCancel={handleCancel}
                reviewed={reviewed[trip.id]}
              />
            ))}
          </div>
        )}
      </div>

      {/* Review modal */}
      {reviewing && (
        <ReviewModal
          trip={reviewing}
          onClose={() => setReviewing(null)}
          onSubmit={handleSubmitReview}
        />
      )}

      <Footer />
    </div>
  );
}
