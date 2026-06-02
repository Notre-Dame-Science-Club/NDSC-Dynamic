"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Play, Users, Trophy, BookOpen, Quote } from "lucide-react";

/* ─── Star canvas ────────────────────────────────────────────── */
function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let id: number;
    const stars: { x:number; y:number; r:number; s:number; o:number }[] = [];
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    for (let i = 0; i < 200; i++)
      stars.push({ x: Math.random()*c.width, y: Math.random()*c.height, r: Math.random()*1.6+.2, s: Math.random()*.35+.05, o: Math.random()*.8+.2 });
    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height);
      for (const s of stars) {
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,212,255,${s.o})`; ctx.fill();
        s.y-=s.s; if(s.y<0){s.y=c.height;s.x=Math.random()*c.width;}
      }
      id=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{cancelAnimationFrame(id);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-0" />;
}

/* ─── Scroll reveal hook ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "-40px" }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Data ───────────────────────────────────────────────────── */
const STATS = [
  { num: "70+",   label: "Years of Legacy" },
  { num: "5000+", label: "Members" },
  { num: "100+",  label: "Events Hosted" },
  { num: "1st",   label: "Science Club in S. Asia" },
];

const DEPTS = [
  { name: "Administration", icon: "/images/admininstration-icon.png", short: "Administ.", color: "#00d4ff",
    desc: "Ensures smooth operation and management of club activities. Coordinates planning, logistics and execution of events." },
  { name: "Project",        icon: "/images/project.png",              short: "Project",  color: "#34d399",
    desc: "Conducts scientific research and innovation-based projects. Encourages experimentation and analytical development." },
  { name: "Publication",    icon: "/images/publication.png",          short: "Pub.",     color: "#a78bfa",
    desc: "Handles graphics, publishes wall magazines, journals and annual publications (AUDRI). Promotes scientific writing." },
  { name: "ICT",            icon: "/images/ict.png",                  short: "ICT",      color: "#f87171",
    desc: "Handles digital media, website management and tech support. Maintains digital infrastructure of the club." },
  { name: "LWS",            icon: "/images/lws.png",                  short: "LWS",      color: "#f59e0b",
    desc: "Life & Welfare Science — biology, environment and health oriented activities and awareness programs." },
  { name: "Quiz",           icon: "/images/cropped-logo.png",         short: "Quiz",     color: "#60a5fa",
    desc: "Hosts Q-League, BrainRain, Scienceophile. NDC Blue, NDC Green & NDC Gold — NDSC's prestigious quiz teams." },
  { name: "R&D",            icon: "/images/cropped-logo.png",         short: "R&D",      color: "#fb923c",
    desc: "Research and Development — drives olympiad preparation, seminars, and student-led scientific innovation." },
];

const EVENTS = [
  { title: "AIUB Campus Tour & Workshop on Robotics", img: "/images/001.jpg", date: "10 March 2026", href: "https://www.facebook.com/share/p/1CHJxskgfQ/" },
  { title: "Notre Dame Annual Science Festival 2024 & 34th GKC", img: "/images/011.jpg", date: "2024", href: "https://www.facebook.com/share/p/18CNrgv5M6/" },
  { title: "70th Anniversary Celebration", img: "/images/012.jpg", date: "2024", href: "https://www.facebook.com/share/p/18Mn2w5GZL/" },
];

const QUOTES = [
  {
    role: "General Secretary",
    name: "Fahim Faisal Arnob",
    image: "/images/panel-26/gs.jpg",
    panel: "2025–2026",
    short: "NDSC is more than a club — it is a community of dreamers, doers, and future scientists.",
    full: "Notre Dame Science Club has always been more than just a club — it is a family, a community of dreamers and doers. As your General Secretary, I am committed to taking NDSC to new heights, fostering innovation, scientific thinking, and brotherhood among our members. Together, we will uphold our 70-year legacy and write new chapters of excellence. Science is not confined to textbooks; it lives in every experiment we conduct, every question we ask, and every problem we dare to solve. I invite every student of Notre Dame College to be part of this magnificent journey.",
    link: "/executives",
  },
  {
    role: "Faculty Moderator",
    name: "Notre Dame Science Club",
    image: "/images/cropped-logo.png",
    panel: "Moderator, NDSC",
    short: "'Science in Human Welfare' — a motto as vital today as it was when Fr. Timm founded this club in 1955.",
    full: "Notre Dame Science Club, since its founding in 1955 by the eminent scientist Fr. Richard William Timm, C.S.C., has exemplified the spirit of scientific curiosity and service to humanity. The club's motto — 'Science in Human Welfare' — is not merely a slogan but a living commitment that guides every activity, publication, and event we organize. I am proud to guide this generation of science enthusiasts as they carry forward a 70-year legacy of excellence, innovation, and national pride. NDSC remains a beacon for scientific inspiration in Bangladesh and beyond.",
    link: "/about",
  },
];

const VIDEOS = [
  { id: "CXvLpiRFWqg", title: "NDSC Feature" },
  { id: "CXvLpiRFWqg", title: "Science & Society" },
  { id: "CXvLpiRFWqg", title: "Holographic Universe" },
];

/* ─── Sub-components ─────────────────────────────────────────── */
function Marquee() {
  return (
    <div className="w-full overflow-hidden py-3.5" style={{ background: "var(--blue)" }}>
      <div className="marquee-track">
        {Array(16).fill("✦ LEGACY OF 70 YEARS").map((t,i)=>(
          <span key={i} className="mx-8 font-black text-sm tracking-[.3em] whitespace-nowrap text-black" style={{fontFamily:"'Orbitron',sans-serif"}}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function DeptModal({ dept, onClose }: { dept: typeof DEPTS[0]; onClose: ()=>void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:"rgba(0,0,0,.85)"}} onClick={onClose}>
      <div className="relative w-full max-w-sm rounded-2xl border p-8 text-center" style={{borderColor:dept.color,background:"var(--bg2)"}} onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-xs font-bold" style={{color:"var(--muted)"}}>✕</button>
        <div className="w-20 h-20 mx-auto mb-4 relative"><Image src={dept.icon} alt={dept.name} fill className="object-contain" style={{filter:`drop-shadow(0 0 12px ${dept.color})`}} /></div>
        <h3 className="text-xl font-black mb-3" style={{color:dept.color}}>{dept.name}</h3>
        <p className="text-sm leading-relaxed" style={{color:"var(--muted)"}}>{dept.desc}</p>
        <Link href="/about#departments" onClick={onClose} className="inline-block mt-5 px-5 py-2 rounded-lg text-xs font-black tracking-widest border" style={{borderColor:dept.color,color:dept.color}}>
          Learn More →
        </Link>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function HomePage() {
  useReveal();
  const [activeVideo, setActiveVideo] = useState(0);
  const [activeQuote, setActiveQuote] = useState(0);
  const [deptModal, setDeptModal] = useState<typeof DEPTS[0]|null>(null);

  return (
    <>
      <StarField />
      {deptModal && <DeptModal dept={deptModal} onClose={()=>setDeptModal(null)} />}

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center z-10" style={{paddingTop:"64px"}}>
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" style={{maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)"}} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs tracking-widest animate-fade-up"
              style={{fontFamily:"'Share Tech Mono',monospace",borderColor:"var(--blue)",color:"var(--blue)",background:"#00d4ff0d"}}>
              <span className="w-2 h-2 rounded-full" style={{background:"var(--blue)",animation:"pulse 1.5s infinite"}} />
              FOUNDED 1955 · DHAKA, BANGLADESH
            </div>
            <h1 className="font-black leading-tight animate-fade-up delay-200" style={{fontFamily:"'Orbitron',sans-serif",fontSize:"clamp(2rem,6vw,4.5rem)"}}>
              <span style={{color:"var(--white)"}}>Join the</span><br/>
              <span className="gradient-text" style={{filter:"drop-shadow(0 0 30px var(--glow))"}}>Community</span><br/>
              <span style={{color:"var(--white)"}}>of Science</span><br/>
              <span style={{color:"var(--accent2)"}}>Enthusiasts</span>
            </h1>
            <p className="text-base leading-relaxed max-w-lg animate-fade-up delay-300" style={{color:"var(--muted)"}}>
              Notre Dame Science Club — the first college-level science club in the Indian Subcontinent.
              Upholding <em style={{color:"var(--blue)"}}>&quot;Science in Human Welfare&quot;</em> since 1955.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up delay-400">
              <Link href="/activities" className="flex items-center gap-2 px-6 py-3 font-black text-sm tracking-widest rounded-xl transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{background:"var(--blue)",color:"#000",fontFamily:"'Orbitron',sans-serif"}}>
                Explore <ChevronRight size={16}/>
              </Link>
              <Link href="/members" className="flex items-center gap-2 px-6 py-3 font-black text-sm tracking-widest rounded-xl border transition-all hover:bg-[var(--blue)] hover:text-black hover:border-[var(--blue)]"
                style={{borderColor:"var(--blue)",color:"var(--blue)",fontFamily:"'Orbitron',sans-serif"}}>
                <Users size={15}/> Join Us
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-96 h-96 rounded-2xl border overflow-hidden" style={{borderColor:"var(--border)",background:"var(--card)"}}>
              <Image src="/images/cropped-logo.png" alt="NDSC" fill className="object-contain p-16 opacity-75 animate-float" style={{filter:"drop-shadow(0 0 50px var(--glow))"}} />
              <div className="absolute inset-8 rounded-full border border-dashed" style={{borderColor:"var(--blue)",opacity:.3,animation:"spin 20s linear infinite"}} />
              <div className="absolute inset-16 rounded-full border border-dashed" style={{borderColor:"var(--accent2)",opacity:.2,animation:"spin 14s linear infinite reverse"}} />
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10"><Marquee /></div>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((s,i)=>(
              <div key={s.label} className={`reveal text-center p-5 sm:p-7 rounded-xl border card-hover`} style={{borderColor:"var(--border)",background:"var(--card)",animationDelay:`${i*.1}s`}}>
                <p className="text-3xl sm:text-4xl font-black mb-2" style={{fontFamily:"'Orbitron',sans-serif",color:"var(--blue)",filter:"drop-shadow(0 0 10px var(--glow))"}}>{s.num}</p>
                <p className="text-xs tracking-wider uppercase" style={{color:"var(--muted)"}}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GS / MODERATOR QUOTE ─────────────────────────────── */}
      <section className="relative z-10 py-16 sm:py-20" style={{background:"var(--bg2)"}}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="section-label mb-2 reveal">Leadership</div>
          <h2 className="text-2xl sm:text-3xl font-black mb-8 reveal" style={{fontFamily:"'Orbitron',sans-serif"}}>
            WORD FROM <span style={{color:"var(--blue)"}}>LEADERSHIP</span>
          </h2>
          {/* switcher */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {QUOTES.map((q,i)=>(
              <button key={q.role} onClick={()=>setActiveQuote(i)}
                className="px-4 py-2 text-xs font-black tracking-wider rounded-lg border transition-all"
                style={{fontFamily:"'Orbitron',sans-serif",background:activeQuote===i?"var(--blue)":"transparent",color:activeQuote===i?"#000":"var(--muted)",borderColor:activeQuote===i?"var(--blue)":"var(--border)"}}>
                {q.role}
              </button>
            ))}
          </div>
          {QUOTES.map((q,i)=>(
            <div key={q.role} className={`transition-all duration-300 ${activeQuote===i?"block":"hidden"}`}>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start p-6 sm:p-8 rounded-2xl border" style={{borderColor:"rgba(0,212,255,.25)",background:"rgba(0,212,255,.03)"}}>
                <div className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-3 shrink-0">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2" style={{borderColor:"var(--blue)"}}>
                    <Image src={q.image} alt={q.name} fill className="object-cover" />
                  </div>
                  <div className="sm:text-center">
                    <p className="text-sm font-black" style={{fontFamily:"'Orbitron',sans-serif"}}>{q.name}</p>
                    <p className="text-xs font-bold mt-0.5" style={{color:"var(--blue)"}}>{q.role}</p>
                    <p className="text-xs mt-0.5" style={{color:"var(--muted)"}}>{q.panel}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <Quote size={28} className="mb-3 opacity-30" style={{color:"var(--blue)"}} />
                  <p className="text-sm sm:text-base leading-relaxed italic mb-4" style={{color:"var(--white)"}}>&ldquo;{q.short}&rdquo;</p>
                  <Link href={q.link} className="text-xs font-black tracking-widest px-4 py-2 rounded-lg border inline-block transition-all hover:bg-[var(--blue)] hover:text-black hover:border-[var(--blue)]"
                    style={{borderColor:"var(--blue)",color:"var(--blue)",fontFamily:"'Orbitron',sans-serif"}}>
                    READ FULL MESSAGE →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DEPARTMENTS ───────────────────────────────────────── */}
      <section className="relative z-10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="section-label mb-2 reveal">Structure</div>
          <h2 className="text-2xl sm:text-3xl font-black mb-3 reveal" style={{fontFamily:"'Orbitron',sans-serif"}}>
            OUR <span style={{color:"var(--blue)"}}>DEPARTMENTS</span>
          </h2>
          <p className="text-sm mb-10 max-w-xl reveal" style={{color:"var(--muted)"}}>Click on a department to learn more about its role in NDSC.</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {DEPTS.map((d,i)=>(
              <button key={d.name} onClick={()=>setDeptModal(d)}
                className={`reveal group flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border transition-all duration-300 hover:-translate-y-2`}
                style={{borderColor:"var(--border)",background:"var(--card)",animationDelay:`${i*.07}s`}}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor=d.color}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor="var(--border)"}>
                <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                  <Image src={d.icon} alt={d.name} fill className="object-contain" style={{filter:`drop-shadow(0 0 6px ${d.color})`}} />
                </div>
                <p className="text-[9px] sm:text-[10px] font-black tracking-wider text-center leading-tight" style={{fontFamily:"'Orbitron',sans-serif",color:d.color}}>{d.short}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEOS ────────────────────────────────────────────── */}
      <section className="relative z-10 py-16 sm:py-20" style={{background:"var(--bg2)"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="section-label mb-2 reveal">Media</div>
          <h2 className="text-2xl sm:text-3xl font-black mb-10 reveal" style={{fontFamily:"'Orbitron',sans-serif"}}>
            SCIENCE <span style={{color:"var(--blue)"}}>MEDIA</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 rounded-xl overflow-hidden border" style={{borderColor:"var(--border)",aspectRatio:"16/9"}}>
              <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${VIDEOS[activeVideo].id}`} title="NDSC" frameBorder="0" allowFullScreen />
            </div>
            <div className="flex flex-col gap-3">
              {VIDEOS.map((v,i)=>(
                <button key={i} onClick={()=>setActiveVideo(i)}
                  className="flex items-center gap-3 p-3 rounded-xl border text-left transition-all hover:-translate-y-0.5"
                  style={{borderColor:activeVideo===i?"var(--blue)":"var(--border)",background:activeVideo===i?"#00d4ff11":"var(--card)"}}>
                  <div className="relative shrink-0 rounded-lg overflow-hidden" style={{width:72,height:45}}>
                    <Image src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} fill className="object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30"><Play size={14} className="fill-white text-white" /></div>
                  </div>
                  <p className="text-xs font-medium" style={{color:activeVideo===i?"var(--blue)":"var(--white)"}}>{v.title}</p>
                </button>
              ))}
              <a href="https://www.youtube.com/@NDSCOfficial" target="_blank" rel="noopener noreferrer"
                className="mt-auto py-3 text-center text-xs font-black tracking-widest border rounded-xl transition-all hover:bg-[var(--blue)] hover:text-black"
                style={{borderColor:"var(--blue)",color:"var(--blue)",fontFamily:"'Orbitron',sans-serif"}}>
                VIEW ALL VIDEOS →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST EVENTS ─────────────────────────────────────── */}
      <section className="relative z-10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-label mb-2 reveal">Recent</div>
              <h2 className="text-2xl sm:text-3xl font-black reveal" style={{fontFamily:"'Orbitron',sans-serif"}}>
                LATEST <span style={{color:"var(--blue)"}}>EVENTS</span>
              </h2>
            </div>
            <Link href="/activities?tab=events" className="hidden sm:flex items-center gap-1 text-xs font-black tracking-wider" style={{color:"var(--blue)",fontFamily:"'Orbitron',sans-serif"}}>
              VIEW ALL <ChevronRight size={14}/>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EVENTS.map((ev,i)=>(
              <a key={ev.title} href={ev.href} target="_blank" rel="noopener noreferrer"
                className={`reveal group rounded-xl overflow-hidden border transition-all duration-300 hover:border-[var(--blue)] hover:-translate-y-1`}
                style={{borderColor:"var(--border)",background:"var(--card)",animationDelay:`${i*.1}s`}}>
                <div className="relative overflow-hidden" style={{height:190}}>
                  <Image src={ev.img} alt={ev.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{background:"linear-gradient(0deg,rgba(2,8,16,.85) 0%,transparent 60%)"}} />
                  <span className="absolute bottom-3 left-4 text-xs" style={{color:"var(--muted)",fontFamily:"'Share Tech Mono',monospace"}}>{ev.date}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold leading-snug mb-2 group-hover:text-[var(--blue)] transition-colors" style={{fontFamily:"'Orbitron',sans-serif"}}>{ev.title}</h3>
                  <span className="text-xs font-bold" style={{color:"var(--blue)"}}>Learn More →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATION CTA ───────────────────────────────────── */}
      <section className="relative z-10 py-16 sm:py-20" style={{background:"var(--bg2)"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="reveal rounded-2xl border overflow-hidden p-8 sm:p-14 flex flex-col sm:flex-row items-center gap-8 sm:gap-12"
            style={{borderColor:"var(--blue)",background:"linear-gradient(135deg,#00d4ff0a,#0077ff0a)"}}>
            <div className="flex-1">
              <div className="section-label mb-2">Annual Magazine</div>
              <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{fontFamily:"'Orbitron',sans-serif"}}>
                অদ্রি <span style={{color:"var(--blue)"}}>(AUDRI)</span>
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{color:"var(--muted)"}}>
                Annual science publication — articles on Quantum Entanglement, CRISPR, Neural Networks, and more.
              </p>
              <Link href="/publication" className="inline-flex items-center gap-2 px-6 py-3 font-black text-sm tracking-widest rounded-xl transition-all hover:opacity-90"
                style={{background:"var(--blue)",color:"#000",fontFamily:"'Orbitron',sans-serif"}}>
                <BookOpen size={15}/> Read AUDRI
              </Link>
            </div>
            <div className="shrink-0 animate-float">
              <Image src="/images/Audri-24.jpeg" alt="AUDRI" width={180} height={240} className="rounded-xl object-cover shadow-2xl"
                style={{filter:"drop-shadow(0 0 30px var(--glow))"}} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section className="relative z-10 py-20 sm:py-28 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="section-label justify-center mb-3 reveal">Join Us</div>
          <h2 className="text-3xl sm:text-5xl font-black mb-5 reveal" style={{fontFamily:"'Orbitron',sans-serif"}}>
            BE PART OF THE <span style={{color:"var(--blue)"}}>LEGACY</span>
          </h2>
          <p className="text-sm sm:text-base leading-relaxed mb-8 reveal" style={{color:"var(--muted)"}}>
            Join thousands of science enthusiasts, participate in olympiads, workshops, and events.
          </p>
          <div className="flex flex-wrap gap-4 justify-center reveal">
            <Link href="/members" className="px-7 py-4 font-black text-sm tracking-widest rounded-xl transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{background:"var(--blue)",color:"#000",fontFamily:"'Orbitron',sans-serif"}}>
              BECOME A MEMBER
            </Link>
            <Link href="/olympiad" className="flex items-center gap-2 px-7 py-4 font-black text-sm tracking-widest rounded-xl border transition-all hover:bg-[var(--blue)] hover:text-black hover:border-[var(--blue)]"
              style={{borderColor:"var(--blue)",color:"var(--blue)",fontFamily:"'Orbitron',sans-serif"}}>
              <Trophy size={15}/> TAKE OLYMPIAD
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
