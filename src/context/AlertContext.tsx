"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  X,
  CheckCircle,
  Info,
  AlertTriangle,
  Zap,
  ShieldAlert,
  Bolt,
} from "lucide-react";
import Image from "next/image";

export type AlertType = "error" | "success" | "warning" | "info";

export interface AlertOptions {
  title: string;
  message: string;
  icon?: React.ReactNode;
  image?: string;
  confirmText?: string;
  onClose?: () => void;
  type?: AlertType;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

// SISTEMA DE ESTILOS ELÉCTRICO
const typeStyles: Record<
  AlertType,
  {
    badge: string;
    iconWrap: string;
    iconColor: string;
    button: string;
    titleColor: string;
    borderColor: string;
    glow: string;
  }
> = {
  success: {
    badge: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    iconWrap: "bg-emerald-400/10 border-emerald-400/30",
    iconColor: "text-emerald-400",
    button:
      "bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.28)]",
    titleColor: "text-white",
    borderColor: "border-emerald-400/30",
    glow: "shadow-[0_0_50px_rgba(52,211,153,0.1)]",
  },
  error: {
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
    iconWrap: "bg-red-500/10 border-red-500/30",
    iconColor: "text-red-400",
    button:
      "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    titleColor: "text-white",
    borderColor: "border-red-500/30",
    glow: "shadow-[0_0_50px_rgba(239,68,68,0.1)]",
  },
  warning: {
    badge: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    iconWrap: "bg-yellow-400/10 border-yellow-400/30",
    iconColor: "text-yellow-400",
    button:
      "bg-yellow-400 hover:bg-orange-500 text-slate-950 hover:text-white shadow-[0_0_20px_rgba(250,204,21,0.28)]",
    titleColor: "text-white",
    borderColor: "border-yellow-400/30",
    glow: "shadow-[0_0_50px_rgba(250,204,21,0.1)]",
  },
  info: {
    badge: "bg-slate-800 text-slate-300 border-yellow-500/20",
    iconWrap: "bg-slate-900 border-yellow-500/20",
    iconColor: "text-yellow-400",
    button:
      "bg-slate-800 hover:bg-yellow-400 text-white hover:text-slate-950 border border-yellow-500/20",
    titleColor: "text-white",
    borderColor: "border-yellow-500/20",
    glow: "shadow-[0_0_40px_rgba(250,204,21,0.08)]",
  },
};

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AlertOptions | null>(null);

  const showAlert = useCallback((opts: AlertOptions) => {
    setOptions(opts);
    setIsOpen(true);
  }, []);

  const hideAlert = useCallback(() => {
    setIsOpen(false);
    if (options?.onClose) {
      options.onClose();
    }

    setTimeout(() => setOptions(null), 200);
  }, [options]);

  const type = options?.type || "info";
  const styles = typeStyles[type];

  const DefaultIcon =
    type === "success"
      ? CheckCircle
      : type === "error"
      ? ShieldAlert
      : type === "warning"
      ? AlertTriangle
      : Info;

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}

      {isOpen && options && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300"
            onClick={hideAlert}
          />

          {/* Modal */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="alert-title"
            className={`relative w-full max-w-md bg-slate-950 border ${styles.borderColor} rounded-[2rem] overflow-hidden ${styles.glow} animate-in zoom-in slide-in-from-bottom-4 duration-300 shadow-2xl`}
          >
            {/* Electric grid effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(250,204,21,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.025)_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Header / Top Bar */}
            <div className="flex items-center justify-between border-b border-yellow-500/10 bg-slate-900/70 px-6 py-4">
              <div className="flex items-center gap-3">
                <Bolt className="w-4 h-4 text-yellow-400" />

                <span
                  className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-md border ${styles.badge}`}
                >
                  Alert_{type}
                </span>
              </div>

              <button
                onClick={hideAlert}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-950 border border-slate-700 text-slate-400 hover:text-white hover:border-yellow-400/50 transition-all"
                aria-label="Cerrar alerta"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-8 relative">
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-yellow-500/20" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-yellow-500/20" />

              {/* Icon wrap */}
              <div className="flex justify-center mb-8">
                <div
                  className={`relative w-20 h-20 ${styles.iconWrap} flex items-center justify-center rounded-2xl border rotate-3 group`}
                >
                  <div className={`-rotate-3 transition-transform ${styles.iconColor}`}>
                    {options.icon || (
                      <DefaultIcon className="h-10 w-10 drop-shadow-[0_0_10px_currentColor]" />
                    )}
                  </div>

                  <div
                    className={`absolute inset-0 rounded-2xl border ${styles.borderColor} animate-ping opacity-20`}
                  />
                </div>
              </div>

              {/* Image support */}
              {options.image && (
                <div className="relative aspect-video w-full mb-8 rounded-xl overflow-hidden border border-yellow-500/20 bg-slate-950">
                  <Image
                    src={options.image}
                    alt="Alert Contextual"
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>
              )}

              {/* Text Content */}
              <div className="text-center mb-10">
                <h3
                  id="alert-title"
                  className={`text-2xl font-black uppercase tracking-tight ${styles.titleColor} mb-4`}
                >
                  {options.title}
                </h3>

                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium px-2">
                  {options.message}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={hideAlert}
                className={`group relative w-full h-14 rounded-xl font-black uppercase tracking-[0.2em] text-[11px] transition-all overflow-hidden flex items-center justify-center gap-3 ${styles.button}`}
              >
                <span className="relative z-10">
                  {options.confirmText || "Confirmar"}
                </span>

                <Zap className="w-4 h-4 relative z-10 group-hover:scale-125 transition-transform" />

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </button>

              <div className="mt-6 text-center">
                <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">
                  Electric Service: Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert debe ser usado dentro de AlertProvider");
  }
  return context;
};