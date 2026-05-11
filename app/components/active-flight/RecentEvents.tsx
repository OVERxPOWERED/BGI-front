const events = [
  {
    time: "14:22:18",
    message: "Reached Waypoint 11. Adjusting yaw.",
    critical: false,
  },
  {
    time: "14:23:45",
    message: "Critical leakage detected. Logging coordinates.",
    critical: true,
  },
  {
    time: "14:24:02",
    message: "Approaching Waypoint 12. Speed reduced.",
    critical: false,
  },
  {
    time: "14:24:18",
    message: "VLM Active: Scanning structure...",
    critical: false,
  },
];

export default function RecentEvents() {
  return (
    <div className="flex h-full flex-col p-5">
      {/* Title */}
      <div className="mb-3">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
          Recent Events
        </span>
      </div>

      {/* Event log */}
      <div className="flex flex-col gap-0.5">
        {events.map((event, index) => (
          <div
            key={index}
            className={`flex gap-3 rounded-md px-2 py-2 ${
              event.critical
                ? "bg-accent-orange/8 border-l-2 border-accent-orange"
                : ""
            }`}
          >
            <span className="shrink-0 font-mono text-[11px] font-medium text-text-muted">
              {event.time}
            </span>
            <span
              className={`text-[11px] leading-relaxed ${
                event.critical
                  ? "font-semibold text-accent-orange"
                  : "text-text-secondary"
              }`}
            >
              {event.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
