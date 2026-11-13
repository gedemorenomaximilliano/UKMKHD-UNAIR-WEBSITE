"use client";

import React, { useState, useEffect } from "react";
import LiquidGlassCard from "./LiquidGlassCard";
import AnimatedBackground from "./AnimatedBackground";
import Hero3DFlame from "./Hero3DFlame";

export default function TentangContent() {
  const [activeTab, setActiveTab] = useState<"ukm" | "kabinet">("ukm");
  const [deptTab, setDeptTab] = useState<"internal" | "eksternal">("internal");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "kabinet" || tab === "ukm") {
        setActiveTab(tab);
      }
    }
  }, []);

  const handleTabChange = (tab: "ukm" | "kabinet") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <div className="relative isolate min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden bg-[#02121e] text-white">
      {/* Dynamic Animated Canvas Background */}
      <AnimatedBackground />

      {/* Main Content Container */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ==============================================================
            THE MASTER TOGGLE SWITCHER (True Liquid Glass Pill, Fully Rounded)
            Strictly separates UKMKHD view from Kabinet view
            ============================================================== */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex items-center p-1 sm:p-1.5 rounded-full bg-white/[0.05] backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] max-w-full">
            
            {/* Toggle Button 1: UKMKHD UNAIR */}
            <button
              onClick={() => handleTabChange("ukm")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-7 py-2.5 min-h-[44px] rounded-full font-subheading text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === "ukm"
                  ? "bg-gradient-to-r from-[#023048] to-[#034466] text-white shadow-lg border border-[#8bd4ff]/40"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/assets/logo/Logo-UKMKHD-cropped.png"
                  alt="UKMKHD Icon"
                  className="w-3.5 h-3.5 object-contain"
                />
              </div>
              <span className="whitespace-nowrap">UKMKHD UNAIR</span>
            </button>

            {/* Toggle Button 2: Kabinet Nivaramitra */}
            <button
              onClick={() => handleTabChange("kabinet")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-7 py-2.5 min-h-[44px] rounded-full font-subheading text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === "kabinet"
                  ? "bg-gradient-to-r from-[#c1111e] via-[#e02432] to-[#ff4757] text-white shadow-lg border border-[#ff8b94]/40"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/assets/logo/logo kabinet no text.png"
                  alt="Kabinet Nivaramitra Logo"
                  className="w-3.5 h-3.5 object-contain"
                />
              </div>
              <span className="whitespace-nowrap">
                <span className="inline sm:hidden">Nivaramitra</span>
                <span className="hidden sm:inline">Kabinet Nivaramitra</span>
              </span>
            </button>

          </div>
        </div>

        {/* ==============================================================
            VIEW 1: UKMKHD UNAIR (ORGANISASI & FILOSOFI LAMBANG)
            Visible ONLY when activeTab === 'ukm'
            ============================================================== */}
        {activeTab === "ukm" && (
          <div className="space-y-16 animate-fadeIn">
            
            {/* Section 1: 3D Logo Showcase & Profil Identity Grid (Symmetrical with Content) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 lg:items-stretch items-center">
              
              {/* Left Column: 3D Official Emblem Display */}
              <div className="lg:col-span-5 flex flex-col h-full">
                <LiquidGlassCard 
                  className="p-5 sm:p-6 w-full max-w-md lg:max-w-none text-center shadow-2xl h-full"
                  contentClassName="h-full flex flex-col justify-between"
                >
                  {/* 3D Model Display */}
                  <div className="w-full flex-1 flex items-center justify-center min-h-[250px] sm:min-h-[290px]">
                    <Hero3DFlame
                      modelPath="/assets/3d/logo-ukm.glb?v=2"
                      heightClass="h-[250px] sm:h-[300px] lg:h-[330px]"
                      scale={2.7}
                      accent="ukm"
                    />
                  </div>
                  
                  {/* Title Only */}
                  <div className="mt-auto">
                    <div className="text-center pt-3.5 border-t border-white/10 w-full">
                      <span className="font-heading text-lg sm:text-xl font-black text-white tracking-wider block uppercase">
                        LOGO UKMKHD UNAIR
                      </span>
                    </div>

                    {/* 2 Stat Highlights */}
                    <div className="grid grid-cols-2 gap-3 w-full mt-3.5 pt-3.5 border-t border-white/10">
                      <div className="flex flex-col items-center p-2 rounded-xl bg-white/5">
                        <span className="text-lg font-heading font-bold text-white">1985</span>
                        <span className="text-[10px] text-white/60">Tahun Berdiri</span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded-xl bg-white/5">
                        <span className="text-lg font-heading font-bold text-[#ff4757]">Ke-41</span>
                        <span className="text-[10px] text-white/60">Dies Natalis 2026</span>
                      </div>
                    </div>
                  </div>
                </LiquidGlassCard>
              </div>

              {/* Right Column: Profil & Sejarah UKMKHD (Symmetrically Aligned) */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
                <div>
                  <span className="font-subheading text-xs font-bold text-[#8bd4ff] tracking-wider uppercase mb-2 block">
                    Profil Organisasi
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1.15]">
                    Unit Kegiatan Mahasiswa Kerohanian Hindu Dharma
                  </h2>
                  <p className="font-subheading text-sm text-[#ff4757] font-semibold mt-1.5">
                    Universitas Airlangga · Surabaya, Jawa Timur
                  </p>
                </div>

                {/* Explaining Text */}
                <div className="text-white/90 font-subheading text-sm sm:text-[15px] leading-relaxed space-y-3">
                  <p>
                    <strong>UKMKHD UNAIR</strong> adalah organisasi kemahasiswaan intra-universiter resmi yang menaungi seluruh mahasiswa beragama Hindu di lingkungan Universitas Airlangga. Berdiri secara resmi pada <strong>1 Oktober 1985</strong> melalui Surat Keputusan Rektor Universitas Airlangga Nomor <strong>7343/PT.03.I/O/1985</strong>.
                  </p>
                  <p>
                    Selama lebih dari empat dekade, UKMKHD UNAIR konsisten mengabdi sebagai wadah pembinaan rohani, penguatan nilai moral, pengembangan intelektual, dan pengasuhan karakter kepemimpinan mahasiswa berlandaskan ajaran luhur <em>Sanatana Dharma</em>.
                  </p>
                </div>

                {/* 2 Landasan Utama */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 mt-auto">
                  <LiquidGlassCard className="p-4 sm:p-5 !rounded-2xl">
                    <h4 className="font-heading text-base font-bold text-white">Tri Hita Karana</h4>
                    <span className="text-xs font-subheading text-[#8bd4ff] font-semibold block mt-0.5">
                      Harmoni Tiga Hubungan
                    </span>
                    <p className="font-subheading text-xs sm:text-[13px] text-white/75 mt-1.5 leading-relaxed">
                      Keharmonisan hubungan dengan Sang Hyang Widhi (Parahyangan), sesama manusia (Pawongan), dan alam semesta (Palemahan).
                    </p>
                  </LiquidGlassCard>

                  <LiquidGlassCard className="p-4 sm:p-5 !rounded-2xl">
                    <h4 className="font-heading text-base font-bold text-white">Tri Dharma Perguruan Tinggi</h4>
                    <span className="text-xs font-subheading text-[#ff8b94] font-semibold block mt-0.5">
                      Pilar Pengabdian
                    </span>
                    <p className="font-subheading text-xs sm:text-[13px] text-white/75 mt-1.5 leading-relaxed">
                      Perwujudan nyata dalam pilar Pendidikan, Penelitian, serta Pengabdian kepada Masyarakat luas.
                    </p>
                  </LiquidGlassCard>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==============================================================
            VIEW 2: KABINET NIVARAMITRA (VISI, FILOSOFI LOGO, MISI SAHANA & STRUKTUR RESMI)
            Visible ONLY when activeTab === 'kabinet'
            ============================================================== */}
        {activeTab === "kabinet" && (
          <div className="space-y-16 animate-fadeIn">
            
            {/* Section 1: 3D Showcase & Harmonized Text Lockup (Symmetrical with Content) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 lg:items-stretch items-center">
              
              {/* Left Column: 3D Model Display */}
              <div className="lg:col-span-5 flex flex-col h-full">
                <LiquidGlassCard 
                  className="p-5 sm:p-6 w-full max-w-md lg:max-w-none text-center shadow-2xl h-full"
                  contentClassName="h-full flex flex-col justify-between"
                >
                  <div className="w-full flex-1 flex items-center justify-center min-h-[250px] sm:min-h-[300px]">
                    <Hero3DFlame
                      modelPath="/assets/3d/logo-kabinet-ukm.glb"
                      heightClass="h-[260px] sm:h-[320px] lg:h-[360px]"
                      scale={2.7}
                      accent="flame"
                    />
                  </div>
                  <div className="text-center pt-3.5 mt-auto border-t border-white/10 w-full">
                    <span className="font-heading text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e02432] via-[#ff4d5a] to-[#38bdf8]">
                      NIVARAMITRA
                    </span>
                    <span className="font-subheading text-xs font-semibold text-white/80 block mt-0.5">
                      Kabinet Periode 2026 · UKMKHD UNAIR
                    </span>
                  </div>
                </LiquidGlassCard>
              </div>

              {/* Right Column: Profil & Arti Nama Nivaramitra (Text Only, No Icons) */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-3.5">
                <div>
                  <span className="font-subheading text-[11px] font-bold text-[#ff4757] tracking-wider uppercase block mb-1">
                    KABINET PERIODE 2026
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-[32px] font-black text-white tracking-tight leading-tight">
                    Menyalakan Harmoni, Merajut Solidaritas
                  </h2>
                  <p className="font-subheading text-xs sm:text-[13px] text-white/85 font-medium italic mt-1.5 border-l-2 border-[#ff4757] pl-2.5 py-0.5">
                    "Menyalakan harmoni, merajut solidaritas, dan membina insan berkarakter unggul berlandaskan nilai-nilai luhur Dharma."
                  </p>
                </div>

                {/* Nivaramitra Sanskrit Narrative */}
                <div className="text-white/80 font-subheading text-xs sm:text-[13px] leading-relaxed space-y-2">
                  <p>
                    <strong>Nivaramitra</strong> bukanlah istilah yang berasal langsung dari kitab suci Hindu seperti Weda, Upanishad, Itihasa, maupun Purana. Namun, nama ini dibangun dari akar kata Sanskerta yang sahih sehingga memiliki makna filosofis yang mendalam dan indah.
                  </p>
                  <p>
                    Kata <em>nivāra</em> berasal dari akar <em>/vr</em> yang bermakna melindungi, menenangkan, memberi keteduhan, serta membersihkan hambatan, yang dalam konteks organisasi dimaknai sebagai ruang aman dan nyaman bagi setiap anggotanya. Sementara itu, <em>mitra</em> merupakan istilah Sanskerta klasik yang sering digunakan dalam kitab Hindu dan bermakna sahabat, kehangatan, serta hubungan yang harmonis.
                  </p>
                  <p>
                    Digabungkan, <strong>Nivaramitra</strong> melambangkan sebuah rumah yang dibangun atas dasar persahabatan dan cinta kasih, tempat setiap individu merasa diterima, dilindungi, dan bertumbuh bersama. Lebih dari sekadar kabinet, Nivaramitra adalah keluarga yang hangat, inklusif, dan menyatukan setiap anggotanya dalam satu cerita bersama.
                  </p>
                </div>

                {/* 2 Makna Kata Pembentuk (Pure Clean Text, No Icons) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 mt-auto">
                  <LiquidGlassCard className="p-4 !rounded-xl">
                    <h4 className="font-heading text-sm font-bold text-white">Nivāra (निवा)</h4>
                    <span className="text-[10px] font-subheading text-[#8bd4ff] font-semibold uppercase tracking-wider block mt-0.5">
                      Affection & Harmony
                    </span>
                    <p className="font-subheading text-[11px] text-white/70 mt-1 leading-snug">
                      Ruang aman dan nyaman yang melindungi, menenangkan, serta meneduhkan bagi seluruh anggotanya.
                    </p>
                  </LiquidGlassCard>

                  <LiquidGlassCard className="p-4 !rounded-xl">
                    <h4 className="font-heading text-sm font-bold text-white">Mitra (मित्र)</h4>
                    <span className="text-[10px] font-subheading text-[#ff8b94] font-semibold uppercase tracking-wider block mt-0.5">
                      Solidarity & Activeness
                    </span>
                    <p className="font-subheading text-[11px] text-white/70 mt-1 leading-snug">
                      Sahabat sejati yang merajut persaudaraan erat, keterbukaan, serta keaktifan kolaboratif.
                    </p>
                  </LiquidGlassCard>
                </div>
              </div>

            </div>

            {/* Section 2: Harapan & Misi SAHANA (Pure Clean Text, No Icons) */}
            <div className="pt-2">
              <LiquidGlassCard className="p-7 sm:p-9 border-[#ff4757]/30 bg-gradient-to-br from-[#c1111e]/15 via-white/[0.02] to-[#021827]/90 shadow-2xl">
                <div className="mb-4">
                  <span className="font-subheading text-xs font-bold text-[#ff8b94] tracking-wider uppercase block mb-1">
                    Visi & Harapan Gerak
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                    Harapan & Misi SAHANA
                  </h3>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="font-subheading text-sm sm:text-base text-white/95 leading-relaxed">
                    Melalui misi <strong>SAHANA</strong>, diharapkan tercipta solidaritas yang kuat melalui ruang interaksi yang hangat dan inklusif, tumbuhnya budaya saling peduli dan mendukung antar anggota, serta terjaganya harmoni nilai Hindu dan etika organisasi. Dengan keaktifan program yang relevan, wadah pengembangan diri yang berkelanjutan, serta dorongan inovasi dan kolaborasi lintas UKM maupun kampus, organisasi ini diharapkan menjadi ruang bertumbuh bersama yang dinamis, berdaya, dan bermakna bagi seluruh anggotanya.
                  </p>
                </div>

                {/* 3 Text Badges (No Icons) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/10">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span className="font-subheading text-xs font-medium text-white/90">Ruang Interaksi Hangat & Inklusif</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span className="font-subheading text-xs font-medium text-white/90">Solidaritas & Budaya Saling Peduli</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span className="font-subheading text-xs font-medium text-white/90">Inovasi & Kolaborasi Berdaya</span>
                  </div>
                </div>
              </LiquidGlassCard>
            </div>

            {/* Section 3: Bedah 3 Elemen Logo Nivaramitra */}
            <div className="pt-4">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="font-subheading text-xs font-bold text-[#ff4757] tracking-wider uppercase mb-2 block">
                  Eksplorasi Visual
                </span>
                <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                  Bedah Filosofi Logo Nivaramitra
                </h3>
                <p className="font-subheading text-sm text-white/70 mt-2">
                  Tiga komponen visual utama yang menyusun lambang obor api biru Kabinet Nivaramitra 2026.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. Api Biru (Nivara Part) */}
                <LiquidGlassCard className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-full h-36 flex items-center justify-center p-3 mb-4 rounded-2xl bg-white/5 border border-white/10">
                      <img
                        src="/assets/logo/logo kabinet nivara part.png"
                        alt="Unsur Api Biru Nivaramitra"
                        className="max-h-full max-w-full object-contain filter drop-shadow-md"
                      />
                    </div>
                    <h4 className="font-heading text-xl font-bold text-white mb-1">
                      Api Biru (The Blue Flame)
                    </h4>
                    <span className="text-xs font-subheading text-white/50 block mb-3">
                      Unsur Nivāra
                    </span>
                    <p className="font-subheading text-xs sm:text-sm text-white/80 leading-relaxed">
                      Api biru adalah simbol pembakaran sempurna yang bersuhu lebih panas dan membutuhkan lingkungan yang saling mendukung. Melambangkan ruang penuh afeksi dan harmoni tempat setiap anggota bertumbuh menjadi pribadi yang tangguh.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <span className="text-[11px] font-subheading font-medium text-white/60">
                      Nilai: Affection & Harmony
                    </span>
                  </div>
                </LiquidGlassCard>

                {/* 2. Sosok Manusia (Mitra Part) */}
                <LiquidGlassCard className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-full h-36 flex items-center justify-center p-3 mb-4 rounded-2xl bg-white/5 border border-white/10">
                      <img
                        src="/assets/logo/logo kabinet mitra part.png"
                        alt="Unsur Sosok Manusia Nivaramitra"
                        className="max-h-full max-w-full object-contain filter drop-shadow-md"
                      />
                    </div>
                    <h4 className="font-heading text-xl font-bold text-white mb-1">
                      Sosok Manusia (Humanity)
                    </h4>
                    <span className="text-xs font-subheading text-white/50 block mb-3">
                      Unsur Mitra
                    </span>
                    <p className="font-subheading text-xs sm:text-sm text-white/80 leading-relaxed">
                      Siluet manusia di tengah nyala api yang melebarkan kedua tangannya dengan sigap. Melambangkan jiwa kemanusiaan, keterbukaan menyambut peluang baru, serta ikatan persahabatan sejati yang saling menopang.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <span className="text-[11px] font-subheading font-medium text-white/60">
                      Nilai: Solidarity & Activeness
                    </span>
                  </div>
                </LiquidGlassCard>

                {/* 3. Obor (Nurturing Part) */}
                <LiquidGlassCard className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-full h-36 flex items-center justify-center p-3 mb-4 rounded-2xl bg-white/5 border border-white/10">
                      <img
                        src="/assets/logo/logo kabinet nurturing part.png"
                        alt="Unsur Obor Pengasuhan Nivaramitra"
                        className="max-h-full max-w-full object-contain filter drop-shadow-md"
                      />
                    </div>
                    <h4 className="font-heading text-xl font-bold text-white mb-1">
                      Cawan Obor (The Torch)
                    </h4>
                    <span className="text-xs font-subheading text-white/50 block mb-3">
                      Unsur Nurturing
                    </span>
                    <p className="font-subheading text-xs sm:text-sm text-white/80 leading-relaxed">
                      Cawan obor di bagian dasar yang menopang dan menyalakan api biru sebagai suar harapan (<em>beacon</em>). Melambangkan komitmen kepengurusan untuk mengasuh, membimbing, dan memfasilitasi setiap potensi menuju keunggulan.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <span className="text-[11px] font-subheading font-medium text-white/60">
                      Nilai: Nurturing & Leadership
                    </span>
                  </div>
                </LiquidGlassCard>

              </div>
            </div>

            {/* Section 4: STRUKTUR ORGANISASI */}
            <div className="pt-4">
              <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
                <span className="font-subheading text-xs font-bold text-[#ff4757] tracking-wider uppercase mb-1 block">
                  Struktur Kepengurusan
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  Struktur Organisasi Kabinet Nivaramitra
                </h3>
                <p className="font-subheading text-xs sm:text-sm text-white/70 mt-1">
                  Departemen & Divisi Kerja yang menggerakkan roda kepengurusan 2026.
                </p>
              </div>

              {/* Mobile Department Switcher Segmented Pill (< lg) */}
              <div className="flex lg:hidden justify-center mb-6">
                <div className="inline-flex p-1 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-md">
                  <button
                    onClick={() => setDeptTab("internal")}
                    className={`px-4 py-2 rounded-full text-xs font-subheading font-bold active:scale-95 transition-all ${
                      deptTab === "internal"
                        ? "bg-gradient-to-r from-[#023048] to-[#034466] text-white border border-[#8bd4ff]/30 shadow-md"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Internal (4 Divisi)
                  </button>
                  <button
                    onClick={() => setDeptTab("eksternal")}
                    className={`px-4 py-2 rounded-full text-xs font-subheading font-bold active:scale-95 transition-all ${
                      deptTab === "eksternal"
                        ? "bg-gradient-to-r from-[#c1111e] to-[#ff4757] text-white border border-[#ff8b94]/30 shadow-md"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Eksternal (3 Divisi)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Departemen Internal */}
                <div className={`${deptTab === "internal" ? "block" : "hidden"} lg:block`}>
                  <LiquidGlassCard className="p-5 sm:p-7 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                        <h4 className="font-heading text-xl sm:text-2xl font-black text-white">
                          Departemen Internal
                        </h4>
                        <span className="text-xs font-subheading text-[#8bd4ff] font-medium">
                          4 Divisi
                        </span>
                      </div>

                      <div className="space-y-3">
                        {[
                          {
                            name: "Divisi Personalia",
                            desc: "Kaderisasi terarah, pengembangan kapasitas insani, serta tata kelola dinamika internal keorganisasian.",
                          },
                          {
                            name: "Divisi Minat dan Bakat",
                            desc: "Wadah pengembangan minat, bakat seni, budaya, olahraga, dan kreativitas mahasiswa Hindu.",
                          },
                          {
                            name: "Divisi Kerohanian",
                            desc: "Penyelenggaraan persembahyangan berkala, kajian Dharma, dan pembinaan spiritual keagamaan.",
                          },
                          {
                            name: "Divisi Ikatan Keluarga",
                            desc: "Mempererat tali kekeluargaan, ruang afeksi, dan keharmonisan hubungan antarseluruh civitas UKMKHD.",
                          },
                        ].map((divisi, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 sm:p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.07] transition-all"
                          >
                            <h5 className="font-heading text-sm sm:text-base font-bold text-white">
                              {divisi.name}
                            </h5>
                            <p className="font-subheading text-xs sm:text-[13px] text-white/70 mt-1 leading-relaxed">
                              {divisi.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </LiquidGlassCard>
                </div>

                {/* Departemen Eksternal */}
                <div className={`${deptTab === "eksternal" ? "block" : "hidden"} lg:block`}>
                  <LiquidGlassCard className="p-5 sm:p-7 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                        <h4 className="font-heading text-xl sm:text-2xl font-black text-white">
                          Departemen Eksternal
                        </h4>
                        <span className="text-xs font-subheading text-[#ff8b94] font-medium">
                          3 Divisi
                        </span>
                      </div>

                      <div className="space-y-3">
                        {[
                          {
                            name: "Divisi Hubungan dan Pengabdian Masyarakat",
                            desc: "Membangun jejaring kolaborasi lintas organisasi/kampus serta melaksanakan pengabdian masyarakat nyata.",
                          },
                          {
                            name: "Divisi Media Kreatif",
                            desc: "Publikasi informasi resmi, perancangan visual branding, pengelolaan media sosial, dan dokumentasi.",
                          },
                          {
                            name: "Divisi Sponsor dan Dana Usaha",
                            desc: "Kemandirian finansial organisasi melalui kemitraan sponsorship, merchandise, dan wirausaha kreatif.",
                          },
                        ].map((divisi, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 sm:p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.07] transition-all"
                          >
                            <h5 className="font-heading text-sm sm:text-base font-bold text-white">
                              {divisi.name}
                            </h5>
                            <p className="font-subheading text-xs sm:text-[13px] text-white/70 mt-1 leading-relaxed">
                              {divisi.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </LiquidGlassCard>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
