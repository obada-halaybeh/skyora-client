export default function Input({ label, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[12px] font-bold mb-1.5 tracking-wide">
          {label}
        </label>
      )}
      <input
        className="w-full px-4 py-[13px] border border-hairline rounded-[10px] text-[15px] font-medium outline-none focus:border-ink transition-colors"
        {...props}
      />
    </div>
  );
}
