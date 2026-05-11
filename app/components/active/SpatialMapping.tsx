export default function SpatialMapping() {
  return (
    <div className="flex h-full flex-col">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-secondary">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" strokeLinecap="round" />
          </svg>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            Spatial Mapping
          </span>
        </div>
        <button className="flex h-6 w-6 items-center justify-center rounded text-text-muted transition-colors hover:bg-surface-elevated hover:text-text-secondary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>
      </div>

      {/* 3D Spatial Grid */}
      <div className="relative flex-1 overflow-hidden bg-[#0c0e12]">
        <svg
          viewBox="0 0 280 200"
          fill="none"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          {[...Array(10)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 20 + 10} x2="280" y2={i * 20 + 10} stroke="#1a1d24" strokeWidth="0.5" />
          ))}
          {[...Array(14)].map((_, i) => (
            <line key={`v-${i}`} x1={i * 20 + 10} y1="0" x2={i * 20 + 10} y2="200" stroke="#1a1d24" strokeWidth="0.5" />
          ))}

          {/* Planned path (dotted) */}
          <path
            d="M40 160 L80 140 L120 130 L160 110 L200 90 L240 70"
            stroke="#4fc3f7"
            strokeWidth="1"
            strokeDasharray="4 3"
            opacity="0.3"
          />

          {/* Actual path (solid) */}
          <path
            d="M40 160 L80 140 L120 130 L140 120"
            stroke="#4fc3f7"
            strokeWidth="1.5"
            opacity="0.7"
          />

          {/* Waypoint dots */}
          <circle cx="40" cy="160" r="2" fill="#4fc3f7" opacity="0.4" />
          <circle cx="80" cy="140" r="2" fill="#4fc3f7" opacity="0.4" />
          <circle cx="120" cy="130" r="2" fill="#4fc3f7" opacity="0.4" />

          {/* Drone icon at current position */}
          <g transform="translate(140, 120) rotate(-30)">
            <polygon
              points="0,-8 -5,5 0,2 5,5"
              fill="#4fc3f7"
              opacity="0.9"
            />
          </g>

          {/* Current position glow */}
          <circle cx="140" cy="120" r="6" fill="#4fc3f7" opacity="0.1" />

          {/* Trail dot */}
          <circle cx="140" cy="136" r="2" fill="#4fc3f7" opacity="0.3" />
          <line x1="140" y1="124" x2="140" y2="134" stroke="#4fc3f7" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>
    </div>
  );
}
