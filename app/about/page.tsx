"use client";
import Link from "next/link";
import Image from "next/image";


const TIMELINE = [
  { year: "1955", event: "Founded", desc: "Established September 18, 1955 by Fr. Richard William Timm, C.S.C." },
  { year: "1960s", event: "First Science Fair", desc: "Launched the tradition of annual science fairs at college level in Bangladesh." },
  { year: "1980s", event: "National Recognition", desc: "Became nationally recognized as the leading science club in Bangladesh." },
  { year: "2000s", event: "Digital Expansion", desc: "Expanded to online resources, digital publications, and national olympiads." },
  { year: "2024", event: "70th Anniversary", desc: "Celebrated 70 glorious years of promoting science in Bangladesh." },
];

const DEPTS = [
  { name:"Administration", icon:"/images/admininstration-icon.png", color:"#00d4ff", desc:"Ensures smooth operation and management of club activities. Coordinates planning, logistics and execution of all events and programs." },
  { name:"Project",        icon:"/images/project.png",              color:"#34d399", desc:"Conducts scientific research and innovation-based projects. Encourages experimentation, analytical development, and student-led innovation." },
  { name:"Publication",    icon:"/images/publication.png",          color:"#a78bfa", desc:"Handles graphics, publishes wall magazines, journals and the annual AUDRI publication. Promotes scientific writing and knowledge sharing." },
  { name:"ICT",            icon:"/images/ict.png",                  color:"#f87171", desc:"Handles digital media, website management, and tech support. Maintains digital infrastructure and online presence of the club." },
  { name:"LWS",            icon:"/images/lws.png",                  color:"#f59e0b", desc:"Life & Welfare Science — biology, environment, and health oriented activities, awareness campaigns, and programs." },
  { name:"Quiz",           icon:"/images/cropped-logo.png",         color:"#60a5fa", desc:"Hosts Q-League, BrainRain, Scienceophile. NDC Blue, NDC Green & NDC Gold are NDSC's prestigious national quiz teams." },
  { name:"R&D",            icon:"/images/cropped-logo.png",         color:"#fb923c", desc:"Research & Development — drives olympiad preparation, academic seminars, and student-led scientific innovation programs." },
];

