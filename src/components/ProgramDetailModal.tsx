"use client";

import React, { useEffect } from "react";
import {
  X,
  Calendar,
  MapPin,
  Users,
  Tag,
} from "lucide-react";
import { ProgramKerja, TimelineEvent } from "@/data/prokerData";

interface ProgramDetailModalProps {
  item: ProgramKerja | TimelineEvent | null;
  onClose: () => void;
}

export default function ProgramDetailModal({ item, onClose }: ProgramDetailModalProps) {
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
  const title = "title" in item ? item.title : item.name;
  const schedule = "dateStr" in item ? item.dateStr : item.schedule;
  const location = "location" in item ? item.location : undefined;
  const target = "target" in item ? item.target : undefined;
  const tags = "tags" in item ? item.tags : undefined;
  const category = "category" in item ? item.category : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Blurred Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#02121e]/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
      />

      {/* Liquid Glass Modal Card */}
      <div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden p-6 sm:p-8 z-10 transition-all animate-in zoom-in-95 duration-200"
        style={{
          background:
            "linear-gradient(135deg, rgba(2, 32, 52, 0.95) 0%, rgba(1, 18, 30, 0.98) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: `
            0 25px 60px -15px rgba(0, 0, 0, 0.85),
            inset 0 1px 1px rgba(255, 255, 255, 0.25)
          `,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3 pr-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-heading font-medium bg-white/10 text-white/90 border border-white/15">
              {item.department}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-subheading font-medium bg-white/10 text-[#8bd4ff] border border-white/10">
              {item.division}
            </span>
            {isTimelineEvent && (
              <span className="px-3 py-1 rounded-full text-xs font-subheading font-medium bg-white/10 text-white/80 border border-white/15">
                Timeline #{item.order}
              </span>
            )}
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            {title}
          </h3>
        </div>

        {/* Key Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-6">
          {/* Schedule */}
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-white/10 text-white/80 shrink-0 mt-0.5">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-subheading text-white/50 uppercase tracking-wider block">
                Jadwal Pelaksanaan
              </span>
              <span className="font-heading text-sm sm:text-base font-bold text-white">
                {schedule}
              </span>
            </div>
          </div>

          {/* Location or Category */}
          {location ? (
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-white/80 shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-subheading text-white/50 uppercase tracking-wider block">
                  Lokasi / Platform
                </span>
                <span className="font-heading text-sm sm:text-base font-bold text-white">
                  {location}
                </span>
              </div>
            </div>
          ) : category ? (
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-white/80 shrink-0 mt-0.5">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-subheading text-white/50 uppercase tracking-wider block">
                  Kategori Program
                </span>
                <span className="font-heading text-sm sm:text-base font-bold text-white">
                  {category}
                </span>
              </div>
            </div>
          ) : null}

          {/* Target Audience */}
          {target && (
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3 sm:col-span-2">
              <div className="p-2 rounded-xl bg-white/10 text-white/80 shrink-0 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-subheading text-white/50 uppercase tracking-wider block">
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
        <div className="space-y-3 pb-2">
          <h4 className="text-xs font-subheading uppercase tracking-wider text-white/60 font-bold">
            Deskripsi &amp; Penjelasan Program
          </h4>
          <p className="font-subheading text-sm sm:text-base text-white/80 leading-relaxed p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            {item.description}
          </p>
        </div>

        {/* Tags if available */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-3">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-subheading px-2.5 py-0.5 rounded-md bg-white/[0.05] text-white/60 border border-white/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-end pt-5 mt-5 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-subheading text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
