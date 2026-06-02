"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ExternalLink, Play, FileText, Calendar, Beaker, Mic, BookMarked, BookOpen, Trophy, Folder } from "lucide-react";

/* ── Data ────────────────────────────────────────────────────── */
const events = [
  { title: "Notre Dame Annual Science Festival 2024 & 34th GKC", desc: "Explore innovation and research exhibitions.", img: "/images/011.jpg", href: "https://www.facebook.com/share/p/18CNrgv5M6/" },
  { title: "70th Anniversary Celebration", desc: "Celebrating 70 glorious years of NDSC.", img: "/images/012.jpg", href: "https://www.facebook.com/share/p/18Mn2w5GZL/" },
  { title: "Q-league", desc: "Competitive quiz event.", img: "/images/Q-league.jpg", href: "https://www.facebook.com/events/795607803052518" },
  { title: "Scienceophile 4.0", desc: "The premier science Olympiad.", img: "/images/Scienceophile.jpg", href: "https://www.facebook.com/events/1760498437919783" },
  { title: "Q-league 2024", desc: "Annual quiz competition.", img: "/images/Q-league-24.jpg", href: "https://www.facebook.com/events/1076926823784941/" },
  { title: "Scienceophile 3.0", desc: "Science Olympiad 3rd edition.", img: "/images/Scienceophile-3.jpg", href: "https://www.facebook.com/events/865703465718355" },
  { title: "Scienceophile 2.0", desc: "Science Olympiad 2nd edition.", img: "/images/Scienceophile-2.jpg", href: "https://www.facebook.com/events/865703465718355" },
  { title: "BrainRain 4.0", desc: "Competitive science quiz.", img: "/images/BRAIN-RAIN.jpg", href: "https://www.facebook.com/events/1308396179784046" },
  { title: "Innovators Hunt", desc: "Innovation and project showcase.", img: "/images/INNOVATORS-HUNT.jpg", href: "https://www.facebook.com/events/780605630206217" },
  { title: "Annual Science Fest 2023", desc: "Explore innovation and research.", img: "/images/Annual-science-fest-23.jpg", href: "https://www.facebook.com/events/1103869251011524" },
];

const workshops = [
  { title: "AIUB Campus Tour & Workshop 2025", desc: "Hands-on robotics workshop on automation, sensors, and real-world problem solving.", img: "/images/001.jpg", href: "https://www.facebook.com/share/p/1CHJxskgfQ/" },
  { title: "Brainstorming Saga 1.0 on Stereochemistry", desc: "Deep dive into organic chemistry stereochemistry concepts.", img: "/images/014.jpg", href: "https://www.facebook.com/share/p/1Kr8avuQMC/" },
  { title: "Regular Session", desc: "Weekly learning sessions for club members.", img: "/images/013.jpg", href: "https://www.facebook.com/share/p/14UEwcK57Qp/" },
  { title: "Physics Olympiad Seminar", desc: "Preparation seminar for national physics olympiad.", img: "/images/010.jpg", href: "https://www.facebook.com/share/p/1ByMw9Gqvt/" },
  { title: "Session on Physics Beyond Certainty", desc: "Exploring quantum uncertainty and modern physics.", img: "/images/Physics-beyond-certainty.jpg", href: "https://www.facebook.com/share/p/1ZNEpTLyed/" },
  { title: "Quizzing Session", desc: "Competitive quiz practice for members.", img: "/images/quizing-session.jpg", href: "https://www.facebook.com/share/p/185ZTGtrHJ/" },
  { title: "Workshop on Project Development", desc: "Learn to build real-world science projects.", img: "/images/Project-workshop.jpg", href: "https://www.facebook.com/share/p/18KfVk1Zpz/" },
  { title: "Introduction to Nanomaterials & Nanotechnology", desc: "Explore the world of nanoscience with expert guidance.", img: "/images/015.jpg", href: "https://www.facebook.com/share/p/1KZaEjup8V/" },
];

