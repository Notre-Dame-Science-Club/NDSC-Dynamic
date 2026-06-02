"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: integrate Supabase auth
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{ paddingTop: "72px" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.15,
        }}
      />

      <div
        className="relative w-full max-w-md rounded-2xl border p-8"
        style={{ borderColor: "var(--border)", background: "var(--card)", backdropFilter: "blur(20px)" }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 border"
            style={{ borderColor: "var(--blue)", background: "#00d4ff11" }}
          >
            <LogIn size={28} style={{ color: "var(--blue)" }} />
          </div>
          <h1
            className="text-xl font-black tracking-widest mb-1"
            style={{ fontFamily: "'Orbitron', sans-serif", color: "var(--blue)" }}
          >
            MEMBER LOGIN
          </h1>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Notre Dame Science Club — Member Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-xs font-bold tracking-wider mb-2 uppercase"
              style={{ fontFamily: "'Share Tech Mono', monospace", color: "var(--muted)" }}
            >
              Email Address
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
              style={{
                background: "#0a1628",
                border: "1px solid var(--border)",
                color: "var(--white)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          <div>
            <label
              className="block text-xs font-bold tracking-wider mb-2 uppercase"
              style={{ fontFamily: "'Share Tech Mono', monospace", color: "var(--muted)" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 rounded-lg text-sm outline-none transition-all"
                style={{
                  background: "#0a1628",
                  border: "1px solid var(--border)",
                  color: "var(--white)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: "var(--muted)" }}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/members/forgot-password" className="text-xs hover:underline" style={{ color: "var(--blue)" }}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-black text-sm tracking-widest rounded-lg transition-all"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              background: loading ? "var(--muted)" : "var(--blue)",
              color: "#000",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Not a member yet?{" "}
            <Link href="/members/register" className="font-bold hover:underline" style={{ color: "var(--blue)" }}>
              Register here
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <span className="text-xs" style={{ color: "var(--muted)", fontFamily: "'Share Tech Mono', monospace" }}>OR</span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        <a
          href="https://www.facebook.com/NDSCOfficial"
          className="flex items-center justify-center gap-3 w-full py-3 rounded-lg border text-sm font-bold transition-all hover:border-[var(--blue)]"
          style={{ borderColor: "var(--border)", color: "var(--white)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Continue with Facebook
        </a>
      </div>
    </div>
  );
}
