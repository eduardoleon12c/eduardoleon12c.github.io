"use client";

import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdditionalServicesSection } from "@/components/AdditionalServicesSection";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Wrench, ChevronRight, Zap, Bolt } from "lucide-react";

export default function ServiciosPage() {
  const t = useTranslations("servicesPage");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Header />

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.10),transparent_55%)] -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-yellow-500/20 rounded-lg mb-6">
            <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />

            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              {t("hero.badge")}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6">
            {t.rich("hero.title", {
              orange: (chunks) => (
                <span className="text-orange-500">{chunks}</span>
              ),
              green: (chunks) => (
                <span className="text-yellow-400">{chunks}</span>
              ),
            })}
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            {t("hero.description")}
          </p>
        </div>
      </section>

      {/* 1. SERVICIO PRINCIPAL */}
      <section className="py-24 relative border-y border-yellow-500/10 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-yellow-400/60">
                  {t("shared.class")}
                </span>
                <div className="h-px flex-grow bg-yellow-500/10" />
              </div>

              <h2 className="text-4xl font-black uppercase tracking-tight mb-6">
                {t.rich("shared.title", {
                  orange: (chunks) => (
                    <span className="text-yellow-400">{chunks}</span>
                  ),
                })}
              </h2>

              <p className="text-slate-400 mb-8 leading-relaxed font-medium">
                {t("shared.description")}
              </p>

              <Link href="/contacto">
                <button className="group relative px-8 py-4 bg-yellow-400 hover:bg-orange-500 text-slate-950 hover:text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all duration-300 flex items-center gap-3 overflow-hidden shadow-[0_10px_25px_rgba(250,204,21,0.18)]">
                  <span>{t("shared.button")}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-shimmer" />
                </button>
              </Link>
            </div>

            <div className="order-1 lg:order-2 relative group">
              <div className="absolute inset-0 bg-yellow-400/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

              <Image
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200&auto=format&fit=crop"
                alt={t("shared.imageAlt")}
                width={450}
                height={450}
                className="mx-auto relative z-10 rounded-2xl border border-yellow-500/20 filter brightness-110 contrast-110 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICIO TÉCNICO */}
      <section className="py-24 relative">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-yellow-400/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-orange-500/10 blur-[100px] rounded-full opacity-100" />

              <Image
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1200&auto=format&fit=crop"
                alt={t("vps.imageAlt")}
                width={450}
                height={450}
                className="mx-auto rounded-2xl relative z-10 border border-yellow-500/20 filter brightness-110 contrast-110"
              />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-orange-400/70">
                  {t("vps.class")}
                </span>
                <div className="h-px flex-grow bg-yellow-500/10" />
              </div>

              <h2 className="text-4xl font-black uppercase tracking-tight mb-6">
                {t.rich("vps.title", {
                  green: (chunks) => (
                    <span className="text-yellow-400">{chunks}</span>
                  ),
                })}
              </h2>

              <p className="text-slate-400 mb-8 leading-relaxed font-medium">
                {t("vps.description")}
              </p>

              <Link href="/contacto">
                <button className="group relative px-8 py-4 bg-slate-800 hover:bg-yellow-400 text-white hover:text-slate-950 font-black uppercase tracking-widest text-[10px] rounded-xl transition-all duration-300 flex items-center gap-3 overflow-hidden border border-yellow-500/20 hover:border-yellow-400">
                  <span>{t("vps.button")}</span>

                  <Wrench className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICIO ESPECIALIZADO */}
      <section className="py-24 relative border-t border-yellow-500/10 bg-slate-900/10">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-slate-500">
                  {t("dedicated.class")}
                </span>
                <div className="h-px flex-grow bg-yellow-500/10" />
              </div>

              <h2 className="text-4xl font-black uppercase tracking-tight mb-6 text-white">
                {t.rich("dedicated.title", {
                  orange: (chunks) => (
                    <span className="text-orange-500">{chunks}</span>
                  ),
                })}
              </h2>

              <p className="text-slate-400 mb-8 leading-relaxed font-medium">
                {t("dedicated.description")}
              </p>

              <Link href="/contacto">
                <button className="group relative px-8 py-4 bg-white hover:bg-yellow-400 text-slate-950 font-black uppercase tracking-widest text-[10px] rounded-xl transition-all duration-300 flex items-center gap-3 overflow-hidden shadow-[0_10px_25px_rgba(255,255,255,0.08)]">
                  <span>{t("dedicated.button")}</span>

                  <ShieldCheck className="w-4 h-4" />
                </button>
              </Link>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-yellow-400/10 blur-[100px] rounded-full opacity-80" />

              <Image
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop"
                alt={t("dedicated.imageAlt")}
                width={450}
                height={450}
                className="mx-auto rounded-2xl relative z-10 border border-yellow-500/20 drop-shadow-[0_0_50px_rgba(250,204,21,0.08)]"
              />
            </div>
          </div>
        </div>
      </section>

      <AdditionalServicesSection />

      <Footer />

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </main>
  );
}