const podcasts = [
  { youtubeId: "CXvLpiRFWqg", title: "NDSC Podcast Ep. 1 — Science & Society", date: "March 2025" },
  { youtubeId: "CXvLpiRFWqg", title: "NDSC Podcast Ep. 2 — Future of AI", date: "April 2025" },
  { youtubeId: "CXvLpiRFWqg", title: "NDSC Podcast Ep. 3 — Climate Crisis", date: "May 2025" },
];

const scienceSundays = [
  { week: "Week 24", title: "The Mystery of Dark Matter", fbLink: "https://www.facebook.com/NDSCOfficial", date: "June 1, 2025" },
  { week: "Week 23", title: "CRISPR and the Future of Medicine", fbLink: "https://www.facebook.com/NDSCOfficial", date: "May 25, 2025" },
  { week: "Week 22", title: "How Black Holes Form", fbLink: "https://www.facebook.com/NDSCOfficial", date: "May 18, 2025" },
  { week: "Week 21", title: "Quantum Computing Explained Simply", fbLink: "https://www.facebook.com/NDSCOfficial", date: "May 11, 2025" },
  { week: "Week 20", title: "The Science of Sleep", fbLink: "https://www.facebook.com/NDSCOfficial", date: "May 4, 2025" },
  { week: "Week 19", title: "Epigenetics: Beyond the DNA Code", fbLink: "https://www.facebook.com/NDSCOfficial", date: "April 27, 2025" },
];

const stemInsights = [
  { title: "STEM Insights Vol. 5", desc: "Robotics, AI, Space exploration", pdfUrl: "#", cover: "/images/Audri-24.jpeg" },
  { title: "STEM Insights Vol. 4", desc: "Quantum Physics, Nanotechnology", pdfUrl: "#", cover: "/images/Audri-24.jpeg" },
  { title: "STEM Insights Vol. 3", desc: "Climate Science, Renewable Energy", pdfUrl: "#", cover: "/images/Audri-24.jpeg" },
];

/* ── 70 Years of Projects ────────────────────────────────────── */
const projects = [
  { year: "2024", title: "Autonomous Line Follower Robot", dept: "Project", type: "Robotics", img: "/images/001.jpg", desc: "A fully autonomous robot built using Arduino that follows a predefined path using infrared sensors.", videoUrl: "", fbLink: "https://www.facebook.com/NDSCOfficial" },
  { year: "2024", title: "Water Purification System", dept: "Project", type: "Environmental", img: "/images/010.jpg", desc: "Low-cost water purification system using locally available materials for rural communities.", videoUrl: "", fbLink: "https://www.facebook.com/NDSCOfficial" },
  { year: "2023", title: "AI Leaf Disease Detector", dept: "ICT", type: "AI/ML", img: "/images/013.jpg", desc: "Machine learning model to detect plant diseases from leaf images using TensorFlow.", videoUrl: "CXvLpiRFWqg", fbLink: "https://www.facebook.com/NDSCOfficial" },
  { year: "2023", title: "Earthquake Early Warning System", dept: "Project", type: "Electronics", img: "/images/014.jpg", desc: "Seismic sensor array with real-time alerting mechanism.", videoUrl: "", fbLink: "https://www.facebook.com/NDSCOfficial" },
  { year: "2022", title: "Solar-Powered Irrigation Controller", dept: "Project", type: "Renewable Energy", img: "/images/015.jpg", desc: "Smart irrigation system powered by solar panels with moisture-based automation.", videoUrl: "CXvLpiRFWqg", fbLink: "https://www.facebook.com/NDSCOfficial" },
  { year: "2022", title: "Biodegradable Plastic Alternative", dept: "LWS", type: "Chemistry", img: "/images/011.jpg", desc: "Research project on creating biodegradable plastic from banana fiber and starch.", videoUrl: "", fbLink: "https://www.facebook.com/NDSCOfficial" },
  { year: "2021", title: "Smart Air Quality Monitor", dept: "ICT", type: "IoT", img: "/images/012.jpg", desc: "IoT-based air quality monitoring system with real-time dashboards.", videoUrl: "CXvLpiRFWqg", fbLink: "https://www.facebook.com/NDSCOfficial" },
  { year: "2020", title: "Hydroponics Farming System", dept: "LWS", type: "Biology", img: "/images/Annual-science-fest-23.jpg", desc: "Soil-free farming demonstration using nutrient-rich water solution.", videoUrl: "", fbLink: "https://www.facebook.com/NDSCOfficial" },
];

