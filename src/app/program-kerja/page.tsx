import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ProgramKerjaContent from "@/components/ProgramKerjaContent";

export const metadata: Metadata = {
  title: "Program Kerja & Timeline 2026 · UKMKHD UNAIR",
  description:
    "Papan timeline investigasi agenda dan katalog lengkap 36 program kerja UKMKHD Universitas Airlangga Kabinet Nivaramitra 2026.",
};

export default function ProgramKerjaPage() {
  return (
    <main className="min-h-screen bg-[#02121e] text-white flex flex-col">
      <Navbar />
      <ProgramKerjaContent />
    </main>
  );
}
