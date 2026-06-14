import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({
  active,
  title,
  subtitle,
  action,
  children,
}) {
  return (
    <div className="flex bg-cloud min-h-screen">
      <AdminSidebar active={active} />
      <div className="flex-1 overflow-auto">
        {/* Topbar */}
        <div className="bg-canvas border-b border-hairline px-8 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold">{title}</h1>
            {subtitle && (
              <p className="text-sm text-ash font-medium mt-0.5">{subtitle}</p>
            )}
          </div>
          {action}
        </div>
        {/* Page body */}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
