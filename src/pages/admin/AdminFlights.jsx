import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import DataTable from "../../components/admin/DataTable";
import Drawer from "../../components/admin/Drawer";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { API } from "../../config";

const EMPTY_FORM = {
  airline: "",
  flight_no: "",
  origin: "",
  destination: "",
  country: "",
  depart: "",
  arrive: "",
  duration: "",
  stops: "",
  direct: false,
  seats: "",
  price: "",
  status: "Active",
};

export default function AdminFlights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    setLoading(true);
    const res = await fetch(`${API}/flights`);
    const data = await res.json();
    setFlights(data);
    setLoading(false);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setDrawerOpen(true);
  };

  const openEdit = (flight) => {
    setEditingId(flight.id);
    setForm({
      airline: flight.airline,
      flight_no: flight.flight_no,
      origin: flight.origin,
      destination: flight.destination,
      country: flight.country,
      depart: flight.depart,
      arrive: flight.arrive,
      duration: flight.duration,
      stops: flight.stops,
      direct: flight.direct,
      seats: flight.seats,
      price: flight.price,
      status: flight.status,
    });
    setDrawerOpen(true);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      seats: Number(form.seats),
      price: Number(form.price),
    };

    if (editingId) {
      await fetch(`${API}/flights/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-role": user.role,
        },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${API}/flights`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-role": user.role,
        },
        body: JSON.stringify(payload),
      });
    }

    setDrawerOpen(false);
    loadFlights();
  };

  const handleDelete = async (flight) => {
    if (!confirm(`Delete flight ${flight.flight_no}?`)) return;
    await fetch(`${API}/flights/${flight.id}`, {
      method: "DELETE",
      headers: { "x-role": user.role },
    });
    loadFlights();
  };

  const setField = (field, value) => setForm({ ...form, [field]: value });

  const visible = flights.filter((f) => {
    const q = search.toLowerCase();
    return (
      f.flight_no.toLowerCase().includes(q) ||
      f.airline.toLowerCase().includes(q) ||
      `${f.origin} ${f.destination}`.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout
      active="Flights"
      title="Flight Management"
      subtitle={`${flights.length} flights`}
      action={
        <Button variant="primary" size="md" onClick={openAdd}>
          + Add New Flight
        </Button>
      }
    >
      {/* Search */}
      <div className="mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search flights, airlines, routes..."
          className="w-full px-4 py-2.5 border border-hairline rounded-lg text-sm outline-none focus:border-ink"
        />
      </div>

      {loading ? (
        <p className="text-ash py-10 text-center">Loading flights...</p>
      ) : (
        <DataTable
          columns={[
            "Flight No.",
            "Airline",
            "Route",
            "Seats",
            "Price",
            "Status",
          ]}
          rows={visible}
          onEdit={openEdit}
          onDelete={handleDelete}
          renderCell={(f) => (
            <>
              <td className="px-5 py-3 font-bold font-mono">{f.flight_no}</td>
              <td className="px-5 py-3">{f.airline}</td>
              <td className="px-5 py-3">
                {f.origin} → {f.destination}
              </td>
              <td className="px-5 py-3">{f.seats}</td>
              <td className="px-5 py-3 font-semibold">${f.price}</td>
              <td className="px-5 py-3">
                <span
                  className={`text-[12px] font-bold px-2.5 py-1 rounded-md ${
                    f.status === "Active"
                      ? "bg-success/10 text-success"
                      : "bg-ash/10 text-ash"
                  }`}
                >
                  {f.status}
                </span>
              </td>
            </>
          )}
        />
      )}

      {/* Add / Edit drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editingId ? "Edit Flight" : "Add New Flight"}
      >
        <div className="flex flex-col gap-4">
          <Input
            label="AIRLINE"
            placeholder="Emirates"
            value={form.airline}
            onChange={(e) => setField("airline", e.target.value)}
          />
          <Input
            label="FLIGHT NUMBER"
            placeholder="EK002"
            value={form.flight_no}
            onChange={(e) => setField("flight_no", e.target.value)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="ORIGIN"
              placeholder="LHR"
              value={form.origin}
              onChange={(e) => setField("origin", e.target.value)}
            />
            <Input
              label="DESTINATION"
              placeholder="DXB"
              value={form.destination}
              onChange={(e) => setField("destination", e.target.value)}
            />
          </div>
          <Input
            label="COUNTRY"
            placeholder="UAE"
            value={form.country}
            onChange={(e) => setField("country", e.target.value)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="DEPART TIME"
              placeholder="08:15"
              value={form.depart}
              onChange={(e) => setField("depart", e.target.value)}
            />
            <Input
              label="ARRIVE TIME"
              placeholder="18:35"
              value={form.arrive}
              onChange={(e) => setField("arrive", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="DURATION"
              placeholder="7h 20m"
              value={form.duration}
              onChange={(e) => setField("duration", e.target.value)}
            />
            <Input
              label="STOPS"
              placeholder="Non-stop / 1 stop"
              value={form.stops}
              onChange={(e) => setField("stops", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[12px] font-bold mb-1.5 tracking-wide">
              DIRECT FLIGHT?
            </label>
            <select
              value={form.direct ? "yes" : "no"}
              onChange={(e) => setField("direct", e.target.value === "yes")}
              className="w-full px-4 py-[13px] border border-hairline rounded-[10px] text-[15px] font-medium outline-none focus:border-ink"
            >
              <option value="no">No (has stops)</option>
              <option value="yes">Yes (direct)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="SEATS"
              type="number"
              placeholder="342"
              value={form.seats}
              onChange={(e) => setField("seats", e.target.value)}
            />
            <Input
              label="PRICE"
              type="number"
              placeholder="429"
              value={form.price}
              onChange={(e) => setField("price", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[12px] font-bold mb-1.5 tracking-wide">
              STATUS
            </label>
            <select
              value={form.status}
              onChange={(e) => setField("status", e.target.value)}
              className="w-full px-4 py-[13px] border border-hairline rounded-[10px] text-[15px] font-medium outline-none focus:border-ink"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <Button
            variant="gradient"
            size="lg"
            className="w-full mt-2"
            onClick={handleSave}
          >
            {editingId ? "Save Changes" : "Add Flight"}
          </Button>
        </div>
      </Drawer>
    </AdminLayout>
  );
}
