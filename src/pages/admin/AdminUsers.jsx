import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import StatusPill from '../../components/ui/StatusPill'
import DataTable from '../../components/admin/DataTable'
import { ADMIN_USERS } from '../../data/mockData'

const COLUMNS = [
  {
    key: 'name',
    label: 'User',
    render: (v, row) => (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 gradient-bg rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
          {row.avatar}
        </div>
        <span>{v}</span>
      </div>
    ),
  },
  { key: 'email',  label: 'Email' },
  { key: 'joined', label: 'Joined' },
  { key: 'trips',  label: 'Trips' },
  { key: 'spent',  label: 'Total Spent', render: v => <span className="font-semibold">${v.toLocaleString()}</span> },
  { key: 'status', label: 'Status', render: v => <StatusPill status={v} /> },
]

export default function AdminUsers() {
  return (
    <div className="min-h-screen bg-cloud">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-ink">Users</h1>
          <Link to="/admin" className="text-sm text-rausch font-semibold">← Dashboard</Link>
        </div>
        <div className="bg-white rounded-xl border border-hairline p-6">
          <DataTable columns={COLUMNS} data={ADMIN_USERS} />
        </div>
      </div>
    </div>
  )
}
