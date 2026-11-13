"use client";

import React from "react";
import {
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Flame,
  ShieldCheck,
  Heart,
  Globe,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tentang UKM & Kabinet", href: "/tentang" },
    { name: "Program Kerja & Timeline", href: "/program-kerja" },
    { name: "Kalender Hari Raya", href: "/kalender" },
  ];

  const paletteColors = [
    { name: "Cool Blue (Navy)", hex: "#023048" },
    { name: "Redwood (Merah)", hex: "#c1111e" },
    { name: "Burnt Umber (Maroon)", hex: "#770101" },
    { name: "Light Grayish (Baja)", hex: "#659aba" },
    { name: "Coral (Merah Muda)", hex: "#f86b74" },
    { name: "Sky Tint (Biru Muda)", hex: "#8bd4ff" },
    { name: "Macadamia (Krem)", hex: "#fbead1" },
  ];

  return (
    <footer id="kontak" className="relative bg-[#023048] text-white pt-20 pb-12 overflow-hidden border-t border-[#659aba]/20">
      
      {/* Background Decorative Gradient Wave */}
      <div className="absolute right-0 bottom-0 w-96 opacity-10 pointer-events-none select-none">
        <img
          src="/assets/element/Vector 26 (1).png"
          alt="Wave accent"
          className="w-full h-auto"
        />
      </div>

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Branding, Contacts, and Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              {/* Logos Lockup */}
              <div className="flex items-center -space-x-2">
                <div className="w-11 h-11 rounded-full bg-white p-1 shadow-md border border-white/40 flex items-center justify-center">
                  <img
                    src="/assets/logo/Logo Branding UNAIR (Biru).png"
                    alt="Logo UNAIR"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-11 h-11 rounded-full bg-white p-1 shadow-md border border-white/40 flex items-center justify-center z-10">
                  <img
                    src="/assets/logo/Logo-UKMKHD-NoBackround-768x432.png"
                    alt="Logo UKMKHD"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-11 h-11 rounded-full bg-white p-0.5 shadow-md border border-white/40 flex items-center justify-center z-20">
                  <img
                    src="/assets/logo/Logo kabinet.png"
                    alt="Logo Nivaramitra"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-heading text-xl font-bold tracking-tight text-white leading-tight">
                  UKMKHD UNAIR
                </h3>
                <p className="font-subheading text-xs font-semibold text-[#8bd4ff]">
                  Kabinet Nivaramitra 2026
                </p>
              </div>
            </div>

            <p className="font-body text-xs sm:text-sm text-white/80 leading-relaxed max-w-md">
              Unit Kegiatan Mahasiswa Kerohanian Hindu Dharma Universitas Airlangga. Berdiri sejak 1 Oktober 1985 (SK No. 7343/PT.03.I/O/1985), merawat keharmonisan spiritual, intelektual, dan pengabdian bagi sivitas akademika serta masyarakat luas.
            </p>

            {/* Social Icons & External Channel */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com/ukmkhd.unair"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#c1111e] border border-white/15 flex items-center justify-center text-white transition-all hover:scale-105 shadow-sm"
                aria-label="Instagram Resmi"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="mailto:ukmkhd@unair.ac.id"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#c1111e] border border-white/15 flex items-center justify-center text-white transition-all hover:scale-105 shadow-sm"
                aria-label="Email Resmi"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#c1111e] border border-white/15 flex items-center justify-center text-white transition-all hover:scale-105 shadow-sm"
                aria-label="WhatsApp Narahubung"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-subheading text-xs font-bold uppercase tracking-wider text-[#8bd4ff]">
              Tautan Cepat
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-xs sm:text-sm text-white/75 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                  >
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Sekretariat & Kolaborasi (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="font-subheading text-xs font-bold uppercase tracking-wider text-[#8bd4ff]">
              Sekretariat & Hubungan Luar
            </h4>

            <div className="space-y-3 font-body text-xs text-white/80 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#f86b74] shrink-0 mt-0.5" />
                <span>
                  Gedung Student Center Lantai 2, Kampus MERR-C Universitas Airlangga, Jl. Dr. Ir. H. Soekarno, Mulyorejo, Surabaya, Jawa Timur 60115
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#f86b74] shrink-0" />
                <span>ukmkhd@unair.ac.id</span>
              </div>
            </div>

            {/* Kolaborasi & Sponsor Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-subheading text-xs font-bold text-white">
                  Jalur Sponsor & Kolaborasi
                </span>
                <span className="w-2 h-2 rounded-full bg-[#8bd4ff]" />
              </div>
              <p className="font-body text-[11px] text-white/70">
                Terbuka untuk kemitraan kegiatan kampus, festival NIRWANA, bakti sosial, dan sponsorship media partner.
              </p>
              <a
                href="mailto:ukmkhd@unair.ac.id?subject=Kemitraan%20dan%20Sponsorship%20UKMKHD%20UNAIR"
                className="inline-flex items-center gap-1 text-[11px] font-subheading font-bold text-[#8bd4ff] hover:text-white transition-colors"
              >
                <span>Ajukan Kolaborasi</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>

        {/* Middle Section: Color Palette Reference Strip (Visual Identity Guarantee) */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#f86b74]" />
            <span className="font-subheading text-xs font-medium text-white/80">
              Palet Identitas Resmi Kabinet Nivaramitra:
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {paletteColors.map((col) => (
              <div
                key={col.hex}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-subheading text-white/80"
                title={`${col.name}: ${col.hex}`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{ backgroundColor: col.hex }}
                />
                <span>{col.hex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-white/60">
          <p>© {currentYear} UKMKHD Universitas Airlangga · Kabinet Nivaramitra. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            <span>Dikelola oleh Divisi Media Kreatif UKMKHD UNAIR</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
