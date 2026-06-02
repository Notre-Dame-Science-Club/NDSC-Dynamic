import Link from "next/link";
import { Users, LogIn, UserPlus, Shield, Bell, Trophy } from "lucide-react";

const features = [
  { icon: Bell, title: "Announcements", desc: "Get email & SMS notifications for all club updates" },
  { icon: Trophy, title: "Olympiad Access", desc: "Participate in online olympiads and track your scores" },
  { icon: Shield, title: "Member Dashboard", desc: "View your profile, activity history, and certificates" },
  { icon: Users, title: "Community", desc: "Connect with fellow science enthusiasts" },
];

export default function MembersPage() {
  return (
    <div className="min-h-screen relative z-10" style={{ paddingTop: "72px" }}>
      <div
        className="py-20 text-center border-b"
        style={{ background: "linear-gradient(180deg, var(--bg2), var(--bg))", borderColor: "var(--border)" }}
      >
        <div className="section-label justify-center mb-2">Portal</div>
        <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          MEMBER <span style={{ color: "var(--blue)" }}>PORTAL</span>
        </h1>
        <p className="text-sm max-w-lg mx-auto mb-10" style={{ color: "var(--muted)" }}>
          Login to access your dashboard, participate in olympiads, and stay updated with all NDSC activities.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/members/login"
            className="flex items-center gap-2 px-8 py-3 font-black text-sm tracking-widest rounded"
            style={{ background: "var(--blue)", color: "#000", fontFamily: "'Orbitron', sans-serif" }}
          >
            <LogIn size={16} /> Login
          </Link>
          <Link
            href="/members/register"
            className="flex items-center gap-2 px-8 py-3 font-black text-sm tracking-widest rounded border"
            style={{ borderColor: "var(--blue)", color: "var(--blue)", fontFamily: "'Orbitron', sans-serif" }}
          >
            <UserPlus size={16} /> Register
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="section-label mb-2">Member Benefits</div>
        <h2 className="text-3xl font-black mb-10" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          WHY <span style={{ color: "var(--blue)" }}>JOIN?</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-6 rounded-xl border"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "#00d4ff11", border: "1px solid var(--border)" }}
              >
                <Icon size={22} style={{ color: "var(--blue)" }} />
              </div>
              <h3 className="font-bold text-sm tracking-wider mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>{title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