const GOALS = [
  { title:"Promote Science Education",  desc:"Foster a culture of scientific thinking and curiosity among students of Notre Dame College." },
  { title:"Organize Olympiads",         desc:"Host science olympiads to challenge and recognize talented students at national and international level." },
  { title:"Research & Innovation",      desc:"Encourage student-led research projects and innovative experiments across all scientific disciplines." },
  { title:"Scientific Awareness",       desc:"Spread science awareness through events, publications, media, and community outreach programs." },
  { title:"Develop Future Scientists",  desc:"Mentor the next generation of scientists, researchers, engineers and innovators in Bangladesh." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen relative z-10" style={{ paddingTop: "64px" }}>

      {/* Hero */}
      <section className="py-20 sm:py-28 text-center border-b relative" style={{ background:"linear-gradient(180deg,var(--bg2),var(--bg))", borderColor:"var(--border)" }}>
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <div className="section-label justify-center mb-3">[ EST. 1955 ]</div>
          <h1 className="text-4xl sm:text-6xl font-black mb-5" style={{ fontFamily:"'Orbitron',sans-serif" }}>
            ABOUT <span style={{ color:"var(--blue)" }}>NDSC</span>
          </h1>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color:"var(--muted)" }}>
            Notre Dame Science Club — the official science club of Notre Dame College, Bangladesh,
            and the first college-level science club in the Indian Subcontinent.
          </p>
        </div>
      </section>

      {/* Article + Stats */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="reveal">
            <div className="section-label mb-2">History</div>
            <h2 className="text-2xl sm:text-3xl font-black mb-6" style={{ fontFamily:"'Orbitron',sans-serif" }}>
              OUR <span style={{ color:"var(--blue)" }}>LEGACY</span>
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color:"var(--muted)" }}>
              <p>
                Notre Dame Science Club, also known as <strong style={{color:"var(--white)"}}>NDSC</strong>, the most promising, versatile,
                and eminent co-curricular activities club of Notre Dame College, began its inception in{" "}
                <strong style={{color:"var(--white)"}}>1955</strong> to ignite a passion for science among students. It is the{" "}
                <strong style={{color:"var(--blue)"}}>pioneer science club of the Sub-Continent</strong>. Holding the noble motto
                &quot;Science in Human Welfare&quot;, the eminent scientist{" "}
                <strong style={{color:"var(--white)"}}>Fr. R.W. Timm C.S.C</strong> inaugurated the flag of NDSC.
              </p>
              <p>
                The NDSC has a long history of inspiring its followers to rediscover their innate passion for science
                by serving as the country&apos;s <strong style={{color:"var(--white)"}}>oldest and most prestigious scientific club</strong>.
                NDSC gives the necessary guidelines, and it&apos;s the trailblazer in spreading scientific awareness
                among the people. We foster a love of science and an eagerness to learn more about the world&apos;s
                mysteries, touch the untouched, and see the unseen. For the last few decades, NDSC has turned into
                the most prominent club to organize numerous{" "}
                <strong style={{color:"var(--white)"}}>science fairs</strong> — the ultimate platform for student project demonstrations.
              </p>
              <p>
                Besides, the various Events and Competitions have provided the momentum to research advanced
                knowledge. The official quiz teams of Notre Dame Science Club —{" "}
                <strong style={{color:"var(--blue)"}}>&quot;NDC Blue&quot; &quot;NDC Green&quot; &amp; &quot;NDC Gold&quot;</strong> — are
                prestigious platforms for quizzers working relentlessly to uphold the glory of quizzing.
              </p>
              <p>
                Every year, distinguished members of NDSC compete in{" "}
                <strong style={{color:"var(--white)"}}>international science fairs</strong> and bring honour to the institution.
                Run by experienced moderators, NDSC will continue to be the pioneer in our science movement
                and will upgrade the noble cause of promoting science in every sphere of life.
              </p>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[["70+","Years of Legacy"],["5000+","Alumni Members"],["100+","Events Hosted"],["6","Departments"]].map(([n,l])=>(
                <div key={l} className="p-4 rounded-xl border text-center card-hover" style={{borderColor:"var(--border)",background:"var(--card)"}}>
                  <p className="text-3xl font-black mb-1" style={{fontFamily:"'Orbitron',sans-serif",color:"var(--blue)"}}>{n}</p>
                  <p className="text-xs tracking-wider uppercase" style={{color:"var(--muted)"}}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="reveal">
            <div className="section-label mb-2">Timeline</div>
            <h2 className="text-2xl sm:text-3xl font-black mb-8" style={{ fontFamily:"'Orbitron',sans-serif" }}>
              KEY <span style={{ color:"var(--blue)" }}>MILESTONES</span>
            </h2>
            <div className="relative pl-8 border-l" style={{ borderColor:"var(--blue)" }}>
              {TIMELINE.map((t,i)=>(
                <div key={t.year} className="mb-8 relative" style={{animationDelay:`${i*.1}s`}}>
                  <div className="absolute -left-[2.05rem] top-1 w-3 h-3 rounded-full border-2" style={{background:"var(--bg)",borderColor:"var(--blue)",boxShadow:"0 0 10px var(--glow)"}} />
                  <p className="text-xs font-black mb-1" style={{fontFamily:"'Orbitron',sans-serif",color:"var(--blue)"}}>{t.year}</p>
                  <h4 className="font-bold text-sm mb-1">{t.event}</h4>
                  <p className="text-xs leading-relaxed" style={{color:"var(--muted)"}}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Motto */}
      <section className="py-20 text-center" style={{ background:"var(--bg2)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="relative w-36 h-36 rounded-full border mx-auto mb-8 flex items-center justify-center" style={{borderColor:"var(--border)"}}>
            <div className="absolute inset-0 rounded-full border border-dashed" style={{borderColor:"var(--blue)",opacity:.4,animation:"spin 10s linear infinite"}} />
            <div className="absolute inset-[-12px] rounded-full border border-dashed" style={{borderColor:"var(--blue2)",opacity:.2,animation:"spin 16s linear infinite reverse"}} />
            <Image src="/images/cropped-logo.png" alt="NDSC" width={96} height={96} className="object-contain relative z-10" />
          </div>
          <div className="section-label justify-center mb-3">Our Motto</div>
          <h2 className="text-3xl sm:text-5xl font-black mb-6" style={{ fontFamily:"'Orbitron',sans-serif" }}>
            <span style={{color:"var(--blue)"}}>SCIENCE</span> IN<br/>HUMAN WELFARE
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color:"var(--muted)" }}>
            This motto reflects our belief that science is not just an academic pursuit — it is a tool
            for improving lives, solving real-world problems, and creating a better future for humanity.
            Every activity we organize, every article we publish, and every olympiad we host is guided
            by this core principle.
          </p>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="section-label mb-2">Structure</div>
          <h2 className="text-2xl sm:text-3xl font-black mb-3" style={{ fontFamily:"'Orbitron',sans-serif" }}>
            OUR <span style={{ color:"var(--blue)" }}>DEPARTMENTS</span>
          </h2>
          <p className="text-sm mb-10 max-w-xl" style={{ color:"var(--muted)" }}>
            NDSC is structured into specialized departments, each driving a unique aspect of our scientific mission.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {DEPTS.map((d,i)=>(
              <div key={d.name} className="reveal group p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1"
                style={{borderColor:"var(--border)",background:"var(--card)",animationDelay:`${i*.08}s`}}
                onMouseEnter={(e)=>(e.currentTarget as HTMLElement).style.borderColor=d.color}
                onMouseLeave={(e)=>(e.currentTarget as HTMLElement).style.borderColor="var(--border)"}>
                <div className="relative w-14 h-14 mb-4">
                  <Image src={d.icon} alt={d.name} fill className="object-contain" style={{filter:`drop-shadow(0 0 8px ${d.color})`}} />
                </div>
                <h3 className="font-black text-sm tracking-wider mb-2" style={{fontFamily:"'Orbitron',sans-serif",color:d.color}}>{d.name}</h3>
                <p className="text-xs leading-relaxed" style={{color:"var(--muted)"}}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-16 sm:py-20" style={{ background:"var(--bg2)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="section-label mb-2">Mission</div>
          <h2 className="text-2xl sm:text-3xl font-black mb-10" style={{ fontFamily:"'Orbitron',sans-serif" }}>
            OUR <span style={{ color:"var(--blue)" }}>GOALS</span>
          </h2>
          <div className="space-y-4">
            {GOALS.map((g,i)=>(
              <div key={g.title} className="reveal flex gap-5 p-5 sm:p-6 rounded-xl border transition-all hover:border-[var(--blue)] hover:translate-x-1"
                style={{borderColor:"var(--border)",background:"var(--card)",animationDelay:`${i*.1}s`}}>
                <span className="text-2xl font-black shrink-0 opacity-30 leading-none pt-1" style={{fontFamily:"'Orbitron',sans-serif",color:"var(--blue)"}}>{String(i+1).padStart(2,"0")}</span>
                <div>
                  <h3 className="font-bold text-sm mb-1" style={{fontFamily:"'Orbitron',sans-serif"}}>{g.title}</h3>
                  <p className="text-xs leading-relaxed" style={{color:"var(--muted)"}}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GS Full Quote */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="section-label mb-2">Leadership Message</div>
          <h2 className="text-2xl sm:text-3xl font-black mb-8" style={{ fontFamily:"'Orbitron',sans-serif" }}>
            FROM THE <span style={{ color:"var(--blue)" }}>GENERAL SECRETARY</span>
          </h2>
          <div className="p-6 sm:p-10 rounded-2xl border" style={{borderColor:"rgba(0,212,255,.3)",background:"rgba(0,212,255,.03)"}}>
            <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 shrink-0" style={{borderColor:"var(--blue)"}}>
                <Image src="/images/panel-26/gs.jpg" alt="GS" fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-black text-base" style={{fontFamily:"'Orbitron',sans-serif"}}>Fahim Faisal Arnob</h3>
                <p className="text-sm font-bold" style={{color:"var(--blue)"}}>General Secretary</p>
                <p className="text-xs" style={{color:"var(--muted)"}}>Panel 2025–2026</p>
              </div>
            </div>
            <div className="space-y-4 text-sm leading-relaxed" style={{color:"var(--muted)"}}>
              <p>&ldquo;Notre Dame Science Club has always been more than just a club — it is a family, a community of dreamers and doers. As your General Secretary, I am committed to taking NDSC to new heights, fostering innovation, scientific thinking, and brotherhood among our members. Together, we will uphold our 70-year legacy and write new chapters of excellence.</p>
              <p>Science is not confined to textbooks; it lives in every experiment we conduct, every question we ask, and every problem we dare to solve. I invite every student of Notre Dame College to be part of this magnificent journey. Whether you are passionate about physics, chemistry, biology, technology, or simply curious about the world — NDSC is your home.</p>
              <p>Let us carry forward the noble motto of our founders: <em style={{color:"var(--blue)"}}>Science in Human Welfare</em>. Together, we will make NDSC not just the oldest, but the greatest science club in Bangladesh.&rdquo;</p>
            </div>
            <Link href="/executives" className="inline-block mt-6 px-5 py-2 text-xs font-black tracking-widest rounded-lg border transition-all hover:bg-[var(--blue)] hover:text-black"
              style={{borderColor:"var(--blue)",color:"var(--blue)",fontFamily:"'Orbitron',sans-serif"}}>
              VIEW ALL EXECUTIVES →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
