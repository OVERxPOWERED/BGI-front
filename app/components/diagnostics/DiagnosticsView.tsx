"use client";
import { useRef, useState, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";

/* ── Island card ── */
const I = "rounded-xl border border-[#1e2330] bg-[#13161c] overflow-hidden";

/* ── Sub-nav anchors ── */
const NAV = [
  { id: "sys-stats", label: "Stats", d: "M3 3v18h18M7 16l4-8 4 4 4-6" },
  { id: "telemetry", label: "Sensors", d: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" },
  { id: "intelligence", label: "AI", d: "M12 2a4 4 0 0 1 4 4v1h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2V6a4 4 0 0 1 4-4zM9 13h2v2H9zM13 13h2v2h-2z" },
  { id: "ros-nodes", label: "Nodes", d: "M12 2v6M12 18v4M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M18 12h4M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" },
  { id: "actions", label: "Actions", d: "M3 3h18v4H3zM3 10h18v4H3zM3 17h18v4H3z" },
];

const STATS = [
  { label: "CORE CPU", val: "42", unit: "%", pct: 42, color: "#4caf50", iconD: "M4 16V4h4v12zM10 16V8h4v8zM16 16v-4h4v4z" },
  { label: "RAM USAGE", val: "3.2", unit: "GB", pct: 40, color: "#4caf50", iconD: "M2 6h20v12H2zM6 10h2M10 10h2M14 10h2" },
  { label: "VISION TPU", val: "78", unit: "%", pct: 78, color: "#ff9800", iconD: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" },
  { label: "SYS TEMP", val: "45", unit: "°C", pct: 56, color: "#4caf50", iconD: "M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" },
  { label: "LINK QUALITY", val: "-68", unit: "dBm", pct: 72, color: "#4caf50", iconD: "M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01", signal: true },
];

const MOTORS = [
  { name: "M1", rpm: 3420, temp: "38°C", ok: true },
  { name: "M2", rpm: 3415, temp: "39°C", ok: true },
  { name: "M3", rpm: 3350, temp: "45°C", ok: false },
  { name: "M4", rpm: 3418, temp: "38°C", ok: true },
];

const DEFECTS = [
  { label: "CRACKS", n: 23 }, { label: "LEAKAGES", n: 7 },
  { label: "PILLARS", n: 12 }, { label: "PEOPLE", n: 3 },
];

const EVENTS: { msg: string; time: string; color: string; bg: string; iconD: string }[] = [
  { msg: "CRITICAL: Motor 3 Temp Spike", time: "T-00:00:12", color: "#ef5350", bg: "#2a1215", iconD: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" },
  { msg: "WARN: Cell 2 Voltage Drop", time: "T-00:02:45", color: "#ff9800", bg: "#2e261a", iconD: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" },
  { msg: "INFO: Condensation Detected", time: "T-00:05:10", color: "#4fc3f7", bg: "#122230", iconD: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 16v-4M12 8h.01" },
  { msg: "Sequence Init: Takeoff", time: "T-00:12:10", color: "#5a5e68", bg: "#181a20", iconD: "M12 5v14M5 12h14" },
];

const TOPICS = [
  { name: "/drone/imu/data", type: "sensor_msgs/Imu", freq: "200 Hz", ok: true },
  { name: "/drone/camera/image_raw", type: "sensor_msgs/Image", freq: "30 Hz", ok: true },
  { name: "/drone/lidar/scan", type: "sensor_msgs/LaserScan", freq: "10 Hz", ok: true },
  { name: "/slam/pointCloud", type: "sensor_msgs/PointCloud2", freq: "5 Hz", ok: false },
];

/* ── Tiny SVG icon helper ── */
function Ico({ d, size = 14, cls = "" }: { d: string; size?: number; cls?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d={d} /></svg>;
}

/* ── Section wrapper with highlight transition ── */
function Section({ id, hl, children, className = "" }: { id: string; hl: string | null; children: ReactNode; className?: string }) {
  const active = hl === id;
  return (
    <section id={id} className={`scroll-mt-6 rounded-2xl transition-all duration-700 ease-out ${active ? "border-l-4 border-accent-blue bg-[#4fc3f7]/[0.03] animate-pulse" : "border-l-4 border-transparent"} ${className}`}>
      {children}
    </section>
  );
}

/* ════════════════════════════════════════════
 *  MAIN COMPONENT
 * ════════════════════════════════════════════ */
export default function DiagnosticsView() {
  const [hl, setHl] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (timer.current) clearTimeout(timer.current);
    setHl(id);
    timer.current = setTimeout(() => setHl(null), 1500);
  }, []);

  return (
    <div className="relative h-[calc(100vh-56px)] overflow-y-auto bg-[#0a0c10]">
      {/* ── Sticky Sub-Nav (right edge) ── */}
      <div className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-1.5 rounded-2xl border border-[#1e2330] bg-[#13161c]/90 p-2 backdrop-blur-md">
        {NAV.map((n) => (
          <button key={n.id} title={n.label} onClick={() => scrollTo(n.id)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#4a4f5c] transition-colors hover:bg-[#1e2330] hover:text-[#8b8f98]">
            <Ico d={n.d} size={16} />
          </button>
        ))}
      </div>

      {/* ── Page Content ── */}
      <div className="w-full space-y-6 px-8 py-6 pb-24 pr-20">
        {/* Page Title */}
        <h1 className="text-xl font-bold tracking-wide text-text-primary">Diagnostics Mode</h1>

        {/* ═══ SECTION 1: System Stats ═══ */}
        <Section id="sys-stats" hl={hl}>
          <div className="grid grid-cols-5 gap-4">
            {STATS.map((s) => {
              const glowColor = "rgba(16,185,129,0.15)";
              const borderHover = "rgba(16,185,129,0.5)";
              return (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -4, borderColor: borderHover, boxShadow: `0 0 15px ${glowColor}` }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={`${I} cursor-default p-5`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-wider`}>{s.label}</span>
                    <Ico d={s.iconD} size={14} />
                  </div>
                  <div className="mb-3 flex items-baseline gap-1">
                    <span className="font-mono text-3xl font-bold text-text-primary">{s.val}</span>
                    <span className="font-mono text-sm text-text-muted">{s.unit}</span>
                  </div>
                  {s.signal ? (
                    <div className="flex items-end gap-1 h-3">
                      {[40, 60, 80, 100].map((h, i) => (
                        <div key={i} className="w-2 rounded-sm" style={{ height: `${h}%`, backgroundColor: i < 3 ? "#4caf50" : "#2a2d35" }} />
                      ))}
                    </div>
                  ) : (
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1a1d24]">
                      <div className="h-full rounded-full transition-all" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Section>

        {/* ═══ SECTION 2: Hardware Telemetry ═══ */}
        <Section id="telemetry" hl={hl}>
          <div className="grid grid-cols-[1fr_340px] gap-5">
            {/* Sensor Streams */}
            <div className={`${I} p-5`}>
              <div className="mb-5 flex items-center gap-2">
                <Ico d="M12 2v6M12 18v4M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24" size={16} cls="text-accent-blue" />
                <span className="text-sm font-semibold text-text-primary">Sensor Streams</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* IMU 6-DOF */}
                <div className="rounded-lg border border-[#1e2330] bg-[#0e1117] p-4 flex flex-col">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">IMU 6-DOF</span>
                    <span className="h-2 w-2 rounded-full bg-accent-blue" />
                  </div>
                  <div className="flex-1 flex items-end gap-2 min-h-[100px]">
                    <div className="w-1/3 rounded-sm bg-[#434b62] border border-[#5a6784]" style={{ height: "40%" }} />
                    <div className="w-1/3 rounded-sm bg-[#594835] border border-[#7e613e]" style={{ height: "70%" }} />
                    <div className="w-1/3 rounded-sm bg-[#285248] border border-[#31715b]" style={{ height: "25%" }} />
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[9px] text-text-muted"><span>X: 0.02</span><span>Y: -0.01</span><span>Z: 9.81</span></div>
                </div>
                {/* BARO ALT */}
                <div className="rounded-lg border border-[#1e2330] bg-[#0e1117] p-4 flex flex-col">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">BARO ALT</span>
                    <span className="font-mono text-lg font-bold text-text-primary">12.4<span className="text-xs text-text-muted">m</span></span>
                  </div>
                  <div className="flex-1 min-h-[100px] relative">
                    <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                      <defs><linearGradient id="baro-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4fc3f7" stopOpacity="0.2" /><stop offset="100%" stopColor="#4fc3f7" stopOpacity="0" /></linearGradient></defs>
                      <path d="M0 80 C40 75,80 68,120 55 C160 42,200 35,240 28 C270 22,300 18,300 18 V100 H0Z" fill="url(#baro-g)" />
                      <path d="M0 80 C40 75,80 68,120 55 C160 42,200 35,240 28 C270 22,300 18,300 18" stroke="#4fc3f7" strokeWidth="2.5" fill="none" />
                    </svg>
                  </div>
                </div>
                {/* OPT FLOW */}
                <div className="rounded-lg border border-[#1e2330] bg-[#0e1117] p-4 flex flex-col">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">OPT FLOW</span>
                    <span className="h-2 w-2 rounded-full bg-accent-blue" />
                  </div>
                  <div className="flex-1 min-h-[100px] relative flex items-center justify-center">
                    {/* Crosshair axes */}
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-[#1e2330]" />
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#1e2330]" />
                    {/* Glowing dot */}
                    <div className="relative -translate-x-3 translate-y-2">
                      <div className="h-4 w-4 rounded-full bg-accent-blue shadow-[0_0_8px_#4fc3f7]" />
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[9px] text-text-muted"><span>Vx: 0.1 m/s</span><span>Vy: -0.05 m/s</span></div>
                </div>
                {/* RANGEFINDER */}
                <div className="rounded-lg border border-[#1e2330] bg-[#0e1117] p-4 flex flex-col">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">RANGEFINDER</span>
                    <span className="font-mono text-lg font-bold text-text-primary">3.8<span className="text-xs text-text-muted">m</span></span>
                  </div>
                  <div className="flex-1 flex items-center min-h-[100px]">
                    <div className="h-4 w-full overflow-hidden rounded-full bg-[#1a1d24]">
                      <div className="h-full rounded-full bg-[#34d399]" style={{ width: "76%" }} />
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between font-mono text-[9px] text-text-muted"><span>0m</span><span>5m</span></div>
                </div>
              </div>
            </div>

            {/* ESC / Motors */}
            <div className={`${I} p-5`}>
              <div className="mb-5 flex items-center gap-2">
                <Ico d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" size={16} cls="text-text-secondary" />
                <span className="text-sm font-semibold text-text-primary">ESC / Motors</span>
              </div>
              <div className="flex flex-col gap-0">
                {MOTORS.map((m, i) => (
                  <div key={m.name} className={`flex items-center justify-between py-4 ${i < MOTORS.length - 1 ? "border-b border-[#1e2330]" : ""}`}>
                    <div className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full ${m.ok ? "bg-accent-green" : "bg-[#ff9800]"}`} />
                      <span className="font-mono text-sm font-semibold text-text-primary">{m.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-sm font-bold ${m.ok ? "text-text-primary" : "text-[#ff9800]"}`}>{m.rpm} RPM</span>
                      <span className="font-mono text-xs text-text-muted">{m.temp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ SECTION 3: AI & Event Logs ═══ */}
        <Section id="intelligence" hl={hl}>
          <div className="grid grid-cols-[1fr_340px] gap-5">
            {/* Intelligence Feed */}
            <div className={`${I} p-5`}>
              <div className="mb-5 flex items-center gap-2">
                <Ico d="M12 2a4 4 0 0 1 4 4v1h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2V6a4 4 0 0 1 4-4z" size={16} cls="text-accent-blue" />
                <span className="text-sm font-semibold text-text-primary">Intelligence Feed</span>
              </div>
              <div className="mb-4 grid grid-cols-4 gap-3">
                {DEFECTS.map((d) => (
                  <div key={d.label} className="rounded-lg border border-[#1e2330] bg-[#0e1117] p-4 text-center">
                    <div className="mb-1 font-mono text-2xl font-bold text-accent-blue">{d.n}</div>
                    <div className="font-mono text-[9px] font-semibold uppercase tracking-wider text-text-muted">{d.label}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Structural Health", val: "84%", color: "text-[#ff9800]" },
                  { label: "AI Confidence", val: "94.2%", color: "text-accent-green" },
                  { label: "Altitude", val: "8.3 m", color: "text-text-primary" },
                  { label: "Velocity", val: "8.8 m/s", color: "text-text-primary" },
                ].map((m) => (
                  <div key={m.label} className="rounded-lg border border-[#1e2330]/50 bg-[#0e1117] px-3 py-3">
                    <div className="mb-0.5 font-mono text-[9px] uppercase tracking-wider text-text-muted">{m.label}</div>
                    <div className={`font-mono text-base font-bold ${m.color}`}>{m.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Timeline */}
            <div className={`${I} p-5`}>
              <div className="mb-5 flex items-center gap-2">
                <Ico d="M3 3h18v4H3zM3 10h18v4H3zM3 17h18v4H3z" size={16} cls="text-text-secondary" />
                <span className="text-sm font-semibold text-text-primary">Event Timeline</span>
              </div>
              <div className="flex flex-col gap-1">
                {EVENTS.map((e, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg px-3 py-3" style={{ backgroundColor: e.bg }}>
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${e.color}20` }}>
                      <Ico d={e.iconD} size={13} cls={`text-[${e.color}]`} />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold leading-tight" style={{ color: e.color }}>{e.msg}</div>
                      <div className="mt-0.5 font-mono text-[9px] text-text-muted">{e.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ SECTION 4: ROS2 Node Graph ═══ */}
        <Section id="ros-nodes" hl={hl}>
          <div className={`${I} p-5`}>
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ico d="M12 2v6M12 18v4M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M18 12h4" size={16} cls="text-text-secondary" />
                <span className="text-sm font-semibold text-text-primary">ROS2 Node Graph &amp; Topics</span>
              </div>
              <button className="flex items-center gap-1.5 rounded-lg border border-[#1e2330] px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-text-secondary transition-colors hover:bg-[#1e2330] hover:text-text-primary">
                <Ico d="M23 4v6h-6M1 20v-6h6M20.49 9A9 9 0 0 0 5.64 5.64L1 10M22.99 14l-4.64 4.36A9 9 0 0 1 3.51 15" size={12} /> Refresh Graph
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e2330]">
                  {["TOPIC NAME", "TYPE", "FREQUENCY", "STATUS"].map((h) => (
                    <th key={h} className="pb-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOPICS.map((t) => (
                  <tr key={t.name} className="border-b border-[#1e2330]/50">
                    <td className="py-3.5 font-mono text-xs text-text-primary">{t.name}</td>
                    <td className="py-3.5 font-mono text-xs text-text-muted">{t.type}</td>
                    <td className="py-3.5 text-right font-mono text-xs text-text-secondary">{t.freq}</td>
                    <td className="py-3.5 text-center"><span className={`inline-block h-2.5 w-2.5 rounded-full ${t.ok ? "bg-accent-green" : "bg-[#ff9800]"}`} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ═══ SECTION 5: Quick Actions ═══ */}
        <Section id="actions" hl={hl}>
          <div className={`${I} p-5`}>
            <div className="mb-5 flex items-center gap-2">
              <Ico d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" size={16} cls="text-text-secondary" />
              <span className="text-sm font-semibold text-text-primary">Quick Diagnostics</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Run Self-Test", color: "border-accent-blue/30 text-accent-blue hover:bg-accent-blue/10" },
                { label: "Recalibrate IMU", color: "border-[#1e2330] text-text-secondary hover:bg-[#1e2330]" },
                { label: "Flush Logs", color: "border-[#1e2330] text-text-secondary hover:bg-[#1e2330]" },
                { label: "Reboot FC", color: "border-accent-red/30 text-accent-red hover:bg-accent-red/10" },
              ].map((a) => (
                <button key={a.label} className={`rounded-lg border px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors ${a.color}`}>{a.label}</button>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
