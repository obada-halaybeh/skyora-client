import { useState } from "react";

export default function ReviewModal({ trip, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");

  const MIN_CHARS = 10;
  const MAX_CHARS = 500;
  const canSubmit = rating > 0 && text.trim().length >= MIN_CHARS;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({ rating, text: text.trim() });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-canvas rounded-2xl w-full max-w-[420px] overflow-hidden shadow-auth-modal"
      >
        {/* Header with trip image */}
        <div className="relative h-[120px]">
          <img
            src={`https://picsum.photos/seed/${trip.imgSeed}/420/120`}
            alt={trip.destination}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-sm font-bold"
          >
            ✕
          </button>
          <div className="absolute bottom-3 left-4 text-white">
            <p className="text-[11px] font-bold tracking-wide opacity-90">
              REVIEW YOUR TRIP
            </p>
            <p className="text-lg font-extrabold leading-tight">
              {trip.destination}
            </p>
            <p className="text-[11px] opacity-90">
              {trip.dates} · {trip.id}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Star rating */}
          <p className="text-center text-base font-bold mb-3">
            How was your experience?
          </p>
          <div className="flex justify-center gap-1.5 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="text-3xl transition-transform hover:scale-110"
              >
                <span
                  className={
                    star <= (hover || rating) ? "text-amber" : "text-hairline"
                  }
                >
                  ★
                </span>
              </button>
            ))}
          </div>
          <p className="text-center text-[12px] text-ash mb-5">
            {rating > 0
              ? `${rating} star${rating > 1 ? "s" : ""}`
              : "Tap a star to rate"}
          </p>

          {/* Review text */}
          <label className="block text-sm font-bold mb-2">
            Share details of your experience
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={MAX_CHARS}
            placeholder="Tell other travelers about the hotel, flight or bundle…"
            rows={4}
            className="w-full px-4 py-3 border border-hairline rounded-xl text-sm outline-none focus:border-ink transition-colors resize-none"
          />

          {/* Counter row */}
          <div className="flex justify-between text-[11px] text-ash mt-1.5 mb-5">
            <span>
              {text.trim().length < MIN_CHARS
                ? `${MIN_CHARS - text.trim().length} more characters`
                : "Looks good!"}
            </span>
            <span>
              {text.length}/{MAX_CHARS}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-hairline text-sm font-semibold hover:bg-cloud"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all ${
                canSubmit
                  ? "bg-skyora-gradient hover:brightness-110 cursor-pointer"
                  : "bg-ash/40 cursor-not-allowed"
              }`}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