const projectYears = ["All", ...Array.from(new Set(projects.map(p => p.year))).sort((a,b) => Number(b)-Number(a))];
const projectTypes = ["All", ...Array.from(new Set(projects.map(p => p.type)))];

/* ── Awards ──────────────────────────────────────────────────── */
const awards = [
  { year: "2024", title: "Best Science Club – National Level", org: "Bangladesh Science Academy", category: "Institutional", desc: "Recognized as the best science club at national level for contributions to science education." },
  { year: "2024", title: "1st Place – National Science Olympiad", org: "Bangladesh Science Foundation", category: "Competition", desc: "NDSC members secured top positions in the national science olympiad." },
  { year: "2023", title: "Champion – Inter-College Quiz Competition", org: "Notre Dame College", category: "Quiz", desc: "Won the inter-college quiz championship organized by Notre Dame College." },
  { year: "2023", title: "Best Project Award – Annual Science Fest", org: "NDSC Internal", category: "Project", desc: "Best project award at the 33rd Annual Science Festival." },
  { year: "2022", title: "Gold Medal – Physics Olympiad", org: "Bangladesh Physics Olympiad Committee", category: "Olympiad", desc: "NDSC members won gold medals at the national physics olympiad." },
  { year: "2022", title: "Best Poster – Science Exhibition", org: "Dhaka Education Board", category: "Exhibition", desc: "Awarded best poster in the regional science exhibition." },
  { year: "2020", title: "National Science Talent Award", org: "Bangladesh Science Academy", category: "Individual", desc: "Member of NDSC received the prestigious national science talent award." },
  { year: "2019", title: "Best Innovation Award", org: "Notre Dame Annual Science Fest", category: "Innovation", desc: "Innovative project on renewable energy secured the best innovation award." },
  { year: "2015", title: "Certificate of Excellence – 60th Anniversary", org: "Notre Dame College", category: "Institutional", desc: "Honored for six decades of promoting science education." },
  { year: "2005", title: "50th Anniversary National Recognition", org: "Government of Bangladesh", category: "Institutional", desc: "National recognition on the 50th anniversary of NDSC's founding." },
  { year: "1984", title: "Best College Science Club", org: "Bangladesh National Science Week", category: "Institutional", desc: "Recognized as the best college science club during national science week." },
  { year: "1975", title: "Founding Legacy Award", org: "Bangladesh Science Society", category: "Institutional", desc: "Honored for being the pioneer college-level science club in the subcontinent." },
];

const awardCategories = ["All", ...Array.from(new Set(awards.map(a => a.category)))];

/* ── Tabs ────────────────────────────────────────────────────── */
const TABS = [
  { id: "events", label: "Events", icon: Calendar },
  { id: "workshops", label: "Workshops", icon: Beaker },
  { id: "podcast", label: "Podcast", icon: Mic },
  { id: "science-sunday", label: "Science Sunday", icon: BookMarked },
  { id: "stem-insights", label: "STEM Insights", icon: BookOpen },
  { id: "projects", label: "Projects", icon: Folder },
  { id: "awards", label: "Awards", icon: Trophy },
];

/* ── Cards ───────────────────────────────────────────────────── */
function EventCard({ title, desc, img, href }: { title: string; desc: string; img: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="group rounded-xl overflow-hidden border transition-all duration-300 hover:border-[var(--blue)] hover:-translate-y-1 flex flex-col"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <Image src={img} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(2,8,16,0.8) 0%, transparent 60%)" }} />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-sm font-bold leading-snug mb-2 group-hover:text-[var(--blue)] transition-colors" style={{ fontFamily: "'Orbitron', sans-serif" }}>{title}</h3>
        <p className="text-xs mb-4 flex-1" style={{ color: "var(--muted)" }}>{desc}</p>
        <span className="flex items-center gap-1 text-xs font-bold" style={{ color: "var(--blue)" }}><ExternalLink size={12} /> Learn More</span>
      </div>
    </a>
  );
}

