"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { createPortal } from "react-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Beranda", href: "/", active: pathname === "/" },
    { name: "Tentang", href: "/tentang", active: pathname === "/tentang" },
    { name: "Program Kerja", href: "/program-kerja", active: pathname === "/program-kerja" },
    { name: "Kalender Hari Raya", href: "/kalender", active: pathname === "/kalender" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-2 sm:py-2.5 bg-[#021724]/85 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "py-2.5 sm:py-3.5 bg-[#021724]/40 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
        }`}
        style={{
          WebkitBackdropFilter: "blur(24px) saturate(140%)",
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 0.5rem)",
        }}
      >
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Brand Lockup: Clean, cropped square emblems with tight, close spacing */}
            <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <img
                  src="/assets/logo/Logo-UNAIR-cropped.png"
                  alt="Logo Universitas Airlangga"
                  className="h-7 w-7 sm:h-8 sm:w-8 object-contain filter drop-shadow-md transition-transform group-hover:scale-105"
                />
                <img
                  src="/assets/logo/Logo-UKMKHD-cropped.png"
                  alt="Logo UKMKHD"
                  className="h-7 w-7 sm:h-8 sm:w-8 object-contain filter drop-shadow-md transition-transform group-hover:scale-105"
                />
                <img
                  src="/assets/logo/logo kabinet no text.png"
                  alt="Logo Kabinet Nivaramitra"
                  className="h-7 w-7 sm:h-8 sm:w-8 object-contain filter drop-shadow-md transition-transform group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-heading text-[15px] sm:text-base lg:text-lg font-bold tracking-tight text-white leading-tight">
                  UKMKHD
                </span>
                <span className="-mt-2 font-heading text-[15px] sm:text-base lg:text-lg font-bold tracking-tight text-white leading-tight">
                  UNAIR 2026
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

            {/* Mobile Hamburger Button with 44px hit target */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.08] backdrop-blur-xl border border-white/20 text-white hover:text-[#8bd4ff] active:scale-95 transition-all"
                aria-label="Buka Menu Navigasi"
              >
                <Menu className="w-5 h-5 transition-transform duration-200" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ==============================================================
          MOBILE FLOATING POPUP NAVIGATION MENU VIA REACT PORTAL
          Sleek, rounded liquid glass popup card anchored under header
          ============================================================== */}
      {mounted && isOpen && createPortal(
        <>
          {/* Backdrop Overlay (closes popup on tap) */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[9999990] bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
          />

          {/* Floating Glass Popup Card */}
          <div 
            className="fixed top-16 right-4 left-4 sm:left-auto sm:right-6 sm:w-80 z-[9999999] rounded-3xl bg-white/20 backdrop-blur-2xl backdrop-saturate-150 border border-white/25 p-4 space-y-2 animate-in fade-in zoom-in-95 duration-200"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.35)",
            }}
          >
            {/* Header of popup */}
            <div className="flex items-center justify-between pb-2.5 border-b border-white/15">
              <div className="flex flex-col">
                <span className="font-heading text-xs font-bold tracking-wide text-white uppercase">
                  Menu Navigasi
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/15 text-white/80 hover:bg-white/25 hover:text-white active:scale-90 transition-all"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Links inside Popup */}
            <div className="flex flex-col space-y-1.5 pt-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`w-full px-4 py-3 rounded-2xl font-subheading text-sm font-semibold transition-all flex items-center justify-between active:scale-[0.98] ${
                    link.active
                      ? "bg-gradient-to-r from-[#c1111e] to-[#ff4757] text-white shadow-lg shadow-[#c1111e]/30 border border-[#ff8b94]/40"
                      : "text-white/90 hover:bg-white/15 bg-white/[0.08] border border-white/15"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.active ? (
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                  )}
                </Link>
              ))}
            </div>

            {/* Compact Footer */}
            <div className="pt-2 text-center border-t border-white/10">
              <span className="text-[11px] sm:text-xs font-subheading text-white/55">
                Kabinet Nivaramitra Periode 2026
              </span>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
