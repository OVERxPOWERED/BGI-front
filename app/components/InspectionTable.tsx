const inspections = [
  {
    id: "INS-2023-1104-A",
    location: "Sector 7G - Main Bridge",
    timestamp: "2023-11-04 08:30Z",
    status: "REQUIRES REVIEW" as const,
    findings: [
      { type: "warning", label: "12 Cracks" },
      { type: "warning", label: "2 Leaks" },
    ],
    action: "ANALYZE" as const,
  },
  {
    id: "INS-2023-1103-B",
    location: "Cooling Tower Alpha",
    timestamp: "2023-11-03 14:15Z",
    status: "COMPLETED" as const,
    findings: [{ type: "info", label: "No critical anomalies detected." }],
    action: "REPORT" as const,
  },
  {
    id: "INS-2023-1101-C",
    location: "Perimeter Fence East",
    timestamp: "2023-11-01 09:00Z",
    status: "COMPLETED" as const,
    findings: [{ type: "warning", label: "1 Breach Suspected" }],
    action: "REPORT" as const,
  },
];

function StatusBadge({ status }: { status: "REQUIRES REVIEW" | "COMPLETED" }) {
  if (status === "REQUIRES REVIEW") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-orange/30 bg-accent-orange/8 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-orange">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-orange" />
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-green/30 bg-accent-green/8 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-green">
      <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
      {status}
    </span>
  );
}

function FindingTag({
  finding,
}: {
  finding: { type: string; label: string };
}) {
  if (finding.type === "warning") {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-accent-orange">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        {finding.label}
      </span>
    );
  }
  return (
    <span className="text-xs text-text-secondary">{finding.label}</span>
  );
}

export default function InspectionTable() {
  return (
    <div
      id="inspection-table"
      className="rounded-xl border border-border-subtle bg-surface/80 backdrop-blur-sm"
    >
      {/* Table Header */}
      <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
        <div className="flex items-center gap-2.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-text-secondary"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h2 className="text-sm font-semibold text-text-primary">
            Recent Inspections
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-elevated hover:text-text-secondary">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-elevated hover:text-text-secondary">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-[1.5fr_1fr_1fr_1.5fr_auto] gap-4 border-b border-border-subtle px-5 py-2.5">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Location / Target
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Timestamp
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Status
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Findings Summary
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted text-right">
          Action
        </span>
      </div>

      {/* Rows */}
      {inspections.map((inspection, index) => (
        <div
          key={inspection.id}
          className={`group grid grid-cols-[1.5fr_1fr_1fr_1.5fr_auto] items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-elevated/50 ${
            index < inspections.length - 1
              ? "border-b border-border-subtle/50"
              : ""
          }`}
        >
          {/* Location */}
          <div>
            <div className="text-sm font-medium text-text-primary">
              {inspection.location}
            </div>
            <div className="font-mono text-[10px] text-text-muted">
              ID:{inspection.id}
            </div>
          </div>

          {/* Timestamp */}
          <span className="font-mono text-xs text-text-secondary">
            {inspection.timestamp}
          </span>

          {/* Status */}
          <StatusBadge status={inspection.status} />

          {/* Findings */}
          <div className="flex flex-wrap items-center gap-3">
            {inspection.findings.map((finding, i) => (
              <FindingTag key={i} finding={finding} />
            ))}
          </div>

          {/* Action Button */}
          <button
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 ${
              inspection.action === "ANALYZE"
                ? "border-accent-orange/30 text-accent-orange hover:bg-accent-orange/10"
                : "border-border text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
            }`}
          >
            {inspection.action}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {inspection.action === "ANALYZE" ? (
                <>
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </>
              ) : (
                <>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
