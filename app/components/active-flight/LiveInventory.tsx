export default function LiveInventory() {
  return (
    <div className="p-5">
      {/* Title */}
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Live Inventory
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
        </svg>
      </div>

      {/* 2x2 Metric Grid */}
      <div className="mb-3 grid grid-cols-2 gap-2">
        {/* Cracks */}
        <div className="rounded-lg border border-border-subtle bg-surface-muted p-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-text-muted">
              Cracks
            </span>
            {/* Mini sparkline */}
            <svg width="24" height="12" viewBox="0 0 24 12" className="text-accent-orange">
              <polyline points="0,10 4,8 8,6 12,9 16,4 20,6 24,2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-mono text-2xl font-bold text-text-primary">12</span>
        </div>

        {/* Leakages */}
        <div className="rounded-lg border border-border-subtle bg-surface-muted p-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-text-muted">
              Leakages
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-blue">
              <path d="M12 2c-4 6-7 10-7 14a7 7 0 0 0 14 0c0-4-3-8-7-14z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-mono text-2xl font-bold text-text-primary">2</span>
        </div>

        {/* Corrosion */}
        <div className="rounded-lg border border-border-subtle bg-surface-muted p-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-text-muted">
              Corrosion
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-orange">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" />
              <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-mono text-2xl font-bold text-text-primary">8</span>
        </div>

        {/* Pillars */}
        <div className="rounded-lg border border-border-subtle bg-surface-muted p-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-text-muted">
              Pillars (OK)
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-green">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-mono text-2xl font-bold text-text-primary">45</span>
        </div>
      </div>

      {/* Personnel Detected */}
      <div className="rounded-lg border border-border-subtle bg-surface-muted p-3">
        <div className="mb-1 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-blue">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent-blue">
            Personnel Detected (1)
          </span>
        </div>
        <p className="text-[11px] leading-relaxed text-text-muted">
          Safe distance maintained. Continuing automated path.
        </p>
      </div>
    </div>
  );
}
