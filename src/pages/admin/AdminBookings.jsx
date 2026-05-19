import { useState } from 'react'
import AdminSidebar from '../../components/layout/AdminSidebar'
import StatusPill from '../../components/ui/StatusPill'
import DataTable from '../../components/admin/DataTable'
import { ADMIN_BOOKINGS } from '../../data/mockData'

const STATUS_FILTERS = ['All', 'Confirmed', 'Pending', 'Cancelled']

const COLUMNS = [
  { key: 'id',       label: 'Booking ID', render: v => <span className="font-mono text-sm font-semibold text-ash">{v}</span> },
  { key: 'customer', label: 'Customer', render: v => <span className="font-semibold text-ink">{v}</span> },
  { key: 'trip',     label: 'Trip' },
  { key: 'date',     label: 'Travel Date' },
  { key: 'status',   label: 'Status', render: (_v, row) => <StatusPill status={row.status} /> },
  { key: 'amount',   label: 'Amount', render: v => <span className="font-bold text-ink">${v.toLocaleString()}</span> },
  {
    key: '_actions',
    label: 'Actions',
    render: () => (
      <div className="flex gap-2">
        <button className="text-xs font-semibold text-ash border border-hairline px-2.5 py-1 rounded-lg hover:border-ink hover:text-ink transition-colors">View</button>
        <button className="text-xs font-semibold text-red-500 border border-red-100 px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors">Cancel</button>
      </div>
    ),
  },
]

export default function AdminBookings() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = ADMIN_BOOKINGS.filter(b => {
    const matchStatus = statusFilter === 'All' || b.status === statusFilter
    const matchSearch = !search || b.id.toLowerCase().includes(search.toLowerCase()) || b.customer.toLowerCase().includes(search.toLowerCase()) || b.trip.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 bg-cloud p-8 overflow-auto">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-ink">Booking Management</h1>
            <p className="text-ash text-sm mt-0.5">{ADMIN_BOOKINGS.length} bookings</p>
          </div>
          <button className="gradient-bg text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
            Export CSV
          </button>
        </div>

        {/* Search + status filter chips */}
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-hairline rounded-lg px-3.5 py-2 text-sm bg-white w-64 focus:outline-none focus:border-ash"
          />
          <div className="flex gap-2">
            {STATUS_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={[
                  'px-4 py-1.5 rounded-full text-sm font-semibold transition-all',
                  statusFilter === s
                    ? 'gradient-bg text-white shadow-sm'
                    : 'bg-white border border-hairline text-ash hover:border-ash hover:text-ink',
                ].join(' ')}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-hairline">
          <DataTable columns={COLUMNS} data={filtered} />
        </div>
      </div>
    </div>
  )
}
