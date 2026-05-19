import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import StatusPill from '../../components/ui/StatusPill'
import DataTable from '../../components/admin/DataTable'
import { ADMIN_FLIGHTS_DATA } from '../../data/mockData'

const COLUMNS = [
  { key: 'id',       label: 'ID', render: v => <span className="font-mono text-sm">{v}</span> },
  { key: 'airline',  label: 'Airline' },
  { key: 'route',    label: 'Route' },
  { key: 'schedule', label: 'Schedule' },
  { key: 'seatsSold',label: 'Seats Sold' },
  { key: 'price',    label: 'Price', render: v => `$${v}` },
  { key: 'status',   label: 'Status', render: v => <StatusPill status={v} /> },
]

export default function AdminFlights() {
  return (
    <div className="min-h-screen bg-cloud">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-ink">Flights</h1>
          <Link to="/admin" className="text-sm text-rausch font-semibold">← Dashboard</Link>
        </div>
        <div className="bg-white rounded-xl border border-hairline p-6">
          <DataTable columns={COLUMNS} data={ADMIN_FLIGHTS_DATA} />
        </div>
      </div>
    </div>
  )
}
