import { Navbar }   from '@/components/landing/navbar';
import { Hero }     from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Pricing }  from '@/components/landing/pricing';
import { About }    from '@/components/landing/about';
import { Insights } from '@/components/landing/insights';
import { Contact }  from '@/components/landing/contact';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* id="hero"     — IntersectionObserver sentinel lives inside */}
      <Navbar />
      <Hero />

      {/* id="services" — Features section doubles as Services */}
      <Features />

      {/* id="pricing"  */}
      <Pricing />

      {/* id="about"    */}
      <About />

      {/* id="insights" */}
      <Insights />

      {/* id="contact"  */}
      <Contact />
    </main>
  );
}
