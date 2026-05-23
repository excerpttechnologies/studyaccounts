'use client';

import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, CheckCircle } from 'lucide-react';

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: 'Email us',
    detail: 'hello@smartaccounts.com',
    sub: 'We reply within 4 hours',
    href: 'mailto:hello@smartaccounts.com',
  },
  {
    icon: Phone,
    title: 'Call us',
    detail: '+91 80 4567 8900',
    sub: 'Mon–Fri, 9 AM – 7 PM IST',
    href: 'tel:+918045678900',
  },
  {
    icon: MessageSquare,
    title: 'Live chat',
    detail: 'Chat with our team',
    sub: 'Available in the app',
    href: '#',
  },
  {
    icon: MapPin,
    title: 'Visit us',
    detail: 'Bengaluru, Karnataka',
    sub: '100 Feet Road, Indiranagar',
    href: '#',
  },
];

const FAQS = [
  { q: 'Is there a free trial?', a: 'Yes — the Free plan is free forever. Pro and Enterprise plans come with a 14-day free trial, no credit card required.' },
  { q: 'Can I import data from Tally or Zoho?', a: 'Absolutely. SmartAccounts supports one-click import from Tally, Zoho Books, QuickBooks, and Excel/CSV files.' },
  { q: 'Is my data secure?', a: 'Your data is encrypted with AES-256 at rest and in transit. We are SOC 2 Type II certified and GDPR compliant.' },
  { q: 'Do you support multi-company accounts?', a: 'Yes. Pro and Enterprise plans support multiple companies under a single login with separate ledgers and permissions.' },
  { q: 'How does GST auto-filing work?', a: 'SmartAccounts connects to the GSTN portal via API. It auto-computes your liability, generates GSTR-1/3B, and files on your behalf after your approval.' },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export function Contact() {
  const heading = useInView(0.2);
  const form    = useInView(0.1);
  const faq     = useInView(0.1);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq]     = useState<number | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="scroll-mt-20" style={{ background: '#141414' }}>

      {/* ── Header ──────────────────────────────────────────────── */}
      <div style={{ padding: '96px 40px 60px', maxWidth: '1100px', margin: '0 auto' }}>
        <div ref={heading.ref} className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase mb-5 px-3 py-1 rounded-full"
            style={{ background: '#222', color: '#CCFF00', border: '1px solid #333' }}
          >
            Contact
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            style={{
              opacity: heading.visible ? 1 : 0,
              transform: heading.visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            We'd love to hear from you.
          </h2>
          <p
            className="mt-4 text-base max-w-xl mx-auto leading-relaxed"
            style={{
              color: '#888',
              opacity: heading.visible ? 1 : 0,
              transition: 'opacity 0.6s ease 0.15s',
            }}
          >
            Whether you have a question, need a demo, or want to explore Enterprise pricing —
            our team is ready to help.
          </p>
        </div>

        {/* ── Contact method cards ─────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {CONTACT_METHODS.map((method, i) => {
            const Icon = method.icon;
            return (
              <a
                key={method.title}
                href={method.href}
                className="flex flex-col gap-3 rounded-2xl group"
                style={{
                  background: '#1A1A1A',
                  border: '1px solid #2A2A2A',
                  padding: '24px',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, transform 0.2s',
                  opacity: heading.visible ? 1 : 0,
                  transform: heading.visible ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${i * 0.08}s`,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#CCFF00'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#2A2A2A'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{ width: 40, height: 40, background: '#222', borderRadius: '10px' }}
                >
                  <Icon size={18} color="#CCFF00" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#555' }}>{method.title}</p>
                  <p className="text-sm font-semibold text-white">{method.detail}</p>
                  <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: '#666' }}>
                    <Clock size={10} /> {method.sub}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        {/* ── Form + FAQ grid ──────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact form */}
          <div
            ref={form.ref}
            className="rounded-2xl"
            style={{
              background: '#1A1A1A',
              border: '1px solid #2A2A2A',
              padding: '36px',
              opacity: form.visible ? 1 : 0,
              transform: form.visible ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
                <CheckCircle size={48} color="#CCFF00" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-white">Message sent!</h3>
                <p className="text-sm" style={{ color: '#888' }}>We'll get back to you within 4 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold mt-2"
                  style={{ color: '#CCFF00' }}
                >
                  Send another →
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-white mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    {['First name', 'Last name'].map(placeholder => (
                      <input
                        key={placeholder}
                        type="text"
                        placeholder={placeholder}
                        required
                        className="rounded-xl px-4 py-3 text-sm text-white outline-none w-full"
                        style={{ background: '#222', border: '1px solid #333' }}
                        onFocus={e => (e.currentTarget.style.borderColor = '#CCFF00')}
                        onBlur={e  => (e.currentTarget.style.borderColor = '#333')}
                      />
                    ))}
                  </div>
                  <input
                    type="email"
                    placeholder="Work email"
                    required
                    className="rounded-xl px-4 py-3 text-sm text-white outline-none"
                    style={{ background: '#222', border: '1px solid #333' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#CCFF00')}
                    onBlur={e  => (e.currentTarget.style.borderColor = '#333')}
                  />
                  <input
                    type="text"
                    placeholder="Company name"
                    className="rounded-xl px-4 py-3 text-sm text-white outline-none"
                    style={{ background: '#222', border: '1px solid #333' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#CCFF00')}
                    onBlur={e  => (e.currentTarget.style.borderColor = '#333')}
                  />
                  <select
                    className="rounded-xl px-4 py-3 text-sm outline-none"
                    style={{ background: '#222', border: '1px solid #333', color: '#888' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#CCFF00')}
                    onBlur={e  => (e.currentTarget.style.borderColor = '#333')}
                  >
                    <option value="">What can we help with?</option>
                    <option>Product demo</option>
                    <option>Enterprise pricing</option>
                    <option>Technical support</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                  <textarea
                    placeholder="Tell us more..."
                    rows={4}
                    className="rounded-xl px-4 py-3 text-sm text-white outline-none resize-none"
                    style={{ background: '#222', border: '1px solid #333' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#CCFF00')}
                    onBlur={e  => (e.currentTarget.style.borderColor = '#333')}
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl py-3 text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
                    style={{ background: '#CCFF00', color: '#000' }}
                  >
                    Send message →
                  </button>
                </form>
              </>
            )}
          </div>

          {/* FAQ accordion */}
          <div
            style={{
              opacity: form.visible ? 1 : 0,
              transform: form.visible ? 'translateX(0)' : 'translateX(20px)',
              transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
            }}
          >
            <h3 className="text-lg font-bold text-white mb-6">Frequently asked questions</h3>
            <div className="flex flex-col gap-2">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}
                >
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
                    <span
                      className="text-lg font-light shrink-0 transition-transform duration-200"
                      style={{
                        color: '#CCFF00',
                        transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}
                    >
                      +
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4">
                      <p className="text-sm leading-relaxed" style={{ color: '#777' }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Office hours note */}
            <div
              className="mt-6 rounded-xl flex items-start gap-3"
              style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', padding: '20px' }}
            >
              <Clock size={18} color="#CCFF00" strokeWidth={1.8} className="shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white mb-1">Support hours</p>
                <p className="text-xs leading-relaxed" style={{ color: '#666' }}>
                  Mon–Fri: 9 AM – 7 PM IST<br />
                  Sat: 10 AM – 4 PM IST<br />
                  Enterprise customers get 24/7 priority support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
