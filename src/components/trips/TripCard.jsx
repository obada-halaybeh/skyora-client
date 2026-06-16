import Button from "../common/Button";

export default function TripCard({ trip, tab, onReview, onCancel, reviewed }) {
  return (
    <div className="bg-canvas border border-hairline rounded-2xl overflow-hidden mb-4 flex flex-col sm:flex-row">
      {/* Image use item_id as the seed so each trip has a stable image */}
      <div className="relative w-full sm:w-[240px] h-[160px] sm:h-auto shrink-0">
        <img
          src={`https://picsum.photos/seed/${trip.type}${trip.item_id}/240/300`}
          alt={trip.trip}
          className="w-full sm:w-[240px] h-full object-cover"
        />
        {tab === "cancelled" && (
          <div className="absolute top-3 left-3 bg-success text-white px-2.5 py-1 rounded-full text-[11px] font-bold">
            Refunded
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col">
        {/* Top row: type / price */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-2">
            <span className="bg-cloud text-ash text-[12px] font-bold px-2.5 py-1 rounded-md capitalize">
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

        {/* Trip name */}
        <h3 className="text-[22px] font-extrabold leading-tight">
          {trip.trip}
        </h3>
        <p className="text-[13px] text-ash font-medium mt-0.5 mb-3">
          {trip.customer}
        </p>

        {/* Date + seat/room + ref */}
        <div className="flex gap-5 text-[13px] mb-4 flex-wrap">
          <span>
            📅 <strong>{trip.booking_date}</strong>
          </span>
          {trip.seat && (
            <span className="text-ash">
              Seat <strong className="text-ink">{trip.seat}</strong>
            </span>
          )}
          {trip.room && (
            <span className="text-ash">
              Room <strong className="text-ink">{trip.room}</strong>
            </span>
          )}
          <span className="text-ash">
            Ref <strong className="font-mono text-ink">{trip.ref}</strong>
          </span>
        </div>

        {/* Actions — different per tab */}
        {(tab === "upcoming" || tab === "past") && (
          <div className="mt-auto flex gap-2 pt-3 border-t border-hairline items-center">
            {tab === "upcoming" && (
              <Button variant="ghost" size="sm" onClick={() => onCancel(trip)}>
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
  );
}
