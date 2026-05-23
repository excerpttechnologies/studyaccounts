'use client';

export function LogoBar() {
  const companies = ['Acme', 'Stripe', 'Vercel', 'Figma', 'Notion', 'OpenAI'];

  return (
    <section id="logo-bar" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 mb-8 uppercase tracking-wider">
          Trusted by teams at
        </p>
        
        {/* Logo carousel - static on desktop, scrolling on mobile */}
        <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap">
          {companies.map((company, i) => (
            <div key={i} className="text-center">
              <div className="w-24 h-24 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-2">
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-600">{company}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
