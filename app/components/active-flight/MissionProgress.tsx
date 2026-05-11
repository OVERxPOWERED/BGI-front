export default function MissionProgress() {
  return (
    <div className="p-5">
      {/* Title */}
      <div className="mb-3 flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-secondary">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Mission Progress
        </span>
      </div>

      {/* Mission info */}
      <div className="mb-3">
        <div className="text-sm font-semibold text-text-primary">
          Sector 4 Undercarriage Scan
        </div>
        <div className="text-[11px] text-text-muted">
          Automated Waypoint Inspection
        </div>
      </div>

      {/* Completion */}
      <div className="mb-2">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            Completion
          </span>
          <span className="font-mono text-sm font-bold text-text-primary">42%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div className="h-full rounded-full bg-accent-blue" style={{ width: "42%" }} />
        </div>
      </div>

      {/* Waypoint info */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-text-muted">Waypoint 12 of 28</span>
        <span className="font-mono text-[11px] text-text-muted">EST: 14m 30s rem</span>
      </div>
    </div>
  );
}
