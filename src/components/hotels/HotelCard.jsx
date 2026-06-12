import Button from "../common/Button";
import Stars from "./Stars";

export default function HotelCard({
  name,
  location,
  stars,
  rating,
  reviews,
  price,
  imgSeed,
  amenities,
}) {
  return (
    <div className="bg-canvas border border-hairline rounded-2xl overflow-hidden cursor-pointer hover:shadow-card-hover transition-shadow">
      <img
        src={`https://picsum.photos/seed/${imgSeed}/400/220`}
        alt={name}
        className="w-full h-[180px] object-cover"
      />

      {/* Body */}
      <div className="p-4">
        {/* Name + rating row */}
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="text-base font-bold leading-tight">{name}</h3>
          <Stars rating={rating} />
        </div>

        {/* Location + star count */}
        <p className="text-[13px] text-ash font-medium mb-1">
          {location} · {"★".repeat(stars)}
        </p>

        {/* Review count */}
        <p className="text-[12px] text-ash mb-3">{reviews} reviews</p>

        {/* Amenities */}
        <div className="flex gap-1.5 flex-wrap mb-4">
          {amenities.map((a) => (
            <span
              key={a}
              className="bg-cloud text-ash text-[11px] font-medium px-2 py-1 rounded-md"
            >
              {a}
            </span>
          ))}
        </div>

        {/* Price + button */}
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">
            ${price}
            <span className="text-[12px] text-ash font-medium">/night</span>
          </p>
          <Button variant="primary" size="sm">
            View Hotel
          </Button>
        </div>
      </div>
    </div>
  );
}
