export default function DroneStatus() {
  return (
    <div className="flex flex-col">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-secondary">
            <path d="M12 2L8 8h8l-4-6zM6 12h12M8 16l4 6 4-6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="2" />
          </svg>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Drone Status
          </span>
        </div>
        <span className="inline-flex items-center gap-1 rounded bg-accent-blue/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-accent-blue">
          Live
        </span>
      </div>

      {/* Drone identity + status badges */}
      <div className="border-b border-border-subtle/50 px-4 py-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-base font-bold text-text-primary">VANGUARD-01</div>
            <div className="font-mono text-[10px] text-text-muted">UAV-ID: 88A-92F</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-xs font-bold uppercase text-accent-green">
              Airborne
            </span>
            <span className="font-mono text-[10px] uppercase text-text-muted">
              Auto Flight
            </span>
          </div>
        </div>
      </div>

      {/* Telemetry metrics */}
      <div className="flex flex-col gap-0.5 px-4 py-3">
        {/* Battery */}
        <div className="mb-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted">
                <rect x="2" y="6" width="18" height="12" rx="1" />
                <path d="M22 10v4" strokeLinecap="round" />
              </svg>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                Battery
              </span>
            </div>
            <span className="font-mono text-sm font-bold text-text-primary">68%</span>
          </div>
          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-border">
            <div className="h-full rounded-full bg-accent-green" style={{ width: "68%" }} />
          </div>
        </div>

        {/* Altitude */}
        <div className="flex items-center justify-between py-2 border-t border-border-subtle/30">
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted">
              <path d="M12 20V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
              Altitude (AGL)
            </span>
          </div>
          <span className="font-mono text-sm font-bold text-text-primary">
            42.5<span className="text-xs text-text-muted">m</span>
          </span>
        </div>

        {/* Velocity */}
        <div className="flex items-center justify-between py-2 border-t border-border-subtle/30">
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" />
            </svg>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
              Velocity
            </span>
          </div>
          <span className="font-mono text-sm font-bold text-text-primary">
            4.2 <span className="text-xs text-text-muted">m/s</span>
          </span>
        </div>

        {/* GPS Sats */}
        <div className="flex items-center justify-between py-2 border-t border-border-subtle/30">
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
              GPS Sats
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            <span className="font-mono text-sm font-bold text-text-primary">
              14 <span className="text-[10px] text-text-muted">(RTK FIX)</span>
            </span>
          </div>
        </div>

        {/* IMU Health */}
        <div className="flex items-center justify-between py-2 border-t border-border-subtle/30">
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted">
              <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z" />
              <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
              IMU Health
            </span>
          </div>
          <span className="font-mono text-sm font-bold uppercase text-accent-green">
            Nominal
          </span>
        </div>
      </div>
    </div>
  );
}
