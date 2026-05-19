import { useState } from 'react'
import AdminSidebar from '../../components/layout/AdminSidebar'
import StatusPill from '../../components/ui/StatusPill'
import DataTable from '../../components/admin/DataTable'
import { ADMIN_USERS } from '../../data/mockData'

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState(ADMIN_USERS)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editRow, setEditRow] = useState(null)
  const [form, setForm] = useState({ name: '', email: '' })

  const filtered = users.filter(u =>
    !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  )

  function toggleSuspend(row) {
    setUsers(prev => prev.map(u =>
      u.id === row.id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
    ))
  }

  function openEdit(row) {
    setEditRow(row)
    setForm({ name: row.name, email: row.email })
    setDrawerOpen(true)
  }

  function handleSave() {
    setUsers(prev => prev.map(u =>
      u.id === editRow.id ? { ...u, name: form.name, email: form.email } : u
    ))
    setDrawerOpen(false)
  }

  const COLUMNS = [
    {
      key: 'name',
      label: 'Name',
      render: (v, row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
            {row.avatar}
          </div>
          <span className="font-semibold text-ink">{v}</span>
        </div>
      ),
    },
    { key: 'email',  label: 'Email', render: v => <span className="text-ash text-sm">{v}</span> },
    { key: 'joined', label: 'Joined' },
    { key: 'trips',  label: 'Trips', render: v => <span className="font-semibold text-ink">{v}</span> },
    { key: 'spent',  label: 'Total Spent', render: v => <span className="font-bold text-ink">${v.toLocaleString()}</span> },
    { key: 'status', label: 'Status', render: (v, row) => <StatusPill status={row.status} /> },
    {
      key: '_actions',
      label: 'Actions',
      render: (v, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEdit(row)}
            className="text-xs font-semibold text-ash border border-hairline px-2.5 py-1 rounded-lg hover:border-ink hover:text-ink transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => toggleSuspend(row)}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
              row.status === 'Active'
                ? 'text-amber-600 border-amber-100 hover:bg-amber-50'
                : 'text-emerald-600 border-emerald-100 hover:bg-emerald-50'
            }`}
          >
            {row.status === 'Active' ? 'Suspend' : 'Reinstate'}
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 bg-cloud p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-ink">User Management</h1>
            <p className="text-ash text-sm mt-0.5">{users.length} users</p>
          </div>
          <button className="gradient-bg text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
            Export Users
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-hairline rounded-lg px-3.5 py-2 text-sm bg-white w-64 focus:outline-none focus:border-ash"
          />
        </div>

        <div className="bg-white rounded-xl border border-hairline">
          <DataTable columns={COLUMNS} data={filtered} />
        </div>
      </div>

      {/* Edit Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30" onClick={() => setDrawerOpen(false)} />
          <div className="w-[480px] bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-hairline">
              <h2 className="font-bold text-ink text-lg">Edit User</h2>
              <button onClick={() => setDrawerOpen(false)} className="text-ash hover:text-ink text-xl leading-none">&times;</button>
            </div>

            <div className="flex-1 overflow-auto px-6 py-6 flex flex-col gap-5">
              {editRow && (
                <div className="flex items-center gap-3 p-4 bg-cloud rounded-xl">
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {editRow.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{editRow.name}</p>
                    <p className="text-sm text-ash">Member since {editRow.joined}</p>
                  </div>
                </div>
              )}

              {[
                { label: 'Full Name', key: 'name', placeholder: 'Sarah Mitchell' },
                { label: 'Email', key: 'email', placeholder: 'sarah@email.com' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wide mb-1.5">{field.label}</label>
                  <input
                    type={field.key === 'email' ? 'email' : 'text'}
                    value={form[field.key]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full border border-hairline rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-ash"
                  />
                </div>
              ))}

              {editRow && (
                <div className="p-4 bg-cloud rounded-xl">
                  <p className="text-xs font-semibold text-ash uppercase tracking-wide mb-2">Account Stats</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-ash">Total Trips</p>
                      <p className="font-bold text-ink">{editRow.trips}</p>
                    </div>
                    <div>
                      <p className="text-xs text-ash">Total Spent</p>
                      <p className="font-bold text-ink">${editRow.spent.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-hairline flex gap-3">
              <button onClick={() => setDrawerOpen(false)} className="flex-1 border border-hairline text-ink font-semibold py-2.5 rounded-lg hover:bg-cloud transition-colors text-sm">Cancel</button>
              <button onClick={handleSave} className="flex-1 gradient-bg text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
