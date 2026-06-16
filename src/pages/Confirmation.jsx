import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TopNav from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";
import { API } from "../config";

export default function Confirmation() {
  const { type, id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItem();
  }, [type, id]);

  const fetchItem = async () => {
    try {
      const res = await fetch(`${API}/${type}s/${id}`);
      const data = await res.json();
      setItem(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-10 text-center">Loading confirmation...</p>;
  }

  if (!item || !item.id) {
    return <p className="p-10 text-center">Booking not found.</p>;
  }

  let summary = null;
  if (type === "flight") {
    summary = {
      title: `${item.airline} · ${item.flight_no}`,
      rows: [
        ["Route", `${item.origin} → ${item.destination}`],
        ["Departure", item.depart],
        ["Arrival", item.arrive],
        ["Duration", item.duration],
      ],
      price: item.price,
      imgSeed: 542,
    };
  } else if (type === "hotel") {
    summary = {
      title: item.name,
      rows: [
        ["Location", item.location],
        ["Rating", `${item.rating} (${item.stars}-star)`],
      ],
      price: item.price,
      imgSeed: item.img_seed,
    };
  } else if (type === "bundle") {
    summary = {
      title: item.title,
      rows: [
        ["Destination", item.destination],
        ["Flight", `${item.airline} · ${item.flight_no}`],
        ["Hotel", item.hotel_name],
        ["Nights", `${item.nights} nights`],
        ["Travelers", item.travelers],
      ],
      price: item.price,
      imgSeed: item.img_seed,
    };
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
