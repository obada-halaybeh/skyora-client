import React from "react";
import Button from "../common/Button";

export default function BundleCard({
  title,
  dest,
  flight,
  hotel,
  nights,
  price,
  original,
  imgSeed,
}) {
  const savings = Math.round((1 - price / original) * 100);
  return (
    <div className="block bg-canvas border border-hairline rounded-[20px] overflow-hidden hover:shadow-card-hover transition-shadow cursor-pointer">
      <div className="relative">
        <img
          src={`https://picsum.photos/seed/${imgSeed}/600/250`}
          alt={title}
          className="w-full h-[180px] object-cover"
        />
        <span className="absolute top-3 left-3 bg-rausch text-white px-3 py-1 rounded-[20px] text-xs font-bold">
          Save {savings}%
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-sm font-medium text-ash mb-3">
          {dest} . {nights} night
        </p>

        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-cloud rounded-[10px] px-3.5 py-2.5">
            <p className="text-[11px] font-bold text-ash mb-1">FLIGHT</p>
            <p className="text-[13px] font-semibold">{flight}</p>
          </div>
          <div className="flex-1 bg-cloud rounded-[10px] px-3.5 py-2.5">
            <p className="text-[11px] font-bold text-ash mb-1">HOTEL</p>
            <p className="text-[13px] font-semibold">{hotel}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[11px] text-ash line-through font-medium">
              ${original}
            </p>
            <p className="text-[22px] font-bold">
              ${price}{" "}
              <span className="text-[13px] text-ash font-medium">/ person</span>
            </p>
          </div>
          <Button variant="primary" size="sm">
            View Bundle
          </Button>
        </div>
      </div>
    </div>
  );
}
