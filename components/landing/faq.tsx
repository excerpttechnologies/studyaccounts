"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How realistic are the GST/TDS simulations?",
    answer: "Our simulations are designed to mirror the actual government portals as closely as possible. We continuously update our interfaces to match any changes in the official portals, ensuring students get hands-on experience that directly translates to real-world filing.",
  },
  {
    question: "Can I customize the platform with my institute's branding?",
    answer: "Yes! Professional and Enterprise plans support custom branding including your logo, color scheme, and custom domain. Enterprise customers can opt for a fully white-labeled solution.",
  },
  {
    question: "What happens to student data after the subscription ends?",
    answer: "We provide a 30-day grace period after subscription ends. During this time, you can export all student data, progress reports, and certificates. After 30 days, data is archived for 90 days before permanent deletion.",
  },
  {
    question: "Is the AI tutor available 24/7?",
    answer: "Yes, the AI tutor is available round the clock. It can answer questions about GST, TDS, and accounting concepts, provide hints during simulations, and explain errors. For complex queries, it can escalate to human support during business hours.",
  },
  {
    question: "How do you handle updates when GST laws change?",
    answer: "Our content team monitors all GST/TDS circulars and notifications. Updates are typically rolled out within 48-72 hours of official announcements. Enterprise customers can also request priority updates for specific compliance requirements.",
  },
  {
    question: "Can students access the platform on mobile devices?",
    answer: "Yes, our platform is fully responsive and works on tablets and smartphones. However, for the best simulation experience (especially for complex forms), we recommend using a desktop or laptop computer.",
  },
  {
    question: "Do you offer bulk discounts for large institutes?",
    answer: "Absolutely! We offer volume-based discounts for institutes with more than 500 students. Contact our sales team for a custom quote tailored to your needs.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, net banking, UPI, and bank transfers. For Enterprise plans, we also offer invoice-based payment with NET 30 terms.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about SmartAccounts.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 space-y-3"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-4 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
