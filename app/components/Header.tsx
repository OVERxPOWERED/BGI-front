export default function Header() {
  return (
    <header
      id="top-header"
      className="sticky top-0 z-40 flex h-[52px] items-center justify-between border-b border-border-subtle bg-header-bg/80 px-6 backdrop-blur-md"
    >
      {/* Left section */}
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-bold tracking-widest text-text-primary">
          BGI GROUND STATION
        </h1>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-accent-green/30 bg-accent-green/8 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-green">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green shadow-[0_0_6px_rgba(76,175,80,0.6)]" />
          Pre-Flight Idle
        </span>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-5">
        {/* Status indicators */}
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

        {/* Divider */}
        <div className="h-5 w-px bg-border" />

        {/* Operator */}
        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <div className="text-[11px] font-medium leading-tight text-text-secondary">
              Operator
            </div>
            <div className="font-mono text-[10px] leading-tight text-text-muted">
              AUTH-V9X
            </div>
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
