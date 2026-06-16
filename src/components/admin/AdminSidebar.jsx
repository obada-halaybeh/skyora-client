import { Link } from "react-router-dom";
import { Plane, BedDouble, Gift, Ticket, Users } from "lucide-react";

export default function AdminSidebar({ active }) {
  const links = [
    { label: "Flights", to: "/admin/flights", Icon: Plane },
    { label: "Hotels", to: "/admin/hotels", Icon: BedDouble },
    { label: "Bundles", to: "/admin/bundles", Icon: Gift },
    { label: "Bookings", to: "/admin/bookings", Icon: Ticket },
    { label: "Users", to: "/admin/users", Icon: Users },
  ];
  return (
    <div className="w-full lg:w-[240px] bg-ink lg:min-h-screen p-4 lg:p-5 shrink-0">
      <div className="text-white text-xl font-extrabold mb-3 lg:mb-8 px-2">
        Skyora Admin
      </div>
      <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto">
        {links.map(({ label, to, Icon }) => (
          <Link
            key={label}
            to={to}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors shrink-0 ${
              active === label
                ? "bg-white/10 text-white"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
