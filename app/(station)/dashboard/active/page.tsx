import DroneStatus from "@/app/components/active/DroneStatus";
import SpatialMapping from "@/app/components/active/SpatialMapping";
import VideoFeed from "@/app/components/active/VideoFeed";
import StructuralHealth from "@/app/components/active/StructuralHealth";
import LiveInventory from "@/app/components/active/LiveInventory";
import MissionProgress from "@/app/components/active/MissionProgress";
import RecentEvents from "@/app/components/active/RecentEvents";

export const metadata = {
  title: "Active Inspection — BGI Ground Station",
  description:
    "Live inspection flight view with real-time telemetry, AI-driven defect detection overlays, spatial mapping, and structural health analysis.",
};

/* ── Shared island card class ──────────────────────────── */
const island =
  "rounded-xl border border-[#1e2330] bg-[#13161c] overflow-hidden";

export default function ActiveInspectionPage() {
  return (
    <div className="h-[calc(100vh-56px)] overflow-hidden bg-[#0a0c10] p-4">
      {/* ── 3-column bento grid ── */}
      <div className="grid h-full grid-cols-[300px_1fr_400px] gap-5">
        {/* ═══════ LEFT COLUMN ═══════ */}
        <div className="flex flex-col gap-4">
          {/* Drone Status island */}
          <div className={island}>
            <DroneStatus />
          </div>

          {/* Spatial Mapping island — fills remaining space */}
          <div className={`flex-1 min-h-0 ${island}`}>
            <SpatialMapping />
          </div>

          {/* Bottom controls — pushed to end */}
          <div className="flex gap-3">
            <button
              id="rth-stabilize-btn"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#1e2330] bg-[#13161c] px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-text-secondary transition-all hover:border-text-muted hover:bg-surface-elevated hover:text-text-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              RTH / Stabilize
            </button>

            <button
              id="emergency-stop-btn"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent-red px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#f44336] hover:shadow-[0_0_20px_rgba(239,83,80,0.3)] active:scale-[0.97]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <rect x="9" y="9" width="6" height="6" rx="0.5" fill="currentColor" stroke="none" />
              </svg>
              Emergency Stop
            </button>
          </div>
        </div>

        {/* ═══════ CENTER COLUMN — Video Feed island ═══════ */}
        <div className={`flex flex-col ${island}`}>
          <VideoFeed />
        </div>

        {/* ═══════ RIGHT COLUMN — AI Analysis islands ═══════ */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-1">
          {/* Structural Health */}
          <div className={island}>
            <StructuralHealth />
          </div>

          {/* Live Inventory */}
          <div className={island}>
            <LiveInventory />
          </div>

          {/* Mission Progress */}
          <div className={island}>
            <MissionProgress />
          </div>

          {/* Recent Events — fills remaining space */}
          <div className={`flex-1 min-h-0 ${island}`}>
            <RecentEvents />
          </div>
        </div>
      </div>
    </div>
  );
}
