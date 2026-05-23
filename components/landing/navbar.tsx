'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing',  href: '#pricing'  },
  { label: 'About',    href: '#about'    },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact',  href: '#contact'  },
];

const TICKER_ITEMS = [
  'AI Tools',
  'Real-time Collaboration',
  'Built-in Graphics',
  'Export All Formats',
  'Smart Automation',
  'GST & TDS Ready',
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── Main nav bar ─────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 w-full bg-white transition-shadow duration-300"
        style={{ boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none' }}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-[68px] flex items-center justify-between gap-4">

          {/* Left — logo (always visible) */}
          <Link
            href="/"
            className="text-[1.15rem] font-black tracking-tight text-[#0A0A0A] shrink-0 select-none"
          >
            SmartAccounts.
          </Link>

          {/* Center — pill nav (desktop) */}
          <div className="hidden md:flex items-center bg-[#F2F2F2] rounded-full px-5 py-[7px] gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-gray-600 hover:text-black transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right — auth */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/login"
              className="hidden sm:block text-[13px] font-medium text-gray-600 hover:text-black transition-colors"
            >
              Login
            </Link>
            <Link
              href="#pricing"
              className="text-[13px] font-semibold bg-[#0A0A0A] text-white rounded-lg px-4 py-2 hover:bg-neutral-800 active:scale-95 transition-all whitespace-nowrap"
            >
              Get Started →
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="block w-5 h-[2px] bg-black transition-all duration-300"
                style={{ transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }}
              />
              <span
                className="block w-5 h-[2px] bg-black transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-[2px] bg-black transition-all duration-300"
                style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-5 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-black py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <Link href="/login" className="text-sm font-medium text-gray-600">Login</Link>
              <Link href="#pricing" className="text-sm font-semibold bg-black text-white rounded-lg px-4 py-1.5">
                Get Started →
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── Marquee ticker strip ──────────────────────────────────── */}
      <div
        className="w-full overflow-hidden border-b border-gray-100"
        style={{ background: '#FAFAFA', height: '36px' }}
      >
        <div className="ticker-track flex items-center h-full gap-10 whitespace-nowrap">
          {/* Duplicate for seamless loop */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="text-[11px] font-medium tracking-wide text-gray-400 shrink-0 flex items-center gap-2"
            >
              <span
                className="inline-block w-1 h-1 rounded-full"
                style={{ background: '#CCFF00' }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
