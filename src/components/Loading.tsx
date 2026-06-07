"use client";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[999] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">

      {/* Glow background */}
      <div className="absolute w-[320px] h-[320px] bg-yellow-400/10 blur-3xl rounded-full" />
      <div className="absolute w-[220px] h-[220px] bg-orange-500/10 blur-3xl rounded-full" />

      {/* Spinner */}
      <div className="relative h-24 w-24 flex items-center justify-center">

        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-yellow-500/20" />

        {/* Animated gradient ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-yellow-400 border-r-orange-500 animate-spin" />

        {/* Inner subtle ring */}
        <div className="absolute inset-3 rounded-full border border-slate-800 opacity-60" />

        {/* Core */}
        <div className="relative h-10 w-10 bg-slate-900 border border-yellow-500/30 rounded-xl flex items-center justify-center shadow-[0_0_22px_rgba(250,204,21,0.18)]">
          <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
        </div>
      </div>

      {/* Text */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <span className="text-xs font-black tracking-[0.3em] text-slate-400 uppercase">
          Cargando
        </span>

        {/* Dots loader */}
        <div className="flex gap-1.5">
          <div className="h-1.5 w-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="h-1.5 w-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}