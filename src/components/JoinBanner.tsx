"use client";

import React, { useState } from "react";
import {
  Flame,
  UserPlus,
  CheckCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  X,
  FileText,
} from "lucide-react";

export default function JoinBanner() {
  const [activeTab, setActiveTab] = useState<"maba" | "or">("maba");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    fakultas: "",
    jalur: "Magang Mahabharata (Maba 2026)",
    whatsapp: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setFormData({
        nama: "",
        nim: "",
        fakultas: "",
        jalur: "Magang Mahabharata (Maba 2026)",
        whatsapp: "",
      });
    }, 2200);
  };

  return (
    <section id="gabung-banner" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl border border-white/40">
        
        {/* Background Flame Gradient with Glass Overlay */}
        <div className="absolute inset-0 bg-gradient-flame-diagonal opacity-95" />
        
        {/* Decorative Wave from Asset */}
        <div className="absolute -right-10 -bottom-10 w-96 opacity-20 pointer-events-none select-none">
          <img
            src="/assets/element/Group 43.png"
            alt="Wave decorative"
            className="w-full h-auto"
          />
        </div>

        <div className="relative z-10 p-8 sm:p-12 lg:p-16 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-subheading text-xs font-bold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#8bd4ff] animate-ping" />
                <span>Pendaftaran Aktif · Kabinet Nivaramitra</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Mari Menjadi Bagian Dari Api Harmoni Kami
              </h2>

              <p className="font-body text-sm sm:text-base text-white/90 leading-relaxed max-w-xl">
                Bergabunglah bersama keluarga besar UKMKHD Universitas Airlangga. Temukan ruang hangat untuk bertumbuh, mengasah kepemimpinan, dan mengabdi berlandaskan nilai-nilai Dharma.
              </p>

              {/* Dual Track Switcher */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setActiveTab("maba")}
                  className={`px-4 py-2.5 rounded-xl font-subheading text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === "maba"
                      ? "bg-white text-[#023048] shadow-lg scale-105"
                      : "bg-white/15 text-white hover:bg-white/25 border border-white/20"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#c1111e]" />
                  <span>Jalur Magang Mahabharata (Maba)</span>
                </button>

                <button
                  onClick={() => setActiveTab("or")}
                  className={`px-4 py-2.5 rounded-xl font-subheading text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === "or"
                      ? "bg-white text-[#023048] shadow-lg scale-105"
                      : "bg-white/15 text-white hover:bg-white/25 border border-white/20"
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#8bd4ff]" />
                  <span>Open Recruitment Pengurus</span>
                </button>
              </div>

            </div>

            {/* Right Card: Track Specific Details */}
            <div className="lg:col-span-5">
              <div className="liquid-glass-dark rounded-3xl p-6 sm:p-8 border border-white/25 text-white shadow-xl relative backdrop-blur-xl">
                
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/20">
                  <span className="font-subheading text-xs font-bold uppercase tracking-wider text-[#8bd4ff]">
                    {activeTab === "maba" ? "Kaderisasi Maba Hindu" : "Kepengurusan 2026"}
                  </span>
                  <span className="font-subheading text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#c1111e] text-white">
                    Status: BUKA
                  </span>
                </div>

                {activeTab === "maba" ? (
                  <div className="space-y-4">
                    <h3 className="font-heading text-2xl font-bold">
                      Magang Mahabharata 2026
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-white/85 leading-relaxed">
                      Jalur khusus bagi mahasiswa baru Hindu Universitas Airlangga untuk mengenal 7 divisi, mengikuti mentoring kakak tingkat, dan mempererat tali persaudaraan.
                    </p>

                    <div className="space-y-2 text-xs font-body text-white/90">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#8bd4ff]" />
                        <span>Terbuka untuk seluruh fakultas Kampus A, B, C & Gresik</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#8bd4ff]" />
                        <span>Mendapatkan sertifikat kaderisasi resmi UKMKHD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#8bd4ff]" />
                        <span>Batas Pendaftaran: 25 Agustus 2026</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="font-heading text-2xl font-bold">
                      Open Recruitment Pengurus
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-white/85 leading-relaxed">
                      Jalur staf kepengurusan aktif Kabinet Nivaramitra bagi mahasiswa angkatan sebelumnya yang ingin terjun langsung mengelola proker besar organisasi.
                    </p>

                    <div className="space-y-2 text-xs font-body text-white/90">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#8bd4ff]" />
                        <span>Tersedia posisi di 7 Divisi kepengurusan</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#8bd4ff]" />
                        <span>Kesempatan memimpin proker NIRWANA & SUPERMEN</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#8bd4ff]" />
                        <span>Seleksi berkas & wawancara divisi</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-6 mt-6 border-t border-white/20">
                  <button
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        jalur:
                          activeTab === "maba"
                            ? "Magang Mahabharata (Maba 2026)"
                            : "Open Recruitment Pengurus Nivaramitra",
                      }));
                      setIsModalOpen(true);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-white text-[#023048] hover:bg-[#fbead1] font-subheading font-bold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-95 group"
                  >
                    <span>Daftar Sekarang</span>
                    <ArrowRight className="w-4 h-4 text-[#c1111e] transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Registration Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#023048]/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#023048] transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#023048]">
                  Pendaftaran Terkirim!
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#023048]/75">
                  Terima kasih atas antusiasme Anda. Tim Personalia UKMKHD UNAIR akan menghubungi melalui WhatsApp untuk tahapan selanjutnya.
                </p>
              </div>
            ) : (
              <div>
                <span className="inline-block font-subheading text-[11px] font-bold px-3 py-1 rounded-full bg-[#c1111e]/10 text-[#c1111e] mb-2">
                  Formulir Pendaftaran
                </span>

                <h3 className="font-heading text-2xl font-bold text-[#023048] mb-1">
                  Bergabung UKMKHD
                </h3>
                <p className="font-body text-xs text-[#659aba] mb-6">
                  {formData.jalur}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-subheading text-xs font-semibold text-[#023048] mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={formData.nama}
                      onChange={(e) =>
                        setFormData({ ...formData, nama: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-body text-xs text-[#023048] focus:outline-none focus:border-[#c1111e] focus:ring-1 focus:ring-[#c1111e]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-subheading text-xs font-semibold text-[#023048] mb-1">
                        NIM UNAIR *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: 042211..."
                        value={formData.nim}
                        onChange={(e) =>
                          setFormData({ ...formData, nim: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-body text-xs text-[#023048] focus:outline-none focus:border-[#c1111e] focus:ring-1 focus:ring-[#c1111e]"
                      />
                    </div>

                    <div>
                      <label className="block font-subheading text-xs font-semibold text-[#023048] mb-1">
                        Fakultas *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: FK, FEB, FST"
                        value={formData.fakultas}
                        onChange={(e) =>
                          setFormData({ ...formData, fakultas: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-body text-xs text-[#023048] focus:outline-none focus:border-[#c1111e] focus:ring-1 focus:ring-[#c1111e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-subheading text-xs font-semibold text-[#023048] mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="Contoh: 081234567890"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-body text-xs text-[#023048] focus:outline-none focus:border-[#c1111e] focus:ring-1 focus:ring-[#c1111e]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#c1111e] hover:bg-[#770101] text-white font-subheading font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim Formulir Pendaftaran</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
