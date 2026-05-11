import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";

export default function StationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main content area offset by sidebar width */}
      <div className="ml-[56px] flex flex-1 flex-col">
        {/* Persistent Header */}
        <Header />

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
