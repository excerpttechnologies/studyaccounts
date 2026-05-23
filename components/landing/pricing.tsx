'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, LayoutGrid, Table2, MessageCircle, Phone, Star } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────── */

type ViewMode = 'cards' | 'table';

interface Plan {
  scheme: string;
  units: number;
  pricePerUser: number;
  access: string;
  validity: string;
  benefits: string | null;
  popular?: boolean;
}

interface ProductTab {
  id: string;
  label: string;
  shortLabel: string;
  color: string;
  description: string;
  plans: Plan[];
  note?: string;
}

const PRODUCTS: ProductTab[] = [
  {
    id: 'gst-tds-itr',
    label: 'GST / TDS / ITR',
    shortLabel: 'GST/TDS/ITR',
    color: '#CCFF00',
    description: 'Complete simulation platform for GST filing, TDS management, and ITR preparation. Ideal for CA firms, tax consultants, and training institutes.',
    note: 'White labelling allows you to host the simulation portal on your own company domain.',
    plans: [
      { scheme: '10+',  units: 10,  pricePerUser: 449, access: 'Unlimited', validity: '3 Months',  benefits: null,           popular: false },
      { scheme: '50+',  units: 50,  pricePerUser: 399, access: 'Unlimited', validity: '6 Months',  benefits: null,           popular: true  },
      { scheme: '100+', units: 100, pricePerUser: 349, access: 'Unlimited', validity: '9 Months',  benefits: null,           popular: false },
      { scheme: '500+', units: 500, pricePerUser: 299, access: 'Unlimited', validity: '18 Months', benefits: 'White Labelled', popular: false },
    ],
  },
  {
    id: 'tds',
    label: 'TDS Only',
    shortLabel: 'TDS',
    color: '#78FFDC',
    description: 'Focused TDS simulation and compliance training. Perfect for payroll teams, finance departments, and TDS-specific coaching programs.',
    plans: [
      { scheme: '10+',  units: 10,  pricePerUser: 299, access: 'Unlimited', validity: '3 Months',  benefits: null,           popular: false },
      { scheme: '50+',  units: 50,  pricePerUser: 249, access: 'Unlimited', validity: '6 Months',  benefits: null,           popular: true  },
      { scheme: '100+', units: 100, pricePerUser: 199, access: 'Unlimited', validity: '9 Months',  benefits: null,           popular: false },
      { scheme: '500+', units: 500, pricePerUser: 149, access: 'Unlimited', validity: '18 Months', benefits: 'White Labelled', popular: false },
    ],
  },
  {
    id: 'itr',
    label: 'ITR Only',
    shortLabel: 'ITR',
    color: '#FFE878',
    description: 'Dedicated ITR filing simulation for individuals, HUFs, and businesses. Covers all ITR forms with real-world case studies.',
    plans: [
      { scheme: '10+',  units: 10,  pricePerUser: 599, access: 'Unlimited', validity: '3 Months',  benefits: null,           popular: false },
      { scheme: '50+',  units: 50,  pricePerUser: 499, access: 'Unlimited', validity: '6 Months',  benefits: null,           popular: true  },
      { scheme: '100+', units: 100, pricePerUser: 399, access: 'Unlimited', validity: '9 Months',  benefits: null,           popular: false },
      { scheme: '500+', units: 500, pricePerUser: 299, access: 'Unlimited', validity: '18 Months', benefits: 'White Labelled', popular: false },
    ],
  },
  {
    id: 'uae',
    label: 'UAE VAT & Corporate Tax',
    shortLabel: 'UAE VAT',
    color: '#FF9F78',
    description: 'UAE VAT and Corporate Tax simulation platform. Designed for UAE-based businesses, accounting firms, and professionals preparing for CT compliance.',
    plans: [
      { scheme: '10+',  units: 10,  pricePerUser: 599, access: 'Unlimited', validity: '3 Months',  benefits: null,           popular: false },
      { scheme: '50+',  units: 50,  pricePerUser: 549, access: 'Unlimited', validity: '6 Months',  benefits: null,           popular: true  },
      { scheme: '100+', units: 100, pricePerUser: 499, access: 'Unlimited', validity: '9 Months',  benefits: null,           popular: false },
      { scheme: '500+', units: 500, pricePerUser: 449, access: 'Unlimited', validity: '18 Months', benefits: 'White Labelled', popular: false },
    ],
  },
  {
    id: 'enterprise',
    label: 'Enterprise Bundle',
    shortLabel: 'Enterprise',
    color: '#C878FF',
    description: 'Full-suite enterprise bundle covering GST, TDS, ITR, UAE VAT & Corporate Tax. Includes white labelling, dedicated support, and custom domain.',
    note: 'Enterprise plans include a dedicated account manager, onboarding support, and SLA guarantee.',
    plans: [
      { scheme: '10+',  units: 10,  pricePerUser: 1499, access: 'Unlimited', validity: '3 Months',  benefits: null,           popular: false },
      { scheme: '50+',  units: 50,  pricePerUser: 1249, access: 'Unlimited', validity: '6 Months',  benefits: null,           popular: true  },
      { scheme: '100+', units: 100, pricePerUser: 1049, access: 'Unlimited', validity: '9 Months',  benefits: null,           popular: false },
      { scheme: '500+', units: 500, pricePerUser: 849,  access: 'Unlimited', validity: '18 Months', benefits: 'White Labelled', popular: false },
    ],
  },
];

