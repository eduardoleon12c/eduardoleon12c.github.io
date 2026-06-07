"use client";

import Link from "next/link";
import {
  Trophy,
  ChevronRight,
  Heart,
  Star,
  Dumbbell,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("Footer");

  return (
    <footer
      id="footer"
      className="bg-[#070707] relative overflow-hidden border-t border-white/10"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,205,0,0.18),transparent_35%),radial-gradient(circle_at_90%_15%,rgba(218,41,28,0.22),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(0,106,78,0.2),transparent_42%)]" />
      <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_18px)]" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* FINAL STATEMENT */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#006A4E] via-[#111111] to-[#DA291C] border border-white/10 p-8 md:p-12 mb-16">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#006A4E] via-[#FFCD00] to-[#DA291C]" />

          <div className="relative z-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
            <Link href="#inicio" className="group flex items-center gap-4">
              <div className="relative flex items-center justify-center w-16 h-16 bg-[#FFCD00] rounded-3xl group-hover:scale-105 transition-all shadow-2xl">
                <Trophy className="w-8 h-8 text-[#070707] fill-[#070707]" />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-3xl font-black tracking-tight text-white uppercase">
                  CR7<span className="text-[#FFCD00]">Legacy</span>
                </span>

                <span className="text-[9px] font-black tracking-[0.4em] text-white/50 uppercase mt-2">
                  {t("secureTerminal")}
                </span>
              </div>
            </Link>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FFCD00] mb-3">
                {t("final.kicker")}
              </p>

              <h3 className="text-3xl md:text-5xl font-black uppercase text-white leading-none mb-5">
                {t("final.title")}
              </h3>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
                {t("mission")}
              </p>
            </div>
          </div>
        </div>

        {/* LINKS AREA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Navigation */}
          <div className="rounded-[2rem] bg-white/[0.06] border border-white/10 p-7 backdrop-blur-xl">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#FFCD00] rounded-full" />
              {t("navigation")}
            </h4>

            <ul className="space-y-4">
              {[
                { label: t("home"), href: "#inicio" },
                { label: t("about"), href: "#biografia" },
                { label: t("impact"), href: "#impacto" },
                { label: t("inspiration"), href: "#inspiracion" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-[#FFCD00] flex items-center gap-2 group transition-colors text-sm font-bold"
                  >
                    <ChevronRight className="w-3 h-3 text-white/20 group-hover:text-[#FFCD00] transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legacy Topics */}
          <div className="rounded-[2rem] bg-white/[0.06] border border-white/10 p-7 backdrop-blur-xl">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#DA291C] rounded-full" />
              {t("legacy")}
            </h4>

            <ul className="space-y-4">
              {[
                { label: t("madeira"), icon: Star },
                { label: t("discipline"), icon: Dumbbell },
                { label: t("impactTopic"), icon: Heart },
              ].map((item) => (
                <li key={item.label}>
                  <div className="text-white/50 hover:text-[#DA291C] transition-colors text-sm font-bold flex items-center gap-2">
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quote */}
          <div className="rounded-[2rem] bg-white/[0.06] border border-white/10 p-7 backdrop-blur-xl">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#FFCD00] rounded-full" />
              {t("quoteTitle")}
            </h4>

            <div className="space-y-5">
              <p className="text-slate-300 text-lg leading-relaxed italic font-semibold">
                “{t("quote")}”
              </p>

              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#FFCD00]">
                  Cristiano Ronaldo
                </p>

                <Link
                  href="#inicio"
                  className="w-10 h-10 rounded-xl bg-[#FFCD00] hover:bg-[#DA291C] text-[#070707] hover:text-white flex items-center justify-center transition-colors"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* MINI STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[t("strip.discipline"), t("strip.resilience"), t("strip.legacy")].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl bg-white/[0.06] border border-white/10 p-5 text-center backdrop-blur-xl"
              >
                <p className="text-sm font-black uppercase tracking-widest text-[#FFCD00]">
                  {item}
                </p>
              </div>
            )
          )}
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest text-center lg:text-left">
            © {currentYear}{" "}
            <span className="text-white/70">CR7 LEGACY PROJECT</span>.{" "}
            {t("copyright")}
          </p>

          <div className="flex items-center gap-2 text-white/30">
            <Sparkles className="w-3.5 h-3.5 text-[#FFCD00]" />
            <p className="text-[10px] font-black uppercase tracking-widest text-center">
              {t("projectNote")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}