"use client";
import { useState } from "react";
import Image from "next/image";
import { PANELS, type Member } from "@/lib/executives-data";

const SOCIAL_ICONS = {
  facebook: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  instagram: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  linkedin: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  telegram: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-8.609 3.33c-2.068.8-4.133 1.598-5.724 2.21a405.15 405.15 0 0 1-2.849 1.09c-.42.147-.99.332-1.473.901-.728.968.193 1.798.919 2.286 1.61.516 3.275 1.009 4.654 1.420l1.59 4.985c.071.278.327.55.573.6.246.05.578-.07.79-.29l3.003-2.985 5.073 3.969c.922.684 2.248.221 2.537-.932l3.719-16.29c.248-1.048-.492-2.050-1.681-2.310zM17.048 7.48l-7.558 7.07-1.107 3.466-1.108-3.465-2.943-.904 13.026-5.027-.31-1.14z"/></svg>,
  whatsapp: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
  email: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
};

// Priority order for display
const PRIORITY = ["General Secretary","Associate General Secretary","Assistant General Secretary","Senior Vice President","President","Vice President"];

function sortMembers(members: Member[]) {
  return [...members].sort((a, b) => {
    const ai = PRIORITY.findIndex(p => a.position.includes(p));
    const bi = PRIORITY.findIndex(p => b.position.includes(p));
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

function MemberCard({ m, folder, onClick }: { m: Member; folder: string; onClick: () => void }) {
  const imgSrc = m.image ? `/${folder}/${m.image}` : null;
  const isTop = ["General Secretary","Associate General Secretary","Senior Vice President"].some(p => m.position.includes(p));

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-xl border p-4 text-center transition-all hover:border-[var(--blue)] hover:-translate-y-1"
      style={{
        borderColor: isTop ? "rgba(0,212,255,0.4)" : "var(--border)",
        background: isTop ? "rgba(0,212,255,0.05)" : "var(--card)",
      }}
    >
      <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 transition-all group-hover:border-[var(--blue)]"
        style={{ borderColor: isTop ? "var(--blue)" : "var(--border)" }}>
        {imgSrc ? (
          <Image src={imgSrc} alt={m.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-black"
            style={{ background: "var(--bg2)", color: "var(--blue)" }}>
            {m.name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="text-xs font-bold leading-tight mb-1 group-hover:text-[var(--blue)] transition-colors"
        style={{ fontFamily: "'Orbitron', sans-serif" }}>
        {m.name}
      </h3>
      <p className="text-xs" style={{ color: "var(--blue)" }}>{m.position}</p>
      {m.department && <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{m.department}</p>}
    </div>
  );
}

function MemberModal({ m, folder, onClose }: { m: Member; folder: string; onClose: () => void }) {
  const imgSrc = m.image ? `/${folder}/${m.image}` : null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)" }} onClick={onClose}>
      <div className="relative w-full max-w-sm rounded-2xl border p-8 text-center"
        style={{ borderColor: "var(--blue)", background: "var(--bg2)" }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-sm font-bold" style={{ color: "var(--muted)" }}>✕</button>
        <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-2" style={{ borderColor: "var(--blue)" }}>
          {imgSrc ? (
            <Image src={imgSrc} alt={m.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl font-black" style={{ background: "var(--bg)", color: "var(--blue)" }}>
              {m.name.charAt(0)}
            </div>
          )}
        </div>
        <h3 className="font-black text-base mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>{m.name}</h3>
        <p className="text-sm font-bold mb-1" style={{ color: "var(--blue)" }}>{m.position}</p>
        {m.department && <p className="text-xs mb-3 px-3 py-1 rounded-full inline-block" style={{ background: "rgba(0,212,255,0.1)", color: "var(--muted)" }}>{m.department}</p>}
        {m.bio && <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--muted)" }}>{m.bio}</p>}
        {m.social && Object.keys(m.social).filter(k => (m.social as Record<string,string|undefined>)[k]).length > 0 && (
          <div className="flex gap-3 justify-center flex-wrap">
            {Object.entries(m.social).filter(([,v]) => v).map(([platform, url]) => (
              <a key={platform} href={url as string} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded border transition-all hover:border-[var(--blue)] hover:text-[var(--blue)]"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
                {SOCIAL_ICONS[platform as keyof typeof SOCIAL_ICONS] || platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExecutivesPage() {
  const [panelIdx, setPanelIdx] = useState(0);
  const [selected, setSelected] = useState<Member | null>(null);
  const [search, setSearch] = useState("");
  const panel = PANELS[panelIdx];
  const sorted = sortMembers(panel.members);
  const filtered = search ? sorted.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.position.toLowerCase().includes(search.toLowerCase())) : sorted;

  return (
    <div className="min-h-screen relative z-10" style={{ paddingTop: "72px" }}>
      {selected && <MemberModal m={selected} folder={panel.folder} onClose={() => setSelected(null)} />}

      {/* Hero */}
      <div className="py-16 text-center border-b" style={{ background: "linear-gradient(180deg, var(--bg2), var(--bg))", borderColor: "var(--border)" }}>
        <div className="section-label justify-center mb-2">Leadership</div>
        <h1 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          EXECUTIVE <span style={{ color: "var(--blue)" }}>PANEL</span>
        </h1>
        <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>{PANELS.length} panels from 1978 to present</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Year scroller */}
        <div className="overflow-x-auto pb-3 mb-8">
          <div className="flex gap-2 min-w-max">
            {PANELS.map((p, i) => (
              <button key={p.label} onClick={() => { setPanelIdx(i); setSearch(""); }}
                className="px-4 py-2 text-xs font-bold tracking-wider rounded border transition-all whitespace-nowrap"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  background: panelIdx === i ? "var(--blue)" : "transparent",
                  color: panelIdx === i ? "#000" : "var(--muted)",
                  borderColor: panelIdx === i ? "var(--blue)" : "var(--border)",
                }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Panel header + search */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Panel <span style={{ color: "var(--blue)" }}>{panel.label}</span>
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{panel.members.length} members</p>
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search member..."
            className="px-4 py-2 rounded-lg text-sm outline-none"
            style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--white)", minWidth: 200 }}
            onFocus={e => (e.target.style.borderColor = "var(--blue)")}
            onBlur={e => (e.target.style.borderColor = "var(--border)")}
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center py-20" style={{ color: "var(--muted)" }}>No members found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((m, i) => (
              <MemberCard key={m.name + i} m={m} folder={panel.folder} onClick={() => setSelected(m)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
