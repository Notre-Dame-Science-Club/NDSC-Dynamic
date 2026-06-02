"use client";
import { useState } from "react";
import Image from "next/image";
import { BookOpen, ChevronLeft, ChevronRight, X } from "lucide-react";

const TOTAL_PAGES = 97;
const MAX_SPREAD = Math.floor(TOTAL_PAGES / 2);

const topics = ["Quantum Entanglement", "Time Travel", "CRISPR 3.0", "Neural Networks", "Exoplanet Atmospheres", "Dark Matter"];

export default function PublicationPage() {
  const [spread, setSpread] = useState(0);
  const [flipbookOpen, setFlipbookOpen] = useState(false);

  const getPages = (s: number) => {
    if (s === 0) return { left: null, right: 1 };
    const l = s * 2;
    const r = l + 1;
    return { left: l <= TOTAL_PAGES ? l : null, right: r <= TOTAL_PAGES ? r : null };
  };

  const pages = getPages(spread);

  return (
    <div className="min-h-screen relative z-10" style={{ paddingTop: "72px" }}>

      {/* Flipbook Modal */}
      {flipbookOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.95)" }}
        >
          <button
            onClick={() => setFlipbookOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full border"
            style={{ borderColor: "var(--blue)", color: "var(--blue)" }}
          >
            <X size={20} />
          </button>

          <p className="text-xs mb-4" style={{ color: "var(--muted)", fontFamily: "'Share Tech Mono', monospace" }}>
            Page {pages.left ?? 1} — {TOTAL_PAGES} | Spread {spread}/{MAX_SPREAD}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => spread > 0 && setSpread(spread - 1)}
              disabled={spread <= 0}
              className="p-3 rounded-full border transition-all disabled:opacity-30"
              style={{ borderColor: "var(--blue)", color: "var(--blue)" }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Book */}
            <div
              className="flex rounded-lg overflow-hidden border shadow-2xl"
              style={{ borderColor: "var(--border)", width: "min(700px, 90vw)", height: "min(500px, 70vh)" }}
            >
              {/* Left page */}
              <div
                className="flex-1 flex items-center justify-center border-r"
                style={{ background: "#f5f0e8", borderColor: "var(--border)" }}
              >
                {pages.left ? (
                  <Image
                    src={`/pages/${pages.left}.png`}
                    alt={`Page ${pages.left}`}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 opacity-30">
                    <BookOpen size={40} style={{ color: "#000" }} />
                    <p className="text-xs text-black">Cover</p>
                  </div>
                )}
              </div>
              {/* Right page */}
              <div
                className="flex-1 flex items-center justify-center"
                style={{ background: "#f5f0e8" }}
              >
                {pages.right ? (
                  <Image
                    src={`/pages/${pages.right}.png`}
                    alt={`Page ${pages.right}`}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 opacity-30">
                    <BookOpen size={40} style={{ color: "#000" }} />
                    <p className="text-xs text-black">End</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => spread < MAX_SPREAD && setSpread(spread + 1)}
              disabled={spread >= MAX_SPREAD}
              className="p-3 rounded-full border transition-all disabled:opacity-30"
              style={{ borderColor: "var(--blue)", color: "var(--blue)" }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <p className="mt-4 text-xs" style={{ color: "var(--muted)" }}>
            Use arrow keys or click buttons to navigate
          </p>
        </div>
      )}

      {/* Hero */}
      <section
        className="py-24 border-b"
        style={{ background: "linear-gradient(180deg, var(--bg2), var(--bg))", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          {/* Cover */}
          <div className="shrink-0 relative cursor-pointer group" onClick={() => setFlipbookOpen(true)}>
            <div
              className="relative rounded-xl overflow-hidden shadow-2xl"
              style={{ width: 240, height: 320 }}
            >
              <Image
                src="/images/Audri-24.jpeg"
                alt="AUDRI Magazine"
                fill
                className="object-cover"
                style={{ filter: "drop-shadow(0 0 40px var(--glow))" }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(0,0,0,0.6)" }}
              >
                <span
                  className="text-xs font-bold tracking-widest px-4 py-2 rounded border"
                  style={{ borderColor: "var(--blue)", color: "var(--blue)", fontFamily: "'Orbitron', sans-serif" }}
                >
                  READ →
                </span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="section-label mb-2">Annual Publication</div>
            <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              অদ্রি <span style={{ color: "var(--blue)" }}>(AUDRI)</span>
            </h1>
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--muted)" }}>AUDRI 2023–2024</h2>
            <p className="text-sm leading-relaxed mb-6 max-w-lg" style={{ color: "var(--muted)" }}>
              Audri, the annual science publication of Notre Dame Science Club, is a vibrant reflection
              of curiosity, passion, and intellectual spirit. It serves as a platform where research,
              analysis, and innovative ideas extend beyond the classroom.
            </p>

            {/* Topics */}
            <div className="flex flex-wrap gap-2 mb-8">
              {topics.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs rounded-full border"
                  style={{ borderColor: "var(--border)", color: "var(--blue)", background: "#00d4ff11" }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setFlipbookOpen(true)}
                className="flex items-center gap-2 px-6 py-3 font-black text-sm tracking-widest rounded"
                style={{ background: "var(--blue)", color: "#000", fontFamily: "'Orbitron', sans-serif" }}
              >
                <BookOpen size={16} /> READ ONLINE
              </button>
              <a
                href="/pages/audri-2024.pdf"
                download
                className="flex items-center gap-2 px-6 py-3 font-black text-sm tracking-widest rounded border"
                style={{ borderColor: "var(--blue)", color: "var(--blue)", fontFamily: "'Orbitron', sans-serif" }}
              >
                ↓ DOWNLOAD
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Past Issues */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label mb-2">Archive</div>
          <h2 className="text-3xl font-black mb-10" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            PAST <span style={{ color: "var(--blue)" }}>ISSUES</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["2022–2023", "2021–2022", "2020–2021", "2019–2020"].map((year) => (
              <div
                key={year}
                className="rounded-xl border overflow-hidden p-6 text-center transition-all hover:border-[var(--blue)] hover:-translate-y-1 cursor-pointer"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                <div
                  className="w-16 h-20 rounded mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "#00d4ff11", border: "1px solid var(--border)" }}
                >
                  <BookOpen size={24} style={{ color: "var(--blue)" }} />
                </div>
                <p className="text-xs font-bold tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", color: "var(--blue)" }}>AUDRI</p>
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
