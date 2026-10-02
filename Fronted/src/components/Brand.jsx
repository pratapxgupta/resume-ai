import { Sparkles } from "lucide-react";
import { Link } from "react-router";
export function Brand() { return <Link to="/" className="inline-flex items-center gap-2 font-bold tracking-tight"><span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground"><Sparkles className="size-5" /></span><span className="text-lg">Interview<span className="text-primary">AI</span></span></Link>; }
