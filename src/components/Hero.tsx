"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import LiquidGlassCard from "./LiquidGlassCard";
import Hero3DFlame from "./Hero3DFlame";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative isolate min-h-screen flex items-center justify-center overflow-hidden bg-[#02121e] pt-20 lg:pt-24 pb-12 lg:pb-16"
    >
      {/* ==============================================================
          ACTIVE 60FPS ANIMATED CANVAS BACKGROUND
          Flowing Dark Blue, Deep Dark Red, and Vibrant Bright Red Blobs
          ============================================================== */}
      <AnimatedBackground />

      {/* Ambient Glow: Deep Cool Blue behind 3D card on right + Warm flame glow on left/center */}
      <div className="absolute top-1/4 right-8 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-[#023048]/35 rounded-full blur-[100px] lg:blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-16 left-8 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-[#c1111e]/14 rounded-full blur-[100px] lg:blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-6 left-1/4 w-[280px] lg:w-[450px] h-[280px] lg:h-[450px] bg-[#e02432]/12 rounded-full blur-[90px] lg:blur-[150px] pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* ============================================================
            MOBILE LAYOUT (< lg): "Visual Sandwich" Hierarchy
            Wordmark -> 3D Flame -> Subtitle & CTA -> Micro-stats
            Grand, impactful size to eliminate empty dead space
            ============================================================ */}
        <div className="flex lg:hidden flex-col items-center text-center space-y-4 pt-1 sm:pt-4">
          {/* Top Wordmark: Confident & Prominent */}
          <div className="flex flex-col items-center select-none">
            <span className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-none">
              Kabinet
            </span>
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.88] mt-1.5">
              <span className="inline-block bg-gradient-to-r from-[#e02432] via-[#ff4d5a] to-[#38bdf8] bg-clip-text text-transparent filter drop-shadow-md pb-1">
                NIVARAMITRA
              </span>
            </h1>
          </div>

          {/* 3D Flame Model Centerpiece: Grand scale, fills screen majestically without cut-off */}
          <div className="w-full max-w-[440px] relative flex items-center justify-center my-0">
            <div className="absolute w-[350px] sm:w-[440px] h-[350px] sm:h-[440px] bg-gradient-to-tr from-[#c1111e]/30 via-[#ff4d5a]/20 to-[#38bdf8]/30 rounded-full blur-[90px] pointer-events-none -z-10" />
            <Hero3DFlame 
              heightClass="h-[400px] sm:h-[460px]" 
              scale={3.6} 
            />
          </div>

          {/* Subtitle */}
          <p className="font-subheading text-sm sm:text-base font-semibold text-white/95 leading-snug tracking-normal max-w-sm text-balance">
            Unit Kegiatan Mahasiswa Kerohanian Hindu Dharma Universitas Airlangga
          </p>

          {/* Action CTA Button */}
          <div className="w-full max-w-[280px] pt-1">
            <LiquidGlassCard className="!rounded-2xl hover:scale-[1.02] active:scale-95 transition-transform w-full">
              <Link
                href="/tentang"
                className="flex items-center justify-center gap-2.5 px-7 py-3.5 text-white font-subheading text-sm sm:text-base font-bold tracking-wide group w-full"
              >
                <span>Tentang Kami</span>
                <ArrowRight className="w-4 h-4 text-[#ff4757] group-hover:translate-x-1 transition-transform" />
              </Link>
            </LiquidGlassCard>
          </div>

          {/* 3 Micro-Stats Highlights */}
          <div className="grid grid-cols-3 gap-2.5 w-full max-w-sm pt-4 border-t border-white/10">
            <LiquidGlassCard className="!rounded-xl p-2.5 text-center">
              <span className="font-heading text-base font-bold text-white block">
                1985
              </span>
              <span className="font-subheading text-[10px] font-medium text-[#8bd4ff] block">
                Berdiri (SK)
              </span>
            </LiquidGlassCard>

            <LiquidGlassCard className="!rounded-xl p-2.5 text-center">
              <span className="font-heading text-base font-bold text-[#ff4757] block">
                Ke-41
              </span>
              <span className="font-subheading text-[10px] font-medium text-[#8bd4ff] block">
                Dies Natalis
              </span>
            </LiquidGlassCard>

            <LiquidGlassCard className="!rounded-xl p-2.5 text-center">
              <span className="font-heading text-base font-bold text-white block">
                7 Divisi
              </span>
              <span className="font-subheading text-[10px] font-medium text-[#8bd4ff] block">
                2 Departemen
              </span>
            </LiquidGlassCard>
          </div>
        </div>

        {/* ============================================================
            DESKTOP LAYOUT (lg:grid): Original 2-Column Split View
            ============================================================ */}
        <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: Lockup & Content */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start text-left">
            <div className="flex flex-col items-start w-full">
              {/* Master Wordmark Lockup */}
              <div className="flex flex-col items-start mb-6 sm:mb-8 overflow-visible select-none">
                <span className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-none">
                  Kabinet
                </span>
                
                <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[82px] xl:text-[98px] font-black tracking-tight leading-[0.82] -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-5 -ml-[4px] sm:-ml-[5px] lg:-ml-[6px] overflow-visible">
                  <span className="inline-block bg-gradient-to-r from-[#e02432] via-[#ff4d5a] via-42% to-[#38bdf8] bg-clip-text text-transparent filter drop-shadow-md pr-8 pb-1">
                    NIVARAMITRA
                  </span>
                </h1>

                <p className="font-subheading text-lg sm:text-xl md:text-2xl font-semibold text-white/90 leading-snug tracking-normal mt-3 sm:mt-4 max-w-xl text-balance">
                  Unit Kegiatan Mahasiswa Kerohanian Hindu Dharma Universitas Airlangga
                </p>
              </div>

              {/* Action Button: Tentang Kami */}
              <div className="flex flex-wrap items-center justify-start gap-4 mb-6 sm:mb-8 w-auto">
                <LiquidGlassCard className="!rounded-2xl hover:scale-[1.03] active:scale-95 transition-transform">
                  <Link
                    href="/tentang"
                    className="flex items-center gap-2.5 px-8 py-3.5 text-white font-subheading text-sm font-semibold tracking-wide group"
                  >
                    <span>Tentang Kami</span>
                    <ArrowRight className="w-4 h-4 text-[#ff4757] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </LiquidGlassCard>
              </div>
            </div>

            {/* Organisation Highlights */}
            <div className="grid grid-cols-3 gap-3.5 w-full max-w-md pt-6 border-t border-white/10">
              <LiquidGlassCard className="!rounded-2xl p-3">
                <div className="flex flex-col items-start">
                  <span className="font-heading text-xl sm:text-2xl font-bold text-white">
                    1985
                  </span>
                  <span className="font-subheading text-[11px] font-medium text-[#8bd4ff]">
                    Berdiri (SK 7343)
                  </span>
                </div>
              </LiquidGlassCard>

              <LiquidGlassCard className="!rounded-2xl p-3">
                <div className="flex flex-col items-start">
                  <span className="font-heading text-xl sm:text-2xl font-bold text-[#ff4757]">
                    Ke-41
                  </span>
                  <span className="font-subheading text-[11px] font-medium text-[#8bd4ff]">
                    Dies Natalis 2026
                  </span>
                </div>
              </LiquidGlassCard>

              <LiquidGlassCard className="!rounded-2xl p-3">
                <div className="flex flex-col items-start">
                  <span className="font-heading text-xl sm:text-2xl font-bold text-white">
                    7 Divisi
                  </span>
                  <span className="font-subheading text-[11px] font-medium text-[#8bd4ff]">
                    2 Departemen
                  </span>
                </div>
              </LiquidGlassCard>
            </div>
          </div>

          {/* RIGHT COLUMN: Free-Standing 3D Logo Showcase */}
          <div className="lg:col-span-6 flex items-center justify-center relative w-full">
            <div className="absolute w-[380px] sm:w-[480px] lg:w-[580px] h-[380px] sm:h-[480px] lg:h-[580px] bg-gradient-to-tr from-[#c1111e]/20 via-[#ff4d5a]/12 to-[#38bdf8]/20 rounded-full blur-[130px] pointer-events-none -z-10" />

            <div className="w-full relative flex items-center justify-center">
              <Hero3DFlame 
                heightClass="h-[500px] sm:h-[600px] lg:h-[700px] xl:h-[760px]" 
                scale={3.3} 
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
