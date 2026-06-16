import Button from "./Button";

export default function BookingPanel({
  price,
  unit = "per person",
  cta = "Reserve Now",
}) {
  const taxes = Math.round(price * 0.12);
  const total = price + taxes;

  return (
    <div className="w-full lg:w-[320px] bg-canvas border border-hairline rounded-2xl p-6 shadow-card-rest">
      {/* Price header */}
      <div className="mb-5">
        <p className="text-3xl font-extrabold">
          ${price}
          <span className="text-sm text-ash font-medium"> {unit}</span>
        </p>
      </div>

      {/* Price breakdown */}
      <div className="border-t border-hairline pt-4 mb-4 space-y-2.5">
        <div className="flex justify-between text-sm">
          <span className="text-ash font-medium">Base fare</span>
          <span className="font-semibold">${price}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-ash font-medium">Taxes & fees</span>
          <span className="font-semibold">${taxes}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-hairline pt-4 mb-5">
        <div className="flex justify-between items-center">
          <span className="font-bold">Total</span>
          <span className="text-2xl font-extrabold">${total}</span>
        </div>
      </div>

      <Button variant="gradient" size="lg" className="w-full">
        {cta}
      </Button>

      <p className="text-center text-xs text-ash mt-3">
        Free cancellation within 24 hours
      </p>
    </div>
  );
}
