import { Search } from "lucide-react";

export default function SearchPill({
  where = "Dubai, UAE",
  dates = "May 15-26",
  travelers = "2 adults",
}) {
  return (
    <div className="inline-flex items-center bg-canvas rounded-[40px] border border-hairline shadow-[rgba(0,0,0,0.04)_0_2px_6px] overflow-hidden h-16">
      <div className="flex-1 px-5 cursor-pointer">
        <p className="text-[11px] font-bold text-ink">Where</p>
        <p className="text-sm font-medium text-ash mt-0.5">{where}</p>
      </div>

      <div className="w-px self-stretch bg-hairline my-2.5" />

      <div className="flex-1 px-5 cursor-pointer">
        <p className="text-[11px] font-bold text-ink">Dates</p>
        <p className="text-sm font-medium text-ash mt-0.5">{dates}</p>
      </div>

      <div className="w-px self-stretch bg-hairline my-2.5" />

      <div className="flex-1 px-5 pr-2 cursor-pointer">
        <p className="text-[11px] font-bold text-ink">Travelers</p>
        <p className="text-sm font-medium text-ash mt-0.5">{travelers}</p>
      </div>

      <button className="w-12 h-12 rounded-full bg-skyora-gradient flex items-center justify-center mx-2 shadow-[0_2px_8px_rgba(255,56,92,0.4)] shrink-0">
        <Search size={18} className="text-white" />
      </button>
    </div>
  );
}
