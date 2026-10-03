import { History, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Brand } from "./Brand";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

export function AppHeader({ onOpenSidebar }) {
  const navigate = useNavigate();
  const { user, loading, handleLogout } = useAuth();
  const logout = async () => { await handleLogout(); navigate("/"); };
  return <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl"><div className="mx-auto flex h-16 max-w-[100rem] items-center justify-between px-4 sm:px-6"><div className="flex items-center gap-2"><Button type="button" variant="ghost" size="icon" className="lg:hidden" onClick={onOpenSidebar} aria-label="Open previous reports"><History className="size-5" /></Button><Brand /></div><div className="flex items-center gap-1 sm:gap-2">{user?.username && <span className="mr-2 hidden text-sm text-muted-foreground sm:inline">{user.username}</span>}<ThemeToggle /><Button type="button" variant="ghost" size="sm" onClick={logout} disabled={loading}><LogOut className="size-4" /><span className="hidden sm:inline">Log out</span></Button></div></div></header>;
}
