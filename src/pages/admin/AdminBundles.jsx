import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import DataTable from "../../components/admin/DataTable";
import Drawer from "../../components/admin/Drawer";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { API } from "../../config";

const EMPTY_FORM = {
  title: "",
  destination: "",
  travelers: "2 adults",
  airline: "",
  flight_no: "",
  flight_label: "",
  origin: "",
  dest_code: "",
  depart: "",
  arrive: "",
  duration: "",
  hotel_id: "",
  hotel_name: "",
  hotel_rating: "",
  hotel_reviews: "",
  room_type: "",
  nights: "",
  price: "",
  original: "",
  img_seed: "",
  status: "Active",
};

export default function AdminBundles() {
  const [bundles, setBundles] = useState([]);
  const [hotelOptions, setHotelOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    loadBundles();
    loadHotels();
  }, []);

  const loadBundles = async () => {
    setLoading(true);
    const res = await fetch(`${API}/bundles`);
    const data = await res.json();
    setBundles(data);
    setLoading(false);
  };

  const loadHotels = async () => {
    const res = await fetch(`${API}/hotels`);
    const data = await res.json();
    setHotelOptions(data);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setDrawerOpen(true);
  };

  const openEdit = (bundle) => {
    setEditingId(bundle.id);
    setForm({
      title: bundle.title,
      destination: bundle.destination,
      travelers: bundle.travelers || "2 adults",
      airline: bundle.airline,
      flight_no: bundle.flight_no,
      flight_label: bundle.flight_label,
      origin: bundle.origin,
      dest_code: bundle.dest_code,
      depart: bundle.depart,
      arrive: bundle.arrive,
      duration: bundle.duration,
      hotel_id: bundle.hotel_id,
      hotel_name: bundle.hotel_name,
      hotel_rating: bundle.hotel_rating,
      hotel_reviews: bundle.hotel_reviews,
      room_type: bundle.room_type,
      nights: bundle.nights,
      price: bundle.price,
      original: bundle.original,
      img_seed: bundle.img_seed,
      status: bundle.status,
    });
    setDrawerOpen(true);
  };

  // When a hotel is picked, fill hotel_name/rating/reviews from it
  const pickHotel = (hotelId) => {
    const h = hotelOptions.find((x) => x.id === Number(hotelId));
    setForm({
      ...form,
      hotel_id: hotelId,
      hotel_name: h ? h.name : "",
      hotel_rating: h ? h.rating : "",
      hotel_reviews: h ? h.review_count : "",
    });
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      hotel_id: Number(form.hotel_id),
      hotel_rating: Number(form.hotel_rating),
      hotel_reviews: Number(form.hotel_reviews),
      nights: Number(form.nights),
      price: Number(form.price),
      original: Number(form.original),
      img_seed: Number(form.img_seed),
      flight_label: form.flight_label || `${form.airline} · Direct`,
    };

    if (editingId) {
      await fetch(`${API}/bundles/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-role": user.role },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${API}/bundles`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-role": user.role },
        body: JSON.stringify(payload),
      });
    }

    setDrawerOpen(false);
    loadBundles();
  };

  const handleDelete = async (bundle) => {
    if (!confirm(`Delete ${bundle.title}?`)) return;
    await fetch(`${API}/bundles/${bundle.id}`, {
      method: "DELETE",
      headers: { "x-role": user.role },
    });
    loadBundles();
  };

  const setField = (field, value) => setForm({ ...form, [field]: value });

  const visible = bundles.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.destination.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout
      active="Bundles"
      title="Bundle Management"
      subtitle={`${bundles.length} bundles`}
      action={
        <Button variant="primary" size="md" onClick={openAdd}>
          + Add New Bundle
        </Button>
      }
    >
      <div className="mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search bundles, destinations..."
          className="w-full px-4 py-2.5 border border-hairline rounded-lg text-sm outline-none focus:border-ink"
        />
      </div>

      {loading ? (
        <p className="text-ash py-10 text-center">Loading bundles...</p>
      ) : (
        <DataTable
          columns={[
            "Title",
            "Destination",
            "Nights",
            "Price",
            "Original",
            "Status",
          ]}
          rows={visible}
          onEdit={openEdit}
          onDelete={handleDelete}
          renderCell={(b) => (
            <>
              <td className="px-5 py-3 font-bold">{b.title}</td>
              <td className="px-5 py-3 text-ash">{b.destination}</td>
              <td className="px-5 py-3">{b.nights}</td>
              <td className="px-5 py-3 font-semibold">${b.price}</td>
              <td className="px-5 py-3 text-ash line-through">${b.original}</td>
              <td className="px-5 py-3">
                <span
                  className={`text-[12px] font-bold px-2.5 py-1 rounded-md ${
                    b.status === "Active"
                      ? "bg-success/10 text-success"
                      : "bg-ash/10 text-ash"
                  }`}
                >
                  {b.status}
                </span>
              </td>
            </>
          )}
        />
      )}

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editingId ? "Edit Bundle" : "Add New Bundle"}
      >
        <div className="flex flex-col gap-4">
          <Input
            label="BUNDLE TITLE"
            placeholder="Dubai Luxury Escape"
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
          />
          <Input
            label="DESTINATION"
            placeholder="Dubai, UAE"
            value={form.destination}
            onChange={(e) => setField("destination", e.target.value)}
          />
          <Input
            label="TRAVELERS"
            placeholder="2 adults"
            value={form.travelers}
            onChange={(e) => setField("travelers", e.target.value)}
          />

          {/* Flight details */}
          <div className="border-t border-hairline pt-3">
            <p className="text-[11px] font-bold text-ash mb-3 tracking-wide">
              FLIGHT DETAILS
            </p>
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
                  label="DESTINATION CODE"
                  placeholder="DXB"
                  value={form.dest_code}
                  onChange={(e) => setField("dest_code", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="DEPART"
                  placeholder="08:15"
                  value={form.depart}
                  onChange={(e) => setField("depart", e.target.value)}
                />
                <Input
                  label="ARRIVE"
                  placeholder="18:35"
                  value={form.arrive}
                  onChange={(e) => setField("arrive", e.target.value)}
                />
              </div>
              <Input
                label="DURATION"
                placeholder="7h 20m"
                value={form.duration}
                onChange={(e) => setField("duration", e.target.value)}
              />
            </div>
          </div>

          {/* Hotel*/}
          <div className="border-t border-hairline pt-3">
            <p className="text-[11px] font-bold text-ash mb-3 tracking-wide">
              HOTEL
            </p>
            <label className="block text-[12px] font-bold mb-1.5 tracking-wide">
              HOTEL (rooms come from this hotel)
            </label>
            <select
              value={form.hotel_id}
              onChange={(e) => pickHotel(e.target.value)}
              className="w-full px-4 py-[13px] border border-hairline rounded-[10px] text-[15px] font-medium outline-none focus:border-ink mb-4"
            >
              <option value="">Select a hotel...</option>
              {hotelOptions.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.location})
                </option>
              ))}
            </select>
            <Input
              label="ROOM TYPE (shown on detail)"
              placeholder="Deluxe Sea View"
              value={form.room_type}
              onChange={(e) => setField("room_type", e.target.value)}
            />
          </div>

          {/* Pricing */}
          <div className="border-t border-hairline pt-3">
            <p className="text-[11px] font-bold text-ash mb-3 tracking-wide">
              PRICING
            </p>
            <div className="flex flex-col gap-4">
              <Input
                label="NIGHTS"
                type="number"
                placeholder="5"
                value={form.nights}
                onChange={(e) => setField("nights", e.target.value)}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="PRICE"
                  type="number"
                  placeholder="1290"
                  value={form.price}
                  onChange={(e) => setField("price", e.target.value)}
                />
                <Input
                  label="ORIGINAL PRICE"
                  type="number"
                  placeholder="1680"
                  value={form.original}
                  onChange={(e) => setField("original", e.target.value)}
                />
              </div>
              <Input
                label="IMAGE SEED"
                type="number"
                placeholder="159"
                value={form.img_seed}
                onChange={(e) => setField("img_seed", e.target.value)}
              />
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
            {editingId ? "Save Changes" : "Add Bundle"}
          </Button>
        </div>
      </Drawer>
    </AdminLayout>
  );
}
