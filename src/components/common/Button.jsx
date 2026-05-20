export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-rausch text-white hover:brightness-110",
    gradient: "bg-skyora-gradient text-white hover:brightness-110",
    secondary: "bg-canvas border border-hairline text-ink hover:bg-cloud",
    ghost: "bg-transparent border border-hairline text-ink hover:bg-cloud",
    danger: "bg-error text-white hover:brightness-110",
    luxe: "bg-luxe text-white hover:brightness-110",
  };

  const sizes = {
    sm: "px-4 py-2 text-[13px]",
    md: "px-6 py-3 text-[15px]",
    lg: "px-7 py-[15px] text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
