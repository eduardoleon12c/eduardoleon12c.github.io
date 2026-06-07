"use client";

import { Check, Plus, ShoppingCart, Layers } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

import { useLocale, useTranslations } from "next-intl";
import { fullServicesEnglish, fullServicesSpanish } from "@/lib/data/services";

export function AdditionalServicesSection() {
  const addItem = useCartStore((state) => state.addItem);
  const t = useTranslations("AdditionalServices");
  const locale = useLocale();
  const fullServices =
    locale == "es" ? fullServicesSpanish : fullServicesEnglish;

  const handleAddToCart = (service: typeof fullServices[0]) => {
    addItem({
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      sku: service.sku,
    });
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Fondo eléctrico */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.08),transparent_35%)]" />

      {/* Separador visual superior */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-[10px] font-black uppercase tracking-[0.22em]">
              Servicios eléctricos
            </span>

            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
              {t("title1")}{" "}
              <span className="text-yellow-400">{t("titleHighlight")}</span>
              <span className="text-orange-500">+</span>
            </h2>

            <p className="text-slate-400 font-medium leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 px-6 py-4 bg-slate-900/70 border border-yellow-500/20 rounded-2xl shadow-[0_0_25px_rgba(250,204,21,0.08)]">
            <Layers className="w-10 h-10 text-yellow-400 opacity-80" />

            <div className="flex flex-col">
              <span className="text-white font-bold uppercase tracking-widest text-[10px]">
                {t("addons")}
              </span>

              <span className="text-slate-400 text-xs font-mono">
                {t("status")}
              </span>
            </div>
          </div>
        </div>

        {/* SERVICES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fullServices.map((service) => (
            <div
              key={service.id}
              className="group relative bg-slate-900/50 border border-slate-800 hover:border-yellow-400/60 rounded-2xl p-7 transition-all duration-500 hover:bg-slate-900/80 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(250,204,21,0.08)]"
            >
              {/* Card Decoration */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 group-hover:text-yellow-400 transition-all">
                <Plus className="w-5 h-5" />
              </div>

              <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex flex-col h-full">
                {/* Title & Desc */}
                <div className="mb-6">
                  <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-yellow-400 transition-colors mb-3">
                    {service.name}
                  </h3>

                  <p className="text-slate-400 text-sm font-medium leading-snug min-h-[40px]">
                    {service.description}
                  </p>
                </div>

                {/* Price Block */}
                <div className="mb-6 p-4 bg-slate-950/70 border border-yellow-500/10 rounded-xl">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      MXN
                    </span>

                    <span className="text-3xl font-black text-white tracking-tighter">
                      $
                      {service.price.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">
                      {t("serial")} {service.sku.replace("SKU: ", "")}
                    </span>

                    <span className="text-[10px] font-black text-yellow-400 uppercase">
                      + IVA
                    </span>
                  </div>
                </div>

                {/* Features List */}
                {service.features.length > 0 && (
                  <ul className="space-y-3 mb-8 flex-grow">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <div className="flex-shrink-0 w-4 h-4 bg-emerald-400/10 border border-emerald-400/20 rounded flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                        </div>

                        <span className="text-slate-300 text-xs font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Button */}
                <button
                  onClick={() => handleAddToCart(service)}
                  className="group/btn relative w-full py-4 bg-yellow-400 hover:bg-orange-500 text-slate-950 hover:text-white font-black uppercase tracking-[0.15em] text-[10px] rounded-xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden shadow-[0_0_20px_rgba(250,204,21,0.18)]"
                >
                  <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />

                  <span>{t("addToCart")}</span>

                  {/* Hover effect light */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </section>
  );
}