import Button from "../common/Button";
import StatusPill from "./StatusPill";

export default function TripCard({ trip, tab, onReview, onCancel, reviewed }) {
  return (
    <div className="bg-canvas border border-hairline rounded-2xl overflow-hidden mb-4 flex">
      {/* Image */}
      <div className="relative w-[240px] shrink-0">
        <img
          src={`https://picsum.photos/seed/${trip.imgSeed}/240/300`}
          alt={trip.destination}
          className="w-[240px] h-full object-cover"
        />
        {tab === "cancelled" && trip.refunded && (
          <div className="absolute top-3 left-3 bg-success text-white px-2.5 py-1 rounded-full text-[11px] font-bold">
            Refunded
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Top row: status + type / price */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-2">
            <span className="bg-cloud text-ash text-[12px] font-bold px-2.5 py-1 rounded-md">
              {trip.type}
            </span>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-ash tracking-wide">
              TOTAL
            </p>
            <p className="text-[22px] font-extrabold">
              ${trip.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Destination + subtitle */}
        <h3 className="text-[22px] font-extrabold leading-tight">
          {trip.destination}
        </h3>
        <p className="text-[13px] text-ash font-medium mt-0.5 mb-3">
          {trip.subtitle}
        </p>

        {/* Dates + ref */}
        <div className="flex gap-5 text-[13px] mb-4">
          <span>
            📅 <strong>{trip.dates}</strong> ·{" "}
            <span className="text-ash">{trip.nights}</span>
          </span>
          <span className="text-ash">
            Ref <strong className="font-mono text-ink">{trip.id}</strong>
          </span>
        </div>

        {/* Actions — different per tab */}
        <div className="mt-auto flex gap-2 pt-3 border-t border-hairline items-center">
          {(tab === "upcoming" || tab === "past") && (
            <div className="mt-auto flex gap-2 pt-3 border-t border-hairline items-center">
              {tab === "upcoming" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onCancel(trip)}
                >
                  Cancel
                </Button>
              )}

              {tab === "past" &&
                (reviewed ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success/10 text-success rounded-lg text-[13px] font-bold">
                    {"★".repeat(reviewed.rating)} Reviewed
                  </span>
                ) : (
                  <Button
                    variant="gradient"
                    size="sm"
                    onClick={() => onReview(trip)}
                  >
                    ★ Leave Review
                  </Button>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
