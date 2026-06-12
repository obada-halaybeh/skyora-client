export default function SeatMap({ selected, setSelected }) {
  const takenSeats = ["1A", "1C", "2B", "3D", "4A", "5F", "6C", "7E"];

  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  const leftCols = ["A", "B", "C"];
  const rightCols = ["D", "E", "F"];

  const getStatus = (seatId) => {
    if (takenSeats.includes(seatId)) return "taken";
    if (selected === seatId) return "selected";
    return "available";
  };

  const Seat = ({ seatId }) => {
    const status = getStatus(seatId);
    const colors = {
      available: "bg-[#d4edda] hover:brightness-95 cursor-pointer",
      taken: "bg-hairline cursor-not-allowed",
      selected: "bg-rausch cursor-pointer",
    };

    const handleClick = () => {
      if (status === "taken") return;
      setSelected(status === "selected" ? null : seatId);
    };

    return (
      <div
        onClick={handleClick}
        className={`w-8 h-7 rounded flex items-center justify-center text-[9px] font-bold transition-all ${colors[status]}`}
      >
        {status === "selected" && <span className="text-white">{seatId}</span>}
      </div>
    );
  };

  return (
    <div>
      {/* Legend */}
      <div className="flex gap-4 mb-5 text-[13px] font-medium">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-sm bg-[#d4edda]" /> Available
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-sm bg-hairline" /> Taken
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-sm bg-rausch" /> Selected
        </span>
      </div>

      {/* Grid */}
      <div className="flex justify-center">
        <div className="inline-block">
          <div className="flex gap-1.5 mb-2 pl-7">
            {leftCols.map((c) => (
              <div
                key={c}
                className="w-8 text-center text-[11px] font-bold text-ash"
              >
                {c}
              </div>
            ))}
            <div className="w-5" />
            {rightCols.map((c) => (
              <div
                key={c}
                className="w-8 text-center text-[11px] font-bold text-ash"
              >
                {c}
              </div>
            ))}
          </div>

          {rows.map((row) => (
            <div key={row} className="flex items-center gap-1.5 mb-1.5">
              <div className="w-5 text-[11px] font-semibold text-ash text-center">
                {row}
              </div>
              {leftCols.map((col) => (
                <Seat key={col} seatId={`${row}${col}`} />
              ))}
              <div className="w-5" />
              {rightCols.map((col) => (
                <Seat key={col} seatId={`${row}${col}`} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-sm font-medium mt-5">
        {selected ? (
          <>
            Selected seat:{" "}
            <span className="font-bold text-rausch">{selected}</span>
          </>
        ) : (
          <span className="text-ash">No seat selected yet</span>
        )}
      </p>
    </div>
  );
}
