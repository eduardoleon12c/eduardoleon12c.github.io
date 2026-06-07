"use client";

import { useState, useTransition } from "react";
import { Menu, X, ChevronDown, Globe, Trophy, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import Link from "next/link";
import { usePathname, useRouter } from "@/i18n/routing";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const t = useTranslations("Navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: "en", name: t("languages.en"), flag: "🇺🇸" },
    { code: "es", name: t("languages.es"), flag: "🇲🇽" },
  ];

  const navItems = [
    { name: t("nav.home"), href: "#inicio" },
    { name: t("nav.about"), href: "#biografia" },
    { name: t("nav.impact"), href: "#impacto" },
    { name: t("nav.inspiration"), href: "#inspiracion" },
  ];

  const switchLanguage = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
    setIsLangOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 z-30 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-visible rounded-2xl bg-black/55 backdrop-blur-2xl border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
          {/* Top color line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#006A4E] via-[#FFCD00] to-[#DA291C]" />

          <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
            {/* LOGO */}
            <Link href="#inicio" className="group flex items-center gap-3">
              <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#006A4E] via-[#111111] to-[#DA291C] border border-[#FFCD00]/30 rounded-2xl group-hover:border-[#FFCD00] transition-all shadow-[0_0_24px_rgba(255,205,0,0.18)]">
                <Trophy className="w-6 h-6 text-[#FFCD00] fill-[#FFCD00] group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFCD00] rounded-full animate-pulse shadow-[0_0_12px_rgba(255,205,0,0.9)]" />
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tight text-white uppercase">
                  CR7<span className="text-[#FFCD00]">Legacy</span>
                </span>

                <span className="text-[8px] font-bold tracking-[0.32em] text-white/45 uppercase">
                  {t("brand.infrastructure")}
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-bold text-white/70 hover:text-[#FFCD00] hover:bg-white/10 rounded-xl transition-all"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* DESKTOP ACTIONS */}
            <div className="hidden md:flex items-center gap-3">
              {/* LANGUAGE */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  disabled={isPending}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${
                    isLangOpen
                      ? "border-[#FFCD00] bg-[#FFCD00]/10 text-[#FFCD00]"
                      : "border-white/10 text-white/70 hover:border-[#FFCD00]/50 hover:text-[#FFCD00]"
                  } transition-all text-xs font-black uppercase tracking-widest`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  {locale}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      isLangOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isLangOpen && (
                  <div className="absolute top-full right-0 mt-3 w-48 bg-black/90 backdrop-blur-2xl border border-[#FFCD00]/20 rounded-xl shadow-[0_12px_35px_rgba(0,0,0,0.55)] overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="p-2 space-y-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => switchLanguage(lang.code)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-colors ${
                            locale === lang.code
                              ? "bg-[#FFCD00]/10 text-[#FFCD00]"
                              : "text-white/50 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-base">{lang.flag}</span>
                            {lang.name}
                          </span>

                          {locale === lang.code && (
                            <div className="w-1.5 h-1.5 bg-[#FFCD00] rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <Link
                href="#inspiracion"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFCD00] hover:bg-[#DA291C] text-[#070707] hover:text-white font-black uppercase tracking-widest text-xs transition-all"
              >
                <Sparkles className="w-4 h-4" />
                {t("cta")}
              </Link>
            </div>

            {/* MOBILE */}
            <div className="md:hidden flex items-center gap-3">
              <button
                className="p-2 rounded-xl bg-white/10 border border-white/10 text-white hover:border-[#FFCD00] transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* MOBILE NAVIGATION */}
          {isMenuOpen && (
            <div className="md:hidden py-6 border-t border-white/10 bg-black/70 backdrop-blur-2xl animate-in slide-in-from-top-4 duration-300">
              <nav className="flex flex-col space-y-2 px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-3 text-lg font-black uppercase tracking-tight text-white/70 hover:text-[#FFCD00] transition-all border-l-2 border-transparent hover:border-[#FFCD00] hover:bg-white/10 rounded-r-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="h-px bg-white/10 my-4" />

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">
                  {t("mobile.selectLanguage")}
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-sm transition-all ${
                        locale === lang.code
                          ? "border-[#FFCD00] bg-[#FFCD00]/10 text-[#FFCD00]"
                          : "border-white/10 text-white/50"
                      }`}
                    >
                      {lang.flag} {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>

                <Link
                  href="#inspiracion"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFCD00] hover:bg-[#DA291C] text-[#070707] hover:text-white font-black uppercase tracking-widest text-xs transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  {t("cta")}
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}