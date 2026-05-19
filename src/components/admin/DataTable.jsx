export default function DataTable({ columns, data, actions }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-hairline">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-cloud">
            {columns.map(({ key, label }) => (
              <th
                key={key}
                className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-ash whitespace-nowrap"
              >
                {label}
              </th>
            ))}
            {actions && (
              <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-ash">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-t border-hairline hover:bg-cloud/50 transition-colors duration-100"
            >
              {columns.map(({ key, render }) => (
                <td key={key} className="py-3.5 px-4 text-sm text-ink">
                  {render ? render(row[key], row) : row[key]}
                </td>
              ))}
              {actions && (
                <td className="py-3.5 px-4 text-sm">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="py-10 text-center text-sm text-ash"
              >
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
