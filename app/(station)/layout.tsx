import GlobalSidebar, { SIDEBAR_WIDTH } from "@/app/components/layout/GlobalSidebar";
import GlobalHeader from "@/app/components/layout/GlobalHeader";

export default function StationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Persistent sidebar — fixed, full height */}
      <GlobalSidebar />

      {/* Main content area — offset by sidebar width */}
      <div
        className="flex flex-1 flex-col"
        style={{ marginLeft: SIDEBAR_WIDTH }}
      >
        {/* Persistent header — sticky */}
        <GlobalHeader />

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
