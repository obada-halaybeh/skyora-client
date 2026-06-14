import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import DataTable from "../../components/admin/DataTable";
import Drawer from "../../components/admin/Drawer";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import {
  getFlights,
  addFlight,
  updateFlight,
  deleteFlight,
} from "../../services/flightService";

const EMPTY_FORM = {
  flightNo: "",
  airline: "",
  route: "",
  schedule: "",
  seats: "",
  price: "",
  status: "Active",
};

export default function AdminFlights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = adding, an id = editing
  const [form, setForm] = useState(EMPTY_FORM);

  // Load flights from the service when the page mounts
  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    setLoading(true);
    const data = await getFlights();
    setFlights(data);
    setLoading(false);
  };

  // ── Open drawer for adding ──
  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setDrawerOpen(true);
  };

  // ── Open drawer for editing (pre-fill the form) ──
  const openEdit = (flight) => {
    setEditingId(flight.id);
    setForm({
      flightNo: flight.flightNo,
      airline: flight.airline,
      route: flight.route,
      schedule: flight.schedule,
      seats: flight.seats,
      price: flight.price,
      status: flight.status,
    });
    setDrawerOpen(true);
  };

  // ── Save (add or update depending on editingId) ──
  const handleSave = async () => {
    const payload = {
      ...form,
      seats: Number(form.seats),
      price: Number(form.price),
    };
    if (editingId) {
      await updateFlight(editingId, payload);
    } else {
      await addFlight(payload);
    }
    setDrawerOpen(false);
    loadFlights(); // refresh the table from the service
  };

  // ── Delete ──
  const handleDelete = async (flight) => {
    if (!confirm(`Delete flight ${flight.flightNo}?`)) return;
    await deleteFlight(flight.id);
    loadFlights();
  };

  const setField = (field, value) => setForm({ ...form, [field]: value });

  // Client-side search filter
  const visible = flights.filter((f) => {
    const q = search.toLowerCase();
    return (
      f.flightNo.toLowerCase().includes(q) ||
      f.airline.toLowerCase().includes(q) ||
      f.route.toLowerCase().includes(q)
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
            "Schedule",
            "Seats",
            "Price",
            "Status",
          ]}
          rows={visible}
          onEdit={openEdit}
          onDelete={handleDelete}
          renderCell={(f) => (
            <>
              <td className="px-5 py-3 font-bold font-mono">{f.flightNo}</td>
              <td className="px-5 py-3">{f.airline}</td>
              <td className="px-5 py-3">{f.route}</td>
              <td className="px-5 py-3 text-ash">{f.schedule}</td>
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
            value={form.flightNo}
            onChange={(e) => setField("flightNo", e.target.value)}
          />
          <Input
            label="ROUTE"
            placeholder="LHR → DXB"
            value={form.route}
            onChange={(e) => setField("route", e.target.value)}
          />
          <Input
            label="SCHEDULE"
            placeholder="Daily 08:15"
            value={form.schedule}
            onChange={(e) => setField("schedule", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
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
