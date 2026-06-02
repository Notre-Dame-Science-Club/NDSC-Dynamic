"use client";
import { useState } from "react";
import { Upload, Plus, Image as ImgIcon, FileText, Video, Calendar, Beaker, Mic, BookMarked, BookOpen, Folder, LogOut } from "lucide-react";

const SECTIONS = [
  { id: "events",         label: "Events",          icon: Calendar,    color: "#00d4ff" },
  { id: "workshops",      label: "Workshops",        icon: Beaker,      color: "#34d399" },
  { id: "podcast",        label: "Podcast",          icon: Mic,         color: "#a78bfa" },
  { id: "science-sunday", label: "Science Sunday",   icon: BookMarked,  color: "#f59e0b" },
  { id: "stem-insights",  label: "STEM Insights PDF",icon: BookOpen,    color: "#f87171" },
  { id: "projects",       label: "Projects",         icon: Folder,      color: "#fb923c" },
  { id: "articles",       label: "Articles",         icon: FileText,    color: "#60a5fa" },
];

type FormState = Record<string, string>;

const FIELDS: Record<string, { label:string; type:string; name:string; required?:boolean }[]> = {
  events: [
    { label:"Event Title", type:"text", name:"title", required:true },
    { label:"Description", type:"textarea", name:"desc" },
    { label:"Event Date", type:"date", name:"date" },
    { label:"Facebook Event Link", type:"url", name:"href", required:true },
    { label:"Cover Image", type:"file", name:"img" },
  ],
  workshops: [
    { label:"Workshop Title", type:"text", name:"title", required:true },
    { label:"Description", type:"textarea", name:"desc" },
    { label:"Date", type:"date", name:"date" },
    { label:"Facebook Post Link", type:"url", name:"href", required:true },
    { label:"Cover Image", type:"file", name:"img" },
  ],
  podcast: [
    { label:"Episode Title", type:"text", name:"title", required:true },
    { label:"YouTube Video ID (e.g. CXvLpiRFWqg)", type:"text", name:"youtubeId", required:true },
    { label:"Date", type:"date", name:"date" },
  ],
  "science-sunday": [
    { label:"Week Number (e.g. Week 25)", type:"text", name:"week", required:true },
    { label:"Article Title", type:"text", name:"title", required:true },
    { label:"Facebook Post Link", type:"url", name:"fbLink", required:true },
    { label:"Date", type:"date", name:"date" },
  ],
  "stem-insights": [
    { label:"Issue Title (e.g. STEM Insights Vol. 6)", type:"text", name:"title", required:true },
    { label:"Description", type:"text", name:"desc" },
    { label:"PDF File", type:"file", name:"pdfUrl" },
    { label:"Cover Image", type:"file", name:"cover" },
  ],
  projects: [
    { label:"Project Title", type:"text", name:"title", required:true },
    { label:"Year", type:"text", name:"year", required:true },
    { label:"Department", type:"text", name:"dept" },
    { label:"Type (e.g. Robotics, AI)", type:"text", name:"type" },
    { label:"Description", type:"textarea", name:"desc" },
    { label:"YouTube Video ID (optional)", type:"text", name:"videoUrl" },
    { label:"Facebook Link", type:"url", name:"fbLink" },
    { label:"Cover Image", type:"file", name:"img" },
  ],
  articles: [
    { label:"Article Title", type:"text", name:"title", required:true },
    { label:"Author", type:"text", name:"author" },
    { label:"Category", type:"text", name:"category" },
    { label:"Content / Summary", type:"textarea", name:"content" },
    { label:"Facebook Link", type:"url", name:"href" },
    { label:"PDF File (optional)", type:"file", name:"pdfUrl" },
    { label:"Cover Image", type:"file", name:"img" },
  ],
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [activeSection, setActiveSection] = useState("events");
  const [form, setForm] = useState<FormState>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check — replace with proper auth later
    if (pw === "ndsc@admin2025") setAuthed(true);
    else alert("Wrong password");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: connect to Supabase / API
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    setForm({});
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (!authed) return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10" style={{paddingTop:"64px"}}>
      <div className="w-full max-w-sm rounded-2xl border p-8" style={{borderColor:"var(--border)",background:"var(--card)"}}>
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🔐</div>
          <h1 className="text-xl font-black tracking-widest" style={{fontFamily:"'Orbitron',sans-serif",color:"var(--blue)"}}>ADMIN PANEL</h1>
          <p className="text-xs mt-1" style={{color:"var(--muted)"}}>Notre Dame Science Club</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="password" value={pw} onChange={e=>setPw(e.target.value)}
            placeholder="Admin password" required
            className="w-full px-4 py-3 rounded-lg text-sm outline-none"
            style={{background:"var(--bg)",border:"1px solid var(--border)",color:"var(--white)"}}
            onFocus={e=>(e.target.style.borderColor="var(--blue)")}
            onBlur={e=>(e.target.style.borderColor="var(--border)")} />
          <button type="submit" className="w-full py-3 font-black text-sm tracking-widest rounded-lg"
            style={{background:"var(--blue)",color:"#000",fontFamily:"'Orbitron',sans-serif"}}>
            ENTER
          </button>
        </form>
      </div>
    </div>
  );

  const fields = FIELDS[activeSection] || [];
  const sectionInfo = SECTIONS.find(s=>s.id===activeSection)!;

  return (
    <div className="min-h-screen relative z-10" style={{paddingTop:"64px"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-6">

        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="rounded-xl border p-4 sticky top-24" style={{borderColor:"var(--border)",background:"var(--card)"}}>
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs font-black tracking-widest" style={{fontFamily:"'Orbitron',sans-serif",color:"var(--blue)"}}>ADMIN PANEL</p>
              <button onClick={()=>setAuthed(false)} className="p-1 rounded transition-colors hover:text-[var(--blue)]" style={{color:"var(--muted)"}}><LogOut size={14}/></button>
            </div>
            <div className="flex flex-col gap-1">
              {SECTIONS.map(s=>(
                <button key={s.id} onClick={()=>{setActiveSection(s.id);setForm({});setSubmitted(false);}}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-bold tracking-wide transition-all"
                  style={{
                    background: activeSection===s.id ? `${s.color}22` : "transparent",
                    color: activeSection===s.id ? s.color : "var(--muted)",
                    border: activeSection===s.id ? `1px solid ${s.color}44` : "1px solid transparent",
                  }}>
                  <s.icon size={14} /> {s.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main form */}
        <main className="flex-1">
          <div className="rounded-xl border p-6 sm:p-8" style={{borderColor:"var(--border)",background:"var(--card)"}}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{background:`${sectionInfo.color}22`,border:`1px solid ${sectionInfo.color}44`}}>
                <sectionInfo.icon size={18} style={{color:sectionInfo.color}} />
              </div>
              <div>
                <h2 className="text-base font-black tracking-wider" style={{fontFamily:"'Orbitron',sans-serif",color:sectionInfo.color}}>Add {sectionInfo.label}</h2>
                <p className="text-xs" style={{color:"var(--muted)"}}>Fill in the details below and submit</p>
              </div>
            </div>

            {submitted && (
              <div className="mb-5 p-4 rounded-lg border text-sm font-bold" style={{borderColor:"#34d399",background:"#34d39911",color:"#34d399"}}>
                ✓ Successfully added! Changes will appear after next deployment.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {fields.map(f=>(
                <div key={f.name}>
                  <label className="block text-xs font-bold tracking-wider mb-2 uppercase" style={{fontFamily:"'Share Tech Mono',monospace",color:"var(--muted)"}}>
                    {f.label} {f.required && <span style={{color:"var(--blue)"}}>*</span>}
                  </label>
                  {f.type==="textarea" ? (
                    <textarea rows={4} value={form[f.name]||""} onChange={e=>setForm({...form,[f.name]:e.target.value})}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none"
                      style={{background:"var(--bg)",border:"1px solid var(--border)",color:"var(--white)"}}
                      onFocus={e=>(e.target.style.borderColor=sectionInfo.color)}
                      onBlur={e=>(e.target.style.borderColor="var(--border)")} />
                  ) : f.type==="file" ? (
                    <div className="relative">
                      <input type="file" accept={f.name.includes("pdf")||f.name==="pdfUrl"?".pdf":"image/*"}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
                        onChange={e=>setForm({...form,[f.name]:e.target.files?.[0]?.name||""})} />
                      <div className="flex items-center gap-3 px-4 py-3 rounded-lg border" style={{background:"var(--bg)",borderColor:"var(--border)",borderStyle:"dashed"}}>
                        {f.name.includes("pdf") ? <FileText size={16} style={{color:"var(--blue)"}} /> : <ImgIcon size={16} style={{color:"var(--blue)"}} />}
                        <span className="text-sm" style={{color:form[f.name]?"var(--white)":"var(--muted)"}}>
                          {form[f.name]||`Click to upload ${f.name.includes("pdf")?"PDF":"image"}`}
                        </span>
                        <Upload size={14} className="ml-auto" style={{color:"var(--muted)"}} />
                      </div>
                    </div>
                  ) : (
                    <input type={f.type} value={form[f.name]||""} onChange={e=>setForm({...form,[f.name]:e.target.value})}
                      required={f.required}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                      style={{background:"var(--bg)",border:"1px solid var(--border)",color:"var(--white)"}}
                      onFocus={e=>(e.target.style.borderColor=sectionInfo.color)}
                      onBlur={e=>(e.target.style.borderColor="var(--border)")} />
                  )}
                </div>
              ))}

              <button type="submit" disabled={loading}
                className="flex items-center gap-2 px-6 py-3 font-black text-sm tracking-widest rounded-xl transition-all hover:opacity-90"
                style={{background:loading?"var(--muted)":sectionInfo.color,color:"#000",fontFamily:"'Orbitron',sans-serif",cursor:loading?"not-allowed":"pointer"}}>
                <Plus size={16} />
                {loading ? "SAVING..." : `ADD ${sectionInfo.label.toUpperCase()}`}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
