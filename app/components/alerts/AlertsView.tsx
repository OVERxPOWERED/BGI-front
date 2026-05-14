"use client";

import { useState, type ReactNode } from "react";
import {
  AlertOctagon,
  Wind,
  VideoOff,
  Thermometer,
  CheckCircle,
  CheckCircle2,
  CloudLightning,
  Terminal,
} from "lucide-react";

/* ────────────────────────────────────────────────────────
 *  Types
 * ──────────────────────────────────────────────────────── */
interface AlertCategory {
  id: string;
  label: string;
  count: number;
}

interface Notification {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  time: string;
  message: string;
  action?: string;
  icon: string;
}

/* ────────────────────────────────────────────────────────
 *  Data
 * ──────────────────────────────────────────────────────── */
const ALERT_CATEGORIES: AlertCategory[] = [
  { id: "all", label: "All Notifications", count: 8 },
  { id: "critical", label: "Critical Alerts", count: 2 },
  { id: "warnings", label: "Warnings", count: 3 },
  { id: "logs", label: "System Logs", count: 0 },
  { id: "mission", label: "Mission Events", count: 3 },
];

const NOTIFICATIONS_DATA: Notification[] = [
  {
    id: "evt-01",
    type: "critical",
    title: "CRITICAL: ROS 2 Bridge Disconnect",
    time: "14:32:05Z",
    message:
      "WebSocket connection to Pixhawk flight controller lost. Telemetry stream severed. Failsafe auto-hover initiated.",
    action: "RESTART BRIDGE",
    icon: "AlertOctagon",
  },
  {
    id: "evt-02",
    type: "critical",
    title: "CRITICAL: Collision Proximity",
    time: "14:28:11Z",
    message:
      "LiDAR detected structural steel beam within absolute minimum clearance boundary (1.2m). Active braking deployed.",
    action: "VIEW TELEMETRY",
    icon: "AlertOctagon",
  },
  {
    id: "evt-03",
    type: "warning",
    title: "High Wind Velocity Detected",
    time: "14:15:22Z",
    message:
      "Crosswinds exceeding 12m/s detected at 80m AGL. Reduced flight stability expected. Adjusting gimbal pitch compensation.",
    icon: "Wind",
  },
  {
    id: "evt-04",
    type: "warning",
    title: "RTAB-Map Framedrop Anomaly",
    time: "14:02:10Z",
    message:
      "Edge compute TPU load exceeded 95%. Live mapping point cloud generation dropped to 12fps. Consider increasing Voxel Grid Filter size.",
    icon: "VideoOff",
  },
  {
    id: "evt-05",
    type: "warning",
    title: "Thermal Variance in Port Motor",
    time: "13:58:44Z",
    message:
      "Motor 3 operating 15°C above baseline nominal temperature. Auto-correcting power distribution.",
    icon: "Thermometer",
  },
  {
    id: "evt-06",
    type: "info",
    title: "Mission Parameters Synced",
    time: "13:45:00Z",
    message:
      "Pre-flight geofencing limits and failsafe protocols successfully written to flight controller for MSN-8492.",
    icon: "CheckCircle",
  },
  {
    id: "evt-07",
    type: "info",
    title: "COLMAP Queue Export Complete",
    time: "13:10:05Z",
    message:
      "Detailed 3D reconstruction dataset successfully buffered to cloud server.",
    icon: "CloudLightning",
  },
  {
    id: "evt-08",
    type: "info",
    title: "System Boot Sequence",
    time: "12:00:00Z",
    message:
      "Ground station initialized. systemd-boot sequence clear. Plymouth splash dismissed.",
    icon: "Terminal",
  },
];

/* ────────────────────────────────────────────────────────
 *  Icon Resolver
 * ──────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, ReactNode> = {
  AlertOctagon: <AlertOctagon size={18} />,
  Wind: <Wind size={18} />,
  VideoOff: <VideoOff size={18} />,
  Thermometer: <Thermometer size={18} />,
  CheckCircle: <CheckCircle size={18} />,
  CloudLightning: <CloudLightning size={18} />,
  Terminal: <Terminal size={18} />,
};

/* ────────────────────────────────────────────────────────
 *  Helpers
 * ──────────────────────────────────────────────────────── */
