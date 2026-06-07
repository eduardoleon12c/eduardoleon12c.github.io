"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  HeartPulse,
  HandHeart,
  Users,
  ChevronRight,
  Shield,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function WhyChooseUsSection() {
  const t = useTranslations("WhyChooseUsSection");

  const benefits = [
    { title: t("benefits.health"), icon: HeartPulse },
    { title: t("benefits.family"), icon: Users },
    { title: t("benefits.philanthropy"), icon: HandHeart },
  ];

  const impactStats = [
    { value: "15", label: t("stats.age") },
    { value: "Global", label: t("stats.reach") },
    { value: "Youth", label: t("stats.focus") },
  ];

  return (
    <section
      id="impacto"
      className="py-24 bg-[#070707] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(218,41,28,0.25),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,205,0,0.2),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(0,106,78,0.2),transparent_42%)]" />
      <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_18px)]" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-16 items-center">
          {/* CONTENT COLUMN */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-[#FFCD00]/25 rounded-full mb-6 backdrop-blur-xl">
              <div className="w-2 h-2 bg-[#DA291C] rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
                {t("badge")}
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-8 leading-[0.95]">
              {t("title.before")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFCD00] via-white to-[#DA291C]">
                {t("title.highlight")}
              </span>
              <span className="text-[#DA291C]">.</span>
            </h2>

            <p className="text-slate-300 text-lg mb-10 leading-relaxed font-medium">
              {t.rich("description", {
                white: (chunks) => <span className="text-white font-semibold">{chunks}</span>,
                green: (chunks) => <span className="text-[#FFCD00] font-semibold">{chunks}</span>,
                orange: (chunks) => <span className="text-[#DA291C] font-semibold">{chunks}</span>,
              })}
            </p>

            {/* BENEFITS */}
            <div className="grid sm:grid-cols-1 gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-4 bg-white/10 border border-white/10 rounded-2xl hover:border-[#FFCD00]/50 hover:bg-white/[0.13] transition-all duration-300 backdrop-blur-xl"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#006A4E] to-[#DA291C] border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-white font-black tracking-tight">
                      {benefit.title}
                    </span>

                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#FFCD00]" />
                      <span className="text-[10px] uppercase text-white/45 font-black tracking-widest">
                        {t("verified")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="#inspiracion"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-[#FFCD00] hover:bg-[#DA291C] text-[#070707] hover:text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_10px_30px_rgba(255,205,0,0.24)] hover:scale-[1.02]"
            >
              {t("cta")}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* VISUAL COLUMN */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative min-h-[580px]">
              {/* Main Image Card */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#006A4E] via-[#FFCD00] to-[#DA291C] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.45)] rotate-2">
                <div className="relative w-full h-full overflow-hidden rounded-[1.6rem] bg-black">
                  <Image
                    src="https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=1200&auto=format&fit=crop"
                    alt={t("imageAlt")}
                    fill
                    className="object-cover brightness-90 contrast-110 saturate-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FFCD00] mb-3">
                      {t("visual.kicker")}
                    </p>
                    <h3 className="text-4xl sm:text-5xl font-black uppercase text-white leading-none">
                      {t("visual.title")}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -top-6 left-6 bg-[#FFCD00] text-[#070707] rounded-2xl p-5 shadow-2xl max-w-[220px]">
                <HeartPulse className="w-7 h-7 mb-3" />
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
                  {t("floating.healthLabel")}
                </p>
                <p className="text-xl font-black uppercase leading-none mt-1">
                  {t("floating.healthValue")}
                </p>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute top-24 -right-4 bg-[#DA291C] text-white rounded-2xl p-5 shadow-2xl max-w-[210px]">
                <HandHeart className="w-7 h-7 mb-3" />
                <p className="text-[10px] font-black uppercase tracking-widest text-white/70">
                  {t("floating.impactLabel")}
                </p>
                <p className="text-xl font-black uppercase leading-none mt-1">
                  {t("floating.impactValue")}
                </p>
              </div>

              {/* Floating Badge 3 */}
              <div className="absolute -bottom-6 left-10 bg-white/10 border border-white/15 text-white rounded-2xl p-5 shadow-2xl backdrop-blur-xl max-w-[260px]">
                <Shield className="w-7 h-7 mb-3 text-[#FFCD00]" />
                <p className="text-[10px] font-black uppercase tracking-widest text-white/50">
                  {t("floating.supportLabel")}
                </p>
                <p className="text-xl font-black uppercase leading-none mt-1">
                  {t("floating.supportValue")}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="absolute -bottom-4 -right-4 bg-[#0B1120]/90 border border-[#FFCD00]/20 p-4 rounded-2xl shadow-2xl z-20 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-[#FFCD00] rounded-full" />
                    <div className="absolute inset-0 w-3 h-3 bg-[#FFCD00] rounded-full animate-ping" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">
                      {t("status.label")}
                    </span>

                    <span className="text-xs font-bold text-white leading-none">
                      {t("status.value")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* IMPACT STATS */}
            <div className="grid grid-cols-3 gap-3 mt-12">
              {impactStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/10 border border-white/10 p-4 text-center backdrop-blur-xl"
                >
                  <p className="text-2xl font-black text-[#FFCD00]">
                    {stat.value}
                  </p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/50 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM QUOTE BAR */}
        <div className="mt-24 rounded-[2rem] overflow-hidden bg-gradient-to-r from-[#006A4E] via-[#111111] to-[#DA291C] border border-white/10 p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFCD00] text-[#070707] flex items-center justify-center">
                <Sparkles className="w-7 h-7" />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FFCD00] mb-2">
                  {t("quote.kicker")}
                </p>
                <p className="text-white text-lg md:text-xl font-bold italic">
                  “{t("quote.text")}”
                </p>
              </div>
            </div>

            <Link
              href="#inspiracion"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#070707] hover:bg-[#FFCD00] font-black uppercase tracking-widest text-xs transition-colors"
            >
              {t("quote.button")}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}