import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col selection:bg-[#ff2035] selection:text-white overflow-hidden bg-[#02121e] text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Hero Page */}
      <div className="flex-1 flex flex-col justify-center">
        <Hero />
      </div>
    </main>
  );
}
