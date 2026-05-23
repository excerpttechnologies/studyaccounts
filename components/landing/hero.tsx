'use client';

import { useEffect, useRef, useState } from 'react';

export function Hero() {
  const [mounted, setMounted]   = useState(false);
  const [scrollY, setScrollY]   = useState(0);
  const sectionRef              = useRef<HTMLElement>(null);

  // Trigger entrance animation after mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Scroll-driven parallax / fade
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const progress = Math.min(scrollY / 500, 1);
  const scale    = 1 - progress * 0.06;
  const opacity  = 1 - progress * 0.55;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen bg-white overflow-hidden flex flex-col"
      style={{
        transform: `scale(${scale})`,
        opacity,
        transformOrigin: 'top center',
        transition: 'transform 0.06s linear, opacity 0.06s linear',
      }}
    >

      {/* ── Background mesh blob ─────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(204,255,0,0.10) 0%, rgba(200,230,255,0.08) 45%, transparent 75%)',
        }}
      />
      {/* Secondary soft orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-0"
        style={{
          width: '520px',
          height: '520px',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(circle, rgba(240,240,240,0.7) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Main content — vertically centered ───────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-5 pt-16 pb-40 text-center">

        {/* Eyebrow badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 mb-8 shadow-sm"
          style={{
            opacity:    mounted ? 1 : 0,
            transform:  mounted ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.55s ease, transform 0.55s ease',
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: '#CCFF00' }}
          />
          <span className="text-[12px] font-semibold text-gray-600 tracking-wide">
            Now with AI-powered accounting tools
          </span>
        </div>

        {/* Giant display heading */}
        <h1
          className="font-black text-[#0A0A0A] leading-[0.92] tracking-tight w-full"
          style={{
            fontSize:   'clamp(64px, 12vw, 160px)',
            opacity:    mounted ? 1 : 0,
            transform:  mounted ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s',
          }}
        >
          Smart
          <span style={{ color: '#0A0A0A' }}>Accounts</span>
          <span style={{ color: '#CCFF00' }}>.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-7 text-gray-500 max-w-[520px] leading-relaxed"
          style={{
            fontSize:   'clamp(15px, 1.8vw, 18px)',
            opacity:    mounted ? 1 : 0,
            transform:  mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.65s ease 0.22s, transform 0.65s ease 0.22s',
          }}
        >
          The accounting software that keeps your flow — with AI tools,
          real-time collaboration, and built-in financial graphics.
        </p>

        {/* CTA buttons */}
        <div
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{
            opacity:    mounted ? 1 : 0,
            transform:  mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.65s ease 0.34s, transform 0.65s ease 0.34s',
          }}
        >
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0A0A0A] text-white font-semibold px-6 py-3 text-sm hover:bg-neutral-800 active:scale-95 transition-all shadow-lg shadow-black/10"
          >
            Get Started Free →
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 text-[#0A0A0A] font-semibold px-6 py-3 text-sm hover:border-gray-400 hover:bg-gray-50 active:scale-95 transition-all"
          >
            Watch Demo ▶
          </a>
        </div>

        {/* Trust strip */}
        <div
          className="mt-10 flex items-center gap-2 text-xs text-gray-400"
          style={{
            opacity:    mounted ? 1 : 0,
            transition: 'opacity 0.65s ease 0.46s',
          }}
        >
          <span className="flex -space-x-1.5">
            {['A', 'B', 'C', 'D'].map((l, i) => (
              <span
                key={l}
                className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[9px] font-bold text-gray-600"
                style={{ zIndex: 4 - i }}
              >
                {l}
              </span>
            ))}
          </span>
          <span>Trusted by <strong className="text-gray-700">2M+</strong> users worldwide</span>
        </div>
      </div>

      {/* ── Bottom-left floating badge ────────────────────────────── */}
      <div
        className="absolute bottom-10 left-6 md:left-12 z-20 flex flex-col gap-2.5"
        style={{
          opacity:    mounted ? 1 : 0,
          transform:  mounted ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s',
        }}
      >
        {/* Avatar row + count */}
        <div className="flex items-center gap-3">
          <div className="flex">
            {[
              { initial: 'A', bg: '#E8E8E8' },
              { initial: 'B', bg: '#D8D8D8' },
              { initial: 'C', bg: '#C8C8C8' },
            ].map(({ initial, bg }, i) => (
              <div
                key={initial}
                className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-bold text-gray-700"
                style={{ background: bg, marginLeft: i === 0 ? 0 : '-8px', zIndex: 3 - i }}
              >
                {initial}
              </div>
            ))}
          </div>
          <div className="leading-tight">
            <p className="text-xl font-black text-[#0A0A0A]">2M+</p>
            <p className="text-[11px] text-gray-400">World active users</p>
          </div>
        </div>

        {/* Decorative dot row */}
        <div className="flex gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: i < 3 ? '#CCFF00' : '#E0E0E0' }}
            />
          ))}
        </div>
      </div>

      {/* ── Bottom-right: labels + neon CTA ──────────────────────── */}
      <div
        className="absolute bottom-10 right-6 md:right-12 z-20 flex flex-col items-end gap-5"
        style={{
          opacity:    mounted ? 1 : 0,
          transform:  mounted ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s',
        }}
      >
        {/* Vertical feature labels */}
        <div className="flex flex-col items-end gap-1.5">
          {[
            ['Web based',     '/01'],
            ['Collaborative', '/02'],
            ['Real-time',     '/03'],
          ].map(([label, num]) => (
            <p key={num} className="text-[11px] text-gray-400 tracking-wide">
              {label}&nbsp;&nbsp;
              <span className="text-gray-300">{num}</span>
            </p>
          ))}
        </div>

        {/* Neon circle CTA */}
        <button
          className="how-it-works-btn flex items-center justify-center rounded-full font-bold text-[#0A0A0A] text-[11px] leading-tight text-center"
          style={{
            width: '112px',
            height: '112px',
            background: '#CCFF00',
            padding: '12px',
            boxShadow: '0 0 0 0 rgba(204,255,0,0.5)',
          }}
        >
          ▶ How it<br />works?
        </button>
      </div>

      {/* ── Sentinel for Navbar IntersectionObserver ─────────────── */}
      <div id="hero-sentinel" className="absolute bottom-0 left-0 w-full h-px" />
    </section>
  );
}
