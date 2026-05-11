import DiagnosticsView from "@/app/components/diagnostics/DiagnosticsView";

export const metadata = {
  title: "Diagnostics Mode — BGI Ground Station",
  description: "Hardware telemetry, AI intelligence feeds, and ROS2 network diagnostics.",
};

export default function TelemetryPage() {
  return <DiagnosticsView />;
}
