"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";
import { cr7JourneyEnglish, cr7JourneySpanish } from "@/lib/data/services";

export function ServicesSection() {
  const t = useTranslations("ServicesSection");
  const locale = useLocale();

  const cr7Journey = locale === "es" ? cr7JourneySpanish : cr7JourneyEnglish;

  return (
    <section
      id="biografia"
      className="py-24 bg-[#070707] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(0,106,78,0.22),transparent_35%),radial-gradient(circle_at_90%_30%,rgba(218,41,28,0.24),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(255,205,0,0.18),transparent_42%)]" />

      <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.08)_0px,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_18px)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-[3px] bg-[#FFCD00]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFCD00]">
                {t("badge")}
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              {t("title.before")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFCD00] via-white to-[#DA291C]">
                {t("title.highlight")}
              </span>
              <span className="text-[#DA291C]">.</span>
            </h2>
          </div>

          <p className="text-slate-300 text-sm font-medium max-w-sm border-l border-[#FFCD00]/30 pl-6">
            {t("description")}
          </p>
        </div>

        {/* Journey Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {cr7Journey.map((card, index) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative overflow-hidden rounded-[2rem] bg-white/10 border border-white/10 hover:border-[#FFCD00]/60 transition-all duration-500 hover:-translate-y-2 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            >
              <div className="relative h-[420px]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 brightness-90 group-hover:brightness-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />

                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#FFCD00] text-[#070707] text-[10px] font-black uppercase tracking-widest">
                    {card.tag}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-black/45 border border-white/15 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                    0{index + 1}
                  </span>
                </div>

                <ArrowUpRight className="absolute top-5 right-5 w-6 h-6 text-white/70 group-hover:text-[#FFCD00] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />

                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="flex items-center gap-4 mb-4 text-white/70">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#FFCD00]" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {card.year}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#DA291C]" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {card.place}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-[#FFCD00] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-0 h-[4px] bg-gradient-to-r from-[#006A4E] via-[#FFCD00] to-[#DA291C] group-hover:w-full transition-all duration-700" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}