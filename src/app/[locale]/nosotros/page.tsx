"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check, ShieldCheck, Zap, Target, Users, Wrench } from "lucide-react";
import Image from "next/image";
import { FAQSection } from "@/components/FAQSection";
import { useTranslations } from "next-intl";

export default function NosotrosPage() {
  const t = useTranslations("AboutPage");

  const benefits = [
    {
      title: t("benefits.items.support"),
      icon: Wrench,
      color: "text-yellow-400",
    },
    {
      title: t("benefits.items.security"),
      icon: ShieldCheck,
      color: "text-orange-500",
    },
    {
      title: t("benefits.items.uptime"),
      icon: Zap,
      color: "text-yellow-400",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <Header />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-yellow-500/20 rounded-lg mb-6">
              <Users className="w-3.5 h-3.5 text-yellow-400" />

              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tight text-white mb-6">
              {t.rich("hero.title", {
                orange: (chunks) => (
                  <span className="text-orange-500">{chunks}</span>
                ),
                green: (chunks) => (
                  <span className="text-yellow-400">{chunks}</span>
                ),
              })}
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 border border-slate-800 rounded-3xl translate-x-4 translate-y-4 -z-10" />

                <div className="absolute inset-0 bg-slate-900/50 border border-yellow-500/20 rounded-3xl backdrop-blur-sm overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200&auto=format&fit=crop"
                    alt={t("imageAlt")}
                    fill
                    className="object-cover filter brightness-110 contrast-110 rounded-3xl"
                  />
                </div>

                <div className="absolute -bottom-6 -right-6 bg-slate-950 border border-yellow-400/30 p-4 rounded-2xl shadow-2xl animate-bounce duration-[4000ms]">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />

                    <span className="text-[10px] font-black uppercase text-white tracking-widest">
                      {t("floatingBadge")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-6 flex items-center gap-3">
                  <Target className="w-6 h-6 text-yellow-400" />
                  {t("content.title")}
                </h2>

                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                  {t.rich("content.description", {
                    green: (chunks) => (
                      <span className="text-yellow-400 font-bold">
                        {chunks}
                      </span>
                    ),
                    orange: (chunks) => (
                      <span className="text-orange-500 font-bold">
                        {chunks}
                      </span>
                    ),
                  })}
                </p>
              </div>

              <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-4">
                  {t("benefits.title")}
                </h2>

                <div className="grid gap-4">
                  {benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-yellow-400/40 transition-all hover:bg-slate-900/80"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-950 border border-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                      </div>

                      <h3 className="text-white font-black uppercase tracking-tight text-lg">
                        {benefit.title}
                      </h3>

                      <Check className="ml-auto w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />

      <Footer />
    </main>
  );
}