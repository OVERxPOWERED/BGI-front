export default function DeploymentCard() {
  return (
    <div
      id="deployment-card"
      className="flex flex-col items-center justify-center rounded-xl border border-border-subtle bg-surface-elevated/60 px-6 py-8 text-center backdrop-blur-sm"
    >
      {/* Rocket icon in rounded square */}
      <div className="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-surface/80 shadow-[0_0_20px_rgba(79,195,247,0.08)]">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          className="text-accent-blue"
        >
          <path
            d="M12 2C8 6 6 10 6 14l3 2 3-2 3 2 3-2c0-4-2-8-6-12z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 16l-2 4h10l-2-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
          {/* Flame / exhaust */}
          <path
            d="M10.5 20c.5 1.5 1 2 1.5 2s1-.5 1.5-2"
            stroke="#ff9800"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-xl font-semibold text-text-primary">
        Ready for Deployment
      </h3>
      <p className="mb-6 max-w-[280px] text-sm leading-relaxed text-text-secondary">
        Initialize autonomous sequence or manual override for Sector analysis.
      </p>

      {/* CTA Button */}
      <button
        id="start-inspection-btn"
        className="group flex w-full items-center justify-center gap-3 rounded-xl bg-accent-blue px-6 py-4 font-semibold text-[#0a1628] transition-all duration-200 hover:bg-[#6fd0fa] hover:shadow-[0_0_24px_rgba(79,195,247,0.25)] active:scale-[0.98]"
      >
        <span className="text-sm font-bold uppercase tracking-wider">
          Start New Inspection
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
