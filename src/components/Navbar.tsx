"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/", active: pathname === "/" },
    { name: "Tentang", href: "/tentang", active: pathname === "/tentang" },
    { name: "Program Kerja", href: "/program-kerja", active: pathname === "/program-kerja" },
    { name: "Kalender Hari Raya", href: "/kalender", active: pathname === "/kalender" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2.5 bg-[#021724]/60 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          : "py-3.5 bg-[#021724]/30 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
      }`}
      style={{
        WebkitBackdropFilter: "blur(24px) saturate(140%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand Lockup: Clean, cropped square emblems with tight, close spacing */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <img
                src="/assets/logo/Logo-UNAIR-cropped.png"
                alt="Logo Universitas Airlangga"
                width={36}
                height={36}
                style={{ width: "36px", height: "36px", maxWidth: "36px", maxHeight: "36px" }}
                className="h-8 sm:h-9 w-8 sm:w-9 object-contain filter drop-shadow-md transition-transform group-hover:scale-105"
              />
              <img
                src="/assets/logo/Logo-UKMKHD-cropped.png"
                alt="Logo UKMKHD"
                width={36}
                height={36}
                style={{ width: "36px", height: "36px", maxWidth: "36px", maxHeight: "36px" }}
                className="h-8 sm:h-9 w-8 sm:w-9 object-contain filter drop-shadow-md transition-transform group-hover:scale-105"
              />
              <img
                src="/assets/logo/logo kabinet no text.png"
                alt="Logo Kabinet Nivaramitra"
                width={36}
                height={36}
                style={{ width: "36px", height: "36px", maxWidth: "36px", maxHeight: "36px" }}
                className="h-8 sm:h-9 w-8 sm:w-9 object-contain filter drop-shadow-md transition-transform group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col">
              {/* 2026 is part of the UKMKHD UNAIR brand title */}
              <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                UKMKHD UNAIR 2026
              </span>
              <span className="font-subheading text-[10px] sm:text-[11px] font-medium text-[#8bd4ff] tracking-wide">
                Kabinet Nivaramitra
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-white/[0.07] backdrop-blur-2xl px-3 py-1.5 rounded-full border border-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-subheading font-medium transition-all ${
                  link.active
                    ? "bg-[#c1111e] text-white shadow-md shadow-[#c1111e]/20"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/20 text-white hover:text-[#8bd4ff] transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#021724]/80 backdrop-blur-2xl border-b border-white/15 shadow-2xl transition-all">
          <div className="flex flex-col space-y-1.5 max-w-md mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2.5 rounded-xl font-subheading text-sm font-medium transition-all flex items-center justify-between ${
                  link.active
                    ? "bg-[#c1111e] text-white"
                    : "text-white/85 hover:bg-white/10"
                }`}
              >
                <span>{link.name}</span>
                {link.active && (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
