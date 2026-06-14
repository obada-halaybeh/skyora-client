import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import DataTable from "../../components/admin/DataTable";
import Drawer from "../../components/admin/Drawer";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import {
  getBundles,
  addBundle,
  updateBundle,
  deleteBundle,
} from "../../services/bundleService";

const EMPTY_FORM = {
  title: "",
  destination: "",
  flight: "",
  hotel: "",
  nights: "",
  price: "",
  original: "",
  status: "Active",
};

export default function AdminBundles() {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    loadBundles();
  }, []);

  const loadBundles = async () => {
    setLoading(true);
    const data = await getBundles();
    setBundles(data);
    setLoading(false);
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
      flight: bundle.flight,
      hotel: bundle.hotel,
      nights: bundle.nights,
      price: bundle.price,
      original: bundle.original,
      status: bundle.status,
    });
    setDrawerOpen(true);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      nights: Number(form.nights),
      price: Number(form.price),
      original: Number(form.original),
    };
    if (editingId) {
      await updateBundle(editingId, payload);
    } else {
      await addBundle(payload);
    }
    setDrawerOpen(false);
    loadBundles();
  };

  const handleDelete = async (bundle) => {
    if (!confirm(`Delete ${bundle.title}?`)) return;
    await deleteBundle(bundle.id);
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
      {/* Search */}
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

      {/* Add / Edit drawer */}
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

          {/* NEW */}
          <Input
            label="FLIGHT"
            placeholder="Emirates · Direct"
            value={form.flight}
            onChange={(e) => setField("flight", e.target.value)}
          />
          <Input
            label="HOTEL"
            placeholder="Burj Al Arab Jumeirah"
            value={form.hotel}
            onChange={(e) => setField("hotel", e.target.value)}
          />

          <Input
            label="NIGHTS"
            type="number"
            placeholder="5"
            value={form.nights}
            onChange={(e) => setField("nights", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
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
