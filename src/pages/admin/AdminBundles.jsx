import { useState } from 'react'
import AdminSidebar from '../../components/layout/AdminSidebar'
import StatusPill from '../../components/ui/StatusPill'
import DataTable from '../../components/admin/DataTable'
import { ADMIN_BUNDLES_DATA } from '../../data/mockData'

const emptyForm = { title: '', routes: '', hotel: '', discount: '', status: 'Active' }

export default function AdminBundles() {
  const [search, setSearch] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editRow, setEditRow] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [bundles, setBundles] = useState(ADMIN_BUNDLES_DATA)

  const filtered = bundles.filter(b =>
    !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.routes.toLowerCase().includes(search.toLowerCase())
  )

  function openAdd() { setEditRow(null); setForm(emptyForm); setDrawerOpen(true) }
  function openEdit(row) {
    setEditRow(row)
    setForm({ title: row.title, routes: row.routes, hotel: row.hotel, discount: row.discount, status: row.status })
    setDrawerOpen(true)
  }
  function handleDelete(row) { setBundles(prev => prev.filter(b => b.id !== row.id)) }
  function handleSave() {
    if (editRow) {
      setBundles(prev => prev.map(b => b.id === editRow.id ? { ...b, ...form } : b))
    } else {
      setBundles(prev => [...prev, { id: `BN-${String(prev.length + 1).padStart(3, '0')}`, ...form, img: 'https://picsum.photos/seed/new/80/60' }])
    }
    setDrawerOpen(false)
  }

  const COLUMNS = [
    { key: 'img',      label: '', render: v => <img src={v} alt="" className="w-10 h-8 rounded object-cover" /> },
    { key: 'title',    label: 'Title', render: v => <span className="font-semibold text-ink">{v}</span> },
    { key: 'routes',   label: 'Routes' },
    { key: 'hotel',    label: 'Hotel' },
    { key: 'discount', label: 'Discount', render: v => <span className="text-rausch font-bold">{v}</span> },
    { key: 'status',   label: 'Status', render: (v, row) => <StatusPill status={row.status} /> },
    {
      key: '_actions',
      label: 'Actions',
      render: (v, row) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(row)} className="text-xs font-semibold text-ash border border-hairline px-2.5 py-1 rounded-lg hover:border-ink hover:text-ink transition-colors">Edit</button>
          <button onClick={() => handleDelete(row)} className="text-xs font-semibold text-red-500 border border-red-100 px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors">Delete</button>
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
            <h1 className="text-2xl font-bold text-ink">Bundle Management</h1>
            <p className="text-ash text-sm mt-0.5">{bundles.length} bundles</p>
          </div>
          <button onClick={openAdd} className="gradient-bg text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
            + Add New Bundle
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search bundles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-hairline rounded-lg px-3.5 py-2 text-sm bg-white w-64 focus:outline-none focus:border-ash"
          />
        </div>

        <div className="bg-white rounded-xl border border-hairline">
          <DataTable columns={COLUMNS} data={filtered} />
        </div>
      </div>

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30" onClick={() => setDrawerOpen(false)} />
          <div className="w-[480px] bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-hairline">
              <h2 className="font-bold text-ink text-lg">{editRow ? 'Edit Bundle' : 'Add New Bundle'}</h2>
              <button onClick={() => setDrawerOpen(false)} className="text-ash hover:text-ink text-xl leading-none">&times;</button>
            </div>

            <div className="flex-1 overflow-auto px-6 py-6 flex flex-col gap-5">
              {[
                { label: 'Bundle Title', key: 'title', placeholder: 'Dubai Luxury Escape' },
                { label: 'Route (e.g. LHR → DXB)', key: 'routes', placeholder: 'LHR → DXB' },
                { label: 'Hotel Name', key: 'hotel', placeholder: 'Burj Al Arab' },
                { label: 'Discount (e.g. 32%)', key: 'discount', placeholder: '32%' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wide mb-1.5">{field.label}</label>
                  <input
                    type="text"
                    value={form[field.key]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full border border-hairline rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-ash"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wide mb-1.5">Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  className="w-full border border-hairline rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-ash"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-hairline flex gap-3">
              <button onClick={() => setDrawerOpen(false)} className="flex-1 border border-hairline text-ink font-semibold py-2.5 rounded-lg hover:bg-cloud transition-colors text-sm">Cancel</button>
              <button onClick={handleSave} className="flex-1 gradient-bg text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm">{editRow ? 'Save Changes' : 'Add Bundle'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
