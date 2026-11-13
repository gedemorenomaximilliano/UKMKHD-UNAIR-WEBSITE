"use client";

import React, { useEffect } from "react";
import {
  X,
  Calendar,
  MapPin,
  Users,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ProgramKerja, TimelineEvent, TIMELINE_EVENTS } from "@/data/prokerData";

interface ProgramDetailModalProps {
  item: ProgramKerja | TimelineEvent | null;
  onClose: () => void;
  onSelectEvent?: (item: TimelineEvent) => void;
}

export default function ProgramDetailModal({
  item,
  onClose,
  onSelectEvent,
}: ProgramDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const isTimelineEvent = "order" in item;
  const currentOrder = isTimelineEvent ? (item as TimelineEvent).order : null;
  const prevEvent =
    currentOrder && currentOrder > 1
      ? TIMELINE_EVENTS.find((e) => e.order === currentOrder - 1)
      : null;
  const nextEvent =
    currentOrder && currentOrder < TIMELINE_EVENTS.length
      ? TIMELINE_EVENTS.find((e) => e.order === currentOrder + 1)
      : null;

  const title = "title" in item ? item.title : item.name;
  const schedule = "dateStr" in item ? item.dateStr : item.schedule;
  const location = "location" in item ? item.location : undefined;
  const target = "target" in item ? item.target : undefined;
  const category = "category" in item ? item.category : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
      {/* Blurred Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#02121e]/85 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
      />

      {/* Liquid Glass Modal Card (Mobile Sheet / Desktop Centered Card) */}
      <div
        className="relative w-full max-w-2xl h-[52.5vh] sm:h-auto max-h-[90vh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl overflow-hidden p-5 sm:p-8 z-10 flex flex-col justify-between transition-all animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200"
        style={{
          background:
            "linear-gradient(135deg, rgba(2, 32, 52, 0.97) 0%, rgba(1, 18, 30, 0.99) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: `
            0 25px 60px -15px rgba(0, 0, 0, 0.9),
            inset 0 1px 1px rgba(255, 255, 255, 0.25)
          `,
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)",
        }}
      >
        {/* Mobile Swipe / Drag Handle Indicator */}
        <div className="sm:hidden flex justify-center pb-2 -mt-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Close Button with 44px tap target */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 active:scale-95 transition-all z-20"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto pr-1 sm:pr-2 space-y-4 flex-1">
          {/* Modal Header */}
          <div className="space-y-2 pr-10">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-heading font-medium bg-white/10 text-white/90 border border-white/15">
                {item.department}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-subheading font-medium bg-white/10 text-[#8bd4ff] border border-white/10">
                {item.division}
              </span>
              {isTimelineEvent && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-subheading font-medium bg-gradient-to-r from-[#c1111e] to-[#ff4757] text-white border border-[#ff8b94]/30 shadow-sm">
                  Timeline #{currentOrder}
                </span>
              )}
            </div>

            <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
              {title}
            </h3>
          </div>

          {/* Key Attributes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 my-3">
            {/* Schedule */}
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-white/80 shrink-0 mt-0.5">
                <Calendar className="w-4 h-4 text-[#8bd4ff]" />
              </div>
              <div>
                <span className="text-[10px] font-subheading text-white/50 uppercase tracking-wider block">
                  Jadwal Pelaksanaan
                </span>
                <span className="font-heading text-xs sm:text-sm font-bold text-white">
                  {schedule}
                </span>
              </div>
            </div>

            {/* Location or Category */}
            {location ? (
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 text-white/80 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#ff4757]" />
                </div>
                <div>
                  <span className="text-[10px] font-subheading text-white/50 uppercase tracking-wider block">
                    Lokasi / Platform
                  </span>
                  <span className="font-heading text-xs sm:text-sm font-bold text-white line-clamp-2">
                    {location}
                  </span>
                </div>
              </div>
            ) : category ? (
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10 text-white/80 shrink-0 mt-0.5">
                  <Tag className="w-4 h-4 text-[#ffd166]" />
                </div>
                <div>
                  <span className="text-[10px] font-subheading text-white/50 uppercase tracking-wider block">
                    Kategori Program
                  </span>
                  <span className="font-heading text-xs sm:text-sm font-bold text-white">
                    {category}
                  </span>
                </div>
              </div>
            ) : null}

            {/* Target Audience */}
            {target && (
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3 sm:col-span-2">
                <div className="p-2 rounded-xl bg-white/10 text-white/80 shrink-0 mt-0.5">
                  <Users className="w-4 h-4 text-[#38bdf8]" />
                </div>
                <div>
                  <span className="text-[10px] font-subheading text-white/50 uppercase tracking-wider block">
                    Sasaran / Peserta
                  </span>
                  <span className="font-subheading text-xs sm:text-sm text-white/90">
                    {target}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Full Explanation */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-subheading uppercase tracking-wider text-white/60 font-bold">
              Deskripsi &amp; Penjelasan Program
            </h4>
            <p className="font-subheading text-xs sm:text-sm text-white/80 leading-relaxed p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
              {item.description}
            </p>
          </div>
        </div>

        {/* Footer Actions & Sequential Stepper */}
        <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between gap-2 shrink-0">
          {/* Timeline Event Sequential Steppers */}
          {isTimelineEvent && onSelectEvent ? (
            <div className="flex items-center gap-1.5 sm:gap-2 flex-1">
              <button
                disabled={!prevEvent}
                onClick={() => prevEvent && onSelectEvent(prevEvent)}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-subheading font-medium transition-all ${
                  prevEvent
                    ? "bg-white/10 hover:bg-white/20 text-white active:scale-95 border border-white/15"
                    : "opacity-30 text-white/40 cursor-not-allowed border border-transparent"
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sebelumnya</span>
              </button>

              <button
                disabled={!nextEvent}
                onClick={() => nextEvent && onSelectEvent(nextEvent)}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-subheading font-medium transition-all ${
                  nextEvent
                    ? "bg-white/10 hover:bg-white/20 text-white active:scale-95 border border-white/15"
                    : "opacity-30 text-white/40 cursor-not-allowed border border-transparent"
                }`}
              >
                <span className="hidden sm:inline">Berikutnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-subheading text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white active:scale-95 transition-all border border-white/15"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}