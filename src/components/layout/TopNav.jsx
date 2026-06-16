import { useState, useEffect } from "react";
import { Plane, BedDouble, Gift } from "lucide-react";
import SkyoraWordmark from "../auth/SkyoraWordmark";
import { Link } from "react-router-dom";

export default function TopNav({ activeTab = "" }) {
  const tabs = [
    { label: "Flights", Icon: Plane, to: "/flights" },
    { label: "Hotels", Icon: BedDouble, to: "/hotels" },
    { label: "Bundles", Icon: Gift, to: "/bundles" },
  ];

  // Read the logged-in user from localStorage
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <nav className="h-16 sm:h-20 bg-canvas border-b border-hairline flex items-center px-4 sm:px-8 gap-3 sm:gap-6 sticky top-0 z-50">
      <Link to="/" className="cursor-pointer shrink-0">
        <SkyoraWordmark size={20} />
      </Link>

      <div className="flex-1 flex justify-center gap-0.5 sm:gap-1 overflow-x-auto">
        {tabs.map(({ label, Icon, to }) => (
          <Link
            key={label}
            to={to}
            className={`flex flex-col items-center gap-0.5 px-2.5 sm:px-5 py-2 cursor-pointer border-b-2 shrink-0 ${
              activeTab === label ? "border-ink" : "border-transparent"
            }`}
          >
            <Icon size={20} className="text-ink" />
            <span className="text-[11px] sm:text-sm font-medium hidden sm:inline">{label}</span>
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {user ? (
          <>
            {/* Avatar -> trips */}
            <Link
              to="/trips"
              title={user.name}
              className="w-9 h-9 rounded-full bg-skyora-gradient flex items-center justify-center text-white text-[13px] font-bold border border-hairline cursor-pointer"
            >
              {initial}
            </Link>
            {/* Logout */}
            <a
              href="/auth"
              onClick={() => localStorage.removeItem("user")}
              className="text-sm font-medium text-ash hover:text-ink cursor-pointer hidden sm:inline"
            >
              Log out
            </a>
          </>
        ) : (
          <Link
            to="/auth"
            className="text-sm font-medium text-ash hover:text-ink"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
