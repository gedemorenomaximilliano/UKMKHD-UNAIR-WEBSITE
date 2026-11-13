import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import KalenderContent from "@/components/KalenderContent";

export const metadata: Metadata = {
  title: "Kalender Hari Raya Hindu 2026 · UKMKHD UNAIR",
  description:
    "Penanggalan Suci Hari Raya Hindu, Rerainan, Purnama, Tilem, dan siklus Pawukon Tahun Saka 1947–1948 bagi sivitas akademika Universitas Airlangga.",
};

export default function KalenderPage() {
  return (
    <main className="min-h-screen bg-[#02121e] text-white flex flex-col">
      <Navbar />
      <KalenderContent />
    </main>
  );
}
