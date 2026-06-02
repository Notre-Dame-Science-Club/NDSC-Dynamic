"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    label: "Activities",
    children: [
      { href: "/activities?tab=events", label: "Events" },
      { href: "/activities?tab=workshops", label: "Workshops" },
      { href: "/activities?tab=podcast", label: "Podcast" },
      { href: "/activities?tab=science-sunday", label: "Science Sunday" },
      { href: "/activities?tab=stem-insights", label: "STEM Insights" },
      { href: "/activities?tab=projects", label: "Projects" },
      { href: "/activities?tab=awards", label: "Awards" },
    ],
  },
  { href: "/publication", label: "Publication" },
  { href: "/executives", label: "Executives" },
  { href: "/olympiad", label: "Olympiad" },
  { href: "/members", label: "Members" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [actOpen, setActOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActOpen(false);
  }, [pathname]);

  // prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(2,8,16,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 z-10">
            <Image src="/images/cropped-logo.png" alt="NDSC" width={36} height={36} className="object-contain" />
            <div className="hidden sm:block leading-none">
              <p className="text-xs font-black tracking-widest" style={{ fontFamily: "'Orbitron',sans-serif", color: "var(--blue)" }}>NDSC</p>
              <p className="text-[9px] tracking-wide mt-0.5" style={{ color: "var(--muted)" }}>Notre Dame Science Club</p>
            </div>
          </Link>

          {/* Desktop */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {NAV.map((item) =>
              item.children ? (
                <div key="activities" className="relative group">
                  <button className="flex items-center gap-1 text-sm font-medium transition-colors group-hover:text-[var(--blue)]"
                    style={{ color: "var(--muted)" }}>
                    {item.label} <ChevronDown size={13} className="transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-xl border py-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50"
                    style={{ background: "rgba(5,13,26,0.98)", borderColor: "var(--border)", backdropFilter: "blur(20px)" }}>
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-l border-t" style={{ background: "rgba(5,13,26,0.98)", borderColor: "var(--border)" }} />
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition-all hover:text-[var(--blue)] hover:pl-5"
                        style={{ color: "var(--muted)" }}>
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "var(--blue)" }} />
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href!}
                  className="relative text-sm font-medium transition-colors group"
                  style={{ color: pathname === item.href ? "var(--blue)" : "var(--muted)" }}>
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px transition-all duration-300 w-0 group-hover:w-full" style={{ background: "var(--blue)" }} />
                </Link>
              )
            )}
            <Link href="/members/login"
              className="px-4 py-2 text-xs font-black tracking-widest rounded-lg border transition-all duration-200 hover:bg-[var(--blue)] hover:text-black hover:border-[var(--blue)]"
              style={{ borderColor: "var(--blue)", color: "var(--blue)", fontFamily: "'Orbitron',sans-serif" }}>
              Login
            </Link>
          </nav>

          {/* Hamburger */}
          <button className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border z-10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ borderColor: "var(--border)", background: mobileOpen ? "var(--blue)" : "transparent" }}
            aria-label="Toggle menu">
            {mobileOpen
              ? <X size={20} color="#000" />
              : <Menu size={20} style={{ color: "var(--blue)" }} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-40 lg:hidden flex flex-col transition-all duration-300"
        style={{
          background: "rgba(2,8,16,0.99)",
          backdropFilter: "blur(20px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "all" : "none",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        }}>
        {/* Mobile header */}
        <div className="flex items-center justify-between px-5 py-4 border-b shrink-0" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3">
            <Image src="/images/cropped-logo.png" alt="NDSC" width={32} height={32} />
            <span className="text-sm font-black tracking-widest" style={{ fontFamily: "'Orbitron',sans-serif", color: "var(--blue)" }}>NDSC</span>
          </div>
          <button onClick={() => setMobileOpen(false)} className="p-1"><X size={22} style={{ color: "var(--muted)" }} /></button>
        </div>
        {/* Mobile links */}
        <nav className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-1">
          {NAV.map((item) =>
            item.children ? (
              <div key="activities">
                <button onClick={() => setActOpen(!actOpen)}
                  className="w-full flex items-center justify-between py-3 text-base font-bold border-b transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--white)", fontFamily: "'Orbitron',sans-serif" }}>
                  Activities
                  <ChevronDown size={16} style={{ color: "var(--muted)", transform: actOpen ? "rotate(180deg)" : "", transition: "transform .2s" }} />
                </button>
                {actOpen && (
                  <div className="pl-4 mt-1 mb-2 flex flex-col gap-1">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href}
                        className="py-2 text-sm transition-colors hover:text-[var(--blue)]"
                        style={{ color: "var(--muted)" }}>
                        → {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.href} href={item.href!}
                className="py-3 text-base font-bold border-b transition-colors hover:text-[var(--blue)]"
                style={{ borderColor: "var(--border)", color: pathname === item.href ? "var(--blue)" : "var(--white)", fontFamily: "'Orbitron',sans-serif" }}>
                {item.label}
              </Link>
            )
          )}
          <Link href="/members/login"
            className="mt-5 py-4 text-center font-black tracking-widest rounded-xl border text-sm"
            style={{ borderColor: "var(--blue)", color: "var(--blue)", fontFamily: "'Orbitron',sans-serif" }}>
            MEMBER LOGIN
          </Link>
        </nav>
      </div>
    </>
  );
}
