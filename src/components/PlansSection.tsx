"use client";

import Link from "next/link";
import {
  Quote,
  Sparkles,
  Dumbbell,
  Target,
  Crown,
  ArrowUpRight,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function PlansSection() {
  const t = useTranslations("PlansSection");

  const principles = [
    {
      icon: Dumbbell,
      title: t("principles.discipline.title"),
      description: t("principles.discipline.description"),
    },
    {
      icon: Target,
      title: t("principles.focus.title"),
      description: t("principles.focus.description"),
    },
    {
      icon: Crown,
      title: t("principles.legacy.title"),
      description: t("principles.legacy.description"),
    },
  ];

  return (
    <section
      id="inspiracion"
      className="relative overflow-hidden bg-[#070707] py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,205,0,0.24),transparent_34%),radial-gradient(circle_at_88%_20%,rgba(218,41,28,0.28),transparent_36%),radial-gradient(circle_at_50%_95%,rgba(0,106,78,0.24),transparent_42%)]" />
      <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_18px)]" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        {/* TOP INTRO */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-end mb-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-[#FFCD00]/25 px-4 py-2 backdrop-blur-xl mb-6">
              <Sparkles className="h-3.5 w-3.5 text-[#FFCD00] fill-[#FFCD00]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
                {t("badge")}
              </span>
            </div>

            <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-[0.9]">
              {t("title.before")}{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFCD00] via-white to-[#DA291C]">
                {t("title.highlight")}
              </span>
            </h2>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed font-medium max-w-2xl lg:ml-auto">
            {t.rich("description", {
              italic: (chunks) => (
                <span className="text-white italic font-semibold">
                  {chunks}
                </span>
              ),
            })}
          </p>
        </div>

        {/* FEATURE STORY BLOCK */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#006A4E] via-[#111111] to-[#DA291C] p-8 md:p-12 mb-10">
          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.12)_0px,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_18px)]" />

          <div className="relative z-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
            <div className="flex flex-col gap-6">
              <div className="w-20 h-20 rounded-3xl bg-[#FFCD00] text-[#070707] flex items-center justify-center shadow-2xl">
                <Quote className="w-10 h-10" />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FFCD00] mb-3">
                  {t("manifesto.kicker")}
                </p>

                <h3 className="text-4xl sm:text-5xl font-black uppercase text-white leading-none">
                  {t("manifesto.title")}
                </h3>
              </div>
            </div>

            <div>
              <p className="text-white text-2xl md:text-4xl font-black uppercase leading-tight">
                “{t("custom.description")}”
              </p>

              <p className="mt-6 text-slate-300 leading-relaxed max-w-2xl">
                {t("manifesto.description")}
              </p>
            </div>
          </div>
        </div>

        {/* PRINCIPLES - LANDING STYLE */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {principles.map((item, index) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 backdrop-blur-xl hover:bg-white/[0.1] transition-all duration-500"
            >
              <span className="absolute -right-3 -top-8 text-[120px] font-black text-white/[0.04] leading-none">
                0{index + 1}
              </span>

              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFCD00] to-[#DA291C] text-[#070707] flex items-center justify-center">
                    <item.icon className="w-8 h-8" />
                  </div>

                  <ArrowUpRight className="w-6 h-6 text-white/30 group-hover:text-[#FFCD00] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#006A4E] via-[#FFCD00] to-[#DA291C] group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>

        {/* FINAL CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-[2rem] bg-white/10 border border-white/10 px-8 py-7 backdrop-blur-xl">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FFCD00] mb-2">
              {t("final.kicker")}
            </p>
            <p className="text-white text-xl md:text-2xl font-black uppercase">
              {t("final.title")}
            </p>
          </div>

          <Link href="#inicio">
            <button className="px-8 py-4 rounded-xl bg-[#FFCD00] hover:bg-[#DA291C] text-[#070707] hover:text-white font-black uppercase tracking-widest text-xs transition-all">
              {t("custom.button")}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}