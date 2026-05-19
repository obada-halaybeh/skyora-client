const statusMap = {
  Confirmed:  { bg: 'bg-emerald-50',  text: 'text-emerald-700', dot: 'bg-emerald-500' },
  Active:     { bg: 'bg-emerald-50',  text: 'text-emerald-700', dot: 'bg-emerald-500' },
  Completed:  { bg: 'bg-slate-100',   text: 'text-slate-700',   dot: 'bg-slate-500'   },
  Inactive:   { bg: 'bg-slate-100',   text: 'text-slate-700',   dot: 'bg-slate-500'   },
  Cancelled:  { bg: 'bg-red-50',      text: 'text-red-700',     dot: 'bg-red-500'     },
  Suspended:  { bg: 'bg-red-50',      text: 'text-red-700',     dot: 'bg-red-500'     },
  Pending:    { bg: 'bg-amber-50',    text: 'text-amber-700',   dot: 'bg-amber-500'   },
}

const fallback = { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-500' }

export default function StatusPill({ status }) {
  const styles = statusMap[status] ?? fallback
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles.bg} ${styles.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      {status}
    </span>
  )
}
