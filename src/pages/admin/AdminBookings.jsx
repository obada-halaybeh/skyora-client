import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import StatusPill from '../../components/ui/StatusPill'
import DataTable from '../../components/admin/DataTable'
import { ADMIN_BOOKINGS } from '../../data/mockData'

const COLUMNS = [
  { key: 'id',       label: 'Booking ID', render: v => <span className="font-mono text-sm">{v}</span> },
  { key: 'customer', label: 'Customer' },
  { key: 'trip',     label: 'Trip' },
  { key: 'date',     label: 'Date' },
  { key: 'status',   label: 'Status', render: v => <StatusPill status={v} /> },
  { key: 'amount',   label: 'Amount', render: v => <span className="font-semibold">${v.toLocaleString()}</span> },
]

export default function AdminBookings() {
  return (
    <div className="min-h-screen bg-cloud">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-ink">Bookings</h1>
          <Link to="/admin" className="text-sm text-rausch font-semibold">← Dashboard</Link>
        </div>
        <div className="bg-white rounded-xl border border-hairline p-6">
          <DataTable columns={COLUMNS} data={ADMIN_BOOKINGS} />
        </div>
      </div>
    </div>
  )
}
