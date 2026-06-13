import { useState } from "react";
import TopNav from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import TripCard from "../components/trips/TripCard";
import ReviewModal from "../components/trips/ReviewModal";
import { trips as initialTrips } from "../data/trips";

export default function Trips() {
  const [tab, setTab] = useState("upcoming");
  const [reviewing, setReviewing] = useState(null); // which trip's modal is open
  const [reviewed, setReviewed] = useState({}); // submitted reviews by trip id

  const [tripData, setTripData] = useState(initialTrips);

  const tabs = [
    {
      id: "upcoming",
      label: "Upcoming Trips",
      count: tripData.upcoming.length,
    },
    { id: "past", label: "Past Trips", count: tripData.past.length },
    { id: "cancelled", label: "Cancelled", count: tripData.cancelled.length },
  ];

  const handleSubmitReview = (data) => {
    setReviewed({ ...reviewed, [reviewing.id]: data });
    setReviewing(null);
  };
  const handleCancel = (trip) => {
    setTripData((prev) => ({
      ...prev,
      upcoming: prev.upcoming.filter((t) => t.id !== trip.id),
      cancelled: [
        { ...trip, status: "Cancelled", refunded: true },
        ...prev.cancelled,
      ],
    }));
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
      </div>

      {/* Review modal — only renders when a trip is selected */}
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
