import { Star } from "lucide-react";

export default function ReviewsSection({ title = "Reviews", reviews = [] }) {
  if (reviews.length === 0) {
    return (
      <div className="border-t border-hairline pt-8">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-ash font-medium">No reviews yet.</p>
      </div>
    );
  }

  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="border-t border-hairline pt-8">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="flex items-center gap-1 text-sm font-bold">
          <Star size={14} className="text-amber fill-amber" />
          {avg.toFixed(1)}
        </span>
        <span className="text-sm text-ash font-medium">
          ({reviews.length} reviews)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {reviews.map((r, i) => (
          <div key={i} className="border border-hairline rounded-2xl p-5">
            {/* Header: avatar + name + date */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-skyora-gradient flex items-center justify-center text-white font-bold text-sm shrink-0">
                {r.name[0]}
              </div>
              <div>
                <p className="text-sm font-bold">{r.name}</p>
                <p className="text-xs text-ash font-medium">{r.date}</p>
              </div>
            </div>

            {/* Star rating */}
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }, (_, idx) => (
                <Star
                  key={idx}
                  size={14}
                  className={
                    idx < r.rating
                      ? "text-amber fill-amber"
                      : "text-hairline fill-hairline"
                  }
                />
              ))}
            </div>

            {/* Review text */}
            <p className="text-sm text-ink leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
