"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Calendar,
  ArrowRight,
} from "lucide-react";
import LiquidGlassCard from "./LiquidGlassCard";
import { ProgramKerja, ALL_PROGRAM_KERJA } from "@/data/prokerData";

interface ProgramKerjaCatalogProps {
  onSelectProgram: (program: ProgramKerja) => void;
}

export default function ProgramKerjaCatalog({ onSelectProgram }: ProgramKerjaCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<"ALL" | "Proker Utama" | "Departemen Internal" | "Departemen Eksternal">("ALL");
  const [selectedDivision, setSelectedDivision] = useState<string>("ALL");
  const [selectedType, setSelectedType] = useState<"ALL" | "Sekali Jalan" | "Rutin" | "Proker Utama">("ALL");

  const divisions = [
    { id: "ALL", label: "Semua Divisi" },
    { id: "Divisi Personalia", label: "Personalia (3)" },
    { id: "Divisi Minat dan Bakat", label: "Minat & Bakat (5)" },
    { id: "Divisi Kerohanian", label: "Kerohanian (6)" },
    { id: "Divisi Ikatan Keluarga", label: "Ikatan Keluarga (5)" },
    { id: "Divisi Hubungan dan Pengabdian Masyarakat", label: "Hupengmas (4)" },
    { id: "Divisi Media Kreatif", label: "Media Kreatif (9)" },
    { id: "Divisi Sponsor dan Dana Usaha", label: "Sponsor & Danus (2)" },
  ];

  const filteredPrograms = useMemo(() => {
    return ALL_PROGRAM_KERJA.filter((prog) => {
      if (selectedDept !== "ALL" && prog.department !== selectedDept) return false;
      if (selectedDivision !== "ALL" && prog.division !== selectedDivision) return false;
      if (selectedType !== "ALL" && prog.type !== selectedType) return false;

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesName = prog.name.toLowerCase().includes(q);
        const matchesDesc = prog.description.toLowerCase().includes(q);
        const matchesDiv = prog.division.toLowerCase().includes(q);
        const matchesDept = prog.department.toLowerCase().includes(q);
        const matchesTarget = prog.target.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesDiv && !matchesDept && !matchesTarget) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedDept, selectedDivision, selectedType]);

  return (
    <div className="space-y-6">
      {/* ==============================================================
          SEARCH & FILTER TOOLBAR (Liquid Glass)
          ============================================================== */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] space-y-4">
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari program kerja berdasarkan nama, divisi, atau kata kunci..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#021724]/80 text-white placeholder-white/40 border border-white/15 focus:outline-none focus:border-[#8bd4ff] focus:ring-1 focus:ring-[#8bd4ff]/30 text-xs sm:text-sm font-subheading transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Master Department Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "ALL", label: `Semua Program (${ALL_PROGRAM_KERJA.length})` },
            { id: "Proker Utama", label: "Proker Utama (2)" },
            { id: "Departemen Internal", label: "Departemen Internal (19)" },
            { id: "Departemen Eksternal", label: "Departemen Eksternal (15)" },
          ].map((dept) => (
            <button
              key={dept.id}
              onClick={() => {
                setSelectedDept(dept.id as any);
                setSelectedDivision("ALL");
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-subheading font-medium whitespace-nowrap transition-all ${
                selectedDept === dept.id
                  ? "bg-white/15 text-white border border-white/30 shadow-sm"
                  : "bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.07] border border-white/5"
              }`}
            >
              {dept.label}
            </button>
          ))}
        </div>

        {/* Division Chips & Type Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
          {/* Division Select Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none max-w-full">
            {divisions.map((div) => (
              <button
                key={div.id}
                onClick={() => setSelectedDivision(div.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-subheading font-medium whitespace-nowrap transition-all ${
                  selectedDivision === div.id
                    ? "bg-white/15 text-white border border-white/30"
                    : "bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.07]"
                }`}
              >
                {div.label}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1 bg-[#021724]/80 p-1 rounded-xl border border-white/10 text-xs shrink-0">
            {[
              { id: "ALL", label: "Semua Tipe" },
              { id: "Sekali Jalan", label: "Sekali Jalan" },
              { id: "Rutin", label: "Rutin" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id as any)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-subheading font-medium transition-all ${
                  selectedType === t.id
                    ? "bg-white/20 text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count Summary */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs font-subheading text-white/60">
          Menampilkan <span className="font-bold text-white">{filteredPrograms.length}</span> program kerja
          {selectedDept !== "ALL" && <span> di <span className="text-[#8bd4ff]">{selectedDept}</span></span>}
          {selectedDivision !== "ALL" && <span> · {selectedDivision}</span>}
        </p>

        {(searchQuery || selectedDept !== "ALL" || selectedDivision !== "ALL" || selectedType !== "ALL") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedDept("ALL");
              setSelectedDivision("ALL");
              setSelectedType("ALL");
            }}
            className="text-xs font-subheading text-[#8bd4ff] hover:underline"
          >
            Reset Semua Filter
          </button>
        )}
      </div>

      {/* Program Cards Grid */}
      {filteredPrograms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPrograms.map((prog) => (
            <LiquidGlassCard
              key={prog.id}
              className="h-full flex flex-col justify-between group cursor-pointer transition-transform hover:-translate-y-1 duration-300"
            >
              <div
                onClick={() => onSelectProgram(prog)}
                className="p-5 flex flex-col h-full justify-between"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-subheading font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                      {prog.divisionShort}
                    </span>

                    <span className="text-[10px] font-subheading font-medium px-2 py-0.5 rounded-md bg-white/10 text-white/70">
                      {prog.type}
                    </span>
                  </div>

                  {/* Program Title */}
                  <h4 className="font-heading text-lg font-bold text-white group-hover:text-[#8bd4ff] transition-colors leading-snug">
                    {prog.name}
                  </h4>

                  {/* Schedule */}
                  <div className="flex items-center gap-2 mt-2 text-xs text-white/60">
                    <Calendar className="w-3.5 h-3.5 text-white/50 shrink-0" />
                    <span className="line-clamp-1">{prog.schedule}</span>
                  </div>

                  {/* Description Snippet */}
                  <p className="font-subheading text-xs text-white/70 mt-3 leading-relaxed line-clamp-3">
                    {prog.description}
                  </p>
                </div>

                {/* Card Footer: Target & Detail Button */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-subheading text-white/50 line-clamp-1 max-w-[65%]">
                    Sasaran: {prog.target}
                  </span>

                  <button className="inline-flex items-center gap-1 text-xs font-subheading font-semibold text-[#8bd4ff] group-hover:translate-x-1 transition-transform">
                    <span>Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      ) : (
        <div className="p-10 text-center rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
          <p className="font-heading text-base text-white/80">
            Tidak ada program kerja yang cocok dengan pencarian Anda.
          </p>
          <p className="text-xs font-subheading text-white/50">
            Coba ubah kata kunci atau pilih &quot;Reset Semua Filter&quot;.
          </p>
        </div>
      )}
    </div>
  );
}
