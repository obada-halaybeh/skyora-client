import { useState } from 'react'
import AdminSidebar from '../../components/layout/AdminSidebar'
import StatusPill from '../../components/ui/StatusPill'
import DataTable from '../../components/admin/DataTable'
import { ADMIN_HOTELS_DATA } from '../../data/mockData'

const ALL_AMENITIES = ['Free Wi-Fi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Concierge', 'Room Service', 'Private Beach', 'Fine Dining']
const emptyForm = { name: '', address: '', stars: '5', amenities: [], status: 'Active' }

export default function AdminHotels() {
  const [search, setSearch] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editRow, setEditRow] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [hotels, setHotels] = useState(ADMIN_HOTELS_DATA)

  const filtered = hotels.filter(h =>
    !search || h.name.toLowerCase().includes(search.toLowerCase()) || h.location.toLowerCase().includes(search.toLowerCase())
  )

  function openAdd() {
    setEditRow(null)
    setForm(emptyForm)
    setDrawerOpen(true)
  }

  function openEdit(row) {
    setEditRow(row)
    setForm({ name: row.name, address: row.location, stars: String(row.stars), amenities: [], status: row.status })
    setDrawerOpen(true)
  }

  function handleDelete(row) {
    setHotels(prev => prev.filter(h => h.id !== row.id))
  }

  function toggleAmenity(a) {
    setForm(f => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter(x => x !== a) : [...f.amenities, a],
    }))
  }

  function handleSave() {
    if (editRow) {
      setHotels(prev => prev.map(h =>
        h.id === editRow.id ? { ...h, name: form.name, location: form.address, stars: Number(form.stars), status: form.status } : h
      ))
    } else {
      setHotels(prev => [...prev, {
        id: `HT-${String(prev.length + 1).padStart(3, '0')}`,
        name: form.name,
        location: form.address,
        stars: Number(form.stars),
        rating: 0,
        status: form.status,
        img: 'https://picsum.photos/seed/new/80/60',
      }])
    }
    setDrawerOpen(false)
  }

  const COLUMNS = [
    {
      key: 'img',
      label: '',
      render: v => <img src={v} alt="" className="w-10 h-8 rounded object-cover" />,
    },
    { key: 'name',     label: 'Name', render: v => <span className="font-semibold text-ink">{v}</span> },
    { key: 'location', label: 'Location' },
    { key: 'stars',    label: 'Stars', render: v => <span className="text-amber-400">{'★'.repeat(v)}</span> },
    { key: 'rating',   label: 'Rating', render: v => <span className="text-amber-500 font-semibold">★ {v}</span> },
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
            <h1 className="text-2xl font-bold text-ink">Hotel Management</h1>
            <p className="text-ash text-sm mt-0.5">{hotels.length} hotels</p>
          </div>
          <button onClick={openAdd} className="gradient-bg text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
            + Add New Hotel
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search hotels..."
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
              <h2 className="font-bold text-ink text-lg">{editRow ? 'Edit Hotel' : 'Add New Hotel'}</h2>
              <button onClick={() => setDrawerOpen(false)} className="text-ash hover:text-ink text-xl leading-none">&times;</button>
            </div>

            <div className="flex-1 overflow-auto px-6 py-6 flex flex-col gap-5">
              {[
                { label: 'Hotel Name', key: 'name', placeholder: 'Burj Al Arab' },
                { label: 'Address / City', key: 'address', placeholder: 'Dubai, UAE' },
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
                <label className="block text-xs font-semibold text-ink uppercase tracking-wide mb-1.5">Star Rating</label>
                <select
                  value={form.stars}
                  onChange={e => setForm(f => ({ ...f, stars: e.target.value }))}
                  className="w-full border border-hairline rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-ash"
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={String(n)}>{n} Star{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wide mb-2">Amenities</label>
                <div className="grid grid-cols-2 gap-2">
                  {ALL_AMENITIES.map(a => (
                    <label key={a} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.amenities.includes(a)}
                        onChange={() => toggleAmenity(a)}
                        className="w-4 h-4 accent-rausch"
                      />
                      <span className="text-sm text-ink">{a}</span>
                    </label>
                  ))}
                </div>
              </div>

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
              <button onClick={handleSave} className="flex-1 gradient-bg text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm">{editRow ? 'Save Changes' : 'Add Hotel'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
