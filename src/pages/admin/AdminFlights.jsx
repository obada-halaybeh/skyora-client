import { useState } from 'react'
import AdminSidebar from '../../components/layout/AdminSidebar'
import StatusPill from '../../components/ui/StatusPill'
import DataTable from '../../components/admin/DataTable'
import { ADMIN_FLIGHTS_DATA } from '../../data/mockData'

const AIRLINES = ['Emirates', 'Air France', 'Singapore Airlines', 'British Airways', 'Qatar Airways']

const emptyForm = { flightNumber: '', airline: '', from: '', to: '', aircraft: '', status: 'Active' }

export default function AdminFlights() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [airlineFilter, setAirlineFilter] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editRow, setEditRow] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [flights, setFlights] = useState(ADMIN_FLIGHTS_DATA)

  const filtered = flights.filter(f => {
    const matchSearch = !search || f.id.toLowerCase().includes(search.toLowerCase()) || f.airline.toLowerCase().includes(search.toLowerCase()) || f.route.toLowerCase().includes(search.toLowerCase())
    const matchStatus = !statusFilter || f.status === statusFilter
    const matchAirline = !airlineFilter || f.airline === airlineFilter
    return matchSearch && matchStatus && matchAirline
  })

  function openAdd() {
    setEditRow(null)
    setForm(emptyForm)
    setDrawerOpen(true)
  }

  function openEdit(row) {
    setEditRow(row)
    setForm({ flightNumber: row.id, airline: row.airline, from: row.route.split(' → ')[0], to: row.route.split(' → ')[1], aircraft: '', status: row.status })
    setDrawerOpen(true)
  }

  function handleDelete(row) {
    setFlights(prev => prev.filter(f => f.id !== row.id))
  }

  function handleSave() {
    if (editRow) {
      setFlights(prev => prev.map(f =>
        f.id === editRow.id
          ? { ...f, airline: form.airline, route: `${form.from} → ${form.to}`, status: form.status }
          : f
      ))
    } else {
      setFlights(prev => [...prev, {
        id: form.flightNumber,
        airline: form.airline,
        route: `${form.from} → ${form.to}`,
        schedule: 'TBD',
        seatsSold: 0,
        price: 0,
        status: form.status,
      }])
    }
    setDrawerOpen(false)
  }

  const COLUMNS = [
    { key: 'id',        label: 'Flight Code', render: v => <span className="font-mono text-sm font-semibold">{v}</span> },
    { key: 'airline',   label: 'Airline' },
    { key: 'route',     label: 'Route', render: v => <span className="font-semibold text-ink">{v}</span> },
    { key: 'schedule',  label: 'Schedule' },
    { key: 'seatsSold', label: 'Seats Sold' },
    { key: 'price',     label: 'Price', render: v => <span className="font-semibold">${v}</span> },
    { key: 'status',    label: 'Status', render: (v, row) => <StatusPill status={row.status} /> },
    {
      key: '_actions',
      label: 'Actions',
      render: (v, row) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(row)} className="text-xs font-semibold text-ash border border-hairline px-2.5 py-1 rounded-lg hover:border-ink hover:text-ink transition-colors">
            Edit
          </button>
          <button onClick={() => handleDelete(row)} className="text-xs font-semibold text-red-500 border border-red-100 px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors">
            Delete
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 bg-cloud p-8 overflow-auto">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-ink">Flight Management</h1>
            <p className="text-ash text-sm mt-0.5">24 flights</p>
          </div>
          <button
            onClick={openAdd}
            className="gradient-bg text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            + Add New Flight
          </button>
        </div>

        {/* Filter row */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search flights..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-hairline rounded-lg px-3.5 py-2 text-sm bg-white w-64 focus:outline-none focus:border-ash"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border border-hairline rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-ash"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            value={airlineFilter}
            onChange={e => setAirlineFilter(e.target.value)}
            className="border border-hairline rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-ash"
          >
            <option value="">All Airlines</option>
            {AIRLINES.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-hairline">
          <DataTable columns={COLUMNS} data={filtered} />
        </div>
      </div>

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30" onClick={() => setDrawerOpen(false)} />
          <div className="w-[480px] bg-white h-full flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-hairline">
              <h2 className="font-bold text-ink text-lg">{editRow ? 'Edit Flight' : 'Add New Flight'}</h2>
              <button onClick={() => setDrawerOpen(false)} className="text-ash hover:text-ink text-xl leading-none">&times;</button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-auto px-6 py-6 flex flex-col gap-5">
              {[
                { label: 'Flight Number', key: 'flightNumber', placeholder: 'EK-202' },
                { label: 'Airline', key: 'airline', placeholder: 'Emirates' },
                { label: 'From (IATA)', key: 'from', placeholder: 'LHR' },
                { label: 'To (IATA)', key: 'to', placeholder: 'DXB' },
                { label: 'Aircraft', key: 'aircraft', placeholder: 'Boeing 777-300ER' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-ink uppercase tracking-wide mb-1.5">
                    {field.label}
                  </label>
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

            {/* Footer */}
            <div className="px-6 py-4 border-t border-hairline flex gap-3">
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex-1 border border-hairline text-ink font-semibold py-2.5 rounded-lg hover:bg-cloud transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 gradient-bg text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm"
              >
                {editRow ? 'Save Changes' : 'Add Flight'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
