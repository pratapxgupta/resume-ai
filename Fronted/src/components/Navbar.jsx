import { LayoutDashboard, Menu } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Brand } from "./Brand";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#use-cases", label: "Who it helps" },
];

export function Navbar() {
  const { user, sessionInitialized } = useAuth();

  const accountActions = user ? (
    <>
      <span className="px-2 text-sm text-muted-foreground">
        {user.username}
      </span>
      <Button asChild>
        <Link to="/app">
          <LayoutDashboard className="size-4" />
          Dashboard
        </Link>
      </Button>
    </>
  ) : (
    <>
      <Button variant="ghost" asChild>
        <Link to="/login">Log in</Link>
      </Button>
      <Button asChild>
        <Link to="/register">Get started</Link>
      </Button>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6"
      >
        <Brand />
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              className="text-sm text-muted-foreground hover:text-foreground"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden min-w-56 items-center justify-end gap-2 md:flex">
          <ThemeToggle />
          {sessionInitialized && accountActions}
        </div>
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="mb-8 text-lg font-semibold">
                Navigation
              </SheetTitle>
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <a
                      className="rounded-lg px-3 py-3 font-medium hover:bg-accent"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
                {sessionInitialized && (
                  <>
                    <div className="my-3 h-px bg-border" />
                    {user && (
                      <p className="px-3 pb-1 text-sm text-muted-foreground">
                        Signed in as {user.username}
                      </p>
                    )}
                    <div className="flex flex-col gap-2">{accountActions}</div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
