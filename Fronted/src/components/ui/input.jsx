import { cn } from "../../lib/utils";
export function Input({ className, ...props }) { return <input className={cn("h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:opacity-50", className)} {...props} />; }
