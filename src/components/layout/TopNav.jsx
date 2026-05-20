import { Plane, BedDouble, Gift, Icon } from "lucide-react";
import SkyoraWordmark from "../auth/SkyoraWordmark";

export default function TopNav({ activeTab = "Flights" }) {
  const tabs = [
    { label: "Flights", Icon: Plane },
    { label: "Hotels", Icon: BedDouble },
    { label: "Bundeles", Icon: Gift },
  ];

  return (
    <nav className="h-20 bg-canvas border-b border-hairline flex items-center px-8 gap-6 sticky top-0 z-50">
      <div className="cursor-pointer">
        <SkyoraWordmark size={22} />
      </div>

      <div className="flex-1 flex justify-center gap-1">
        {tabs.map(({ label, Icon }) => (
          <button
            key={label}
            className={`flex flex-col items-center gap-0.5 px-5 py-2 cursor-pointer border-b-2 ${
              activeTab === label ? "border-ink" : "border-transparent"
            }`}
          >
            <Icon size={20} className="text-ink" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button className="text-sm font-medium text-ash hover:text-ink">
          Sign In
        </button>
        <div className="w-9 h-9 rounded-full bg-skyora-gradient flex items-center justify-center text-white text-[13px] font-bold border border-hairline cursor-pointer">
          S
        </div>
      </div>
    </nav>
  );
}
