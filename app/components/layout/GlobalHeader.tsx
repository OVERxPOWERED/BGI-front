"use client";

import { usePathname } from "next/navigation";

/* ────────────────────────────────────────────────────────
 *  Route-context map
 *  Maps pathname prefixes to the header's branding + badge.
 *  This eliminates if/else branching inside the component.
 * ──────────────────────────────────────────────────────── */
interface RouteContext {
  subtitle: string;
  badges: { label: string; color: "green" | "orange" }[];
}

const ROUTE_CONTEXTS: Record<string, RouteContext> = {
  "/telemetry": {
    subtitle: "DIAGNOSTICS MODE",
    badges: [
      { label: "SYSTEM NOMINAL", color: "green" },
      { label: "DRONE LINKED | ROS2 — 12ms", color: "green" },
    ],
  },
  "/dashboard/active": {
    subtitle: "PHASE 2 — ACTIVE INSPECTION",
    badges: [
      { label: "JETSON CONNECTED", color: "green" },
      { label: "SYSTEM NOMINAL", color: "green" },
    ],
  },
  "/dashboard": {
    subtitle: "PRE-FLIGHT IDLE",
    badges: [
      { label: "UPLINK", color: "green" },
      { label: "GPS 3D FIX", color: "orange" },
    ],
  },
};

/** Resolve route context — longest prefix match wins */
function resolveContext(pathname: string): RouteContext {
  // Sort by length descending so more specific routes win
  const keys = Object.keys(ROUTE_CONTEXTS).sort(
    (a, b) => b.length - a.length
  );
  for (const key of keys) {
    if (pathname.startsWith(key)) {
      return ROUTE_CONTEXTS[key];
    }
  }
  return ROUTE_CONTEXTS["/dashboard"];
}

/* ────────────────────────────────────────────────────────
 *  Badge colors — single source of truth
 * ──────────────────────────────────────────────────────── */
const BADGE_STYLES = {
  green: {
    wrapper:
      "border-[#2a6b2e]/60 bg-[#1a2e1b] text-[#4caf50]",
    dot: "bg-[#4caf50] shadow-[0_0_6px_rgba(76,175,80,0.6)]",
  },
  orange: {
    wrapper:
      "border-[#6b4e1a]/60 bg-[#2e261a] text-[#ff9800]",
    dot: "bg-[#ff9800] shadow-[0_0_6px_rgba(255,152,0,0.5)]",
  },
};

/* ────────────────────────────────────────────────────────
 *  Header height constant (used by pages for offset calcs)
 * ──────────────────────────────────────────────────────── */
export const HEADER_HEIGHT = 56; // px — matches h-14

/* ────────────────────────────────────────────────────────
 *  Component
 * ──────────────────────────────────────────────────────── */
export default function GlobalHeader() {
  const pathname = usePathname();
  const ctx = resolveContext(pathname);

  return (
    <header
      id="global-header"
      className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[#1c1f27] bg-[#0a0c10]/90 px-6 backdrop-blur-lg"
    >
      {/* ═══════ LEFT: Branding & Context ═══════ */}
      <div className="flex items-center gap-3">
        {/* Logo icon (small, matches sidebar logo) */}
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#151820]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L4 7v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V7l-8-5z"
              stroke="#4fc3f7"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M9 12l-1-3h8l-1 3M8 9l1 6h6l1-6M10 15v2l2 1 2-1v-2"
              stroke="#4fc3f7"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex flex-col">
          <h1 className="text-[13px] font-bold tracking-[0.12em] text-text-primary">
            SKYINSPECT AI
          </h1>
          <p className="font-mono text-[10px] tracking-wider text-text-muted">
            {ctx.subtitle}
          </p>
        </div>
      </div>

      {/* ═══════ RIGHT: Status + Utilities + Profile ═══════ */}
      <div className="flex items-center gap-4">
        {/* Status badges */}
        <div className="flex items-center gap-2.5">
          {ctx.badges.map((badge) => {
            const s = BADGE_STYLES[badge.color];
            return (
              <span
                key={badge.label}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider ${s.wrapper}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                {badge.label}
              </span>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-[#1c1f27]" />

        {/* Utility icons: Bell + Gear */}
        <div className="flex items-center gap-1">
          <button
            title="Notifications"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#4a4f5c] transition-colors hover:bg-[#151820] hover:text-[#8b8f98]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <button
            title="Settings"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#4a4f5c] transition-colors hover:bg-[#151820] hover:text-[#8b8f98]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-[#1c1f27]" />

        {/* Operator profile */}
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-medium text-text-secondary">
            Operator
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1c1f27] bg-[#151820]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#4a4f5c]">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
