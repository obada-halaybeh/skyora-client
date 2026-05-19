const sizeClasses = {
  sm: 'py-1.5 px-3 text-xs',
  md: 'py-2 px-4 text-sm',
  lg: 'py-3 px-6 text-base',
}

const variantClasses = {
  primary: 'bg-rausch text-white hover:bg-[#e0324f] active:bg-[#c8284a]',
  gradient: 'gradient-bg text-white hover:opacity-90 active:opacity-80',
  secondary: 'bg-white text-ink border border-hairline hover:bg-cloud active:bg-hairline',
  ghost: 'bg-transparent text-ink border border-hairline hover:bg-cloud active:bg-hairline',
  danger: 'bg-error text-white hover:bg-[#a82e10] active:bg-[#932810]',
}

export default function Button({ children, variant = 'primary', size = 'md', pill = false, className = '', ...props }) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-1.5 font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-rausch focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size] ?? sizeClasses.md,
        variantClasses[variant] ?? variantClasses.primary,
        pill ? 'rounded-full' : 'rounded-md',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
