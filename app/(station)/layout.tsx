// import GlobalSidebar, { SIDEBAR_WIDTH } from "@/app/components/layout/GlobalSidebar";
// import GlobalHeader from "@/app/components/layout/GlobalHeader";

// export default function StationLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex min-h-screen">
//       {/* Persistent sidebar — fixed, full height */}
//       <GlobalSidebar />

//       {/* Main content area — offset by sidebar width */}
//       <div
//         className="flex flex-1 flex-col"
//         style={{ marginLeft: SIDEBAR_WIDTH }}
//       >
//         {/* Persistent header — sticky */}
//         <GlobalHeader />

//         {/* Page content */}
//         <main className="flex-1">{children}</main>
//       </div>
//     </div>
//   );
// }


import GlobalSidebar, { SIDEBAR_WIDTH } from "@/app/components/layout/GlobalSidebar";
import GlobalHeader from "@/app/components/layout/GlobalHeader";

export default function StationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // FIX 1: Changed `min-h-screen` to `h-screen` and added `overflow-hidden`
    // This locks the absolute root to exactly the viewport height, disabling window scrolling.
    <div className="flex h-screen overflow-hidden bg-[#0A0C10]">
      {/* Persistent sidebar — fixed, full height */}
      <GlobalSidebar />

      {/* Main content area — offset by sidebar width */}
      <div
        // FIX 2: Added `h-full min-h-0`
        // This ensures the right side column doesn't stretch past the screen height.
        className="flex flex-1 flex-col h-full min-h-0"
        style={{ marginLeft: SIDEBAR_WIDTH }}
      >
        {/* Persistent header — sticky */}
        <GlobalHeader />

        {/* Page content */}
        {/* FIX 3: Added `flex flex-col min-h-0 overflow-hidden` */}
        {/* This forces the child pages (like Logs) to fit within the remaining space. */}
        <main className="flex flex-1 flex-col min-h-0 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}