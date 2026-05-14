"use client";

import { useState, useCallback, type ReactNode } from "react";
import {
  Cpu,
  Eye,
  EyeOff,
  Plane,
  FileText,
  Globe,
  Router,
  Gauge,
  Save,
  Server,
  Scan,
  Box,
  MapPin,
  AlertTriangle,
  LayoutGrid,
  Radio,
  CheckCircle,
  RefreshCw,
  Code,
  Link2,
  Cloud,
  KeyRound,
  Shield,
  Lock,
  Wifi,
  Clock,
  Aperture,
  Crosshair,
  Thermometer,
  Compass,
  Palette,
} from "lucide-react";

/* ────────────────────────────────────────────────────────
 *  Types
 * ──────────────────────────────────────────────────────── */
interface NavEntry {
  id: string;
  label: string;
  icon: ReactNode;
}

interface SliderConfig {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
}

/* ────────────────────────────────────────────────────────
 *  Constants
 * ──────────────────────────────────────────────────────── */
const SUB_NAV_ITEMS: NavEntry[] = [
  { id: "hardware", label: "Hardware & Telemetry", icon: <Cpu size={18} /> },
  {
    id: "payload-sensor",
    label: "Payload & Sensor Mgt",
    icon: <Aperture size={18} />,
  },
  { id: "ai-vision", label: "AI & Vision Processing", icon: <Eye size={18} /> },
  {
    id: "flight-safety",
    label: "Flight & Safety",
    icon: <Plane size={18} />,
  },
  {
    id: "network-security",
    label: "Network & Security",
    icon: <Shield size={18} />,
  },
  {
    id: "reporting",
    label: "Reporting & Export",
    icon: <FileText size={18} />,
  },
  {
    id: "global-preferences",
    label: "Global Preferences",
    icon: <Globe size={18} />,
  },
];

const BAUD_RATES = ["9600", "19200", "38400", "57600", "115200", "230400", "460800", "921600"];
const CONNECTION_TYPES = ["Serial", "UDP", "TCP"];

const TELEMETRY_SLIDER_CONFIGS: SliderConfig[] = [
  { id: "imu", label: "IMU", min: 1, max: 100, step: 1, unit: "Hz" },
  { id: "gps", label: "GPS / RTK", min: 1, max: 20, step: 1, unit: "Hz" },
  { id: "battery", label: "Battery & Power", min: 1, max: 10, step: 1, unit: "Hz" },
];

/* ────────────────────────────────────────────────────────
 *  Reusable: Island Card
 * ──────────────────────────────────────────────────────── */
function Island({
  icon,
  title,
  children,
  compact = false,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-5 mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-800/60 pb-3 mb-2">
        <span className="text-slate-500">{icon}</span>
        <h3
          className={
            compact
              ? "text-xs font-bold uppercase tracking-wider text-slate-500"
              : "text-lg font-semibold text-slate-200"
          }
        >
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
 *  Reusable: Form Field Label
 * ──────────────────────────────────────────────────────── */
function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 block">
      {children}
    </label>
  );
}

/* ────────────────────────────────────────────────────────
 *  Reusable: Text Input
 * ──────────────────────────────────────────────────────── */
function TextInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm font-mono text-slate-300 placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
    />
  );
}

/* ────────────────────────────────────────────────────────
 *  Reusable: Select Dropdown
 * ──────────────────────────────────────────────────────── */
function SelectInput({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm font-mono text-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors appearance-none cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.75rem center",
      }}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

/* ────────────────────────────────────────────────────────
 *  Reusable: Toggle Switch
 * ──────────────────────────────────────────────────────── */
