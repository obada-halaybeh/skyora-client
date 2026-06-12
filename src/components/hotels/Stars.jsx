import { Star } from "lucide-react";

export default function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <Star size={14} className="text-amber fill-amber" />
      <span className="text-sm font-bold">{rating}</span>
    </div>
  );
}
