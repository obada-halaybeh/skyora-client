export default function Drawer({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/35 z-[200]" />
      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-canvas shadow-[-8px_0_32px_rgba(0,0,0,0.15)] z-[201] p-5 sm:p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-7">
          <h2 className="text-xl font-extrabold">{title}</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-hairline flex items-center justify-center text-lg hover:bg-cloud"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
