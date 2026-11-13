"use client";

import React, { useState } from "react";
import AnimatedBackground from "./AnimatedBackground";
import CorkboardTimeline from "./CorkboardTimeline";
import ProgramKerjaCatalog from "./ProgramKerjaCatalog";
import ProgramDetailModal from "./ProgramDetailModal";
import { ProgramKerja, TimelineEvent } from "@/data/prokerData";

export default function ProgramKerjaContent() {
  const [activeMainTab, setActiveMainTab] = useState<"timeline" | "catalog">("timeline");
  const [selectedItem, setSelectedItem] = useState<ProgramKerja | TimelineEvent | null>(null);

  return (
    <div className="relative isolate min-h-screen pt-28 pb-20 overflow-hidden bg-[#02121e] text-white">
      {/* Dynamic Animated Canvas Background */}
      <AnimatedBackground />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* ==============================================================
            THE MASTER TAB TOGGLE
            "Papan Timeline" & "Katalog Program"
            ============================================================== */}
        <div className="flex justify-center pt-2 sm:pt-4">
          <div className="inline-flex p-1.5 rounded-full bg-white/[0.05] backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
            {/* Toggle 1: Papan Timeline */}
            <button
              onClick={() => setActiveMainTab("timeline")}
              className={`px-6 sm:px-8 py-2.5 rounded-full font-subheading text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeMainTab === "timeline"
                  ? "bg-white/15 text-white border border-white/30 shadow-md scale-[1.02]"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>Papan Timeline</span>
            </button>

            {/* Toggle 2: Katalog Program */}
            <button
              onClick={() => setActiveMainTab("catalog")}
              className={`px-6 sm:px-8 py-2.5 rounded-full font-subheading text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeMainTab === "catalog"
                  ? "bg-white/15 text-white border border-white/30 shadow-md scale-[1.02]"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>Katalog Program</span>
            </button>
          </div>
        </div>

        {/* ==============================================================
            VIEW 1: PAPAN TIMELINE
            ============================================================== */}
        {activeMainTab === "timeline" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <CorkboardTimeline onSelectEvent={(ev) => setSelectedItem(ev)} />
          </div>
        )}

        {/* ==============================================================
            VIEW 2: KATALOG PROGRAM
            ============================================================== */}
        {activeMainTab === "catalog" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <ProgramKerjaCatalog onSelectProgram={(prog) => setSelectedItem(prog)} />
          </div>
        )}

      </div>

      {/* Global Detail Modal Inspector */}
      <ProgramDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
