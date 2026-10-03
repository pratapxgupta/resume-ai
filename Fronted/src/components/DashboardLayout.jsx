import { useState } from "react";
import { AppHeader } from "./AppHeader";
import { ReportSidebar } from "./ReportSidebar";
import { Sheet, SheetContent, SheetTitle } from "./ui/sheet";

export function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <div className="min-h-screen bg-background text-foreground"><AppHeader onOpenSidebar={() => setSidebarOpen(true)} /><div className="flex"><aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 border-r border-border bg-card lg:block"><ReportSidebar /></aside><div className="min-w-0 flex-1">{children}</div></div><Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}><SheetContent className="p-0"><SheetTitle className="sr-only">Previous interview reports</SheetTitle><ReportSidebar onNavigate={() => setSidebarOpen(false)} /></SheetContent></Sheet></div>;
}