function Toggle({
  enabled,
  onToggle,
  color = "blue",
}: {
  enabled: boolean;
  onToggle: () => void;
  color?: "blue" | "emerald";
}) {
  const activeColor = color === "emerald" ? "bg-emerald-500" : "bg-blue-500";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full
        transition-colors duration-200 ease-in-out focus:outline-none
        ${enabled ? activeColor : "bg-slate-700"}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md
          ring-0 transition-transform duration-200 ease-in-out mt-0.5
          ${enabled ? "translate-x-[22px]" : "translate-x-[2px]"}
        `}
      />
    </button>
  );
}

/* ────────────────────────────────────────────────────────
 *  Reusable: Custom Slider (generic)
 * ──────────────────────────────────────────────────────── */
function CustomSlider({
  min,
  max,
  step,
  value,
  onChange,
  leftLabel,
  rightLabel,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  leftLabel?: string;
  rightLabel?: string;
}) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-all duration-100"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md shadow-black/30 border-2 border-blue-500 pointer-events-none transition-all duration-100"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
      {(leftLabel || rightLabel) && (
        <div className="flex justify-between">
          <span className="text-xs text-slate-500 font-mono">{leftLabel}</span>
          <span className="text-xs text-slate-500 font-mono">{rightLabel}</span>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────
 *  Reusable: Telemetry Row Slider (label + track + value)
 * ──────────────────────────────────────────────────────── */
function TelemetrySlider({
  config,
  value,
  onChange,
}: {
  config: SliderConfig;
  value: number;
  onChange: (v: number) => void;
}) {
  const percentage =
    ((value - config.min) / (config.max - config.min)) * 100;

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-slate-300 w-32 shrink-0">{config.label}</span>
      <div className="flex-1 relative group">
        <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-all duration-100"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md shadow-black/30 border-2 border-blue-500 pointer-events-none transition-all duration-100"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
      <span className="font-mono text-sm text-slate-300 w-16 text-right tabular-nums">
        {value} {config.unit}
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
 *  Reusable: Segmented Control (Pills)
 * ──────────────────────────────────────────────────────── */
function SegmentedControl({
  options,
  active,
  onChange,
}: {
  options: string[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="bg-slate-950 p-1 rounded-lg flex">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`
            px-4 py-1.5 text-sm transition-all cursor-pointer
            ${opt === active
              ? "bg-slate-800 text-white rounded-md shadow font-medium"
              : "text-slate-400 hover:text-slate-300 rounded-md"
            }
          `}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ================================================================
 *  TAB PANEL: Hardware & Telemetry
 * ================================================================ */
function HardwareTab({
  wsUrl,
  setWsUrl,
  domainId,
  setDomainId,
  connectionType,
  setConnectionType,
  devicePath,
  setDevicePath,
  baudRate,
  setBaudRate,
  sliderValues,
  updateSlider,
}: {
  wsUrl: string;
  setWsUrl: (v: string) => void;
  domainId: string;
  setDomainId: (v: string) => void;
  connectionType: string;
  setConnectionType: (v: string) => void;
  devicePath: string;
  setDevicePath: (v: string) => void;
  baudRate: string;
  setBaudRate: (v: string) => void;
  sliderValues: Record<string, number>;
  updateSlider: (id: string, v: number) => void;
}) {
  return (
    <>
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-white mb-2">
          Hardware &amp; Telemetry Configuration
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          Manage core communication links and sensor streams.
        </p>
      </div>

      <div className="flex-1 min-h-0">
        <Island icon={<Router size={18} />} title="ROS 2 Bridge">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <FieldLabel>WebSocket URL / IP Address</FieldLabel>
              <TextInput
                placeholder="ws://192.168.1.100:9090"
                value={wsUrl}
                onChange={setWsUrl}
              />
            </div>
            <div>
              <FieldLabel>ROS Domain ID</FieldLabel>
              <TextInput placeholder="42" value={domainId} onChange={setDomainId} />
            </div>
          </div>
        </Island>

        <Island icon={<Cpu size={18} />} title="Flight Controller Interface">
          <div className="grid grid-cols-3 gap-5">
            <div>
              <FieldLabel>Connection Type</FieldLabel>
              <SelectInput
                options={CONNECTION_TYPES}
                value={connectionType}
                onChange={setConnectionType}
              />
            </div>
            <div>
              <FieldLabel>Device Path (COM Port)</FieldLabel>
              <TextInput
                placeholder="/dev/ttyUSB0"
                value={devicePath}
                onChange={setDevicePath}
              />
            </div>
            <div>
              <FieldLabel>Baud Rate</FieldLabel>
              <SelectInput
                options={BAUD_RATES}
                value={baudRate}
                onChange={setBaudRate}
              />
            </div>
          </div>
        </Island>

        <Island icon={<Gauge size={18} />} title="Telemetry Stream Rates">
          <div className="flex flex-col gap-6">
            {TELEMETRY_SLIDER_CONFIGS.map((config) => (
              <TelemetrySlider
                key={config.id}
                config={config}
                value={sliderValues[config.id]}
                onChange={(v) => updateSlider(config.id, v)}
              />
            ))}
          </div>
        </Island>
      </div>
    </>
  );
}

/* ================================================================
 *  TAB PANEL: AI & Vision Processing
 * ================================================================ */
interface ModelToggle {
  id: string;
  label: string;
  enabled: boolean;
}

function AIVisionTab() {
  // ── Local state ──
  const [powerMode, setPowerMode] = useState("Max Performance");
  const [gpuMemory, setGpuMemory] = useState(6.5);
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [models, setModels] = useState<ModelToggle[]>([
    { id: "cracks", label: "Cracks (Struct)", enabled: true },
    { id: "corrosion", label: "Corrosion (Surface)", enabled: true },
    { id: "leakage", label: "Leakage (Thermal)", enabled: false },
    { id: "personnel", label: "Personnel (Safety)", enabled: true },
  ]);
  const [rtabMapEnabled, setRtabMapEnabled] = useState(true);
  const [voxelSize, setVoxelSize] = useState("");

  const toggleModel = useCallback((id: string) => {
    setModels((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
  }, []);

  return (
    <>
      {/* Page Header */}
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-white mb-2">
          AI &amp; Vision Processing
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          Configure onboard edge compute allocation and computer vision model
          parameters for real-time analysis.
        </p>
      </div>

      {/* Scrollable Islands */}
      <div className="flex-1 min-h-0">
        {/* ── Island 1: Edge Compute Allocation ── */}
        <Island icon={<Server size={18} />} title="Edge Compute Allocation">
          {/* Row 1: Power Mode */}
          <div className="flex items-center justify-between">
            <div>
              <FieldLabel>Power Mode</FieldLabel>
              <p className="text-xs text-slate-500 mt-0.5">
                Prioritize framerate over battery life.
              </p>
            </div>
            <SegmentedControl
              options={["Max Performance", "Power Saver"]}
              active={powerMode}
              onChange={setPowerMode}
            />
          </div>

          {/* Row 2: GPU Memory Allocation */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <FieldLabel>TPU/GPU Memory Allocation</FieldLabel>
              <span className="font-mono text-sm text-slate-300 tabular-nums">
                {gpuMemory.toFixed(1)} GB
              </span>
            </div>
            <CustomSlider
              min={1}
              max={8}
              step={0.5}
              value={gpuMemory}
              onChange={setGpuMemory}
              leftLabel="1 GB"
              rightLabel="8 GB (MAX)"
            />
          </div>
        </Island>

        {/* ── Island 2: Defect Detection (VLM) ── */}
        <Island icon={<Scan size={18} />} title="Defect Detection (VLM)">
          {/* Row 1: Confidence Threshold */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <FieldLabel>AI Confidence Threshold</FieldLabel>
              <span className="font-mono text-sm text-slate-300 bg-slate-800 px-2.5 py-1 rounded-md tabular-nums">
                {confidenceThreshold}%
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Minimum confidence required to flag an anomaly.
            </p>
            <CustomSlider
              min={0}
              max={100}
              step={1}
              value={confidenceThreshold}
              onChange={setConfidenceThreshold}
            />
          </div>

          {/* Row 2: Active Models */}
          <div>
            <FieldLabel>Active Models</FieldLabel>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {models.map((model) => (
                <div
                  key={model.id}
                  className="flex justify-between items-center bg-slate-950/50 border border-slate-800 p-4 rounded-lg"
                >
                  <span className="font-mono text-sm text-slate-300">
                    {model.label}
                  </span>
                  <Toggle
                    enabled={model.enabled}
                    onToggle={() => toggleModel(model.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </Island>

        {/* ── Island 3: Live SLAM & 3D Mapping ── */}
        <Island icon={<Box size={18} />} title="Live SLAM & 3D Mapping">
          {/* Row 1: RTAB-MAP toggle */}
          <div className="flex items-center justify-between">
            <div>
              <FieldLabel>RTAB-MAP Generation</FieldLabel>
              <p className="text-xs text-slate-500 mt-0.5">
                Enable real-time appearance-based mapping.
              </p>
            </div>
            <Toggle
              enabled={rtabMapEnabled}
              onToggle={() => setRtabMapEnabled((p) => !p)}
            />
          </div>

          {/* Row 2: Voxel Grid Filter */}
          <div>
            <FieldLabel>Voxel Grid Filter (Density)</FieldLabel>
            <p className="text-xs text-slate-500 mt-0.5 mb-2">
              Leaf size for downsampling point clouds.
            </p>
            <div className="flex items-center gap-2">
              <TextInput
                placeholder="0.05"
                value={voxelSize}
                onChange={setVoxelSize}
              />
              <span className="text-sm font-mono text-slate-400 shrink-0">m</span>
            </div>
          </div>
        </Island>
      </div>
    </>
  );
}

/* ================================================================
 *  TAB PANEL: Flight & Safety Parameters
 * ================================================================ */
function FlightSafetyTab() {
  // ── Local state ──
  const [maxAltitude, setMaxAltitude] = useState("120");
  const [maxRadius, setMaxRadius] = useState("5000");
  const [maxVelocity, setMaxVelocity] = useState(12.5);
  const [lossOfLinkAction, setLossOfLinkAction] = useState("Return to Home");
  const [lowBattery, setLowBattery] = useState(20);
  const [criticalBattery, setCriticalBattery] = useState(10);
  const [lidarEnabled, setLidarEnabled] = useState(true);
  const [clearanceDistance, setClearanceDistance] = useState("2.5");

  return (
    <>
      {/* Page Header */}
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-white mb-2">
          Flight &amp; Safety Parameters
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          Configure critical autonomous limits, geofencing, and failsafe
          behaviors for mission-critical operations.
        </p>
      </div>

      {/* Islands */}
      <div className="flex-1 min-h-0">
        {/* ── Island 1: Geofencing ── */}
        <Island icon={<MapPin size={18} />} title="Geofencing">
          {/* Row 1: Altitude & Radius */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <FieldLabel>Max Altitude AGL (m)</FieldLabel>
              <TextInput
                placeholder="120"
                value={maxAltitude}
                onChange={setMaxAltitude}
              />
            </div>
            <div>
              <FieldLabel>Max Radius From Home (m)</FieldLabel>
              <TextInput
                placeholder="5000"
                value={maxRadius}
                onChange={setMaxRadius}
              />
            </div>
          </div>

          {/* Row 2: Velocity Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <FieldLabel>Max Autonomous Flight Velocity</FieldLabel>
              <span className="font-mono text-sm text-slate-300 tabular-nums">
                {maxVelocity.toFixed(1)} m/s
              </span>
            </div>
            <CustomSlider
              min={1}
              max={25}
              step={0.5}
              value={maxVelocity}
              onChange={setMaxVelocity}
            />
          </div>
        </Island>

        {/* ── Island 2: Failsafe Actions ── */}
        <Island icon={<AlertTriangle size={18} />} title="Failsafe Actions">
          {/* Row 1: Loss of Link Dropdown */}
          <div>
            <FieldLabel>Loss of Link Action</FieldLabel>
            <SelectInput
              options={["Return to Home", "Land Immediately", "Hover in Place", "Continue Mission"]}
              value={lossOfLinkAction}
              onChange={setLossOfLinkAction}
            />
          </div>

          {/* Row 2: Battery thresholds */}
          <div className="grid grid-cols-2 gap-6">
            {/* Low Battery Warning */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <FieldLabel>Low Battery Warning</FieldLabel>
                <span className="font-mono text-sm text-amber-500 tabular-nums">
                  {lowBattery}%
                </span>
              </div>
              <CustomSlider
                min={5}
                max={50}
                step={1}
                value={lowBattery}
                onChange={setLowBattery}
              />
            </div>

            {/* Critical / Auto-RTH Threshold */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <FieldLabel>Critical / Auto-RTH Threshold</FieldLabel>
                <span className="font-mono text-sm text-rose-500 tabular-nums">
                  {criticalBattery}%
                </span>
              </div>
              <CustomSlider
                min={5}
                max={30}
                step={1}
                value={criticalBattery}
                onChange={setCriticalBattery}
              />
            </div>
          </div>
        </Island>

        {/* ── Island 3: Obstacle Avoidance ── */}
        <Island icon={<LayoutGrid size={18} />} title="Obstacle Avoidance">
          {/* Row 1: Toggle + Clearance */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Toggle
                enabled={lidarEnabled}
                onToggle={() => setLidarEnabled((p) => !p)}
                color="emerald"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                LiDAR / Stereo Vision Avoidance
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Minimum Clearance Distance
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={clearanceDistance}
                  onChange={(e) => setClearanceDistance(e.target.value)}
                  className="w-20 bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-sm font-mono text-slate-300 text-center focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                />
                <span className="text-sm font-mono text-slate-400">m</span>
              </div>
            </div>
          </div>

          {/* Row 2: Visual Panels */}
          <div className="grid grid-cols-[2fr_1fr] gap-4">
            {/* Left: Mock Map */}
            <div
              className="bg-slate-950 border border-slate-800 rounded-lg p-4 h-32 relative flex flex-col justify-between overflow-hidden"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 40% 60%, rgba(59,130,246,0.08) 0%, transparent 60%), " +
                  "radial-gradient(ellipse at 70% 30%, rgba(16,185,129,0.06) 0%, transparent 50%), " +
                  "repeating-conic-gradient(rgba(100,116,139,0.04) 0% 25%, transparent 0% 50%)",
              }}
            >
              {/* Topo lines simulation */}
              <div className="absolute inset-0 opacity-[0.07]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="35%" cy="55%" rx="120" ry="40" fill="none" stroke="#64748b" strokeWidth="0.5" />
                  <ellipse cx="35%" cy="55%" rx="90" ry="30" fill="none" stroke="#64748b" strokeWidth="0.5" />
                  <ellipse cx="35%" cy="55%" rx="60" ry="20" fill="none" stroke="#64748b" strokeWidth="0.5" />
                  <ellipse cx="70%" cy="35%" rx="80" ry="25" fill="none" stroke="#64748b" strokeWidth="0.5" />
                  <ellipse cx="70%" cy="35%" rx="50" ry="15" fill="none" stroke="#64748b" strokeWidth="0.5" />
                </svg>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 relative z-10">
                Simulated Range Visualization
              </span>
              <div className="flex items-center gap-1.5 relative z-10">
                <CheckCircle size={12} className="text-emerald-500" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-500">
                  Safe Zone Validated
                </span>
              </div>
            </div>

            {/* Right: Latency */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 h-32 flex flex-col items-center justify-center gap-2">
              <Radio size={20} className="text-slate-500" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                Active Sensor Sync
              </span>
              <span className="text-emerald-500 font-mono font-bold text-sm">
                0.02ms Latency
              </span>
            </div>
          </div>
        </Island>
      </div>
    </>
  );
}

/* ================================================================
 *  TAB PANEL: Reporting & Export
 * ================================================================ */
function ReportingTab() {
  // ── Local state ──
  const [autoPdf, setAutoPdf] = useState(true);
  const [includeConfidence, setIncludeConfidence] = useState(true);
  const [dataFormat, setDataFormat] = useState("CSV");
  const [serverEndpoint, setServerEndpoint] = useState(
    "https://api.bgiground.com/v1/sync"
  );
  const [apiKey, setApiKey] = useState("sk_live_9f82b4a1c3d5e7f9");
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <>
      {/* Page Header */}
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-white mb-2">
          Reporting &amp; Export
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          Configure automated mission reports, data formats, and cloud
          synchronization.
        </p>
      </div>

      {/* Islands */}
      <div className="flex-1 min-h-0">
        {/* ── Island 1: Automated Generation ── */}
        <Island
          icon={<RefreshCw size={16} />}
          title="Automated Generation"
          compact
        >
          <div className="grid grid-cols-2 gap-6">
            {/* Auto-generate PDF */}
            <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-slate-200">
                  Auto-generate PDF Report
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Executes upon mission complete state.
                </p>
              </div>
              <Toggle
                enabled={autoPdf}
                onToggle={() => setAutoPdf((p) => !p)}
              />
            </div>

            {/* Include AI Confidence */}
            <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-slate-200">
                  Include AI Confidence Scores
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Embed model confidence metrics in export.
                </p>
              </div>
              <Toggle
                enabled={includeConfidence}
                onToggle={() => setIncludeConfidence((p) => !p)}
              />
            </div>
          </div>
        </Island>

        {/* ── Island 2: Data Formats ── */}
        <Island icon={<Code size={16} />} title="Data Formats" compact>
          <div>
            <p className="text-sm font-semibold text-slate-200 mb-3">
              Default Raw Data Export
            </p>
            <div className="bg-slate-950 p-1 rounded-lg flex w-fit">
              {["CSV", "JSON", "XML"].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setDataFormat(fmt)}
                  className={`
                    px-4 py-1.5 text-sm transition-all cursor-pointer rounded-md font-mono
                    ${fmt === dataFormat
                      ? "bg-blue-500/20 text-blue-400 shadow font-medium"
                      : "text-slate-400 hover:text-slate-300"
                    }
                  `}
                >
                  {fmt}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">
              Selected format applied to automated telemetry dumps.
            </p>
          </div>
        </Island>

        {/* ── Island 3: Cloud Synchronization ── */}
        <Island
          icon={<Link2 size={16} />}
          title="Cloud Synchronization"
          compact
        >
          {/* Server Endpoint */}
          <div>
            <p className="text-sm font-semibold text-slate-200 mb-2">
              Central Server Endpoint
            </p>
            <div className="relative">
              <Cloud
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                value={serverEndpoint}
                onChange={(e) => setServerEndpoint(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md pl-10 pr-3 py-2.5 text-sm font-mono text-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* API Key */}
          <div>
            <p className="text-sm font-semibold text-slate-200 mb-2">
              API Key
            </p>
            <div className="relative">
              <KeyRound
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-md pl-10 pr-28 py-2.5 text-sm font-mono text-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowApiKey((p) => !p)}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-300 transition-colors text-xs cursor-pointer"
              >
                {showApiKey ? (
                  <EyeOff size={12} />
                ) : (
                  <Eye size={12} />
                )}
                {showApiKey ? "Hide" : "Reveal"}
              </button>
            </div>
          </div>
        </Island>
      </div>
    </>
  );
}

/* ================================================================
 *  TAB PANEL: Network & Security
 * ================================================================ */
function NetworkSecurityTab() {
  // ── Local state ──
  const [aesEnabled, setAesEnabled] = useState(true);
  const [rfBand, setRfBand] = useState("5.8 GHz");
  const [require2fa, setRequire2fa] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("15 Minutes");

  return (
    <>
      {/* Page Header */}
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-white mb-2">
          Network &amp; Security
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          Manage data link frequencies, stream encryption, and operator
          authentication protocols.
        </p>
      </div>

      {/* Islands */}
      <div className="flex-1 min-h-0">
        {/* ── Island 1: AES-256 Stream Encryption (single row) ── */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-md p-2">
              <Lock size={20} className="text-slate-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">
                AES-256 Stream Encryption
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                End-to-end encryption for live RTSP video and ROS 2 telemetry.
              </p>
            </div>
          </div>
          <Toggle
            enabled={aesEnabled}
            onToggle={() => setAesEnabled((p) => !p)}
            color="emerald"
          />
        </div>

        {/* ── Island 2: Data Link Configuration ── */}
        <Island icon={<Wifi size={18} />} title="Data Link Configuration">
          <div className="grid grid-cols-[1fr_auto] gap-8">
            {/* Left: RF Band Dropdown */}
            <div>
              <FieldLabel>Primary RF Frequency Band</FieldLabel>
              <SelectInput
                options={["2.4 GHz", "5.8 GHz", "900 MHz"]}
                value={rfBand}
                onChange={setRfBand}
              />
            </div>

            {/* Right: Metrics Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col gap-3 min-w-[250px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Uplink
                </span>
                <span className="font-mono text-sm text-emerald-500 font-medium">
                  1.2 Mbps
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Downlink
                </span>
                <span className="font-mono text-sm text-emerald-500 font-medium">
                  14.5 Mbps
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Latency
                </span>
                <span className="font-mono text-sm text-emerald-500 font-medium">
                  12ms
                </span>
              </div>
            </div>
          </div>
        </Island>

        {/* ── Islands 3 & 4: 2FA + Session Timeout (side by side) ── */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Card: Require 2FA */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-slate-800/60 pb-3">
              <Shield size={18} className="text-slate-500" />
              <h3 className="text-lg font-semibold text-slate-200">
                Require 2FA for Deployment
              </h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400 max-w-[280px]">
                Mandatory multi-factor authentication before arming.
              </p>
              <Toggle
                enabled={require2fa}
                onToggle={() => setRequire2fa((p) => !p)}
                color="emerald"
              />
            </div>
          </div>

          {/* Right Card: Idle Session Timeout */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-slate-800/60 pb-3">
              <Clock size={18} className="text-slate-500" />
              <h3 className="text-lg font-semibold text-slate-200">
                Idle Session Timeout
              </h3>
            </div>
            <SelectInput
              options={["5 Minutes", "15 Minutes", "30 Minutes", "Never"]}
              value={sessionTimeout}
              onChange={setSessionTimeout}
            />
          </div>
        </div>
      </div>
    </>
  );
}

/* ================================================================
 *  TAB PANEL: Payload & Sensor Management
 * ================================================================ */
function PayloadSensorTab() {
  // ── Local state ──
  const [stabMode, setStabMode] = useState("Follow");
  const [pitchSens, setPitchSens] = useState(65);
  const [yawSens, setYawSens] = useState(40);
  const [videoRes, setVideoRes] = useState("4K (3840 x 2160) - 30fps");
  const [thermalPalette, setThermalPalette] = useState("Ironbow");
  const [sdRecording, setSdRecording] = useState(true);

  return (
    <>
      {/* Page Header */}
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-white mb-2">
          Payload &amp; Sensor Management
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          Configure gimbal stabilization, camera resolutions, and thermal
          imaging palettes.
        </p>
      </div>

      {/* Islands */}
      <div className="flex-1 min-h-0">
        {/* ── Island 1: Gimbal Configuration ── */}
        <Island icon={<Crosshair size={18} />} title="Gimbal Configuration">
          {/* Row 1: Stabilization Mode */}
          <div>
            <FieldLabel>Stabilization Mode</FieldLabel>
            <div className="mt-2">
              <SegmentedControl
                options={["Follow", "FPV", "Lock"]}
                active={stabMode}
                onChange={setStabMode}
              />
            </div>
          </div>

          {/* Row 2: Sensitivity Sliders */}
          <div className="grid grid-cols-2 gap-8 mt-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <FieldLabel>Pitch Sensitivity</FieldLabel>
                <span className="font-mono text-sm text-slate-300 tabular-nums">
                  {pitchSens}%
                </span>
              </div>
              <CustomSlider
                min={0}
                max={100}
                step={1}
                value={pitchSens}
                onChange={setPitchSens}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <FieldLabel>Yaw Sensitivity</FieldLabel>
                <span className="font-mono text-sm text-slate-300 tabular-nums">
                  {yawSens}%
                </span>
              </div>
              <CustomSlider
                min={0}
                max={100}
                step={1}
                value={yawSens}
                onChange={setYawSens}
              />
            </div>
          </div>
        </Island>

        {/* ── Island 2: Optical & Thermal Output ── */}
        <Island
          icon={<Thermometer size={18} />}
          title="Optical & Thermal Output"
        >
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column: Dropdowns */}
            <div className="flex flex-col gap-5">
              <div>
                <FieldLabel>Video Stream Resolution</FieldLabel>
                <SelectInput
                  options={[
                    "4K (3840 x 2160) - 30fps",
                    "2K (2560 x 1440) - 60fps",
                    "1080p (1920 x 1080) - 60fps",
                    "720p (1280 x 720) - 120fps",
                  ]}
                  value={videoRes}
                  onChange={setVideoRes}
                />
              </div>
              <div>
                <FieldLabel>Thermal Color Palette</FieldLabel>
                <SelectInput
                  options={[
                    "Ironbow",
                    "White Hot",
                    "Black Hot",
                    "Rainbow",
                    "Lava",
                    "Arctic",
                  ]}
                  value={thermalPalette}
                  onChange={setThermalPalette}
                />
              </div>
            </div>

            {/* Right Column: Storage Toggle Card */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 text-center mb-2">
                Local Storage
              </p>
              <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-5 flex justify-between items-center h-[72px]">
                <div>
                  <p className="text-sm font-semibold text-slate-200">
                    SD Card Recording
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Auto-record on arm
                  </p>
                </div>
                <Toggle
                  enabled={sdRecording}
                  onToggle={() => setSdRecording((p) => !p)}
                  color="emerald"
                />
              </div>
            </div>
          </div>
        </Island>
      </div>
    </>
  );
}

/* ================================================================
 *  TAB PANEL: Global Preferences
 * ================================================================ */
function GlobalPreferencesTab() {
  // ── Local state ──
  const [units, setUnits] = useState("Metric");
  const [timezone, setTimezone] = useState("UTC (ZULU)");
  const [uiScale, setUiScale] = useState(100);
  const [mapProvider, setMapProvider] = useState("Dark Terrain Vector");
  const [devConsole, setDevConsole] = useState(false);

  return (
    <>
      {/* Page Header */}
      <div className="shrink-0">
        <h1 className="text-2xl font-bold text-white mb-2">
          Global Preferences
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          Configure system-wide display, localization, and interface settings
          for the ground station.
        </p>
      </div>

      {/* Islands */}
      <div className="flex-1 min-h-0">
        {/* ── Island 1: Localization ── */}
        <Island icon={<Compass size={18} />} title="Localization">
          <div className="grid grid-cols-2 gap-8">
            {/* Left: Measurement Units */}
            <div>
              <FieldLabel>Measurement Units</FieldLabel>
              <div className="mt-2">
                <div className="bg-slate-950 p-1 rounded-lg flex w-full">
                  {["Metric", "Imperial"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setUnits(opt)}
                      className={`
                        px-4 py-1.5 text-sm transition-all cursor-pointer rounded-md w-1/2 text-center
                        ${opt === units
                          ? "bg-slate-800 text-white shadow font-medium"
                          : "text-slate-400 hover:text-slate-300"
                        }
                      `}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3">
                Applied to altitude, speed, distance, and payload weight
                metrics.
              </p>
            </div>

            {/* Right: Timezone */}
            <div>
              <FieldLabel>System Timezone</FieldLabel>
              <div className="mt-2">
                <SelectInput
                  options={[
                    "UTC (ZULU)",
                    "EST (UTC-5)",
                    "CST (UTC-6)",
                    "PST (UTC-8)",
                    "IST (UTC+5:30)",
                    "JST (UTC+9)",
                  ]}
                  value={timezone}
                  onChange={setTimezone}
                />
              </div>
              <p className="text-xs text-slate-400 mt-3">
                UTC is recommended for mission logging and synchronized
                telemetry.
              </p>
            </div>
          </div>
        </Island>

        {/* ── Island 2: Theme & Interface ── */}
        <Island icon={<Palette size={18} />} title="Theme & Interface">
          <div className="grid grid-cols-[1fr_1.5fr] gap-8">
            {/* Left: Interface Scaling */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <FieldLabel>Interface Scaling</FieldLabel>
                <span className="font-mono text-sm text-slate-300 tabular-nums">
                  {uiScale}%
                </span>
              </div>
              <CustomSlider
                min={50}
                max={150}
                step={10}
                value={uiScale}
                onChange={setUiScale}
              />
            </div>

            {/* Right: Map Provider */}
            <div>
              <FieldLabel>Default Map Provider</FieldLabel>
              <div className="mt-2">
                <SelectInput
                  options={[
                    "Dark Terrain Vector",
                    "Satellite Imagery",
                    "Hybrid Overlay",
                    "OpenStreetMap",
                    "Topographic",
                  ]}
                  value={mapProvider}
                  onChange={setMapProvider}
                />
              </div>
              <div className="bg-slate-950/50 border border-slate-800 rounded-lg h-20 mt-3 flex items-center justify-center">
                <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">
                  Preview: {mapProvider.split(" ").slice(0, 2).join(" ")}
                </span>
              </div>
            </div>
          </div>
        </Island>

        {/* ── Island 3: Developer Console (single row toggle) ── */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              Enable Developer Console
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Exposes raw ROS2 message topics in the Logs tab.
            </p>
          </div>
          <Toggle
            enabled={devConsole}
            onToggle={() => setDevConsole((p) => !p)}
          />
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════
 *  Main Component
 * ════════════════════════════════════════════════════════════ */
export default function SettingsView() {
  const [activeTab, setActiveTab] = useState("hardware");

  // ── Hardware tab form state (lifted here so it persists across tab switches) ──
  const [wsUrl, setWsUrl] = useState("");
  const [domainId, setDomainId] = useState("");
  const [connectionType, setConnectionType] = useState("Serial");
  const [devicePath, setDevicePath] = useState("");
  const [baudRate, setBaudRate] = useState("921600");
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({
    imu: 50,
    gps: 5,
    battery: 1,
  });

  const updateSlider = useCallback((id: string, value: number) => {
    setSliderValues((prev) => ({ ...prev, [id]: value }));
  }, []);

  /* ── Render the active tab panel ── */
  const renderPanel = () => {
    switch (activeTab) {
      case "hardware":
        return (
          <HardwareTab
            wsUrl={wsUrl}
            setWsUrl={setWsUrl}
            domainId={domainId}
            setDomainId={setDomainId}
            connectionType={connectionType}
            setConnectionType={setConnectionType}
            devicePath={devicePath}
            setDevicePath={setDevicePath}
            baudRate={baudRate}
            setBaudRate={setBaudRate}
            sliderValues={sliderValues}
            updateSlider={updateSlider}
          />
        );
      case "ai-vision":
        return <AIVisionTab />;
      case "flight-safety":
        return <FlightSafetyTab />;
      case "reporting":
        return <ReportingTab />;
      case "network-security":
        return <NetworkSecurityTab />;
      case "payload-sensor":
        return <PayloadSensorTab />;
      case "global-preferences":
        return <GlobalPreferencesTab />;
      default:
        return (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">
                {SUB_NAV_ITEMS.find((i) => i.id === activeTab)?.label}
              </h1>
              <p className="text-sm text-slate-500">Coming soon — Phase 2</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full w-full gap-6 p-6 overflow-hidden bg-[#0A0C10]">
      {/* ═══════════════════════════════════════════════════
       *  Sub-Navigation (Left Column)
       * ═══════════════════════════════════════════════════ */}
      <nav className="w-[280px] shrink-0 flex flex-col gap-1">
        {SUB_NAV_ITEMS.map((item) => {
          const isActive = item.id === activeTab;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left w-full
                ${isActive
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
       *  Main Configuration Panel (Right Column)
       * ═══════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-h-0  relative">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto pr-2 pb-24 flex flex-col">
          {renderPanel()}
        </div>

        {/* ── Floating Action Footer (outside scroll) ── */}
        <button
          className="absolute bottom-6 right-6 z-10 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-blue-900/20 transition-all cursor-pointer"
          onClick={() => {
            /* Save logic placeholder */
          }}
        >
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