const FEATURES = [
  'Unlimited user access per licence',
  'Real-world simulation scenarios',
  'Detailed step-by-step workflows',
  'Downloadable reports & certificates',
  'Dedicated support portal',
  'Regular compliance updates',
];

const TESTIMONIALS = [
  { name: 'CA Priya Sharma',    org: 'Sharma & Associates',       text: 'SmartAccounts cut our GST training time by 60%. The simulation portal is incredibly realistic.' },
  { name: 'Rajesh Mehta',       org: 'Mehta Tax Consultants',     text: 'The UAE VAT module helped us onboard 3 new clients in the Gulf. Excellent platform.' },
  { name: 'Dr. Anita Verma',    org: 'National Commerce College', text: 'We white-labelled the portal for our institute. Students love the hands-on experience.' },
];

/* ─────────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────────── */

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN');
}

function totalCost(plan: Plan) {
  return fmt(plan.units * plan.pricePerUser);
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─────────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────────────── */

function PlanCard({ plan, color, index, visible }: { plan: Plan; color: string; index: number; visible: boolean }) {
  return (
    <div
      className="relative flex flex-col"
      style={{
        background: plan.popular ? '#1A1A1A' : '#1E1E1E',
        borderRadius: '20px',
        padding: '28px',
        border: plan.popular ? `1px solid ${color}` : '1px solid #2A2A2A',
        gap: '20px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
      }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <span
          className="absolute text-[10px] font-black tracking-widest uppercase rounded-full px-3 py-1 flex items-center gap-1"
          style={{ top: 16, right: 16, background: color, color: '#000' }}
        >
          <Star size={9} fill="#000" strokeWidth={0} /> Best Value
        </span>
      )}

      {/* Scheme */}
      <div>
        <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color }}>
          {plan.scheme} Users
        </p>
        <div className="flex items-end gap-1.5">
          <span className="text-4xl font-black text-white leading-none">{fmt(plan.pricePerUser)}</span>
          <span className="text-xs pb-1" style={{ color: '#666' }}>/user</span>
        </div>
        <p className="text-xs mt-1.5" style={{ color: '#555' }}>
          Min. {plan.units} users · Total from {totalCost(plan)}
        </p>
      </div>

      {/* Validity pill */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="text-xs font-semibold rounded-full px-3 py-1"
          style={{ background: '#2A2A2A', color: '#aaa' }}
        >
          ⏱ {plan.validity}
        </span>
        {plan.benefits && (
          <span
            className="text-xs font-semibold rounded-full px-3 py-1"
            style={{ background: `${color}18`, color }}
          >
            ✦ {plan.benefits}
          </span>
        )}
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-2.5">
        {FEATURES.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <Check size={13} strokeWidth={2.5} className="shrink-0 mt-0.5" style={{ color }} />
            <span className="text-xs leading-relaxed" style={{ color: '#888' }}>{f}</span>
          </li>
        ))}
        <li className="flex items-start gap-2.5">
          <Check size={13} strokeWidth={2.5} className="shrink-0 mt-0.5" style={{ color }} />
          <span className="text-xs leading-relaxed" style={{ color: '#888' }}>Unlimited user access</span>
        </li>
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className="block w-full text-center rounded-xl py-3 text-sm font-semibold transition-all hover:opacity-90 active:scale-95 mt-auto"
        style={
          plan.popular
            ? { background: color, color: '#000' }
            : { background: 'transparent', color: '#fff', border: '1px solid #333' }
        }
      >
        {plan.units >= 500 ? 'Contact Sales' : 'Get Started'}
      </a>
    </div>
  );
}

