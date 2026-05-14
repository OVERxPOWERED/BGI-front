"use client";

import { useState } from "react";

/* ─── SVG icon helper ─── */
function Ico({ d, size = 14, cls = "" }: { d: string; size?: number; cls?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cls}
    >
      <path d={d} />
    </svg>
  );
}

/* ─── Mock data ─── */
interface ReportItem {
  id: string;
  label: string;
  sub: string;
  icon: string;
  group: "recent" | "scheduled" | "archived";
}

const REPORTS: ReportItem[] = [
  {
    id: "msn-8492",
    label: "MSN-8492-ALPHA",
    sub: "Today, 14:30 ZULU",
    icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
    group: "recent",
  },
  {
    id: "msn-8491",
    label: "MSN-8491-BRAVO",
    sub: "Yesterday, 09:15 ZULU",
    icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
    group: "recent",
  },
  {
    id: "weekly-42",
    label: "WEEKLY_SUMMARY_42",
    sub: "Oct 24, 00:00 ZULU",
    icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
    group: "recent",
  },
  {
    id: "sys-health",
    label: "SYS_HEALTH_CHECK",
    sub: "Daily @ 00:00 ZULU",
    icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2",
    group: "scheduled",
  },
  {
    id: "q3-logs",
    label: "2023_Q3_LOGS",
    sub: "74 Files",
    icon: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z",
    group: "archived",
  },
];

interface ReportDirectoryProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export default function ReportDirectory({ activeId, onSelect }: ReportDirectoryProps) {
  const [search, setSearch] = useState("");

  const recent = REPORTS.filter((r) => r.group === "recent");
  const scheduled = REPORTS.filter((r) => r.group === "scheduled");
  const archived = REPORTS.filter((r) => r.group === "archived");

  const filtered = (items: ReportItem[]) =>
    items.filter((r) => r.label.toLowerCase().includes(search.toLowerCase()));

  return (
    // FIX 2: Added w-[350px], h-full, and min-h-0 to fix the flexbox scroll bug
    <div className="flex w-[350px] h-full min-h-0 shrink-0 flex-col rounded-xl border border-slate-800 bg-slate-900 p-5">
      {/* Title */}
      <h2 className="mb-4 text-sm font-bold tracking-wide text-slate-200">
        Report Directory
      </h2>

      {/* Search bar */}
      <div className="relative mb-5 shrink-0">
        <Ico
          d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35"
          size={14}
          cls="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-9 pr-3 font-mono text-xs text-slate-300 placeholder-slate-600 outline-none transition-colors focus:border-slate-600"
        />
      </div>

      {/* Scrollable list area */}
      <div className="flex-1 space-y-5 overflow-y-auto pr-1">
        {/* RECENT REPORTS */}
        <div>
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Recent Reports
          </p>
          <div className="space-y-1">
            {filtered(recent).map((r) => {
              const isActive = activeId === r.id;
              return (
                <button
                  key={r.id}
                  // FIX 1: Safely call onSelect to prevent crashes
                  onClick={() => onSelect?.(r.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${isActive
                    ? "border-l-4 border-blue-400 bg-blue-400/10"
                    : "border-l-4 border-transparent hover:bg-slate-800/50"
                    }`}
                >
                  <Ico
                    d={r.icon}
                    size={15}
                    cls={isActive ? "text-blue-400" : "text-slate-500"}
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate font-mono text-xs font-semibold ${isActive ? "text-blue-300" : "text-slate-300"
                        }`}
                    >
                      {r.label}
                    </p>
                    <p className="font-mono text-[10px] text-slate-500">
                      {r.sub}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SCHEDULED */}
        <div>
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Scheduled
          </p>
          <div className="space-y-1">
            {filtered(scheduled).map((r) => (
              <button
                key={r.id}
                onClick={() => onSelect?.(r.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${activeId === r.id
                  ? "border-l-4 border-blue-400 bg-blue-400/10"
                  : "border-l-4 border-transparent hover:bg-slate-800/50"
                  }`}
              >
                <Ico d={r.icon} size={15} cls="text-slate-500" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-xs font-semibold text-slate-300">
                    {r.label}
                  </p>
                  <p className="font-mono text-[10px] text-slate-500">
                    {r.sub}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ARCHIVED */}
        <div>
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Archived
          </p>
          <div className="space-y-1">
            {filtered(archived).map((r) => (
              <button
                key={r.id}
                onClick={() => onSelect?.(r.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${activeId === r.id
                  ? "border-l-4 border-blue-400 bg-blue-400/10"
                  : "border-l-4 border-transparent hover:bg-slate-800/50"
                  }`}
              >
                <Ico d={r.icon} size={15} cls="text-slate-500" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-xs font-semibold text-slate-300">
                    {r.label}
                  </p>
                  <p className="font-mono text-[10px] text-slate-500">
                    {r.sub}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}