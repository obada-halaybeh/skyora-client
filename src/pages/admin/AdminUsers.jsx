import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import DataTable from "../../components/admin/DataTable";
import Drawer from "../../components/admin/Drawer";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { API } from "../../config";

const EMPTY_FORM = {
  name: "",
  email: "",
  password: "",
  joined: "",
  status: "Active",
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setDrawerOpen(true);
  };

  const openEdit = (user) => {
    setEditingId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      joined: user.joined,
      status: user.status,
    });
    setDrawerOpen(true);
  };

  const handleSave = async () => {
    const payload = { ...form };

    if (editingId) {
      await fetch(`${API}/users/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-role": currentUser.role,
        },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${API}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-role": currentUser.role,
        },
        body: JSON.stringify(payload),
      });
    }

    setDrawerOpen(false);
    loadUsers();
  };

  const handleDelete = async (user) => {
    if (!confirm(`Delete ${user.name}?`)) return;
    await fetch(`${API}/users/${user.id}`, {
      method: "DELETE",
      headers: { "x-role": currentUser.role },
    });
    loadUsers();
  };

  const setField = (field, value) => setForm({ ...form, [field]: value });

  const visible = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout
      active="Users"
      title="User Management"
      subtitle={`${users.length} users`}
      action={
        <Button variant="primary" size="md" onClick={openAdd}>
          + Add New User
        </Button>
      }
    >
      <div className="mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users, emails..."
          className="w-full px-4 py-2.5 border border-hairline rounded-lg text-sm outline-none focus:border-ink"
        />
      </div>

      {loading ? (
        <p className="text-ash py-10 text-center">Loading users...</p>
      ) : (
        <DataTable
          columns={["Name", "Email", "Joined", "Status"]}
          rows={visible}
          onEdit={openEdit}
          onDelete={handleDelete}
          renderCell={(u) => (
            <>
              <td className="px-5 py-3 font-bold">{u.name}</td>
              <td className="px-5 py-3 text-ash">{u.email}</td>
              <td className="px-5 py-3 text-ash">{u.joined}</td>
              <td className="px-5 py-3">
                <span
                  className={`text-[12px] font-bold px-2.5 py-1 rounded-md ${
                    u.status === "Active"
                      ? "bg-success/10 text-success"
                      : "bg-error/10 text-error"
                  }`}
                >
                  {u.status}
                </span>
              </td>
            </>
          )}
        />
      )}

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editingId ? "Edit User" : "Add New User"}
      >
        <div className="flex flex-col gap-4">
          <Input
            label="FULL NAME"
            placeholder="James Thompson"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
          />
          <Input
            label="EMAIL"
            type="email"
            placeholder="james@email.com"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
          />
          <Input
            label={editingId ? "PASSWORD (leave blank to keep)" : "PASSWORD"}
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
          />
          <Input
            label="JOINED"
            placeholder="Jan 2026"
            value={form.joined}
            onChange={(e) => setField("joined", e.target.value)}
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
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <Button
            variant="gradient"
            size="lg"
            className="w-full mt-2"
            onClick={handleSave}
          >
            {editingId ? "Save Changes" : "Add User"}
          </Button>
        </div>
      </Drawer>
    </AdminLayout>
  );
}