function PlanTable({ plans, color, visible }: { plans: Plan[]; color: string; visible: boolean }) {
  return (
    <div
      className="overflow-x-auto rounded-2xl"
      style={{
        border: '1px solid #2A2A2A',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1A1A1A', borderBottom: '1px solid #2A2A2A' }}>
            {['Scheme', 'Min. Users', 'Price / User', 'Total Cost', 'User Access', 'Validity', 'Benefits', ''].map((h) => (
              <th
                key={h}
                className="text-left px-5 py-4 text-xs font-bold tracking-widest uppercase whitespace-nowrap"
                style={{ color: '#555' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, i) => (
            <tr
              key={plan.scheme}
              style={{
                background: plan.popular ? '#1A1A1A' : i % 2 === 0 ? '#181818' : '#161616',
                borderBottom: i < plans.length - 1 ? '1px solid #222' : 'none',
              }}
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{plan.scheme}</span>
                  {plan.popular && (
                    <span
                      className="text-[9px] font-black tracking-widest uppercase rounded-full px-2 py-0.5"
                      style={{ background: color, color: '#000' }}
                    >
                      Best Value
                    </span>
                  )}
                </div>
              </td>
              <td className="px-5 py-4 text-white font-semibold">{plan.units}</td>
              <td className="px-5 py-4">
                <span className="text-base font-black" style={{ color }}>{fmt(plan.pricePerUser)}</span>
              </td>
              <td className="px-5 py-4 text-white">{totalCost(plan)}</td>
              <td className="px-5 py-4">
                <span className="text-xs font-semibold rounded-full px-2.5 py-1" style={{ background: '#2A2A2A', color: '#aaa' }}>
                  {plan.access}
                </span>
              </td>
              <td className="px-5 py-4 text-white whitespace-nowrap">{plan.validity}</td>
              <td className="px-5 py-4">
                {plan.benefits ? (
                  <span className="text-xs font-semibold rounded-full px-2.5 py-1" style={{ background: `${color}18`, color }}>
                    ✦ {plan.benefits}
                  </span>
                ) : (
                  <span style={{ color: '#444' }}>—</span>
                )}
              </td>
              <td className="px-5 py-4">
                <a
                  href="#contact"
                  className="text-xs font-semibold rounded-lg px-3 py-1.5 whitespace-nowrap transition-all hover:opacity-80"
                  style={{ background: color, color: '#000' }}
                >
                  {plan.units >= 500 ? 'Contact Sales' : 'Get Started'}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────────── */

export function Pricing() {
  const [activeTab, setActiveTab]   = useState('gst-tds-itr');
  const [viewMode, setViewMode]     = useState<ViewMode>('cards');

  const heading     = useInView(0.2);
  const cards       = useInView(0.05);
  const testimonial = useInView(0.1);

  const product = PRODUCTS.find(p => p.id === activeTab)!;

  return (
    <section id="pricing" className="scroll-mt-20" style={{ background: '#141414' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 40px 80px' }}>

        {/* ── Heading ─────────────────────────────────────────────── */}
        <div ref={heading.ref} className="text-center mb-14">
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase mb-5 px-3 py-1 rounded-full"
            style={{ background: '#222', color: '#CCFF00', border: '1px solid #333' }}
          >
            Pricing
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            style={{
              opacity: heading.visible ? 1 : 0,
              transform: heading.visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            Transparent pricing for{' '}
            <span
              className="inline-flex items-center rounded-full px-4 py-1 align-middle"
              style={{ background: '#CCFF00', color: '#000' }}
            >
              every scale.
            </span>
          </h2>
          <p
            className="mt-5 text-base max-w-2xl mx-auto leading-relaxed"
            style={{
              color: '#888',
              opacity: heading.visible ? 1 : 0,
              transition: 'opacity 0.6s ease 0.15s',
            }}
          >
            GST · TDS · ITR · UAE VAT & Corporate Tax — pick the module your team needs.
            All plans include unlimited user access and regular compliance updates.
          </p>
        </div>

        {/* ── Product tab switcher ─────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {PRODUCTS.map(p => (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className="text-xs font-semibold rounded-full px-4 py-2 transition-all whitespace-nowrap"
              style={
                activeTab === p.id
                  ? { background: p.color, color: '#000' }
                  : { background: '#1E1E1E', color: '#888', border: '1px solid #2A2A2A' }
              }
            >
              {p.shortLabel}
            </button>
          ))}
        </div>

        {/* ── Product description + view toggle ───────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <p className="text-sm max-w-xl leading-relaxed" style={{ color: '#777' }}>
            {product.description}
          </p>
          {/* Card / Table toggle */}
          <div
            className="flex items-center rounded-xl p-1 shrink-0"
            style={{ background: '#1E1E1E', border: '1px solid #2A2A2A' }}
          >
            {([['cards', LayoutGrid], ['table', Table2]] as [ViewMode, typeof LayoutGrid][]).map(([mode, Icon]) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all capitalize"
                style={
                  viewMode === mode
                    ? { background: '#2A2A2A', color: '#fff' }
                    : { color: '#555' }
                }
              >
                <Icon size={13} />
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* ── Plans ───────────────────────────────────────────────── */}
        <div ref={cards.ref}>
          {viewMode === 'cards' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {product.plans.map((plan, i) => (
                <PlanCard
                  key={plan.scheme}
                  plan={plan}
                  color={product.color}
                  index={i}
                  visible={cards.visible}
                />
              ))}
            </div>
          ) : (
            <PlanTable plans={product.plans} color={product.color} visible={cards.visible} />
          )}
        </div>

        {/* Note */}
        {product.note && (
          <p className="text-xs mt-5 text-center" style={{ color: '#555' }}>
            ℹ️ {product.note}
          </p>
        )}

        {/* ── All products comparison strip ───────────────────────── */}
        <div
          className="mt-16 rounded-2xl overflow-x-auto"
          style={{ border: '1px solid #2A2A2A', background: '#1A1A1A' }}
        >
          <div className="px-6 py-5 border-b" style={{ borderColor: '#2A2A2A' }}>
            <h3 className="text-base font-bold text-white">Quick comparison — all modules</h3>
            <p className="text-xs mt-1" style={{ color: '#666' }}>Price per user for the 50+ scheme (best value tier)</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2A2A2A' }}>
                  <th className="text-left px-6 py-3 text-xs font-bold tracking-widest uppercase" style={{ color: '#555' }}>Module</th>
                  {['10+ Users', '50+ Users', '100+ Users', '500+ Users'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-bold tracking-widest uppercase whitespace-nowrap" style={{ color: '#555' }}>{h}</th>
                  ))}
                  <th className="text-left px-6 py-3 text-xs font-bold tracking-widest uppercase" style={{ color: '#555' }}>White Label</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p, i) => (
                  <tr
                    key={p.id}
                    style={{ borderBottom: i < PRODUCTS.length - 1 ? '1px solid #222' : 'none', background: activeTab === p.id ? '#1E1E1E' : 'transparent' }}
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold" style={{ color: p.color }}>{p.shortLabel}</span>
                    </td>
                    {p.plans.map(plan => (
                      <td key={plan.scheme} className="px-6 py-4 font-semibold text-white whitespace-nowrap">
                        {fmt(plan.pricePerUser)}
                        <span className="text-xs ml-1" style={{ color: '#555' }}>/user</span>
                      </td>
                    ))}
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold rounded-full px-2.5 py-1" style={{ background: `${p.color}18`, color: p.color }}>
                        500+ only
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── WhatsApp + Call CTAs ─────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="https://wa.me/918045678900"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-2xl py-4 font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
            style={{ background: '#25D366', color: '#fff' }}
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
          <a
            href="tel:+918045678900"
            className="flex items-center justify-center gap-3 rounded-2xl py-4 font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
            style={{ background: '#1E1E1E', color: '#fff', border: '1px solid #2A2A2A' }}
          >
            <Phone size={18} />
            Call Sales Team
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center gap-3 rounded-2xl py-4 font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
            style={{ background: '#CCFF00', color: '#000' }}
          >
            Request a Demo →
          </a>
        </div>

        {/* ── Testimonials ────────────────────────────────────────── */}
        <div ref={testimonial.ref} className="mt-16">
          <h3 className="text-xl font-bold text-white text-center mb-8">What our customers say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className="flex flex-col gap-4 rounded-2xl"
                style={{
                  background: '#1A1A1A',
                  border: '1px solid #2A2A2A',
                  padding: '24px',
                  opacity: testimonial.visible ? 1 : 0,
                  transform: testimonial.visible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={12} fill="#CCFF00" color="#CCFF00" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#888' }}>"{t.text}"</p>
                <div className="flex items-center gap-3 mt-auto pt-3" style={{ borderTop: '1px solid #222' }}>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                    style={{ background: '#2A2A2A', color: '#CCFF00' }}
                  >
                    {t.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{t.name}</p>
                    <p className="text-[10px]" style={{ color: '#555' }}>{t.org}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer note ─────────────────────────────────────────── */}
        <p className="text-center text-xs mt-10" style={{ color: '#444' }}>
          All prices in INR (₹) and exclusive of applicable GST. Prices are per user per validity period.
          Volume discounts available for 1000+ users — contact sales.
        </p>

      </div>
    </section>
  );
}
