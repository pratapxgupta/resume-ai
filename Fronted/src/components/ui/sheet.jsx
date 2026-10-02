import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;
export function SheetContent({ className, children, ...props }) {
  return <Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" /><Dialog.Content className={cn("fixed inset-y-0 right-0 z-50 w-[min(22rem,85vw)] border-l border-border bg-background p-6 shadow-xl", className)} {...props}>{children}<Dialog.Close className="absolute right-4 top-4 rounded-md p-2 hover:bg-accent" aria-label="Close menu"><X className="size-5" /></Dialog.Close></Dialog.Content></Dialog.Portal>;
}
export const SheetTitle = Dialog.Title;