function getIconColor(type: string) {
  switch (type) {
    case "critical":
      return "text-rose-500";
    case "warning":
      return "text-amber-500";
    default:
      return "text-emerald-500";
  }
}

function getCardClasses(type: string) {
  const base =
    "bg-slate-900/80 border rounded-lg p-5 flex gap-4 transition-all hover:bg-slate-900";
  switch (type) {
    case "critical":
      return `${base} border-l-4 border-l-rose-500 bg-rose-500/5 border-y-rose-500/20 border-r-rose-500/20`;
    case "warning":
      return `${base} border-l-4 border-l-amber-500 bg-amber-500/5 border-y-amber-500/20 border-r-amber-500/20`;
    default:
      return `${base} border-l-4 border-l-emerald-500 border-slate-800`;
  }
}

function getTimeColor(type: string) {
  switch (type) {
    case "critical":
      return "text-rose-500";
    case "warning":
      return "text-amber-500";
    default:
      return "text-slate-500";
  }
}

function filterNotifications(
  category: string,
  data: Notification[]
): Notification[] {
  switch (category) {
    case "all":
      return data;
    case "critical":
      return data.filter((n) => n.type === "critical");
    case "warnings":
      return data.filter((n) => n.type === "warning");
    case "logs":
      return data.filter((n) => n.type === "info" && n.id === "evt-08");
    case "mission":
      return data.filter(
        (n) => n.type === "info" && ["evt-06", "evt-07", "evt-08"].includes(n.id)
      );
    default:
      return data;
  }
}

/* ════════════════════════════════════════════════════════════
 *  Main Component
 * ════════════════════════════════════════════════════════════ */
export default function AlertsView() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = filterNotifications(activeCategory, NOTIFICATIONS_DATA);

  return (
    <div className="flex h-full w-full gap-6 p-6 overflow-hidden bg-[#0A0C10]">
      {/* ═══════════════════════════════════════════════════
       *  Filter Sidebar (Left Column)
       * ═══════════════════════════════════════════════════ */}
      <nav className="w-[280px] shrink-0 flex flex-col">
        <h2 className="text-xl font-bold text-white mb-1">Filters</h2>
        <p className="text-xs text-slate-400 mb-6">
          Manage alert categories
        </p>

        <div className="flex flex-col gap-1">
          {ALERT_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  flex items-center justify-between px-4 py-3 rounded-lg transition-colors text-left w-full cursor-pointer
                  ${
                    isActive
                      ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 font-medium"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent"
                  }
                `}
              >
                <span className="text-sm">{cat.label}</span>
                {cat.count > 0 && (
                  <span className="bg-slate-800 text-xs px-2 py-0.5 rounded-full font-mono">
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════
       *  Main Content Panel (Right Column)
       * ═══════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Header Row */}
        <div className="flex justify-between items-end mb-6 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Alerts &amp; Notifications
            </h1>
            <p className="text-sm text-slate-400">
              System events, flight anomalies, and telemetry warnings
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 bg-slate-900 border border-slate-800 rounded-lg hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
            <CheckCircle2 size={16} />
            <span className="font-mono text-xs">Mark all as read</span>
          </button>
        </div>

        {/* Scrollable Cards */}
        <div className="flex-1 overflow-y-auto pr-2 pb-6 flex flex-col gap-4">
          {filtered.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-slate-500">
                No notifications in this category.
              </p>
            </div>
          ) : (
            filtered.map((notif) => (
              <div key={notif.id} className={getCardClasses(notif.type)}>
                {/* Icon */}
                <div
                  className={`shrink-0 mt-0.5 ${getIconColor(notif.type)}`}
                >
                  {ICON_MAP[notif.icon] ?? <AlertOctagon size={18} />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm font-semibold text-slate-200">
                      {notif.title}
                    </h3>
                    <span
                      className={`font-mono text-xs whitespace-nowrap ${getTimeColor(
                        notif.type
                      )}`}
                    >
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {notif.message}
                  </p>
                  {notif.action && (
                    <button className="mt-3 px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-md hover:bg-rose-500/20 transition-colors cursor-pointer">
                      {notif.action}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
