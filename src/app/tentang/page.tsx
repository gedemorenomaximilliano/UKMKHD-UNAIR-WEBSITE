import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import TentangContent from "@/components/TentangContent";

export const metadata: Metadata = {
  title: "Tentang · UKMKHD UNAIR & Kabinet Nivaramitra 2026",
  description:
    "Profil organisasi UKMKHD UNAIR sejak 1985 serta visi, filosofi logo, dan nilai kepengurusan Kabinet Nivaramitra 2026.",
};

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-[#02121e] text-white flex flex-col">
      <Navbar />
      <TentangContent />
    </main>
  );
}
