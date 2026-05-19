import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import StatusPill from '../../components/ui/StatusPill'
import DataTable from '../../components/admin/DataTable'
import { ADMIN_HOTELS_DATA } from '../../data/mockData'

const COLUMNS = [
  { key: 'id',       label: 'ID', render: v => <span className="font-mono text-sm">{v}</span> },
  { key: 'name',     label: 'Hotel' },
  { key: 'location', label: 'Location' },
  { key: 'stars',    label: 'Stars', render: v => '⭐'.repeat(v) },
  { key: 'rating',   label: 'Rating', render: v => <span className="text-amber-500 font-semibold">★ {v}</span> },
  { key: 'status',   label: 'Status', render: v => <StatusPill status={v} /> },
]

export default function AdminHotels() {
  return (
    <div className="min-h-screen bg-cloud">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-ink">Hotels</h1>
          <Link to="/admin" className="text-sm text-rausch font-semibold">← Dashboard</Link>
        </div>
        <div className="bg-white rounded-xl border border-hairline p-6">
          <DataTable columns={COLUMNS} data={ADMIN_HOTELS_DATA} />
        </div>
      </div>
    </div>
  )
}
