import React, { useState } from "react";

export default function FilterSidebar({
  maxPrice,
  setMaxPrice,
  checks,
  toggle,
}) {
  const Checkbox = ({ label }) => {
    const checked = checks[label] || false;
    return (
      <label
        onClick={() => toggle(label)}
        className="flex items-center gap-2.5 mb-2.5 cursor-pointer"
      >
        <div
          className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-all ${
            checked ? "bg-rausch" : "border-2 border-hairline"
          }`}
        >
          {checked && <span className="text-white text-[11px]">✓</span>}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </label>
    );
  };

  return (
    <div className="w-[280px] py-6 shrink-0">
      <h3 className="text-lg font-bold mb-6">Filters</h3>

      {/* Max Price */}
      <div className="border-b border-hairline pb-6 mb-6">
        <h4 className="text-base font-bold mb-4">Max Price</h4>
        <input
          type="range"
          min="0"
          max="2000"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-rausch cursor-pointer"
        />
        <div className="flex justify-between text-[13px] text-ash mt-2">
          <span>$0</span>
          <span className="font-semibold text-ink">Up to ${maxPrice}</span>
          <span>$2,000+</span>
        </div>
      </div>

      {/* Airlines */}
      <div>
        <h4 className="text-base font-bold mb-4">Airlines</h4>
        <Checkbox label="Emirates" />
        <Checkbox label="Lufthansa" />
        <Checkbox label="British Airways" />
        <Checkbox label="Singapore Airlines" />
        <Checkbox label="Qatar Airways" />
      </div>
    </div>
  );
}
