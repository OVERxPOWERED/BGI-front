export default function SystemReadinessCard() {
  return (
    <div
      id="system-readiness-card"
      className="flex flex-col rounded-xl border border-border-subtle bg-surface/80 backdrop-blur-sm"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
        <div className="flex items-center gap-2.5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-text-secondary"
          >
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            <circle cx="7" cy="6" r="1.5" fill="currentColor" />
            <circle cx="14" cy="12" r="1.5" fill="currentColor" />
            <circle cx="10" cy="18" r="1.5" fill="currentColor" />
          </svg>
          <h2 className="text-sm font-semibold text-text-primary">
            System Readiness Checklist
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-green/25 bg-accent-green/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-green">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green shadow-[0_0_6px_rgba(76,175,80,0.6)]" />
          All Systems Nominal
        </span>
      </div>

      {/* Spacer area — visually representing empty diagnostic space */}
      <div className="flex-1 min-h-[120px]" />

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-px border-t border-border-subtle bg-border-subtle">
        {/* Power Systems */}
        <div className="flex flex-col gap-3 bg-surface/80 p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Power Systems
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-text-muted"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-mono text-2xl font-bold text-text-primary">
            98.4<span className="text-sm font-medium text-text-secondary">%</span>
          </span>
          {/* Solid green progress bar */}
          <div className="h-1 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-accent-green"
              style={{ width: "98.4%" }}
            />
          </div>
        </div>

        {/* Link Integrity */}
        <div className="flex flex-col gap-3 bg-surface/80 p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Link Integrity
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-text-muted"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-mono text-2xl font-bold text-text-primary">
            1.2<span className="ml-0.5 text-xs font-medium text-text-secondary">Gbps</span>
          </span>
          {/* Dashed / segmented line */}
          <div className="flex gap-1">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i < 5 ? "bg-accent-green" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Sensor Array */}
        <div className="flex flex-col gap-3 bg-surface/80 p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Sensor Array
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-text-muted"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-mono text-xl font-bold uppercase text-accent-green">
            Aligned
          </span>
          <span className="flex items-center gap-1 text-[11px] text-text-muted">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-text-muted"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            LIDAR &amp; OPTICAL
          </span>
        </div>
      </div>
    </div>
  );
}
