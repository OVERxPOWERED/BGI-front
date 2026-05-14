"use client";

import { useState, useCallback, type ReactNode } from "react";
import {
  Cpu,
  Eye,
  Plane,
  FileText,
  Globe,
  Router,
  Gauge,
  Save,
  Server,
  Scan,
  Box,
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
  { id: "ai-vision", label: "AI & Vision Processing", icon: <Eye size={18} /> },
  {
    id: "flight-safety",
    label: "Flight & Safety",
    icon: <Plane size={18} />,
  },
  {
    id: "reporting",
    label: "Reporting & Export",
    icon: <FileText size={18} />,
  },
  {
    id: "preferences",
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
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col gap-5 mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-800/60 pb-3 mb-2">
        <span className="text-slate-500">{icon}</span>
        <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
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
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full
        transition-colors duration-200 ease-in-out focus:outline-none
        ${enabled ? "bg-blue-500" : "bg-slate-700"}
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

      <div className="flex-1 min-h-0 pb-20">
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
      <div className="flex-1 min-h-0 pb-20">
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
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pr-2 relative">
        {renderPanel()}

        {/* ── Floating Action Footer ── */}
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-blue-900/20 transition-all absolute bottom-0 right-0 m-6 z-10 cursor-pointer"
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
