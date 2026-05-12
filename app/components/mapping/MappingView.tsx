"use client";

import { useState } from "react";

/* ─── Tiny inline SVG helper ─── */
function Ico({
  d,
  size = 14,
  cls = "",
  strokeWidth = 1.5,
}: {
  d: string;
  size?: number;
  cls?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cls}
    >
      <path d={d} />
    </svg>
  );
}

/* ─── Sparkline bar heights ─── */
const SPARK_HEIGHTS = [35, 55, 40, 70, 50, 85, 60, 75, 45, 90, 65, 80];

/* ─── SLAM panel tabs ─── */
const TABS = ["SLAM", "POINT CLOUD", "3D MESH"] as const;
type Tab = (typeof TABS)[number];

/* ─── Engine parameters ─── */
const ENGINE_PARAMS = [
  { label: "LOOP CLOSURE", value: "ACTIVE", isStatus: true },
  { label: "VOXEL GRID FILTER", value: "0.05m", isStatus: false },
  { label: "ICP ITERATIONS", value: "30", isStatus: false },
];

export default function MappingView() {
  const [activeTab, setActiveTab] = useState<Tab>("SLAM");

  return (
    <div className="flex h-[calc(100vh-56px)] w-full flex-col bg-[#0A0C10] p-6">

      {/* ══════════════════════════════════════
          A. TOP WARNING BANNER
      ══════════════════════════════════════ */}
      <div className="flex w-full shrink-0 items-center justify-between gap-4 rounded-xl border border-amber-500/30 bg-[#13110a] px-5 py-3.5">
        {/* Left: icon + text */}
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
            <Ico
              d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
              size={18}
              cls="text-amber-400"
              strokeWidth={1.75}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-400">
              Module Under Development: Phase 4 Advanced Mapping
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              Estimated Beta Release: Q3 2024. Environmental rendering engines
              are currently operating in diagnostic mode.
            </p>
          </div>
        </div>

        {/* Right: roadmap button */}
        <button className="shrink-0 rounded-lg border border-slate-600 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400 transition-colors hover:border-slate-400 hover:text-slate-200">
          View Roadmap
        </button>
      </div>

      {/* ══════════════════════════════════════
          B. MAIN CONTENT GRID
      ══════════════════════════════════════ */}
      <div className="mt-5 grid min-h-0 flex-1 grid-cols-[340px_1fr] gap-5">

        {/* ══════════════════════════════════
            C. LEFT COLUMN — SLAM CONTROL PANEL
        ══════════════════════════════════ */}
        <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

          {/* Tabs */}
          <div className="flex shrink-0 border-b border-slate-800">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors ${
                    isActive
                      ? "border-b-2 border-blue-400 text-white"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Panel body — scrollable */}
          <div className="flex-1 space-y-6 overflow-y-auto p-5">

            {/* SLAM Engine Status row */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
                SLAM Engine Status
              </span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </span>
            </div>

            {/* ── POSITION ACCURACY ── */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Position Accuracy
                </span>
                <Ico
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  size={13}
                  cls="text-emerald-400"
                />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-bold tracking-tight text-white">
                  0.02
                </span>
                <span className="font-mono text-sm text-slate-500">m</span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]"
                  style={{ width: "92%" }}
                />
              </div>
            </div>

            {/* ── MAP RESOLUTION ── */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Map Resolution
                </span>
                <Ico
                  d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"
                  size={13}
                  cls="text-blue-400"
                />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-bold tracking-tight text-white">
                  5.0
                </span>
                <span className="font-mono text-sm text-slate-500">cm</span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-400 shadow-[0_0_6px_#60a5fa]"
                  style={{ width: "68%" }}
                />
              </div>
            </div>

            {/* ── POINTS PROCESSED ── */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Points Processed
                </span>
                <Ico
                  d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                  size={13}
                  cls="text-slate-400"
                />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-3xl font-bold tracking-tight text-white">
                  1,459,203
                </span>
                <span className="font-mono text-xs text-slate-500">pts/sec</span>
              </div>
              {/* Sparkline mini bar chart */}
              <div className="mt-3 flex h-10 items-end gap-1">
                {SPARK_HEIGHTS.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      backgroundColor:
                        i >= SPARK_HEIGHTS.length - 3
                          ? "#334155"
                          : i >= SPARK_HEIGHTS.length - 6
                          ? "#475569"
                          : "#64748b",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ── ENGINE PARAMETERS ── */}
            <div>
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Engine Parameters
              </p>
              <div className="divide-y divide-slate-800">
                {ENGINE_PARAMS.map((p) => (
                  <div
                    key={p.label}
                    className="flex items-center justify-between py-3"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                      {p.label}
                    </span>
                    {p.isStatus ? (
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        {p.value}
                      </span>
                    ) : (
                      <span className="font-mono text-xs font-semibold text-slate-200">
                        {p.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            D. RIGHT COLUMN — 3D MAP VIEWPORT
        ══════════════════════════════════ */}
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-slate-800 bg-[#05070A]">

          {/* ── CSS 3D Grid Floor ── */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          {/* radial vignette to give depth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 55%, transparent 0%, #05070A 85%)",
            }}
          />
          {/* subtle cyan glow at grid center */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 40% at 50% 60%, rgba(79,195,247,0.04) 0%, transparent 70%)",
            }}
          />

          {/* ── Centered Drone Icon ── */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-lg border border-emerald-400/60 bg-emerald-400/10 shadow-[0_0_24px_rgba(52,211,153,0.3)]">
              {/* pulsing ring */}
              <div className="absolute -inset-3 animate-ping rounded-xl border border-emerald-400/20" />
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#34d399"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 21 4s-2 0-3.5 1.5L14 9l-8.2-1.8C4.9 7 4 7.9 4 9l6.5 2.5L8 15l-2 1.5L8 18l2.5-2 4.5 4 .4-3.3c.3-.7-.3-1.4-1-1.3z" />
              </svg>
            </div>
          </div>

          {/* ══ HUD OVERLAYS ══ */}

          {/* Top-Left: Local Frame pill */}
          <div className="absolute left-4 top-4">
            <div className="flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-950/60 px-3.5 py-1.5 backdrop-blur-md">
              <Ico
                d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                size={12}
                cls="text-slate-400"
              />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-300">
                LOCAL FRAME: ODOM_MAP
              </span>
            </div>
          </div>

          {/* Top-Right: Zoom controls */}
          <div className="absolute right-4 top-4">
            <div className="flex items-center gap-1 rounded-lg border border-slate-700/60 bg-slate-950/60 p-1 backdrop-blur-md">
              {/* Zoom In */}
              <button
                id="map-zoom-in"
                title="Zoom In"
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-slate-100"
              >
                <Ico
                  d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35M11 8v6M8 11h6"
                  size={15}
                />
              </button>
              {/* Zoom Out */}
              <button
                id="map-zoom-out"
                title="Zoom Out"
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-slate-100"
              >
                <Ico
                  d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35M8 11h6"
                  size={15}
                />
              </button>
              {/* Recenter */}
              <button
                id="map-recenter"
                title="Recenter"
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-slate-100"
              >
                <Ico
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 8v4M12 16h.01"
                  size={15}
                />
              </button>
            </div>
          </div>

          {/* Bottom-Left: Surface Reconstruction */}
          <div className="absolute bottom-4 left-4">
            <div className="w-56 rounded-xl border border-slate-700/60 bg-slate-950/60 p-4 backdrop-blur-md">
              <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-widest text-slate-500">
                Surface Reconstruction
              </p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]"
                  style={{ width: "45%" }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-amber-500">
                  PROCESSING
                </span>
                <span className="font-mono text-[9px] text-slate-500">45%</span>
              </div>
            </div>
          </div>

          {/* Bottom-Right: XYZ Coordinates */}
          <div className="absolute bottom-4 right-4 text-right">
            <div className="space-y-1">
              {[
                { axis: "X", val: "142.55", unit: "m" },
                { axis: "Y", val: "-84.20", unit: "m" },
                { axis: "Z", val: "12.05", unit: "m" },
              ].map(({ axis, val, unit }) => (
                <div
                  key={axis}
                  className="flex items-baseline justify-end gap-1"
                >
                  <span className="font-mono text-xs font-bold text-cyan-500/60">
                    {axis}:
                  </span>
                  <span className="font-mono text-sm font-semibold tracking-wider text-cyan-300">
                    {val}
                  </span>
                  <span className="font-mono text-xs text-cyan-500/50">
                    {unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
