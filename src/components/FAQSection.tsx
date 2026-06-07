"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Zap, ChevronRight } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";
import { faqsEnglish, faqsSpanish } from "@/lib/data/questions";

export function FAQSection() {
  const t = useTranslations("FAQ");
  const locale = useLocale();
  const faqs = locale == "es" ? faqsSpanish : faqsEnglish;

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-yellow-400/10 blur-[110px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-500/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* COLUMN 1 */}
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full max-w-xl aspect-square mx-auto lg:mx-0 group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(250,204,21,0.12)_0%,_transparent_70%)] animate-pulse" />

              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-yellow-400/40 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-orange-500/40 rounded-br-3xl" />

              <Image
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop"
                alt={t("imageAlt")}
                fill
                className="object-cover relative z-10 rounded-3xl border border-yellow-500/20 filter drop-shadow-[0_0_35px_rgba(250,204,21,0.18)] group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Info Badge */}
              <div className="absolute top-10 right-0 bg-slate-900/85 border border-yellow-500/20 backdrop-blur-xl p-4 rounded-2xl shadow-2xl animate-bounce duration-[5000ms]">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />

                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                    {t("knowledgeBase")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2 */}
          <div className="order-1 lg:order-2">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-yellow-500/20 rounded-lg mb-6">
                <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />

                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  {t("badge")}
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-6">
                {t("title")}{" "}
                <span className="text-yellow-400">
                  {t("titleHighlight")}
                </span>
                <span className="text-orange-500">.</span>
              </h2>

              <p className="text-slate-400 font-medium leading-relaxed max-w-lg">
                {t("description")}
              </p>
            </div>

            {/* ACCORDION */}
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-slate-900/40 border border-slate-800 rounded-2xl px-6 transition-all duration-300 data-[state=open]:border-yellow-400/50 data-[state=open]:bg-slate-900/80 group"
                >
                  <AccordionTrigger className="text-left text-slate-300 hover:text-white py-6 text-base font-bold tracking-tight hover:no-underline [&[data-state=open]>svg]:rotate-90 [&[data-state=open]]:text-yellow-400">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono text-slate-600 group-data-[state=open]:text-yellow-400/60 transition-colors">
                        [0{index + 1}]
                      </span>

                      {faq.question}
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="text-slate-400 pb-6 leading-relaxed font-medium border-t border-yellow-500/10 pt-4">
                    <div className="flex gap-4">
                      <ChevronRight className="w-4 h-4 text-orange-500 shrink-0 mt-1" />

                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>
    </section>
  );
}