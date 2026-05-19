import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/layout/AdminSidebar'
import StatusPill from '../../components/ui/StatusPill'
import DataTable from '../../components/admin/DataTable'
import { ADMIN_KPIS, ADMIN_BOOKINGS } from '../../data/mockData'

const BOOKING_COLUMNS = [
  { key: 'id',       label: 'Booking ID', render: v => <span className="font-mono text-sm text-ash">{v}</span> },
  { key: 'customer', label: 'Customer' },
  { key: 'trip',     label: 'Trip' },
  { key: 'date',     label: 'Travel Date' },
  { key: 'status',   label: 'Status', render: (v, row) => <StatusPill status={row.status} /> },
  { key: 'amount',   label: 'Amount', render: v => <span className="font-semibold">${v.toLocaleString()}</span> },
]

// Simple sparkline data for each KPI card
const SPARKLINE_PATHS = [
  'M0,30 L13,25 L26,28 L40,15 L53,18 L66,10 L80,5',
  'M0,35 L13,30 L26,25 L40,20 L53,22 L66,15 L80,8',
  'M0,32 L13,28 L26,20 L40,25 L53,18 L66,12 L80,6',
  'M0,20 L13,25 L26,22 L40,30 L53,28 L66,32 L80,35',
  'M0,30 L13,26 L26,22 L40,18 L53,14 L66,10 L80,6',
]

const PERIOD_OPTIONS = ['1W', '1M', '3M', '1Y']

// Revenue chart data points for the SVG line
const REVENUE_DATA = {
  '1W': [80, 95, 88, 110, 105, 125, 140],
  '1M': [60, 75, 70, 90, 85, 100, 95, 110, 115, 130, 125, 145, 140, 160, 155, 170, 165, 180, 175, 190, 185, 200, 195, 210, 205, 220, 215, 230, 225, 240],
  '3M': [50, 65, 80, 70, 90, 100, 85, 110, 120, 105, 130, 140, 125, 150, 160, 145, 170, 180, 165, 190, 200, 185, 210, 220, 205, 230, 240, 225, 250, 260, 245, 270, 280, 265, 290, 300, 285, 310, 320, 305, 330, 340, 325, 350, 360, 345, 370, 380, 365, 390, 400, 385, 410, 420, 405, 430, 440, 425, 450, 460, 445, 470, 480, 465, 490, 500, 485, 510, 520, 505, 530, 540, 525, 550, 560, 545, 570, 580, 565, 590, 600, 585, 610, 620, 605, 630, 640, 625, 650, 660],
  '1Y': [40, 55, 70, 85, 100, 115, 130, 145, 160, 175, 190, 205],
}

function toSvgPath(data, width = 600, height = 200, padding = 20) {
  if (!data || data.length < 2) return ''
  const minV = Math.min(...data)
  const maxV = Math.max(...data)
  const range = maxV - minV || 1
  const pts = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2)
    const y = height - padding - ((v - minV) / range) * (height - padding * 2)
    return `${x},${y}`
  })
  return 'M' + pts.join(' L')
}

function toAreaPath(data, width = 600, height = 200, padding = 20) {
  const linePath = toSvgPath(data, width, height, padding)
  if (!linePath) return ''
  const lastX = padding + (width - padding * 2)
  const firstX = padding
  return `${linePath} L${lastX},${height - padding} L${firstX},${height - padding} Z`
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [period, setPeriod] = useState('1M')
  const revenueData = REVENUE_DATA[period]
  const linePath = toSvgPath(revenueData)
  const areaPath = toAreaPath(revenueData)

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      {/* Content */}
      <div className="flex-1 bg-cloud p-8 overflow-auto">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-ink">Admin Dashboard</h1>
            <p className="text-ash text-sm mt-0.5">Last 30 days</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm font-semibold text-ink border border-hairline bg-white rounded-lg px-4 py-2 hover:bg-cloud transition-colors">
              📅 Date Range
            </button>
            <button
              onClick={() => navigate('/admin/flights')}
              className="gradient-bg text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              + Quick Add
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {ADMIN_KPIS.map((kpi, i) => (
            <div key={kpi.label} className="bg-white rounded-xl border border-hairline p-5">
              <p className="text-xs font-semibold text-ash uppercase tracking-wider">{kpi.label}</p>
              <p className="text-2xl font-bold text-ink mt-1">{kpi.value}</p>
              <p className={`text-xs font-semibold mt-1 ${kpi.up ? 'text-emerald-600' : 'text-red-500'}`}>
                {kpi.up ? '↑' : '↓'} {kpi.trend}
              </p>
              {/* Sparkline */}
              <svg viewBox="0 0 80 40" className="w-full mt-3" style={{ height: 40 }}>
                <path
                  d={SPARKLINE_PATHS[i]}
                  fill="none"
                  stroke="#ff385c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Charts + Quick Actions */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Revenue chart */}
          <div className="bg-white rounded-xl border border-hairline p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-bold text-ink text-lg">Total Revenue</p>
                <p className="text-3xl font-extrabold text-ink mt-1">$1.24M</p>
              </div>
              <div className="flex gap-1 bg-cloud rounded-lg p-1">
                {PERIOD_OPTIONS.map(p => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      period === p ? 'bg-white shadow-sm text-ink' : 'text-ash hover:text-ink'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <svg viewBox="0 0 600 200" className="w-full" style={{ height: 200 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff385c" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#ff385c" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#revenueGrad)" />
              <path
                d={linePath}
                fill="none"
                stroke="#ff385c"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-hairline p-6">
            <h2 className="font-bold text-ink text-lg mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/admin/flights')}
                className="gradient-bg text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity text-sm w-full text-left px-4"
              >
                ✈ Add Flight
              </button>
              <button
                onClick={() => navigate('/admin/hotels')}
                className="bg-white border border-hairline text-ink font-semibold py-3 rounded-lg hover:bg-cloud transition-colors text-sm w-full text-left px-4"
              >
                🏨 Add Hotel
              </button>
              <button
                onClick={() => navigate('/admin/bundles')}
                className="bg-white border border-hairline text-ink font-semibold py-3 rounded-lg hover:bg-cloud transition-colors text-sm w-full text-left px-4"
              >
                🎁 Add Bundle
              </button>
              <button
                onClick={() => navigate('/admin/bookings')}
                className="bg-white border border-hairline text-ink font-semibold py-3 rounded-lg hover:bg-cloud transition-colors text-sm w-full text-left px-4"
              >
                📋 View Bookings
              </button>
            </div>
          </div>
        </div>

        {/* Recent bookings */}
        <div className="bg-white rounded-xl border border-hairline p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-ink text-lg">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-sm text-rausch font-semibold hover:underline">
              View All →
            </Link>
          </div>
          <DataTable
            columns={BOOKING_COLUMNS}
            data={ADMIN_BOOKINGS}
          />
        </div>
      </div>
    </div>
  )
}
