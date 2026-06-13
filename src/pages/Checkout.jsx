import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopNav from "../components/layout/TopNav";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import SeatMap from "../components/flights/SeatMap";
import { bundles } from "../data/bundles";
import { hotels } from "../data/hotels";
import { flights } from "../data/flights";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { type, id } = useParams();

  let item = null;
  let rooms = [];
  let showSeat = false;
  let showRoom = false;
  let summary = null;

  if (type === "flight") {
    item = flights.find((f) => f.id === Number(id));
    showSeat = true;
    if (item) {
      summary = {
        title: `${item.airline} · ${item.flightNo}`,
        sub1: `${item.from} → ${item.to}`,
        sub2: `${item.depart} – ${item.arrive}`,
        imgSeed: 542,
        basePrice: item.price,
      };
    }
  } else if (type === "hotel") {
    item = hotels.find((h) => h.id === Number(id));
    showRoom = true;
    if (item) {
      rooms = item.rooms;
      summary = {
        title: item.name,
        sub1: item.location,
        sub2: `${item.stars}-star hotel`,
        imgSeed: item.imgSeed,
        basePrice: item.price,
      };
    }
  } else if (type === "bundle") {
    item = bundles.find((b) => b.id === Number(id));
    showSeat = true;
    showRoom = true;
    if (item) {
      const hotel = hotels.find((h) => h.id === item.hotelId);
      rooms = hotel ? hotel.rooms : [];
      summary = {
        title: item.title,
        sub1: `${item.dest} · ${item.travelers}`,
        sub2: `${item.airline} · ${item.hotelName}`,
        imgSeed: item.imgSeed,
        basePrice: item.price,
      };
    }
  }

  const keyPrefix = `checkout_${type}_${id}_`;

  const [step, setStep] = useState(
    Number(localStorage.getItem(keyPrefix + "step")) || 1,
  );

  const [traveler, setTraveler] = useState(() => {
    const saved = localStorage.getItem(keyPrefix + "traveler");
    return saved
      ? JSON.parse(saved)
      : {
          firstName: "",
          lastName: "",
          dob: "",
          passport: "",
          nationality: "",
          expiry: "",
        };
  });

  const [selectedSeat, setSelectedSeat] = useState(() => {
    if (type === "flight") {
      return (
        localStorage.getItem(keyPrefix + "seat") ||
        localStorage.getItem("skyora_seat") ||
        null
      );
    }
    return localStorage.getItem(keyPrefix + "seat") || null;
  });

  const [selectedRoom, setSelectedRoom] = useState(() => {
    if (type === "hotel") {
      return (
        localStorage.getItem(keyPrefix + "room") ||
        localStorage.getItem("skyora_room") ||
        null
      );
    }
    return localStorage.getItem(keyPrefix + "room") || null;
  });

  useEffect(() => {
    localStorage.setItem(keyPrefix + "step", step);
  }, [step, keyPrefix]);

  useEffect(() => {
    localStorage.setItem(keyPrefix + "traveler", JSON.stringify(traveler));
  }, [traveler, keyPrefix]);

  useEffect(() => {
    if (selectedSeat) localStorage.setItem(keyPrefix + "seat", selectedSeat);
  }, [selectedSeat, keyPrefix]);

  useEffect(() => {
    if (selectedRoom) localStorage.setItem(keyPrefix + "room", selectedRoom);
  }, [selectedRoom, keyPrefix]);

  if (!item) {
    return <p className="p-10 text-center">Booking not found.</p>;
  }

  const steps = ["Traveler Info", "Seat & Room", "Payment"];

  const setField = (field, value) => {
    setTraveler({ ...traveler, [field]: value });
  };

  const chosenRoom = rooms.find((r) => r.type === selectedRoom);
  const roomCost = showRoom && chosenRoom ? chosenRoom.price : 0;
  const total = summary.basePrice + roomCost;

  const handleConfirm = () => {
    localStorage.removeItem(keyPrefix + "step");
    localStorage.removeItem(keyPrefix + "traveler");
    localStorage.removeItem(keyPrefix + "seat");
    localStorage.removeItem(keyPrefix + "room");
  };

  return (
    <div className="bg-canvas min-h-screen">
      <TopNav />

      {/* Step indicator */}
      <div className="border-b border-hairline py-5 px-16">
        <div className="flex items-center max-w-[600px] mx-auto">
          {steps.map((s, i) => {
            const num = i + 1;
            const done = num < step;
            const active = num === step;
            return (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div
                  onClick={() => num < step && setStep(num)}
                  className={`flex flex-col items-center gap-1.5 ${num < step ? "cursor-pointer" : ""}`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                      num <= step ? "bg-rausch text-white" : "bg-cloud text-ash"
                    }`}
                  >
                    {done ? "✓" : num}
                  </div>
                  <span
                    className={`text-[13px] ${active ? "font-bold text-ink" : "font-medium text-ash"}`}
                  >
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 mb-6 ${num < step ? "bg-rausch" : "bg-hairline"}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main */}
      <div className="flex gap-12 px-16 py-10 max-w-[1200px] mx-auto">
        <div className="flex-1">
          {/* ── STEP 1: Traveler Info ── */}
          {step === 1 && (
            <>
              <h1 className="text-2xl font-extrabold mb-7">
                Traveler Information
              </h1>
              <div className="border-b border-hairline pb-3 mb-5">
                <p className="text-base font-bold">Passenger 1 · Adult</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Input
                  label="FIRST NAME"
                  placeholder="James"
                  value={traveler.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                />
                <Input
                  label="LAST NAME"
                  placeholder="Thompson"
                  value={traveler.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                />
                <Input
                  label="DATE OF BIRTH"
                  placeholder="DD / MM / YYYY"
                  value={traveler.dob}
                  onChange={(e) => setField("dob", e.target.value)}
                />
                <Input
                  label="PASSPORT NUMBER"
                  placeholder="GB123456789"
                  value={traveler.passport}
                  onChange={(e) => setField("passport", e.target.value)}
                />
                <Input
                  label="NATIONALITY"
                  placeholder="British"
                  value={traveler.nationality}
                  onChange={(e) => setField("nationality", e.target.value)}
                />
                <Input
                  label="PASSPORT EXPIRY"
                  placeholder="MM / YYYY"
                  value={traveler.expiry}
                  onChange={(e) => setField("expiry", e.target.value)}
                />
              </div>
              <Button variant="gradient" size="lg" onClick={() => setStep(2)}>
                Continue to{" "}
                {showSeat && showRoom
                  ? "Seat & Room"
                  : showSeat
                    ? "Seat"
                    : "Room"}
              </Button>
            </>
          )}

          {/* ── STEP 2: Seat &/or Room (adapts by type) ── */}
          {step === 2 && (
            <>
              <h1 className="text-2xl font-extrabold mb-7">
                {showSeat && showRoom
                  ? "Select Seat & Room"
                  : showSeat
                    ? "Select Your Seat"
                    : "Select Your Room"}
              </h1>

              {/* Seat — only if this booking includes a flight */}
              {showSeat && (
                <div className="mb-10">
                  <h2 className="text-lg font-bold mb-4">Your Flight Seat</h2>
                  <SeatMap
                    selected={selectedSeat}
                    setSelected={setSelectedSeat}
                  />
                </div>
              )}

              {/* Room — only if this booking includes a hotel */}
              {showRoom && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold mb-4">Your Room</h2>
                  <div className="flex flex-col gap-3">
                    {rooms.map((room) => {
                      const picked = selectedRoom === room.type;
                      return (
                        <div
                          key={room.type}
                          onClick={() => setSelectedRoom(room.type)}
                          className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition-all ${
                            picked
                              ? "border-rausch bg-rausch/5"
                              : "border-hairline hover:border-ink"
                          }`}
                        >
                          <div>
                            <p className="font-bold">{room.type}</p>
                            <p className="text-sm text-ash">
                              ${room.price} / night · {room.size}
                            </p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              picked ? "border-rausch" : "border-hairline"
                            }`}
                          >
                            {picked && (
                              <div className="w-2.5 h-2.5 rounded-full bg-rausch" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button variant="gradient" size="lg" onClick={() => setStep(3)}>
                  Continue to Payment
                </Button>
              </div>
            </>
          )}

          {/* ── STEP 3: Payment (view only) ── */}
          {step === 3 && (
            <>
              <h1 className="text-2xl font-extrabold mb-7">Payment</h1>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <Input label="CARD NUMBER" placeholder="1234 5678 9012 3456" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="EXPIRY" placeholder="MM / YY" />
                  <Input label="CVV" placeholder="123" />
                </div>
                <Input label="NAME ON CARD" placeholder="James Thompson" />
              </div>
              <p className="text-xs text-ash mb-6">
                🔒 This is a demo. No real payment will be processed.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
                <Link to={`/confirmation/${type}/${id}`}>
                  <Button variant="gradient" size="lg" onClick={handleConfirm}>
                    Confirm Booking
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Order summary */}
        <div className="shrink-0">
          <div className="w-[340px] bg-canvas border border-hairline rounded-2xl p-6 shadow-card-rest sticky top-[100px]">
            <h3 className="text-base font-bold mb-4">Order Summary</h3>

            <div className="flex gap-3 mb-4 bg-cloud rounded-xl p-3">
              <img
                src={`https://picsum.photos/seed/${summary.imgSeed}/80/60`}
                alt=""
                className="w-[60px] h-[60px] rounded-lg object-cover"
              />
              <div>
                <p className="text-sm font-bold">{summary.title}</p>
                <p className="text-xs text-ash">{summary.sub1}</p>
                <p className="text-xs text-ash">{summary.sub2}</p>
              </div>
            </div>

            {/* Seat row — only if seat applies */}
            <div className="text-sm space-y-2 mb-4">
              {showSeat && (
                <div className="flex justify-between">
                  <span className="text-ash font-medium">Seat</span>
                  <span className="font-semibold">
                    {selectedSeat || "Not selected"}
                  </span>
                </div>
              )}
              {showRoom && (
                <div className="flex justify-between">
                  <span className="text-ash font-medium">Room</span>
                  <span className="font-semibold">
                    {selectedRoom || "Not selected"}
                  </span>
                </div>
              )}
            </div>

            {/* Price breakdown */}
            <div className="border-t border-hairline pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ash font-medium">
                  {type === "hotel"
                    ? "Room base"
                    : type === "flight"
                      ? "Fare"
                      : "Package"}
                </span>
                <span className="font-semibold">${summary.basePrice}</span>
              </div>
              {showRoom && (
                <div className="flex justify-between">
                  <span className="text-ash font-medium">Room</span>
                  <span className="font-semibold">
                    {chosenRoom ? `+$${roomCost}` : "—"}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-hairline mt-4 pt-4 flex justify-between text-lg font-extrabold">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <p className="text-center text-xs text-ash mt-3">
              🔒 Secure checkout · 256-bit SSL
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
