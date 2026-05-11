"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isActiveInspection = pathname === "/dashboard/active";

  return (
    <header
      id="top-header"
      className="sticky top-0 z-40 flex h-[52px] items-center justify-between border-b border-border-subtle bg-header-bg/80 px-6 backdrop-blur-md"
    >
      {/* Left section */}
      {isActiveInspection ? (
        <div className="flex items-center gap-3">
          {/* Drone logo icon */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-elevated">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 7v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V7l-8-5z" stroke="#4fc3f7" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M9 12l-1-3h8l-1 3M8 9l1 6h6l1-6M10 15v2l2 1 2-1v-2" stroke="#4fc3f7" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-text-primary">
              SKYINSPECT AI
            </h1>
            <p className="font-mono text-[10px] tracking-wider text-text-muted">
              PHASE 2 — ACTIVE INSPECTION
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-bold tracking-widest text-text-primary">
            BGI GROUND STATION
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-accent-green/30 bg-accent-green/8 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-green">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green shadow-[0_0_6px_rgba(76,175,80,0.6)]" />
            Pre-Flight Idle
          </span>
        </div>
      )}

      {/* Right section */}
      <div className="flex items-center gap-5">
        {isActiveInspection ? (
          <>
            {/* Active inspection status pills */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-green/30 bg-accent-green/8 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-green">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-green shadow-[0_0_6px_rgba(76,175,80,0.6)]" />
                Jetson Connected
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-green/30 bg-accent-green/8 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-green">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-green shadow-[0_0_6px_rgba(76,175,80,0.6)]" />
                System Nominal
              </span>
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-border" />

            {/* Bell & Settings */}
            <div className="flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-elevated hover:text-text-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-elevated hover:text-text-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Pre-flight status indicators */}
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-text-secondary">
                <span className="h-2 w-2 rounded-full bg-accent-green shadow-[0_0_6px_rgba(76,175,80,0.5)]" />
                UPLINK
              </span>
              <span className="flex items-center gap-1.5 text-text-secondary">
                <span className="h-2 w-2 rounded-full bg-accent-orange shadow-[0_0_6px_rgba(255,152,0,0.5)]" />
                GPS 3D FIX
              </span>
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-border" />

            {/* Mode indicator */}
            <div className="flex items-center gap-2 text-xs font-medium text-accent-blue">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L8 8h8l-4-6zM6 12h12M8 16l4 6 4-6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              <span className="tracking-wide">STABILIZE</span>
            </div>
          </>
        )}

        {/* Divider */}
        <div className="h-5 w-px bg-border" />

        {/* Operator — shared across both views */}
        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <div className="text-[11px] font-medium leading-tight text-text-secondary">
              Operator
            </div>
            {!isActiveInspection && (
              <div className="font-mono text-[10px] leading-tight text-text-muted">
                AUTH-V9X
              </div>
            )}
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface-elevated">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
