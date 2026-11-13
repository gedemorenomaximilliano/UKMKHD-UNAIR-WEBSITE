"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Calendar,
  ArrowRight,
  ChevronDown,
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
  const [openDropdown, setOpenDropdown] = useState<"dept" | "division" | "type" | null>(null);

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
          SEARCH & FILTER TOOLBAR (Liquid Glass with High Stacking Context)
          ============================================================== */}
      <div className="relative z-30 p-3.5 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] space-y-3.5 sm:space-y-4">
        {/* Search Input Bar with 44px touch target */}
        <div className="relative">
          <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari program kerja (nama, divisi, kata kunci)..."
            className="w-full pl-11 pr-10 py-3 sm:py-2.5 rounded-xl bg-white/10 backdrop-blur-2xl text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-[#8bd4ff] focus:ring-1 focus:ring-[#8bd4ff]/30 text-xs sm:text-sm font-subheading transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-xs text-white/50 hover:text-white active:scale-90"
              aria-label="Hapus Pencarian"
            >
              ✕
            </button>
          )}
        </div>

        {/* ==============================================================
            MOBILE CATEGORY FILTER (< sm): 1 UNIFIED HORIZONTAL ROW
            Single row with 3 custom Liquid Glass dropdowns
            ============================================================== */}
        <div className="grid grid-cols-3 gap-1.5 w-full sm:hidden relative z-40">
          {/* Backdrop layer to dismiss open dropdown */}
          {openDropdown && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpenDropdown(null)}
            />
          )}

          {/* Departemen Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "dept" ? null : "dept")}
              className="w-full flex items-center justify-between pl-2 pr-1.5 py-2 rounded-xl bg-white/10 backdrop-blur-2xl border border-white/20 text-[11px] font-subheading font-medium text-white hover:bg-white/20 active:scale-95 transition-all truncate shadow-md"
            >
              <span className="truncate">
                {selectedDept === "ALL"
                  ? "Semua Dept"
                  : selectedDept === "Proker Utama"
                  ? "Utama"
                  : selectedDept === "Departemen Internal"
                  ? "Internal"
                  : "Eksternal"}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-white/50 shrink-0 ml-1 transition-transform duration-200 ${
                  openDropdown === "dept" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown === "dept" && (
              <div className="absolute top-full left-0 mt-1.5 w-48 rounded-2xl bg-white/[0.14] backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                {[
                  { id: "ALL", label: "Semua Dept" },
                  { id: "Proker Utama", label: "Proker Utama (2)" },
                  { id: "Departemen Internal", label: "Internal (19)" },
                  { id: "Departemen Eksternal", label: "Eksternal (15)" },
                ].map((dept) => (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => {
                      setSelectedDept(dept.id as any);
                      setSelectedDivision("ALL");
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-subheading font-medium transition-colors ${
                      selectedDept === dept.id
                        ? "bg-white/20 text-white font-bold"
                        : "text-white/75 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {dept.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divisi Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "division" ? null : "division")}
              className="w-full flex items-center justify-between pl-2 pr-1.5 py-2 rounded-xl bg-white/10 backdrop-blur-2xl border border-white/20 text-[11px] font-subheading font-medium text-white hover:bg-white/20 active:scale-95 transition-all truncate shadow-md"
            >
              <span className="truncate">
                {selectedDivision === "ALL"
                  ? "Semua Divisi"
                  : divisions.find((d) => d.id === selectedDivision)?.label.replace(/\(\d+\)/, "").trim() || "Divisi"}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-white/50 shrink-0 ml-1 transition-transform duration-200 ${
                  openDropdown === "division" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown === "division" && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-52 rounded-2xl bg-white/[0.14] backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 p-1.5 max-h-60 overflow-y-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden space-y-1 animate-in fade-in zoom-in-95 duration-150">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDivision("ALL");
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-subheading font-medium transition-colors ${
                    selectedDivision === "ALL"
                      ? "bg-white/20 text-white font-bold"
                      : "text-white/75 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Semua Divisi
                </button>
                {divisions
                  .filter((d) => d.id !== "ALL")
                  .map((div) => (
                    <button
                      key={div.id}
                      type="button"
                      onClick={() => {
                        setSelectedDivision(div.id);
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-subheading font-medium transition-colors ${
                        selectedDivision === div.id
                          ? "bg-white/20 text-white font-bold"
                          : "text-white/75 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {div.label}
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Tipe Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "type" ? null : "type")}
              className="w-full flex items-center justify-between pl-2 pr-1.5 py-2 rounded-xl bg-white/10 backdrop-blur-2xl border border-white/20 text-[11px] font-subheading font-medium text-white hover:bg-white/20 active:scale-95 transition-all truncate shadow-md"
            >
              <span className="truncate">
                {selectedType === "ALL" ? "Semua Tipe" : selectedType}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-white/50 shrink-0 ml-1 transition-transform duration-200 ${
                  openDropdown === "type" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown === "type" && (
              <div className="absolute top-full right-0 mt-1.5 w-44 rounded-2xl bg-white/[0.14] backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                {[
                  { id: "ALL", label: "Semua Tipe" },
                  { id: "Sekali Jalan", label: "Sekali Jalan" },
                  { id: "Rutin", label: "Rutin" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setSelectedType(t.id as any);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-subheading font-medium transition-colors ${
                      selectedType === t.id
                        ? "bg-white/20 text-white font-bold"
                        : "text-white/75 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ==============================================================
            DESKTOP CATEGORY FILTER (sm:block): FULL TABS & CHIPS
            ============================================================== */}
        <div className="hidden sm:block space-y-3.5">
          {/* Master Department Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
            {[
              { id: "ALL", label: `Semua (${ALL_PROGRAM_KERJA.length})` },
              { id: "Proker Utama", label: "Proker Utama (2)" },
              { id: "Departemen Internal", label: "Internal (19)" },
              { id: "Departemen Eksternal", label: "Eksternal (15)" },
            ].map((dept) => (
              <button
                key={dept.id}
                onClick={() => {
                  setSelectedDept(dept.id as any);
                  setSelectedDivision("ALL");
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-subheading font-medium whitespace-nowrap snap-start active:scale-95 transition-all ${
                  selectedDept === dept.id
                    ? "bg-white/20 text-white border border-white/35 shadow-sm"
                    : "bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.07] border border-white/5"
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>

          {/* Division Chips & Type Filter */}
          <div className="flex sm:items-center justify-between gap-3 pt-2.5 border-t border-white/10">
            {/* Division Select Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none max-w-full snap-x">
              {divisions.map((div) => (
                <button
                  key={div.id}
                  onClick={() => setSelectedDivision(div.id)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-subheading font-medium whitespace-nowrap snap-start active:scale-95 transition-all ${
                    selectedDivision === div.id
                      ? "bg-white/20 text-white border border-white/35 shadow-sm"
                      : "bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.07] border border-white/5"
                  }`}
                >
                  {div.label}
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-2xl p-1 rounded-xl border border-white/20 text-xs shrink-0">
              {[
                { id: "ALL", label: "Semua Tipe" },
                { id: "Sekali Jalan", label: "Sekali Jalan" },
                { id: "Rutin", label: "Rutin" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedType(t.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-subheading font-medium active:scale-95 transition-all ${
                    selectedType === t.id
                      ? "bg-white/20 text-white shadow-sm"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count Summary & Mobile Reset Badge */}
      <div className="flex items-center justify-between px-2 gap-2">
        <p className="text-xs font-subheading text-white/60">
          Menampilkan <span className="font-bold text-white">{filteredPrograms.length}</span> program
          {selectedDept !== "ALL" && <span className="hidden sm:inline"> di <span className="text-[#8bd4ff]">{selectedDept}</span></span>}
        </p>

        {(searchQuery || selectedDept !== "ALL" || selectedDivision !== "ALL" || selectedType !== "ALL") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedDept("ALL");
              setSelectedDivision("ALL");
              setSelectedType("ALL");
            }}
            className="text-xs font-subheading px-2.5 py-1 rounded-lg bg-[#c1111e]/15 border border-[#c1111e]/30 text-[#ff8b94] hover:bg-[#c1111e]/25 active:scale-95 transition-all"
          >
            Reset Filter ✕
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
