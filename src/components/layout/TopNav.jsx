import { Plane, BedDouble, Gift, Icon } from "lucide-react";
import SkyoraWordmark from "../auth/SkyoraWordmark";
import { Link } from "react-router-dom";

export default function TopNav({ activeTab = "" }) {
  const tabs = [
    { label: "Flights", Icon: Plane, to: "/flights" },
    { label: "Hotels", Icon: BedDouble, to: "/hotels" },
    { label: "Bundles", Icon: Gift, to: "/bundles" },
  ];

  return (
    <nav className="h-20 bg-canvas border-b border-hairline flex items-center px-8 gap-6 sticky top-0 z-50">
      <Link to="/" className="cursor-pointer">
        <SkyoraWordmark size={22} />
      </Link>

      <div className="flex-1 flex justify-center gap-1">
        {tabs.map(({ label, Icon, to }) => (
          <Link
            key={label}
            to={to}
            className={`flex flex-col items-center gap-0.5 px-5 py-2 cursor-pointer border-b-2 ${
              activeTab === label ? "border-ink" : "border-transparent"
            }`}
          >
            <Icon size={20} className="text-ink" />
            <span className="text-sm font-medium">{label}</span>
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <Link
          to="/auth"
          className="text-sm font-medium text-ash hover:text-ink"
        >
          Sign In
        </Link>
        <Link
          to="/trips"
          className="w-9 h-9 rounded-full bg-skyora-gradient flex items-center justify-center text-white text-[13px] font-bold border border-hairline cursor-pointer"
        >
          S
        </Link>
      </div>
    </nav>
  );
}
