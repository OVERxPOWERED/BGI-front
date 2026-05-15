"use client";

import { useState, type ReactNode } from "react";
import {
  User,
  FileText,
  Award,
  Shield,
  ShieldCheck,
  Code,
  Rocket,
  MapPin,
  Edit2,
  Circle,
} from "lucide-react";

/* ────────────────────────────────────────────────────────
 *  Types & Data
 * ──────────────────────────────────────────────────────── */
interface ProfileNavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

const PROFILE_NAV: ProfileNavItem[] = [
  { id: "overview", label: "Operator Overview", icon: <User size={18} /> },
  {
    id: "logs",
    label: "Flight Logs & History",
    icon: <FileText size={18} />,
  },
  { id: "certs", label: "Licenses & Certs", icon: <Award size={18} /> },
  {
    id: "security",
    label: "Security & Sessions",
    icon: <Shield size={18} />,
  },
];

const COMPETENCIES = [
  "ROS 2",
  "Next.js",
  "Tauri",
  "Three.js",
  "GSAP",
  "React",
  "ESP32 Hardware",
  "Pixhawk",
];

const DEPLOYMENTS = [
  {
    id: "dep-01",
    title: "Krishi-Mitra AI Payload",
    date: "April 2026",
    description: "Live Telemetry HUD & Arbitrage Predictor.",
    active: true,
  },
  {
    id: "dep-02",
    title: "Structural Inspection Drone",
    date: "May 2026",
    description: "RTAB-Map live mapping integration via ROS 2.",
    active: false,
  },
];

/* ────────────────────────────────────────────────────────
 *  Reusable: Island Component
 * ──────────────────────────────────────────────────────── */
function Island({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-5 mb-6">
      <div className="flex items-center gap-2 border-b border-slate-800/60 pb-3 mb-2">
        <span className="text-slate-500">{icon}</span>
        <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
      </div>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
 *  Main Component
 * ════════════════════════════════════════════════════════════ */
export default function ProfileView() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="flex h-full w-full gap-6 p-6 overflow-hidden bg-[#0A0C10]">
      {/* ═══════════════════════════════════════════════════
       *  Profile Navigation (Left Column)
       * ═══════════════════════════════════════════════════ */}
      <nav className="w-[280px] shrink-0 flex flex-col gap-1">
        {PROFILE_NAV.map((item) => {
          const isActive = item.id === activeSection;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left w-full cursor-pointer
                ${
                  isActive
                    ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 font-medium"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent"
                }
              `}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ═══════════════════════════════════════════════════
       *  Main Content Panel (Right Column)
       * ═══════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-2 pb-24 flex flex-col">
          {/* Page Header */}
          <div className="shrink-0">
            <h1 className="text-2xl font-bold text-white mb-2">
              Operator Profile
            </h1>
            <p className="text-sm text-slate-400 mb-8">
              Manage personal credentials, system environments, and deployment
              history.
            </p>
          </div>

          {activeSection === "overview" ? (
            <OverviewPanel />
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-bold text-white mb-2">
                  {PROFILE_NAV.find((i) => i.id === activeSection)?.label}
                </h2>
                <p className="text-sm text-slate-500">
                  Coming soon — Phase 2
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Floating Edit Button */}
        <button className="absolute bottom-6 right-6 z-10 flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg transition-all cursor-pointer">
          <Edit2 size={16} />
          Edit Profile
        </button>
      </div>
    </div>
  );
}

/* ================================================================
 *  Overview Panel
 * ================================================================ */
function OverviewPanel() {
  return (
    <>
      {/* ── Island 1: Profile Banner ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-between gap-6 mb-6">
        {/* Left: Identity */}
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div className="h-20 w-20 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-2xl font-bold text-slate-300 relative shrink-0">
            BS
            <span className="bg-emerald-500 h-3 w-3 rounded-full absolute -bottom-1 -right-1 ring-2 ring-slate-900" />
          </div>

          {/* Details */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Burhanuddin Sharma
            </h2>
            <p className="text-sm text-blue-400 font-medium mt-1">
              Full Stack &amp; ROS 2 Engineer
            </p>
            <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
              <MapPin size={12} />
              Indore, MP, India
            </p>
          </div>
        </div>

        {/* Right: Vital Stats */}
        <div className="flex gap-6 bg-slate-950/80 border border-slate-800 p-4 rounded-lg shrink-0">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Flight Hours
            </p>
            <p className="text-emerald-500 font-mono text-lg font-bold">
              412h
            </p>
          </div>
          <div className="w-px bg-slate-800" />
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Missions
            </p>
            <p className="text-blue-400 font-mono text-lg font-bold">84</p>
          </div>
          <div className="w-px bg-slate-800" />
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              OPR ID
            </p>
            <p className="text-slate-300 font-mono text-lg font-bold">
              OPR-IND-07
            </p>
          </div>
        </div>
      </div>

      {/* ── Island 2: Operational Status & Environment ── */}
      <Island
        icon={<ShieldCheck size={18} />}
        title="Operational Status & Environment"
      >
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Autonomy Clearance
            </p>
            <p className="text-sm text-slate-200 font-medium flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
              Level 5 Unrestricted
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Primary Terminal
            </p>
            <p className="text-sm font-mono text-slate-300">
              MSI Modern 14 C12M
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              OS Environment
            </p>
            <p className="text-sm font-mono text-slate-300">
              Arch Linux (Hyprland)
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Flight Controller
            </p>
            <p className="text-sm font-mono text-slate-300">Pixhawk 6C</p>
          </div>
        </div>
      </Island>

      {/* ── Bottom Split: Competencies + Deployments ── */}
      <div className="grid grid-cols-2 gap-6">
        {/* Island 3: Technical Competencies */}
        <Island icon={<Code size={18} />} title="Technical Competencies">
          <div className="flex flex-wrap gap-2.5 mt-2">
            {COMPETENCIES.map((tag) => (
              <span
                key={tag}
                className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-md text-sm font-mono shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </Island>

        {/* Island 4: Recent Deployments */}
        <Island icon={<Rocket size={18} />} title="Recent Deployments">
          <div className="flex flex-col gap-4">
            {DEPLOYMENTS.map((dep) => (
              <div key={dep.id} className="flex">
                <Circle
                  size={8}
                  className={`mt-1.5 mr-3 shrink-0 ${
                    dep.active
                      ? "text-blue-500 fill-blue-500"
                      : "text-slate-600 fill-slate-600"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm text-white font-semibold">
                      {dep.title}
                    </h4>
                    <span className="font-mono text-xs text-slate-500 whitespace-nowrap">
                      {dep.date}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    {dep.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Island>
      </div>
    </>
  );
}
