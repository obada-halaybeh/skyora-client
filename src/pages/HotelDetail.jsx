import { useParams } from "react-router-dom";
import TopNav from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import BookingPanel from "../components/common/BookingPanel";
import Stars from "../components/hotels/Stars";
import Button from "../components/common/Button";
import { API } from "../config";
import ReviewsSection from "../components/common/ReviewsSection";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HotelDetail() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetchHotel();
  }, [id]);

  const fetchHotel = async () => {
    try {
      const res = await fetch(`${API}/hotels/${id}`);
      const data = await res.json();
      setHotel(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRoom) localStorage.setItem("skyora_room", selectedRoom);
  }, [selectedRoom]);

  if (loading) {
    return <p className="p-10 text-center">Loading hotel...</p>;
  }

  if (!hotel || !hotel.id) {
    return <p className="p-10 text-center">Hotel not found.</p>;
  }

  return (
    <div className="bg-canvas min-h-screen">
      <TopNav activeTab="Hotels" />

      {/* Image gallery */}
      <div className="grid grid-cols-2 gap-1 h-[420px] overflow-hidden">
        <img
          src={`https://picsum.photos/seed/${hotel.gallerySeeds[0]}/720/480`}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="grid grid-cols-2 gap-1">
          {hotel.gallerySeeds.slice(1, 5).map((seed) => (
            <img
              key={seed}
              src={`https://picsum.photos/seed/${seed}/360/236`}
              alt=""
              className="w-full h-full object-cover"
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 py-10">
        <div className="flex gap-12">
          {/* LEFT */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold mb-2">{hotel.name}</h1>
              <div className="flex items-center gap-3 flex-wrap text-sm text-ash font-medium">
                <Stars rating={hotel.rating} />
                <span>{hotel.review_count.toLocaleString()} reviews</span>
                <span>·</span>
                <span>{hotel.location}</span>
                <span>·</span>
                <span className="text-amber">{"★".repeat(hotel.stars)}</span>
              </div>
            </div>

            {/* Rating highlight */}
            <div className="border-y border-hairline py-7 mb-8 text-center">
              <p className="text-5xl font-extrabold leading-none">
                {hotel.rating}
              </p>
              <p className="text-[11px] font-bold tracking-wide mt-2">
                GUEST FAVOURITE
              </p>
              <p className="text-[13px] text-ash font-medium mt-1">
                One of the most-loved hotels on Skyora
              </p>
            </div>

            {/* Amenities */}
            <div className="border-b border-hairline pb-8 mb-8">
              <h2 className="text-xl font-bold mb-5">What this place offers</h2>
              <div className="grid grid-cols-2 gap-3">
                {hotel.offers.map((offer) => {
                  const emoji = offer.split(" ")[0];
                  const text = offer.split(" ").slice(1).join(" ");
                  return (
                    <div
                      key={offer}
                      className="flex items-center gap-3 text-[15px] font-medium"
                    >
                      <span className="text-xl">{emoji}</span>
                      <span>{text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rooms */}
            <div className="border-b border-hairline pb-8 mb-8">
              <h2 className="text-xl font-bold mb-5">Available Rooms</h2>
              <div className="flex flex-col gap-4">
                {hotel.rooms.map((room) => {
                  const picked = selectedRoom === room.type;
                  return (
                    <div
                      key={room.type}
                      className={`flex gap-5 border rounded-2xl overflow-hidden transition-all ${
                        picked ? "border-rausch" : "border-hairline"
                      }`}
                    >
                      <img
                        src={`https://picsum.photos/seed/${room.img_seed}/300/180`}
                        alt={room.type}
                        className="w-[220px] h-[150px] object-cover shrink-0"
                      />
                      <div className="py-5 pr-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold mb-1">
                            {room.type}
                          </h3>
                          <p className="text-[13px] text-ash font-medium">
                            {room.size} · {room.guests} guests
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xl font-bold">
                            ${room.price}
                            <span className="text-[13px] text-ash font-medium">
                              {" "}
                              / night
                            </span>
                          </p>
                          <Button
                            variant={picked ? "primary" : "secondary"}
                            size="sm"
                            onClick={() => setSelectedRoom(room.type)}
                          >
                            {picked ? "Selected" : "Select"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <ReviewsSection title="Guest Reviews" reviews={hotel.reviews} />
          </div>

          {/* RIGHT: sticky booking panel */}
          <div className="shrink-0">
            <div className="sticky top-[100px]">
              <Link to={`/checkout/hotel/${hotel.id}`}>
                <BookingPanel
                  price={hotel.price}
                  unit="per night"
                  cta="Reserve"
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
