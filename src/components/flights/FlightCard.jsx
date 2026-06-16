import React from "react";
import AirlineLogo from "./AirlineLogo";
import Button from "../common/Button";
import { Link } from "react-router-dom";

export default function FlightCard({
  id,
  airline,
  from,
  to,
  depart,
  arrive,
  duration,
  stops,
  price,
  direct,
}) {
  return (
    <div className="bg-canvas border border-hairline rounded-2xl p-4 sm:p-5 cursor-pointer flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-3 hover:shadow-card-hover transition-shadow">
      <AirlineLogo name={airline} />
      <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-4 items-center gap-4">
        <div className="order-1">
          <p className="text-[22px] font-bold">{depart}</p>
          <p className="text-[13px] font-medium text-ash">{from}</p>
        </div>

        <div className="order-3 sm:order-2 text-center col-span-2 sm:col-span-1">
          <p className="text-xs text-ash mb-1">{duration}</p>
          <div className="h-px bg-hairline relative">
            <div className="absolute right-0 -top-[3px] w-[7px] h-[7px] rounded-full bg-ink" />
          </div>
          <p
            className={`text-[11-px] mt-1 font-semibold ${direct ? "text-success" : "text-ash"}`}
          >
            {direct ? "Non-stop" : stops}
          </p>
        </div>

        <div className="order-2 sm:order-3 text-right sm:text-left">
          <p className="text-[22px] font-bold">{arrive}</p>
          <p className="text-[13px] font-medium text-ash">{to}</p>
        </div>

        <div className="order-4 text-right col-span-2 sm:col-span-1">
          <p className="text-[11px] text-ash mb-1 font-medium">from</p>
          <p className="text-2xl font-bold">${price}</p>
          <p className="text-xs text-ash mb-2.5">per person</p>
          <Link to={`/flights/${id}`}>
            <Button variant="primary" size="sm">
              Select
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
