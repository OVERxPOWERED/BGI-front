"use client";

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

/* ─── Telemetry bar chart data ─── */
const CHART_BARS = [
  { h: 35, label: "T+00" },
  { h: 42, label: "T+15" },
  { h: 55, label: "T+30" },
  { h: 48, label: "T+45" },
  { h: 72, label: "T+60" },
  { h: 85, label: "T+75" },
  { h: 90, label: "T+90" },
  { h: 78, label: "T+105" },
  { h: 65, label: "T+120" },
  { h: 70, label: "T+135" },
  { h: 58, label: "T+150" },
  { h: 62, label: "T+165" },
];

/* ─── Mission parameters data ─── */
const MISSION_PARAMS = [
  { label: "Target Area", value: "SECTOR 7G" },
  { label: "Duration", value: "04h 12m 45s" },
  { label: "Max Altitude", value: "4,200 ft ASL" },
  { label: "Operator", value: "OP-994-X" },
  { label: "Vehicle ID", value: "BGI-UAV-07" },
  { label: "Launch Site", value: "PAD DELTA-2" },
];

/* ─── Critical events ─── */
const EVENTS = [
  {
    time: "T+00:15",
    msg: "Nominal launch sequence completed. Ascending to holding pattern.",
    color: "text-slate-700",
  },
  {
    time: "T+01:42",
    msg: "Minor thermal variance detected in port motor assembly. Auto-corrected.",
    color: "text-orange-500",
  },
  {
    time: "T+03:55",
    msg: "Primary objective complete. Commencing RTB protocol.",
    color: "text-slate-700",
  },
];

export default function ReportViewer() {
  return (
    // FIX: Added 'h-full' here to strictly constrain the flex child to the parent container
    <div className="flex h-full min-h-0 flex-1 flex-col gap-5">
      {/* ══════════════════════════════════════
          TOP CONTROL PANEL
      ══════════════════════════════════════ */}
      <div className="flex shrink-0 items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-6 py-4">
        {/* Left: Title + Progress */}
        <div className="flex items-center gap-4">
          {/* Dev icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800">
            <Ico
              d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
              size={16}
              cls="text-blue-400"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">
              Phase 5 Development: Reporting Engine
            </p>
            <div className="mt-1.5 flex items-center gap-3">
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-emerald-400"
                  style={{ width: "75%" }}
                />
              </div>
              <span className="font-mono text-xs text-slate-400">
                75%{" "}
                <span className="text-emerald-400">Complete</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 transition-colors hover:border-slate-500 hover:text-slate-200">
            <Ico
              d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2"
              size={13}
            />
            Playback Mission
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 transition-colors hover:border-slate-500 hover:text-slate-200">
            <Ico
              d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
              size={13}
            />
            Export CSV
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-blue-200 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-blue-900 transition-colors hover:bg-blue-300">
            <Ico
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8"
              size={13}
              cls="text-blue-900"
            />
            Generate Mission Report
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PDF DOCUMENT PREVIEWER
      ══════════════════════════════════════ */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#05070A]">
        {/* Preview top bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-800 px-5 py-2.5">
          <span className="font-mono text-[11px] tracking-wider text-slate-500">
            PREVIEW: MSN-8492-ALPHA.pdf
          </span>
          <div className="flex items-center gap-2">
            <button className="text-slate-500 transition-colors hover:text-slate-300">
              <Ico
                d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35M8 11h6"
                size={14}
              />
            </button>
            <span className="font-mono text-[11px] text-slate-500">100%</span>
            <button className="text-slate-500 transition-colors hover:text-slate-300">
              <Ico
                d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35M11 8v6M8 11h6"
                size={14}
              />
            </button>
          </div>
        </div>

        {/* Document scroll area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* The white "paper" */}
          <div className="mx-auto w-full max-w-4xl rounded bg-white px-14 py-12 text-slate-900 shadow-2xl shadow-black/40">
            {/* ── Document Header ── */}
            <div className="flex items-start justify-between border-b-2 border-slate-300 pb-5">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                  MISSION POST-FLIGHT REPORT
                </h1>
                <p className="mt-1.5 font-mono text-xs tracking-wider text-slate-500">
                  GENERATED: 2023-10-25T14:45:00Z &nbsp;|&nbsp; REF: MSN-8492-ALPHA
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold tracking-wide text-slate-800">
                  BGI GROUND STATION
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                  Dept of Flight Ops
                </p>
              </div>
            </div>

            {/* ── Sections 1.0 & 2.0 (two-column) ── */}
            <div className="mt-8 grid grid-cols-2 gap-10">
              {/* 1.0 MISSION PARAMETERS */}
              <div>
                <h2 className="mb-4 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-slate-700">
                  1.0 Mission Parameters
                </h2>
                <div className="space-y-2.5">
                  {MISSION_PARAMS.map((p) => (
                    <div key={p.label} className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-medium text-slate-500">
                        {p.label}
                      </span>
                      <span className="font-mono text-xs font-semibold text-slate-800">
                        {p.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2.0 CRITICAL EVENTS */}
              <div>
                <h2 className="mb-4 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-slate-700">
                  2.0 Critical Events
                </h2>
                <div className="space-y-4">
                  {EVENTS.map((e, i) => (
                    <div key={i}>
                      <p className={`text-xs leading-relaxed ${e.color}`}>
                        <span className="font-mono font-bold">{e.time}</span>{" "}
                        {e.msg}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 3.0 TELEMETRY SUMMARY ── */}
            <div className="mt-10">
              <h2 className="mb-4 border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-slate-700">
                3.0 Telemetry Summary
              </h2>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                {/* Bar chart */}
                <div className="flex h-44 items-end gap-2">
                  {CHART_BARS.map((bar, i) => (
                    <div
                      key={i}
                      className="group relative flex flex-1 flex-col items-center"
                    >
                      <div
                        className="w-full rounded-t bg-blue-600 transition-colors group-hover:bg-blue-500"
                        style={{ height: `${bar.h}%` }}
                      />
                    </div>
                  ))}
                </div>
                {/* X axis labels */}
                <div className="mt-2 flex gap-2">
                  {CHART_BARS.map((bar, i) => (
                    <div key={i} className="flex-1 text-center">
                      <span className="font-mono text-[7px] text-slate-400">
                        {bar.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 4.0 SENSOR PAYLOAD METRICS (peek, clipped at bottom) ── */}
            <div className="mt-10">
              <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wider text-slate-700">
                4.0 Sensor Payload Metrics
              </h2>
              <div className="mt-4 h-1.5 w-32 rounded-full bg-slate-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}