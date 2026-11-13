"use client";

import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  X,
} from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  status: "Buka" | "Segera" | "Terbatas";
  description: string;
  image: string;
  registrationOpen: boolean;
  highlight?: string;
}

export default function UpcomingEvents() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const events: EventItem[] = [
    {
      id: "nirwana-2026",
      title: "NIRWANA 2026 (Nawa Citta Airlangga)",
      category: "Festival & Lomba Nasional",
      date: "18 - 19 Juli 2026",
      time: "08.00 - 21.00 WIB",
      location: "Pura Segara Kenjeran, Surabaya",
      status: "Buka",
      description:
        "Festival kebudayaan Hindu nasional dan kompetisi tari Bali, sloka, serta seni keagamaan terbesar yang diselenggarakan UKMKHD UNAIR di pesisir Kenjeran.",
      image: "/assets/element/Group 44.png",
      registrationOpen: true,
      highlight: "Program Kerja Utama 2026",
    },
    {
      id: "mahabharata-magang",
      title: "Mahabharata: Magang Kaderisasi UKMKHD",
      category: "Kaderisasi Mahasiswa Baru",
      date: "25 Agustus 2026",
      time: "13.00 - 17.30 WIB",
      location: "Student Center & Kampus MERR-C UNAIR",
      status: "Buka",
      description:
        "Program pembekalan awal, pengenalan 7 divisi, serta pengakraban keluarga besar bagi seluruh Ksatria Airlangga beragama Hindu angkatan 2026.",
      image: "/assets/element/Group 43.png",
      registrationOpen: true,
      highlight: "Khusus Mahasiswa Baru",
    },
    {
      id: "tirta-yatra",
      title: "Tirta Yatra & Dharma Yatra Bersama",
      category: "Kerohanian & Ibadah",
      date: "12 September 2026",
      time: "06.00 - Selesai",
      location: "Pura Mandara Giri Semeru Agung, Lumajang",
      status: "Segera",
      description:
        "Persembahyangan bersama dan pendalaman spiritual ke pura luhur di lereng Semeru guna memupuk sradha, bhakti, dan ketenteraman batin keluarga UKMKHD.",
      image: "/assets/element/Group 42.png",
      registrationOpen: false,
      highlight: "Perjalanan Rohani Rutin",
    },
  ];

  return (
    <section id="kegiatan" className="relative py-24 bg-[#f5f6f8] overflow-hidden">
      {/* Decorative Wave from Asset */}
      <div className="absolute left-0 bottom-0 w-72 pointer-events-none opacity-20 select-none -z-10">
        <img
          src="/assets/element/Group 17.png"
          alt="Flow lines"
          className="w-full h-auto"
        />
      </div>

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c1111e]/10 text-[#c1111e] font-subheading text-xs font-bold mb-3 border border-[#c1111e]/20">
              <Calendar className="w-3.5 h-3.5" />
              <span>Agenda Mendatang</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#023048] tracking-tight">
              Kegiatan Mendatang
            </h2>
            <p className="font-body text-sm sm:text-base text-[#023048]/75 mt-1.5 max-w-xl">
              Ikuti berbagai program festival, kaderisasi, dan persembahyangan bersama keluarga besar UKMKHD UNAIR.
            </p>
          </div>

          <a
            href="#gabung-banner"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-subheading font-bold text-[#c1111e] hover:text-[#770101] group self-start md:self-end transition-colors"
          >
            <span>Lihat Seluruh Jadwal Kegiatan</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* 3 Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event) => {
            const isNirwana = event.id === "nirwana-2026";
            return (
              <div
                key={event.id}
                className="liquid-glass-card rounded-3xl p-6 flex flex-col justify-between border relative overflow-hidden group"
              >
                {/* Visual Top Banner / Graphic Element */}
                <div className="relative h-44 rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-[#023048] to-[#113047] flex items-center justify-center p-4">
                  {/* Background element asset */}
                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 group-hover:opacity-35 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#023048] via-[#023048]/50 to-transparent" />

                  {/* Badges on Banner */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-subheading text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-[#023048] shadow-xs backdrop-blur-md">
                      {event.category}
                    </span>

                    <span
                      className={`font-subheading text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        event.status === "Buka"
                          ? "bg-[#c1111e] text-white shadow-glow-red"
                          : "bg-white/30 text-white backdrop-blur-md"
                      }`}
                    >
                      {event.status === "Buka" ? "● Buka Pendaftaran" : "○ Segera Hadir"}
                    </span>
                  </div>

                  {/* Bottom Highlight on Banner */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                    <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Calendar className="w-4 h-4 text-[#8bd4ff]" />
                    </div>
                    <div>
                      <span className="block font-subheading text-xs font-bold leading-tight">
                        {event.date}
                      </span>
                      <span className="block font-body text-[10px] text-white/70">
                        {event.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event Information */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#023048] mb-2 leading-snug group-hover:text-[#c1111e] transition-colors">
                      {event.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-[#023048]/75 mb-4 line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#659aba]/15">
                    <div className="flex items-center gap-2 text-xs font-body text-[#023048]/80">
                      <MapPin className="w-3.5 h-3.5 text-[#c1111e] shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-subheading font-bold text-[#023048] bg-white border border-[#659aba]/30 hover:border-[#023048] hover:bg-slate-50 transition-all"
                      >
                        Detail Acara
                      </button>

                      {event.registrationOpen ? (
                        <a
                          href="#gabung-banner"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-subheading font-bold text-white bg-[#c1111e] hover:bg-[#770101] shadow-xs hover:shadow-md transition-all"
                        >
                          Daftar Sekarang
                        </a>
                      ) : (
                        <button
                          disabled
                          className="flex-1 inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-subheading font-medium text-[#023048]/40 bg-slate-200/60 cursor-not-allowed"
                        >
                          Segera Dibuka
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#023048]/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80 overflow-hidden">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#023048] transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block font-subheading text-xs font-bold px-3 py-1 rounded-full bg-[#f86b74]/15 text-[#c1111e] mb-3">
              {selectedEvent.category}
            </span>

            <h3 className="font-heading text-2xl font-bold text-[#023048] mb-3">
              {selectedEvent.title}
            </h3>

            <p className="font-body text-sm text-[#023048]/80 leading-relaxed mb-6">
              {selectedEvent.description}
            </p>

            <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6 font-body text-xs text-[#023048]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#c1111e]" />
                <span className="font-semibold">Tanggal:</span> {selectedEvent.date} ({selectedEvent.time})
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c1111e]" />
                <span className="font-semibold">Lokasi:</span> {selectedEvent.location}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#c1111e]" />
                <span className="font-semibold">Keterangan:</span> {selectedEvent.highlight}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex-1 py-3 rounded-xl border border-slate-300 font-subheading text-xs font-bold text-[#023048] hover:bg-slate-100 transition-colors"
              >
                Tutup
              </button>
              {selectedEvent.registrationOpen ? (
                <a
                  href="#gabung-banner"
                  onClick={() => setSelectedEvent(null)}
                  className="flex-1 py-3 rounded-xl bg-[#c1111e] font-subheading text-xs font-bold text-white text-center hover:bg-[#770101] shadow-md transition-colors"
                >
                  Menuju Pendaftaran
                </a>
              ) : (
                <span className="flex-1 py-3 rounded-xl bg-slate-200 text-center font-subheading text-xs font-medium text-slate-500">
                  Pendaftaran Belum Dibuka
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
