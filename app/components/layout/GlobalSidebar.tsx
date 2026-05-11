"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

/* ────────────────────────────────────────────────────────
 *  Navigation items
 * ──────────────────────────────────────────────────────── */
interface NavItem {
  href: string;
  label: string;
  /** Match sub-routes (e.g. /dashboard matches /dashboard/active) */
  matchPrefix?: boolean;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    matchPrefix: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: "/telemetry",
    label: "Telemetry",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 10h2l2-5 3 10 3-8 2 3h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/mapping",
    label: "Mapping",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 4l5 2v10l-5-2V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 6l6-2v10l-6 2V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M13 4l5 2v10l-5-2V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/terminal",
    label: "Terminal",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 8l3 2-3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/settings",
    label: "Settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 1.5v2M10 16.5v2M3.5 3.5l1.4 1.4M15.1 15.1l1.4 1.4M1.5 10h2M16.5 10h2M3.5 16.5l1.4-1.4M15.1 4.9l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/alerts",
    label: "Alerts",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L2 16h16L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="14" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
];

/* ────────────────────────────────────────────────────────
 *  Sidebar width constant (used by layout for margin offset)
 * ──────────────────────────────────────────────────────── */
export const SIDEBAR_WIDTH = 64; // px — matches w-16

/* ────────────────────────────────────────────────────────
 *  Component
 * ──────────────────────────────────────────────────────── */
export default function GlobalSidebar() {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.matchPrefix) {
      return pathname.startsWith(item.href);
    }
    return pathname === item.href;
  };

  return (
    <aside
      id="global-sidebar"
      className="fixed left-0 top-0 z-50 flex h-screen w-16 flex-col items-center border-r border-[#1c1f27] bg-[#0a0c10] py-5"
    >
      {/* ── Logo ── */}
      <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-[#151820]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L4 7v6c0 5.5 3.4 10.7 8 12 4.6-1.3 8-6.5 8-12V7l-8-5z"
            stroke="#4fc3f7"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9 12l-1-3h8l-1 3M8 9l1 6h6l1-6M10 15v2l2 1 2-1v-2"
            stroke="#4fc3f7"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ── Nav Icons ── */}
      <nav className="flex flex-1 flex-col items-center gap-1.5">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`
                group relative flex h-10 w-10 items-center justify-center rounded-lg
                transition-all duration-200
                ${
                  active
                    ? "bg-accent-blue/15 text-accent-blue"
                    : "text-[#4a4f5c] hover:bg-[#151820] hover:text-[#8b8f98]"
                }
              `}
            >
              {/* Active left-edge indicator */}
              {active && (
                <span className="absolute -left-[1px] top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-accent-blue shadow-[0_0_8px_rgba(79,195,247,0.4)]" />
              )}
              {item.icon}

              {/* Hover tooltip */}
              <span className="pointer-events-none absolute left-[60px] z-[60] whitespace-nowrap rounded-lg bg-[#1e2028] px-3 py-1.5 text-xs font-medium text-text-primary opacity-0 shadow-xl ring-1 ring-[#2a2d35] transition-opacity duration-150 group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
