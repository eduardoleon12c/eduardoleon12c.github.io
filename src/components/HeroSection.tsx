"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  Flame,
  ChevronRight,
  Activity,
  Star,
  Dumbbell,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("HeroSection");

  const stats = [
    { value: "7", label: t("stats.number") },
    { value: "5x", label: t("stats.ballonDor") },
    { value: "900+", label: t("stats.goals") },
  ];

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#070707]"
    >
      {/* COLOR BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,106,78,0.28)_0%,transparent_34%),radial-gradient(circle_at_85%_25%,rgba(218,41,28,0.28)_0%,transparent_36%),radial-gradient(circle_at_50%_95%,rgba(255,205,0,0.22)_0%,transparent_42%)]" />

      {/* DIAGONAL SPORT STRIPES */}
      <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_18px)]" />

      {/* FIELD GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,205,0,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,205,0,0.07)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_65%,transparent_100%)]" />

      {/* PORTUGAL COLOR BAR */}
      <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-[#006A4E] via-[#FFCD00] to-[#DA291C]" />
      <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-[#DA291C] via-[#FFCD00] to-[#006A4E]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* TEXT CONTENT */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-[#FFCD00]/30 mb-6 backdrop-blur-xl group hover:border-[#FFCD00] transition-colors cursor-default">
              <div className="w-2 h-2 bg-[#DA291C] rounded-full animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 group-hover:text-[#FFCD00] transition-colors">
                {t("badge")}
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 leading-[0.85] tracking-tight uppercase text-white">
              {t("title.before")}{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFCD00] via-white to-[#DA291C] drop-shadow-[0_0_22px_rgba(255,205,0,0.35)]">
                {t("title.highlight")}
              </span>
            </h1>

            <p className="text-slate-300 text-lg mb-8 max-w-xl leading-relaxed font-medium">
              {t.rich("description", {
                white: (chunks) => <span className="text-white">{chunks}</span>,
                green: (chunks) => (
                  <span className="text-[#FFCD00] font-bold">{chunks}</span>
                ),
              })}
            </p>

            {/* MINI STATS */}
            <div className="grid grid-cols-3 gap-3 max-w-xl mb-10">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/10 border border-white/10 px-4 py-4 backdrop-blur-xl"
                >
                  <p className="text-2xl font-black text-[#FFCD00] leading-none">
                    {stat.value}
                  </p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/60 mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="#biografia"
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-[#FFCD00] hover:bg-[#DA291C] text-[#070707] hover:text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_10px_40px_rgba(255,205,0,0.28)] hover:scale-[1.02] overflow-hidden"
              >
                <span className="relative z-10">{t("buttons.startProject")}</span>
                <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="#impacto"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 border border-white/15 text-white font-bold rounded-xl hover:bg-[#006A4E] hover:text-white hover:border-[#FFCD00]/60 transition-all backdrop-blur-xl"
              >
                <Activity className="w-5 h-5 text-[#FFCD00]" />
                {t("buttons.viewPlans")}
              </Link>
            </div>
          </div>

          {/* IMAGE / SPORTS CARD */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Glow */}
              <div className="absolute -inset-8 bg-gradient-to-br from-[#006A4E]/30 via-[#FFCD00]/20 to-[#DA291C]/30 blur-[80px] rounded-full" />

              {/* Main card */}
              <div className="relative rounded-[2rem] bg-gradient-to-br from-[#006A4E] via-[#151515] to-[#DA291C] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.45)] rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-[#0B1120]">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
                    alt={t("imageAlt")}
                    fill
                    className="object-cover object-top brightness-110 contrast-110 saturate-125"
                    priority
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-black/45 border border-white/15 px-3 py-1 backdrop-blur-md">
                    <Star className="w-4 h-4 text-[#FFCD00] fill-[#FFCD00]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">
                      CR7
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FFCD00] mb-2">
                      {t("card.kicker")}
                    </p>
                    <h3 className="text-4xl font-black uppercase text-white leading-none">
                      Cristiano
                      <span className="block text-[#FFCD00]">Ronaldo</span>
                    </h3>
                  </div>
                </div>
              </div>

              {/* Floating Icons */}
              <div className="absolute -top-6 -left-4 w-16 h-16 bg-[#FFCD00] rounded-2xl flex items-center justify-center shadow-2xl animate-bounce duration-[3000ms] z-20">
                <Trophy className="w-8 h-8 text-[#070707]" />
              </div>

              <div className="absolute top-20 -right-6 w-14 h-14 bg-[#DA291C] rounded-full flex items-center justify-center shadow-2xl animate-bounce duration-[4000ms] z-20">
                <Flame className="w-6 h-6 text-white fill-white" />
              </div>

              <div className="absolute -bottom-6 left-8 bg-white/10 border border-white/15 rounded-2xl p-4 backdrop-blur-xl shadow-2xl z-20">
                <div className="flex items-center gap-3">
                  <Dumbbell className="w-5 h-5 text-[#FFCD00]" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-white/50">
                      {t("card.label")}
                    </p>
                    <p className="text-sm font-black text-white">
                      {t("card.value")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative rings */}
              <div className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 w-[115%] aspect-square border border-[#FFCD00]/30 rounded-full border-dashed animate-spin duration-[22s]" />
              <div className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 w-[95%] aspect-square border border-[#DA291C]/30 rounded-full animate-reverse-spin duration-[16s]" />
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            {t("scroll")}
          </span>
          <div className="w-[2px] h-12 bg-gradient-to-b from-[#FFCD00] via-[#DA291C] to-transparent rounded-full animate-bounce" />
        </div>
      </div>

      <style jsx>{`
        @keyframes reverse-spin {
          from {
            transform: translate(-50%, -50%) rotate(360deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }

        .animate-reverse-spin {
          animation: reverse-spin linear infinite;
        }
      `}</style>
    </section>
  );
}