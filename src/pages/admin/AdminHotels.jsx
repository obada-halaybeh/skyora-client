import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import DataTable from "../../components/admin/DataTable";
import Drawer from "../../components/admin/Drawer";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import {
  getHotels,
  addHotel,
  updateHotel,
  deleteHotel,
} from "../../services/hotelService";

const EMPTY_FORM = {
  name: "",
  location: "",
  stars: "",
  rooms: "",
  price: "",
  amenities: "",
  status: "Active",
};

export default function AdminHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    setLoading(true);
    const data = await getHotels();
    setHotels(data);
    setLoading(false);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setDrawerOpen(true);
  };

  const openEdit = (hotel) => {
    setEditingId(hotel.id);
    setForm({
      name: hotel.name,
      location: hotel.location,
      stars: hotel.stars,
      rooms: hotel.rooms,
      price: hotel.price,
      amenities: hotel.amenities.join(", "), // ["Pool","WiFi"] → "Pool, WiFi"
      status: hotel.status,
    });
    setDrawerOpen(true);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      stars: Number(form.stars),
      rooms: Number(form.rooms),
      price: Number(form.price),
      // "Pool, WiFi" → ["Pool", "WiFi"]
      amenities: form.amenities
        .split(",")
        .map((a) => a.trim())
        .filter((a) => a.length > 0),
    };
    if (editingId) {
      await updateHotel(editingId, payload);
    } else {
      await addHotel(payload);
    }
    setDrawerOpen(false);
    loadHotels();
  };

  const handleDelete = async (hotel) => {
    if (!confirm(`Delete ${hotel.name}?`)) return;
    await deleteHotel(hotel.id);
    loadHotels();
  };

  const setField = (field, value) => setForm({ ...form, [field]: value });

  const visible = hotels.filter((h) => {
    const q = search.toLowerCase();
    return (
      h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout
      active="Hotels"
      title="Hotel Management"
      subtitle={`${hotels.length} hotels`}
      action={
        <Button variant="primary" size="md" onClick={openAdd}>
          + Add New Hotel
        </Button>
      }
    >
      {/* Search */}
      <div className="mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search hotels, locations..."
          className="w-full px-4 py-2.5 border border-hairline rounded-lg text-sm outline-none focus:border-ink"
        />
      </div>

      {loading ? (
        <p className="text-ash py-10 text-center">Loading hotels...</p>
      ) : (
        <DataTable
          columns={[
            "Name",
            "Location",
            "Stars",
            "Rooms",
            "Price/night",
            "Status",
          ]}
          rows={visible}
          onEdit={openEdit}
          onDelete={handleDelete}
          renderCell={(h) => (
            <>
              <td className="px-5 py-3 font-bold">{h.name}</td>
              <td className="px-5 py-3 text-ash">{h.location}</td>
              <td className="px-5 py-3 text-amber">{"★".repeat(h.stars)}</td>
              <td className="px-5 py-3">{h.rooms}</td>
              <td className="px-5 py-3 font-semibold">${h.price}</td>
              <td className="px-5 py-3">
                <span
                  className={`text-[12px] font-bold px-2.5 py-1 rounded-md ${
                    h.status === "Active"
                      ? "bg-success/10 text-success"
                      : "bg-ash/10 text-ash"
                  }`}
                >
                  {h.status}
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
        title={editingId ? "Edit Hotel" : "Add New Hotel"}
      >
        <div className="flex flex-col gap-4">
          <Input
            label="HOTEL NAME"
            placeholder="Burj Al Arab"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
          />
          <Input
            label="LOCATION"
            placeholder="Dubai, UAE"
            value={form.location}
            onChange={(e) => setField("location", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="STARS"
              type="number"
              placeholder="5"
              value={form.stars}
              onChange={(e) => setField("stars", e.target.value)}
            />
            <Input
              label="ROOMS"
              type="number"
              placeholder="202"
              value={form.rooms}
              onChange={(e) => setField("rooms", e.target.value)}
            />
          </div>
          <Input
            label="PRICE / NIGHT"
            type="number"
            placeholder="980"
            value={form.price}
            onChange={(e) => setField("price", e.target.value)}
          />
          <Input
            label="AMENITIES (comma-separated)"
            placeholder="Pool, Spa, WiFi, Restaurant"
            value={form.amenities}
            onChange={(e) => setField("amenities", e.target.value)}
          />
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
            {editingId ? "Save Changes" : "Add Hotel"}
          </Button>
        </div>
      </Drawer>
    </AdminLayout>
  );
}
