"use client";

import React from "react";
import { HeartHandshake, Flame, ShieldAlert, Sparkles, Compass, CheckCircle2 } from "lucide-react";

export default function IntroSection() {
  const pillars = [
    {
      title: "Nivāra",
      sub: "Affection & Harmony",
      desc: "Ruang penuh kasih dan keselarasan tempat setiap mahasiswa bertumbuh menjadi api kepemimpinan yang lebih kokoh.",
      icon: Flame,
      color: "from-[#f86b74] to-[#c1111e]",
      bg: "bg-[#f86b74]/10",
      border: "border-[#f86b74]/30",
    },
    {
      title: "Mitra",
      sub: "Solidarity & Activeness",
      desc: "Menjalin persahabatan erat dan keterbukaan tangan dalam menjawab dinamika zaman serta tantangan kampus.",
      icon: HeartHandshake,
      color: "from-[#c1111e] to-[#023048]",
      bg: "bg-[#c1111e]/10",
      border: "border-[#c1111e]/30",
    },
    {
      title: "Nurturing",
      sub: "Pemberdayaan Berkelanjutan",
      desc: "Obor suar yang senantiasa mengasuh, melatih, dan menyalurkan bakat serta pengabdian bagi umat dan almamater.",
      icon: Sparkles,
      color: "from-[#8bd4ff] to-[#023048]",
      bg: "bg-[#8bd4ff]/15",
      border: "border-[#8bd4ff]/40",
    },
  ];

  return (
    <section id="intro" className="relative py-20 bg-white overflow-hidden">
      {/* Subtle Batik Bali Accent as thin watermark background from image 7.png */}
      <div className="absolute right-0 top-0 bottom-0 w-80 opacity-[0.035] pointer-events-none select-none mix-blend-multiply overflow-hidden">
        <img
          src="/assets/element/image 7.png"
          alt="Motif Tradisional Aksen"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro Text Box - Maximum 2 Sentences as strictly required in the specification */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#023048]/5 text-[#023048] font-subheading text-xs font-semibold mb-4 border border-[#023048]/10">
            <Compass className="w-3.5 h-3.5 text-[#c1111e]" />
            <span>Mengenal UKMKHD UNAIR</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#023048] mb-6 tracking-tight">
            Wadah Kekeluargaan & Pengabdian Berlandaskan Dharma
          </h2>

          {/* EXACTLY TWO SENTENCES:
              Sentence 1: UKMKHD UNAIR adalah wadah kekeluargaan dan pengembangan diri bagi mahasiswa Hindu Universitas Airlangga yang berlandaskan ajaran Tri Hita Karana serta Tri Dharma Perguruan Tinggi sejak 1985.
              Sentence 2: Bersama Kabinet Nivaramitra 2026, kami menyalakan ruang bertumbuh yang harmonis, inklusif, dan berdaya guna bagi almamater, umat, dan nusa bangsa.
          */}
          <p className="font-body text-lg sm:text-xl text-[#023048]/85 leading-relaxed font-normal">
            UKMKHD UNAIR adalah wadah kekeluargaan dan pengembangan diri bagi seluruh mahasiswa Hindu Universitas Airlangga yang berlandaskan ajaran Tri Hita Karana serta Tri Dharma Perguruan Tinggi sejak 1985. Bersama Kabinet Nivaramitra 2026, kami menyalakan ruang bertumbuh yang harmonis, berdaya guna, dan sarat solidaritas bagi almamater maupun masyarakat.
          </p>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs font-subheading font-medium text-[#659aba]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#c1111e]" /> Tri Hita Karana
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#023048]" /> Tri Dharma PT
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#659aba]" /> Dies Natalis ke-41
            </span>
          </div>
        </div>

        {/* Three Philosophical Pillars (Nivāra, Mitra, Nurturing) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="liquid-glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border relative group"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl ${pillar.bg} border ${pillar.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-[#c1111e]" />
                  </div>

                  <div className="space-y-1 mb-3">
                    <span className="font-subheading text-xs font-bold uppercase tracking-wider text-[#659aba]">
                      {pillar.sub}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-[#023048]">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="font-body text-sm text-[#023048]/75 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#659aba]/15 flex items-center justify-between text-xs font-subheading font-semibold text-[#023048]/70">
                  <span>Filosofi Logo Nivaramitra</span>
                  <div className="w-2 h-2 rounded-full bg-[#c1111e]" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
