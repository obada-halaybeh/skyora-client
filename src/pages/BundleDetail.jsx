import { useParams } from "react-router-dom";
import TopNav from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import BookingPanel from "../components/common/BookingPanel";
import ReviewsSection from "../components/common/ReviewsSection";
import AirlineLogo from "../components/flights/AirlineLogo";
import { bundles } from "../data/bundles";

export default function BundleDetail() {
  const { id } = useParams();
  const bundle = bundles.find((b) => b.id === Number(id));

  if (!bundle) {
    return <p className="p-10 text-center">Bundle not found.</p>;
  }

  const savings = Math.round((1 - bundle.price / bundle.original) * 100);

  return (
    <div className="bg-canvas min-h-screen">
      <TopNav activeTab="Bundles" />

      <div className="max-w-[1200px] mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[13px] text-ash font-medium mb-2">
            {bundle.dest} · {bundle.nights} nights · {bundle.travelers}
          </p>
          <h1 className="text-4xl font-extrabold mb-3">{bundle.title}</h1>
          <div className="flex gap-3">
            <span className="bg-rausch/10 text-rausch text-[13px] font-bold px-3 py-1.5 rounded-lg">
              Save {savings}%
            </span>
            <span className="bg-cloud text-ash text-[13px] font-medium px-3 py-1.5 rounded-lg">
              Flight + Hotel
            </span>
          </div>
        </div>

        <div className="flex gap-12">
          {/* LEFT */}
          <div className="flex-1">
            {/* Flight + Hotel summary cards */}
            <div className="grid grid-cols-2 gap-5 mb-8">
              {/* Flight card */}
              <div className="border border-hairline rounded-2xl p-6">
                <p className="text-[11px] font-bold text-ash mb-4 tracking-wide">
                  OUTBOUND FLIGHT
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <AirlineLogo name={bundle.airline} />
                  <div>
                    <p className="text-sm font-bold">
                      {bundle.airline} · {bundle.flightNo}
                    </p>
                    <p className="text-xs text-ash">Economy</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-extrabold">{bundle.depart}</p>
                    <p className="text-xs text-ash">{bundle.from}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[11px] text-ash">{bundle.duration}</p>
                    <div className="h-px bg-hairline w-14 my-1 mx-auto" />
                    <p className="text-[11px] text-success font-bold">Direct</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold">{bundle.arrive}</p>
                    <p className="text-xs text-ash">{bundle.to}</p>
                  </div>
                </div>
              </div>

              {/* Hotel card */}
              <div className="border border-hairline rounded-2xl overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${bundle.imgSeed}/400/120`}
                  alt={bundle.hotelName}
                  className="w-full h-[100px] object-cover"
                />
                <div className="p-4">
                  <p className="text-[11px] font-bold text-ash mb-2 tracking-wide">
                    ACCOMMODATION
                  </p>
                  <p className="text-base font-bold">{bundle.hotelName}</p>
                  <p className="text-xs text-ash mt-0.5">
                    {bundle.nights} nights · {bundle.roomType}
                  </p>
                  <p className="text-xs text-amber mt-1">
                    {"★".repeat(5)} · {bundle.hotelRating} (
                    {bundle.hotelReviews.toLocaleString()} reviews)
                  </p>
                </div>
              </div>
            </div>

            {/* Itinerary Timeline */}
            <div className="border-t border-hairline pt-8 mb-8">
              <h2 className="text-xl font-bold mb-5">Your Itinerary</h2>
              <div className="relative pl-8">
                {/* The vertical line */}
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-hairline" />
                {bundle.timeline.map((step, i) => (
                  <div key={i} className="relative mb-5">
                    {/* The dot */}
                    <div
                      className={`absolute -left-7 top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${
                        step.type === "flight" ? "bg-rausch" : "bg-info"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <p className="text-xs text-ash font-semibold mb-0.5">
                      {step.time}
                    </p>
                    <p className="text-[15px] font-semibold">{step.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-cloud rounded-2xl p-6 mb-8">
              <h2 className="text-lg font-bold mb-4">Package Breakdown</h2>
              {bundle.breakdown.map((row) => (
                <div
                  key={row.item}
                  className={`flex justify-between text-sm font-medium mb-2.5 ${
                    row.price < 0 ? "text-success" : "text-ink"
                  }`}
                >
                  <span>{row.item}</span>
                  <span className="font-bold">
                    {row.price < 0
                      ? `-$${Math.abs(row.price)}`
                      : `$${row.price}`}
                  </span>
                </div>
              ))}
              <div className="border-t border-hairline pt-3 flex justify-between text-lg font-extrabold">
                <span>Total Package</span>
                <span>${bundle.price}</span>
              </div>
            </div>

            {/* Reviews */}
            <ReviewsSection title="Traveler Reviews" reviews={bundle.reviews} />
          </div>

          {/* RIGHT: sticky booking panel */}
          <div className="shrink-0">
            <div className="sticky top-[100px]">
              <BookingPanel
                price={bundle.price}
                unit="total package"
                cta="Book Package"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