function WorkshopCard({ title, desc, img, href }: { title: string; desc: string; img: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="group flex rounded-xl overflow-hidden border transition-all duration-300 hover:border-[var(--blue)]"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      <div className="relative shrink-0" style={{ width: 140, minHeight: 120 }}>
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <h3 className="text-sm font-bold mb-2 group-hover:text-[var(--blue)] transition-colors" style={{ fontFamily: "'Orbitron', sans-serif" }}>{title}</h3>
        <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>{desc}</p>
        <span className="flex items-center gap-1 text-xs font-bold" style={{ color: "var(--blue)" }}><ExternalLink size={12} /> Learn More</span>
      </div>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
function ActivitiesContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "events");
  const [pdfOpen, setPdfOpen] = useState<string | null>(null);
  const [projectYear, setProjectYear] = useState("All");
  const [projectType, setProjectType] = useState("All");
  const [awardCat, setAwardCat] = useState("All");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const filteredProjects = projects.filter(p =>
    (projectYear === "All" || p.year === projectYear) &&
    (projectType === "All" || p.type === projectType)
  );
  const filteredAwards = awards.filter(a => awardCat === "All" || a.category === awardCat);

  return (
    <>
      {/* Tab nav */}
      <div className="sticky top-[72px] z-30 overflow-x-auto" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 flex gap-2 py-3 min-w-max">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all"
              style={{ fontFamily: "'Orbitron', sans-serif", background: activeTab === id ? "var(--blue)" : "transparent", color: activeTab === id ? "#000" : "var(--muted)", border: activeTab === id ? "none" : "1px solid var(--border)" }}>
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* EVENTS */}
        {activeTab === "events" && (
          <div>
            <div className="section-label mb-2">All Events</div>
            <h2 className="text-3xl font-black mb-10" style={{ fontFamily: "'Orbitron', sans-serif" }}>EVENTS & <span style={{ color: "var(--blue)" }}>COMPETITIONS</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(e => <EventCard key={e.title} {...e} />)}
            </div>
          </div>
        )}

        {/* WORKSHOPS */}
        {activeTab === "workshops" && (
          <div>
            <div className="section-label mb-2">All Workshops</div>
            <h2 className="text-3xl font-black mb-10" style={{ fontFamily: "'Orbitron', sans-serif" }}>WORKSHOPS & <span style={{ color: "var(--blue)" }}>SESSIONS</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workshops.map(w => <WorkshopCard key={w.title} {...w} />)}
            </div>
          </div>
        )}

        {/* PODCAST */}
        {activeTab === "podcast" && (
          <div>
            <div className="section-label mb-2">Podcast</div>
            <h2 className="text-3xl font-black mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>NDSC <span style={{ color: "var(--blue)" }}>PODCAST</span></h2>
            <p className="mb-10 text-sm" style={{ color: "var(--muted)" }}>Also available on our <a href="https://www.youtube.com/@NDSCOfficial" target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue)" }}>YouTube channel</a>.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {podcasts.map(p => (
                <div key={p.title} className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                  <div style={{ aspectRatio: "16/9" }}>
                    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${p.youtubeId}`} title={p.title} frameBorder="0" allowFullScreen />
                  </div>
                  <div className="p-4">
                    <p className="text-xs mb-1" style={{ color: "var(--muted)", fontFamily: "'Share Tech Mono', monospace" }}>{p.date}</p>
                    <h3 className="text-sm font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>{p.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCIENCE SUNDAY */}
        {activeTab === "science-sunday" && (
          <div>
            <div className="section-label mb-2">Weekly</div>
            <h2 className="text-3xl font-black mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>SCIENCE <span style={{ color: "var(--blue)" }}>SUNDAY</span></h2>
            <p className="mb-10 text-sm" style={{ color: "var(--muted)" }}>Every Sunday, we share a curated science article.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scienceSundays.map(s => (
                <a key={s.week} href={s.fbLink} target="_blank" rel="noopener noreferrer"
                  className="group flex flex-col gap-3 p-6 rounded-xl border transition-all hover:border-[var(--blue)] hover:-translate-y-1"
                  style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-1 rounded" style={{ background: "#00d4ff22", color: "var(--blue)", fontFamily: "'Share Tech Mono', monospace" }}>{s.week}</span>
                    <span className="text-xs" style={{ color: "var(--muted)" }}>{s.date}</span>
                  </div>
                  <h3 className="font-bold text-sm group-hover:text-[var(--blue)] transition-colors" style={{ fontFamily: "'Orbitron', sans-serif" }}>{s.title}</h3>
                  <span className="flex items-center gap-1 text-xs font-bold" style={{ color: "var(--blue)" }}><ExternalLink size={12} /> Read on Facebook</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* STEM INSIGHTS */}
        {activeTab === "stem-insights" && (
          <div>
            <div className="section-label mb-2">Magazine</div>
            <h2 className="text-3xl font-black mb-10" style={{ fontFamily: "'Orbitron', sans-serif" }}>STEM <span style={{ color: "var(--blue)" }}>INSIGHTS</span></h2>
            {pdfOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.9)" }}>
                <div className="relative w-full max-w-4xl h-[85vh] rounded-xl overflow-hidden border" style={{ borderColor: "var(--blue)" }}>
                  <button onClick={() => setPdfOpen(null)} className="absolute top-4 right-4 z-10 px-3 py-1 rounded text-xs font-bold" style={{ background: "var(--blue)", color: "#000" }}>✕ CLOSE</button>
                  <iframe src={pdfOpen} width="100%" height="100%" title="PDF Viewer" />
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stemInsights.map(s => (
                <div key={s.title} className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                  <div className="relative" style={{ height: 260 }}>
                    <Image src={s.cover} alt={s.title} fill className="object-cover" />
                    <div className="absolute inset-0 flex items-end p-4" style={{ background: "linear-gradient(0deg, rgba(2,8,16,0.9) 0%, transparent 60%)" }}>
                      <div>
                        <h3 className="font-bold text-sm mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>{s.title}</h3>
                        <p className="text-xs" style={{ color: "var(--muted)" }}>{s.desc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex gap-3">
                    <button onClick={() => setPdfOpen(s.pdfUrl)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded text-xs font-bold border" style={{ borderColor: "var(--blue)", color: "var(--blue)" }}>
                      <FileText size={13} /> READ
                    </button>
                    <a href={s.pdfUrl} download className="flex-1 flex items-center justify-center gap-2 py-2 rounded text-xs font-bold" style={{ background: "#00d4ff22", color: "var(--blue)" }}>
                      ↓ DOWNLOAD
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {activeTab === "projects" && (
          <div>
            <div className="section-label mb-2">70 Years of Innovation</div>
            <h2 className="text-3xl font-black mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>NDSC <span style={{ color: "var(--blue)" }}>PROJECTS</span></h2>
            <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>From robotics to environmental science — a legacy of student-driven innovation spanning 70 years.</p>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-10">
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs font-bold self-center mr-1" style={{ color: "var(--muted)", fontFamily: "'Share Tech Mono', monospace" }}>YEAR:</span>
                {projectYears.map(y => (
                  <button key={y} onClick={() => setProjectYear(y)}
                    className="px-3 py-1 rounded text-xs font-bold border transition-all"
                    style={{ background: projectYear === y ? "var(--blue)" : "transparent", color: projectYear === y ? "#000" : "var(--muted)", borderColor: projectYear === y ? "var(--blue)" : "var(--border)" }}>
                    {y}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs font-bold self-center mr-1" style={{ color: "var(--muted)", fontFamily: "'Share Tech Mono', monospace" }}>TYPE:</span>
                {projectTypes.map(t => (
                  <button key={t} onClick={() => setProjectType(t)}
                    className="px-3 py-1 rounded text-xs font-bold border transition-all"
                    style={{ background: projectType === t ? "var(--blue)" : "transparent", color: projectType === t ? "#000" : "var(--muted)", borderColor: projectType === t ? "var(--blue)" : "var(--border)" }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map(p => (
                <div key={p.title + p.year} className="group rounded-xl border overflow-hidden transition-all hover:border-[var(--blue)]" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                  <div className="flex">
                    <div className="relative shrink-0" style={{ width: 160, minHeight: 140 }}>
                      <Image src={p.img} alt={p.title} fill className="object-cover" />
                    </div>
                    <div className="p-5 flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: "#00d4ff22", color: "var(--blue)", fontFamily: "'Share Tech Mono', monospace" }}>{p.year}</span>
                        <span className="text-xs px-2 py-0.5 rounded border" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>{p.type}</span>
                        <span className="text-xs px-2 py-0.5 rounded border" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>{p.dept}</span>
                      </div>
                      <h3 className="text-sm font-bold mb-2 group-hover:text-[var(--blue)] transition-colors" style={{ fontFamily: "'Orbitron', sans-serif" }}>{p.title}</h3>
                      <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--muted)" }}>{p.desc}</p>
                      <div className="flex gap-3">
                        {p.videoUrl && (
                          <a href={`https://youtube.com/watch?v=${p.videoUrl}`} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs font-bold" style={{ color: "var(--blue)" }}>
                            <Play size={12} /> Watch Video
                          </a>
                        )}
                        <a href={p.fbLink} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs font-bold" style={{ color: "var(--muted)" }}>
                          <ExternalLink size={12} /> Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredProjects.length === 0 && (
              <p className="text-center py-16" style={{ color: "var(--muted)" }}>No projects found for the selected filters.</p>
            )}
          </div>
        )}

        {/* AWARDS */}
        {activeTab === "awards" && (
          <div>
            <div className="section-label mb-2">Recognition</div>
            <h2 className="text-3xl font-black mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>AWARDS & <span style={{ color: "var(--blue)" }}>ACHIEVEMENTS</span></h2>
            <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>Honors and recognitions earned over 70 years of excellence in science education.</p>

            {/* Category filter */}
            <div className="flex gap-2 flex-wrap mb-10">
              {awardCategories.map(c => (
                <button key={c} onClick={() => setAwardCat(c)}
                  className="px-4 py-1.5 rounded text-xs font-bold border transition-all"
                  style={{ background: awardCat === c ? "var(--blue)" : "transparent", color: awardCat === c ? "#000" : "var(--muted)", borderColor: awardCat === c ? "var(--blue)" : "var(--border)" }}>
                  {c}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredAwards.map(a => (
                <div key={a.title + a.year}
                  className="flex gap-6 items-start p-6 rounded-xl border transition-all hover:border-[var(--blue)] hover:translate-x-1"
                  style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <Trophy size={28} style={{ color: "var(--blue)" }} />
                    <span className="text-xs font-black" style={{ fontFamily: "'Orbitron', sans-serif", color: "var(--blue)" }}>{a.year}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                      <h3 className="font-black text-sm" style={{ fontFamily: "'Orbitron', sans-serif" }}>{a.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded border shrink-0" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>{a.category}</span>
                    </div>
                    <p className="text-xs font-bold mb-1" style={{ color: "var(--blue)" }}>{a.org}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen relative z-10" style={{ paddingTop: "72px" }}>
      <div className="py-16 text-center border-b" style={{ background: "linear-gradient(180deg, var(--bg2), var(--bg))", borderColor: "var(--border)" }}>
        <div className="section-label justify-center mb-2">Explore</div>
        <h1 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          ALL <span style={{ color: "var(--blue)" }}>ACTIVITIES</span>
        </h1>
      </div>
      <Suspense fallback={<div className="text-center py-20" style={{ color: "var(--muted)" }}>Loading...</div>}>
        <ActivitiesContent />
      </Suspense>
    </div>
  );
}
