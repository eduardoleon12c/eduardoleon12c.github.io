"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/lib/cart-store";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import {
  Zap,
  CreditCard,
  Hash,
  Coins,
  ChevronDown,
  ShoppingCart,
  ShieldCheck,
  ArrowRight,
  Bolt,
} from "lucide-react";
import { useAlert } from "@/context/AlertContext";

export default function CustomPaymentForm() {
  const t = useTranslations("customPage");

  const addItem = useCartStore((state) => state.addItem);

  const [currency, setCurrency] = useState<"USD" | "MXN">("MXN");
  const [folio, setFolio] = useState("");
  const [paymentType, setPaymentType] = useState<"total" | "partial">("total");
  const [amount, setAmount] = useState("");

  const { showAlert } = useAlert();

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();

    if (!folio || !amount) {
      showAlert({
        title: t("alerts.errorTitle"),
        type: "error",
        message: t("alerts.incompleteProtocol"),
      });
      return;
    }

    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      showAlert({
        title: t("alerts.errorTitle"),
        type: "error",
        message: t("alerts.invalidAmount"),
      });
      return;
    }

    addItem({
      id: `${folio}-${paymentType}-${currency}`,
      name: t(
        paymentType === "total"
          ? "cart.totalPayment"
          : "cart.partialPayment"
      ),
      description: `${t("cart.folio")}: ${folio} | ${t(
        "cart.currency"
      )}: ${currency}`,
      price: numericAmount,
      sku: `FOLIO-${folio}`,
    });

    setFolio("");
    setAmount("");
    setPaymentType("total");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-yellow-400/30">
      <Header />

      <section className="relative pt-40 pb-24 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.08)_0%,_transparent_70%)] -z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(250,204,21,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(250,204,21,0.06)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-yellow-500/20 rounded-lg mb-6">
              <Bolt className="w-3.5 h-3.5 text-yellow-400" />

              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                {t("badge")}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4">
              {t("title.part1")}{" "}
              <span className="text-yellow-400">{t("title.highlight")}</span>
              <span className="text-orange-500">.</span>
            </h1>

            <p className="text-slate-400 max-w-2xl font-medium">
              {t("description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* IMAGE */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -inset-4 border border-yellow-500/10 rounded-[2rem] -z-10 group-hover:border-yellow-400/30 transition-colors duration-700" />

                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-yellow-500/20 bg-slate-900/50 backdrop-blur-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />

                  <Image
                    src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200&auto=format&fit=crop"
                    alt={t("imageAlt")}
                    fill
                    className="object-cover opacity-65 group-hover:opacity-85 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                  />

                  <div className="absolute bottom-6 left-6 right-6 z-20 space-y-4">
                    <div className="flex items-center gap-3 bg-slate-950/70 border border-yellow-500/20 p-3 rounded-xl backdrop-blur-md">
                      <ShieldCheck className="w-5 h-5 text-yellow-400" />

                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {t("securePayment")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="bg-slate-900/50 border border-yellow-500/20 rounded-3xl p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60" />

                <form onSubmit={handleAddToCart} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Currency */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                        <Coins className="w-3 h-3 text-yellow-400" />
                        {t("currency.label")}
                      </label>

                      <div className="relative">
                        <select
                          value={currency}
                          onChange={(e) =>
                            setCurrency(e.target.value as "USD" | "MXN")
                          }
                          className="w-full appearance-none bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white font-bold focus:outline-none focus:border-yellow-400/60 transition-all cursor-pointer"
                        >
                          <option value="MXN">{t("currency.mxn")}</option>
                          <option value="USD">{t("currency.usd")}</option>
                        </select>

                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                      </div>
                    </div>

                    {/* Payment Type */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                        <CreditCard className="w-3 h-3 text-yellow-400" />
                        {t("paymentType.label")}
                      </label>

                      <div className="relative">
                        <select
                          value={paymentType}
                          onChange={(e) =>
                            setPaymentType(
                              e.target.value as "total" | "partial"
                            )
                          }
                          className="w-full appearance-none bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white font-bold focus:outline-none focus:border-yellow-400/60 transition-all cursor-pointer"
                        >
                          <option value="total">
                            {t("paymentType.total")}
                          </option>
                          <option value="partial">
                            {t("paymentType.partial")}
                          </option>
                        </select>

                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Folio */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                      <Hash className="w-3 h-3 text-orange-400" />
                      {t("folio.label")}
                    </label>

                    <input
                      type="text"
                      value={folio}
                      onChange={(e) => setFolio(e.target.value)}
                      placeholder={t("folio.placeholder")}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white placeholder-slate-700 font-mono focus:outline-none focus:border-yellow-400/60 transition-all tracking-widest"
                    />
                  </div>

                  {/* Amount */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                      <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      {t("amount.label")}
                    </label>

                    <div className="relative">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-yellow-400 font-bold">
                        $
                      </div>

                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-10 py-5 text-2xl font-black text-white focus:outline-none focus:border-yellow-400/60 transition-all tracking-tighter"
                      />

                      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 font-black text-xs">
                        {currency}
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group relative w-full py-5 px-6 bg-yellow-400 hover:bg-orange-500 text-slate-950 hover:text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden shadow-[0_10px_30px_rgba(250,204,21,0.2)]"
                  >
                    <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />

                    <span>{t("button")}</span>

                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  </button>
                </form>

                {/* Footer */}
                <div className="mt-8 pt-8 border-t border-yellow-500/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />

                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                      {t("footer.systemsReady")}
                    </span>
                  </div>

                  <div className="text-[9px] font-mono text-slate-600">
                    AUTH_MODE: SECURE_PAYMENT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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