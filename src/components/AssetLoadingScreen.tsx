"use client";

import React, { useState, useEffect } from "react";

export default function AssetLoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Smoothly animate progress from 0% to 100% over 1.7 seconds
    const startTime = Date.now();
    const duration = 1700;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(current);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  // Circular progress calculations (Radius = 52, Circumference ≈ 326.7)
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <div
      className={`fixed inset-0 z-[99999999] flex flex-col items-center justify-center bg-[#02121e] text-white px-6 select-none transition-all duration-700 ease-out ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#c1111e]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#38bdf8]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Center Content */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        
        {/* ==============================================================
            ROUND BLUE-RED GRADIENT CIRCULAR PROGRESS BAR AROUND UKM LOGO
            ============================================================== */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center mb-6">
          
          {/* Circular SVG Progress Bar */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="ukmLoadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e02432" />
                <stop offset="50%" stopColor="#ff4757" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>

            {/* Muted Track Circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="4"
              fill="transparent"
            />

            {/* Dynamic Animated Gradient Progress Ring */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="url(#ukmLoadingGradient)"
              strokeWidth="4.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-75 ease-out"
            />
          </svg>

          {/* Inner Logo Disc */}
          <div className="absolute inset-4 rounded-full bg-[#021724]/90 backdrop-blur-xl border border-white/15 flex items-center justify-center p-3.5 shadow-2xl">
            <img
              src="/assets/logo/Logo-UKMKHD-cropped.png"
              alt="Logo UKMKHD UNAIR"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>
        </div>

        {/* Brand Title Text */}
        <div className="space-y-1">
          <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-white block uppercase">
            UKMKHD UNIVERSITAS AIRLANGGA
          </span>
          <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-white block uppercase">
            Kabinet Nivaramitra 2026
          </span>
        </div>

        {/* Progress Percentage Indicator */}
        <p className="mt-6 font-subheading text-xs text-white/60 tracking-wider">
          Memuat aset web {progress}%
        </p>

      </div>
    </div>
  );
}
