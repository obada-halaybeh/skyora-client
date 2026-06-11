import React from "react";

export default function AirlineLogo({ name }) {
  const initials = name
    .split()
    .map((word) => word[0])
    .join()
    .slice(0, 2);

  return (
    <div className="w-10 h-10 rounded-lg bg-ink flex items-center justify-center text-white text-sm font-extrabold shrink-0">
      {initials}
    </div>
  );
}
