import { FileText, Plus, ScrollText } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useInterview } from "../features/interview/hooks/useInterview";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export function ReportSidebar({ onNavigate }) {
  const { interviewId } = useParams();
  const { reports, loading, getReports } = useInterview();

  useEffect(() => { getReports().catch(() => {}); }, [getReports]);

  return <div className="flex h-full flex-col"><div className="border-b border-border p-4"><Button className="w-full" asChild><Link to="/app" onClick={onNavigate}><Plus className="size-4" />New preparation plan</Link></Button></div><div className="flex-1 overflow-y-auto p-3"><div className="mb-3 flex items-center gap-2 px-2"><ScrollText className="size-4 text-muted-foreground" /><p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Previous reports</p></div>{loading && reports.length === 0 ? <SidebarSkeleton /> : reports.length === 0 ? <div className="rounded-lg border border-dashed border-border p-5 text-center"><FileText className="mx-auto size-6 text-muted-foreground" /><p className="mt-3 text-sm font-medium">No reports yet</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Your generated reports will appear here.</p></div> : <nav aria-label="Previous interview reports" className="space-y-1">{reports.map((item) => { const active = interviewId === item._id; return <Link key={item._id} to={`/interview/${item._id}`} onClick={onNavigate} aria-current={active ? "page" : undefined} className={cn("group flex items-start gap-3 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-accent", active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground")}><span className={cn("mt-0.5 grid size-8 shrink-0 place-items-center rounded-md bg-muted", active && "bg-primary text-primary-foreground")}><FileText className="size-4" /></span><span className="min-w-0"><span className="block truncate font-medium text-foreground">{item.title}</span><span className="mt-1 block text-xs">{formatDate(item.createdAt)}</span></span></Link>; })}</nav>}</div><div className="border-t border-border p-4 text-xs text-muted-foreground">{reports.length} {reports.length === 1 ? "report" : "reports"} saved</div></div>;
}

function SidebarSkeleton() { return <div className="space-y-2">{[1, 2, 3].map((item) => <div key={item} className="flex gap-3 rounded-lg p-3"><Skeleton className="size-8 shrink-0" /><div className="flex-1 space-y-2"><Skeleton className="h-4 w-4/5" /><Skeleton className="h-3 w-2/5" /></div></div>)}</div>; }
function formatDate(value) { if (!value) return "Saved report"; return new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric" }).format(new Date(value)); }
