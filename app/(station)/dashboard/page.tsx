import SystemReadinessCard from "@/app/components/dashboard/SystemReadinessCard";
import DeploymentCard from "@/app/components/dashboard/DeploymentCard";
import InspectionTable from "@/app/components/dashboard/InspectionTable";

export const metadata = {
  title: "Mission Control — BGI Ground Station",
  description:
    "Mission control dashboard for autonomous drone infrastructure inspection. Monitor system readiness, deploy inspection sequences, and review findings.",
};

export default function DashboardPage() {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Mission Control
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Awaiting command to initialize sequence.
          </p>
        </div>
        <div className="font-mono text-sm font-semibold tracking-widest text-text-muted">
          T-MINUS{" "}
          <span className="text-text-secondary">00:00:00</span>
        </div>
      </div>

      {/* Top Grid — Two Columns */}
      <div className="mb-6 grid grid-cols-[1fr_340px] gap-5">
        <SystemReadinessCard />
        <DeploymentCard />
      </div>

      {/* Bottom Section — Inspection Table */}
      <InspectionTable />
    </div>
  );
}
