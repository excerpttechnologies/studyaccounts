'use client';

import { Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'SmartAccounts transformed how we manage our accounting. What used to take 2 days now takes 2 hours. The ROI was immediate.',
    author: 'Sarah Johnson',
    role: 'Finance Director',
    company: 'TechStart Inc',
    initials: 'SJ',
  },
  {
    quote: 'The automation features are incredible. Our team loves the smart categorization and how easy it is to generate reports for audits.',
    author: 'Michael Chen',
    role: 'CFO',
    company: 'Global Ventures',
    initials: 'MC',
  },
  {
    quote: 'Best accounting software we\'ve used. The customer support is exceptional, and the mobile app keeps me informed wherever I am.',
    author: 'Emma Rodriguez',
    role: 'Business Owner',
    company: 'Sunset Creative Co',
    initials: 'ER',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Loved by thousands of businesses
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See what our customers say about SmartAccounts
          </p>
        </div>

        {/* Testimonials Grid - 3 columns responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              {/* 5-Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-400">{testimonial.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
