import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/assessment", label: "Assessment" },
  { to: "/results", label: "Results" },
  // { to: "/market-signals", label: "Market Signals" },
  // { to: "/courses", label: "Courses" },
  { to: "/workshops", label: "Workshops" },
  { to: "/counseling", label: "Counseling" },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center h-9 w-9 rounded-xl text-primary-foreground transition-transform duration-300 group-hover:scale-110">
            {/* <GraduationCap className="h-5 w-5" /> */}
            <img src="/RAL-Logo-Mark-120x120.webp" alt="Logo" height={36} width={36} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground leading-tight">Career Probability</span>
            <span className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-semibold text-primary tracking-widest uppercase leading-tight">Score</span>
              <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded-md text-[8px] font-bold tracking-widest uppercase leading-none">Beta</span>
            </span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${pathname === l.to
                ? "text-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
            >
              {l.label}
              {pathname === l.to && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-x-2 -bottom-[13px] h-[2.5px] rounded-full gradient-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-1">
          <Link to="/college-login">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
              College Login
            </Button>
          </Link>
          <Link to="/admin">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
              Admin
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground p-2 rounded-lg hover:bg-muted/50 transition-colors" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/50 bg-background"
          >
            <div className="flex flex-col p-4 gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${pathname === l.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/college-login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground">
                College Login
              </Link>
              <Link to="/admin" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground">
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
