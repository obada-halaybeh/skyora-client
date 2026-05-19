const variantClasses = {
  default: 'bg-cloud text-ash',
  rausch: 'bg-rausch text-white',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  error: 'bg-red-100 text-red-700',
}

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        variantClasses[variant] ?? variantClasses.default,
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
