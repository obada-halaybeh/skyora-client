import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { API } from "../../config";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    const res = await fetch(`${API}/bookings`);
    const data = await res.json();
    setBookings(data);
    setLoading(false);
  };

  const handleStatusChange = async (booking, newStatus) => {
    await fetch(`${API}/bookings/${booking.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-role": user.role },
      body: JSON.stringify({ status: newStatus }),
    });
    loadBookings();
  };

  const handleDelete = async (booking) => {
    if (!confirm(`Delete booking ${booking.ref}?`)) return;
    await fetch(`${API}/bookings/${booking.id}`, {
      method: "DELETE",
      headers: { "x-role": user.role },
    });
    loadBookings();
  };

  const visible = bookings.filter((b) => {
    const q = search.toLowerCase();
    const matchesSearch =
      b.ref.toLowerCase().includes(q) ||
      b.customer.toLowerCase().includes(q) ||
      b.trip.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout
      active="Bookings"
      title="Bookings Management"
      subtitle={`${bookings.length} bookings`}
    >
      {/* Search + status filter */}
      <div className="flex gap-3 mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by reference, customer, trip..."
          className="flex-1 px-4 py-2.5 border border-hairline rounded-lg text-sm outline-none focus:border-ink"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-hairline rounded-lg text-sm bg-canvas outline-none focus:border-ink"
        >
          <option value="All">All Statuses</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <p className="text-ash py-10 text-center">Loading bookings...</p>
      ) : (
        <div className="bg-canvas border border-hairline rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-hairline bg-cloud">
                {[
                  "Reference",
                  "Customer",
                  "Trip",
                  "Type",
                  "Date",
                  "Total",
                  "Status",
                ].map((col) => (
                  <th
                    key={col}
                    className="text-left px-5 py-3 font-bold text-ash text-[12px] tracking-wide uppercase"
                  >
                    {col}
                  </th>
                ))}
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-ash">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                visible.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-hairline last:border-0 hover:bg-cloud/50"
                  >
                    <td className="px-5 py-3 font-bold font-mono">{b.ref}</td>
                    <td className="px-5 py-3">{b.customer}</td>
                    <td className="px-5 py-3 text-ash">{b.trip}</td>
                    <td className="px-5 py-3 capitalize">{b.type}</td>
                    <td className="px-5 py-3 text-ash">{b.booking_date}</td>
                    <td className="px-5 py-3 font-semibold">
                      ${b.price?.toLocaleString()}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-[12px] font-bold px-2.5 py-1 rounded-md ${
                          b.status === "Confirmed"
                            ? "bg-success/10 text-success"
                            : "bg-error/10 text-error"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      {b.status === "Confirmed" && (
                        <button
                          onClick={() => handleStatusChange(b, "Cancelled")}
                          className="text-error font-semibold hover:underline mr-4"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(b)}
                        className="text-error font-semibold hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
