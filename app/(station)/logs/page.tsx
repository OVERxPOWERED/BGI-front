"use client";

import { useState } from "react";
import ReportDirectory from "@/app/components/logs/ReportDirectory";
import ReportViewer from "@/app/components/logs/ReportViewer";

export default function LogsAndReportsPage() {
  // Manage the active report state here so both components can access it
  const [activeReportId, setActiveReportId] = useState("msn-8492");

  return (
    // Enforcing the zero-wasted-space rule: full height, full width, hidden overflow
    <div className="flex h-full w-full gap-6 p-6 overflow-hidden bg-[#0A0C10]">
      <ReportDirectory
        activeId={activeReportId}
        onSelect={setActiveReportId}
      />
      <ReportViewer />
    </div>
  );
}