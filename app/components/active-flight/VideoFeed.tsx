import Image from "next/image";

const boundingBoxes = [
  {
    label: "LEAKAGE (98%)",
    color: "#ff9800",
    top: "12%",
    left: "58%",
    width: "16%",
    height: "14%",
  },
  {
    label: "CRACK (89%)",
    color: "#ff9800",
    top: "32%",
    left: "32%",
    width: "18%",
    height: "12%",
  },
  {
    label: "CORROSION (92%)",
    color: "#ff9800",
    top: "64%",
    left: "40%",
    width: "20%",
    height: "14%",
  },
  {
    label: "PERSON (99%)",
    color: "#4fc3f7",
    top: "76%",
    left: "22%",
    width: "12%",
    height: "18%",
  },
];

export default function VideoFeed() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Video Top Bar */}
      <div className="flex items-center justify-between border-b border-border-subtle bg-surface-muted px-4 py-2">
        <div className="flex items-center gap-4">
          {/* LIVE REC badge */}
          <span className="inline-flex items-center gap-1.5 rounded bg-[#2a1215] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-red">
            <span className="animate-recording h-2 w-2 rounded-full bg-accent-red shadow-[0_0_8px_rgba(239,83,80,0.6)]" />
            Live Rec
          </span>
          {/* Camera selector */}
          <span className="rounded border border-border px-3 py-1 font-mono text-[11px] text-text-secondary">
            CAM: MAIN GIMBAL (4K)
          </span>
        </div>
        <div className="flex items-center gap-4">
          {/* IR Toggle */}
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
            </svg>
            IR / THERMAL: OFF
          </span>
          {/* Maximize */}
          <button className="flex h-7 w-7 items-center justify-center rounded text-text-muted transition-colors hover:bg-surface-elevated hover:text-text-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>
        </div>
      </div>

      {/* Video Feed with AI Overlays */}
      <div className="relative flex-1 overflow-hidden bg-black">
        {/* Background image */}
        <Image
          src="/bridge-feed.png"
          alt="Live drone camera feed showing bridge infrastructure"
          fill
          className="object-cover"
          priority
        />

        {/* Scanline overlay for camera effect */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
          }}
        />

        {/* AI Bounding Boxes */}
        {boundingBoxes.map((box) => (
          <div
            key={box.label}
            className="animate-bbox pointer-events-none absolute"
            style={{
              top: box.top,
              left: box.left,
              width: box.width,
              height: box.height,
            }}
          >
            <div
              className="h-full w-full border-2"
              style={{ borderColor: box.color }}
            />
            <span
              className="absolute -top-5 left-0 whitespace-nowrap px-1.5 py-0.5 font-mono text-[10px] font-bold"
              style={{
                backgroundColor: box.color,
                color: "#0a0a0a",
              }}
            >
              {box.label}
            </span>
          </div>
        ))}
      </div>

      {/* Video Bottom Bar */}
      <div className="flex items-center justify-between border-t border-border-subtle bg-surface-muted px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
            VLM Scene Understanding
          </span>
          <span className="h-2 w-2 rounded-full bg-accent-green shadow-[0_0_6px_rgba(76,175,80,0.6)]" />
        </div>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] text-text-muted">
            Active processing: 24 fps @Latency: 42ms
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
            4 Defects Detected in FOV
          </span>
        </div>
      </div>
    </div>
  );
}
