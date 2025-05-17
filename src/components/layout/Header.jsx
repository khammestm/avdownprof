
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { DownloadCloud, Menu, X, Library, Users, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Downloader" },
  { to: "/library", label: "Library", icon: Library },
  { to: "/community", label: "Community", icon: Users },
  { to: "/about", label: "About", icon: Info },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/50"
    >
      <div className="container flex h-16 max-w-screen-lg items-center justify-between">
        <Link to="/" className="flex items-center space-x-2.5">
          <DownloadCloud className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl text-foreground tracking-tight">AVDown.pro</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-5 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "transition-colors hover:text-primary duration-200",
                  isActive ? "text-primary" : "text-muted-foreground"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border/60 bg-background/95"
        >
          <nav className="flex flex-col space-y-1 p-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-3 rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                  )
                }
              >
                {link.icon && <link.icon className="h-5 w-5" />}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
