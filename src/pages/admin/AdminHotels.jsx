import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import DataTable from "../../components/admin/DataTable";
import Drawer from "../../components/admin/Drawer";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { API } from "../../config";

const ROOM_PRESETS = [
  { type: "Standard Room", size: "30m²", guests: 2, price: 180 },
  { type: "Deluxe Room", size: "40m²", guests: 2, price: 320 },
  { type: "Deluxe Sea View", size: "55m²", guests: 2, price: 450 },
  { type: "Junior Suite", size: "80m²", guests: 3, price: 720 },
  { type: "Family Suite", size: "75m²", guests: 4, price: 980 },
  { type: "Royal Suite", size: "180m²", guests: 4, price: 1600 },
];

const EMPTY_FORM = {
  name: "",
  location: "",
  country: "",
  stars: "",
  rating: "",
  review_count: "",
  price: "",
  img_seed: "",
  amenities: "",
  offers: "",
  gallery: "",
  status: "Active",
};

export default function AdminHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const [pickedRooms, setPickedRooms] = useState({});

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    setLoading(true);
    const res = await fetch(`${API}/hotels`);
    const data = await res.json();
    setHotels(data);
    setLoading(false);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setPickedRooms({});
    setDrawerOpen(true);
  };

  const openEdit = async (hotel) => {
    setEditingId(hotel.id);

    const res = await fetch(`${API}/hotels/${hotel.id}`);
    const full = await res.json();

    setForm({
      name: full.name,
      location: full.location,
      country: full.country,
      stars: full.stars,
      rating: full.rating,
      review_count: full.review_count,
      price: full.price,
      img_seed: full.img_seed,
      amenities: full.amenities || "",
      offers: (full.offers || []).join(", "),
      gallery: (full.gallerySeeds || []).join(", "),
      status: full.status,
    });

    const picked = {};
    (full.rooms || []).forEach((r) => {
      picked[r.type] = true;
    });
    setPickedRooms(picked);

    setDrawerOpen(true);
  };

  const toggleRoom = (type) => {
    setPickedRooms({ ...pickedRooms, [type]: !pickedRooms[type] });
  };

  const handleSave = async () => {
    const rooms = ROOM_PRESETS.filter((r) => pickedRooms[r.type]);

    const offers = form.offers
      .split(",")
      .map((o) => o.trim())
      .filter((o) => o.length > 0);

    const gallerySeeds = form.gallery
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((s) => !isNaN(s) && s > 0);

    const payload = {
      name: form.name,
      location: form.location,
      country: form.country,
      stars: Number(form.stars),
      rating: Number(form.rating),
      review_count: Number(form.review_count),
      rooms_count: rooms.length,
      price: Number(form.price),
      img_seed: Number(form.img_seed),
      amenities: form.amenities,
      status: form.status,
      rooms,
      offers,
      gallerySeeds,
    };

    if (editingId) {
      await fetch(`${API}/hotels/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-role": user.role },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${API}/hotels`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-role": user.role },
        body: JSON.stringify(payload),
      });
    }

    setDrawerOpen(false);
    loadHotels();
  };

  const handleDelete = async (hotel) => {
    if (!confirm(`Delete ${hotel.name}?`)) return;
    await fetch(`${API}/hotels/${hotel.id}`, {
      method: "DELETE",
      headers: { "x-role": user.role },
    });
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
              <td className="px-5 py-3">{h.rooms_count}</td>
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
            placeholder="Jumeirah Beach, Dubai"
            value={form.location}
            onChange={(e) => setField("location", e.target.value)}
          />
          <Input
            label="COUNTRY"
            placeholder="UAE"
            value={form.country}
            onChange={(e) => setField("country", e.target.value)}
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
              label="RATING"
              type="number"
              placeholder="4.9"
              value={form.rating}
              onChange={(e) => setField("rating", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="REVIEW COUNT"
              type="number"
              placeholder="2840"
              value={form.review_count}
              onChange={(e) => setField("review_count", e.target.value)}
            />
            <Input
              label="PRICE / NIGHT"
              type="number"
              placeholder="980"
              value={form.price}
              onChange={(e) => setField("price", e.target.value)}
            />
          </div>
          <Input
            label="MAIN IMAGE SEED"
            type="number"
            placeholder="251"
            value={form.img_seed}
            onChange={(e) => setField("img_seed", e.target.value)}
          />

          {/* Gallery seeds */}
          <Input
            label="GALLERY SEEDS (comma-separated numbers)"
            placeholder="251, 355, 188, 267, 312"
            value={form.gallery}
            onChange={(e) => setField("gallery", e.target.value)}
          />

          {/* Amenities */}
          <Input
            label="AMENITIES (comma-separated)"
            placeholder="Pool, Spa, WiFi, Restaurant"
            value={form.amenities}
            onChange={(e) => setField("amenities", e.target.value)}
          />

          {/* Offers — text only */}
          <Input
            label="OFFERS (comma-separated, what this place offers)"
            placeholder="Private Beach, Fine Dining, Spa, Free WiFi"
            value={form.offers}
            onChange={(e) => setField("offers", e.target.value)}
          />

          {/* Rooms */}
          <div>
            <label className="block text-[12px] font-bold mb-2 tracking-wide">
              ROOMS (pick which types this hotel has)
            </label>
            <div className="flex flex-col gap-2">
              {ROOM_PRESETS.map((r) => (
                <label
                  key={r.type}
                  className="flex items-center gap-3 p-2.5 border border-hairline rounded-lg cursor-pointer hover:bg-cloud"
                >
                  <input
                    type="checkbox"
                    checked={!!pickedRooms[r.type]}
                    onChange={() => toggleRoom(r.type)}
                  />
                  <span className="flex-1 text-sm font-semibold">{r.type}</span>
                  <span className="text-xs text-ash">
                    {r.size} · {r.guests} guests · ${r.price}
                  </span>
                </label>
              ))}
            </div>
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
            {editingId ? "Save Changes" : "Add Hotel"}
          </Button>
        </div>
      </Drawer>
    </AdminLayout>
  );
}
