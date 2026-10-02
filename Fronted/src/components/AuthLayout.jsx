import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { Brand } from "./Brand";
import { ThemeToggle } from "./ThemeToggle";

export function AuthLayout({ title, description, children }) {
  return <main className="grid min-h-screen bg-background lg:grid-cols-2"><section className="relative hidden overflow-hidden bg-primary p-12 text-primary-foreground lg:flex lg:flex-col"><div className="absolute -right-40 -top-40 size-96 rounded-full bg-white/10" /><Brand /><div className="relative my-auto max-w-lg"><p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] opacity-80">Prepare with direction</p><h2 className="text-4xl font-bold leading-tight">Walk into your next interview knowing what to practice.</h2><div className="mt-8 space-y-4">{["Questions tailored to the role", "Clear skill-gap priorities", "A practical day-by-day roadmap"].map((item) => <p key={item} className="flex items-center gap-3"><CheckCircle2 className="size-5" />{item}</p>)}</div></div></section><section className="flex min-w-0 flex-col p-4 sm:p-8"><div className="flex items-center justify-between"><Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />Back to home</Link><ThemeToggle /></div><div className="mx-auto my-auto w-full max-w-md py-12"><div className="mb-8 lg:hidden"><Brand /></div><h1 className="text-3xl font-bold tracking-tight">{title}</h1><p className="mt-2 text-muted-foreground">{description}</p>{children}</div></section></main>;
}
