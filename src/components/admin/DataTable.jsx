export default function DataTable({
  columns,
  rows,
  renderCell,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-canvas border border-hairline rounded-2xl overflow-x-auto">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="border-b border-hairline bg-cloud">
            {columns.map((col) => (
              <th
                key={col}
                className="text-left px-5 py-3 font-bold text-ash text-[12px] tracking-wide uppercase"
              >
                {col}
              </th>
            ))}
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-5 py-10 text-center text-ash"
              >
                No records found.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-hairline last:border-0 hover:bg-cloud/50"
              >
                {renderCell(row)}
                <td className="px-5 py-3 text-right whitespace-nowrap">
                  <button
                    onClick={() => onEdit(row)}
                    className="text-info font-semibold hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(row)}
                    className="text-error font-semibold hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
