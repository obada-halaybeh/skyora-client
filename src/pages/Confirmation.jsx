import { useParams, Link } from "react-router-dom";
import TopNav from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";
import { flights } from "../data/flights";
import { hotels } from "../data/hotels";
import { bundles } from "../data/bundles";

export default function Confirmation() {
  const { type, id } = useParams();

  // Build a simple summary based on the booking type
  let summary = null;

  if (type === "flight") {
    const f = flights.find((x) => x.id === Number(id));
    if (f) {
      summary = {
        title: `${f.airline} · ${f.flightNo}`,
        rows: [
          ["Route", `${f.fromCity} → ${f.toCity}`],
          ["Departure", `${f.depart} · ${f.date}`],
          ["Arrival", f.arrive],
          ["Duration", f.duration],
        ],
        price: f.price,
        imgSeed: 542,
      };
    }
  } else if (type === "hotel") {
    const h = hotels.find((x) => x.id === Number(id));
    if (h) {
      summary = {
        title: h.name,
        rows: [
          ["Location", h.location],
          ["Rating", `${h.rating} (${h.stars}-star)`],
          ["Stay", `${h.nights || ""} nights`.trim() || "—"],
        ],
        price: h.price,
        imgSeed: h.imgSeed,
      };
    }
  } else if (type === "bundle") {
    const b = bundles.find((x) => x.id === Number(id));
    if (b) {
      summary = {
        title: b.title,
        rows: [
          ["Destination", b.dest],
          ["Flight", `${b.airline} · ${b.flightNo}`],
          ["Hotel", b.hotelName],
          ["Nights", `${b.nights} nights`],
          ["Travelers", b.travelers],
        ],
        price: b.price,
        imgSeed: b.imgSeed,
      };
    }
  }

  if (!summary) {
    return <p className="p-10 text-center">Booking not found.</p>;
  }

  return (
    <div className="bg-canvas min-h-screen">
      <TopNav />

      <div className="max-w-[640px] mx-auto px-8 py-16">
        {/* Success header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
            <span className="text-4xl">✓</span>
          </div>
          <h1 className="text-3xl font-extrabold mb-2">Booking Confirmed</h1>
          <p className="text-base text-ash font-medium">
            Your trip is all set. We can't wait to see you on board.
          </p>
        </div>

        {/* Trip summary card */}
        <div className="border border-hairline rounded-2xl overflow-hidden mb-8">
          <img
            src={`https://picsum.photos/seed/${summary.imgSeed}/640/200`}
            alt=""
            className="w-full h-[160px] object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-bold mb-5">{summary.title}</h2>

            <div className="space-y-3">
              {summary.rows.map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-ash font-medium">{label}</span>
                  <span className="font-semibold text-right">{value}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-hairline mt-5 pt-5 flex justify-between items-center">
              <span className="font-bold">Total Paid</span>
              <span className="text-2xl font-extrabold">${summary.price}</span>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center">
          <Link to="/">
            <Button variant="gradient" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
