"use client";

import React, { useState, useRef } from "react";

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  interactive?: boolean;
}

export default function LiquidGlassCard({
  children,
  className = "",
  contentClassName = "",
  interactive = true,
}: LiquidGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl transition-all duration-300 ${className}`}
      style={{
        // Realistic multi-tier glass backdrop
        background: isHovered
          ? "linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.05) 55%, rgba(255, 255, 255, 0.12) 100%)"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.03) 60%, rgba(255, 255, 255, 0.08) 100%)",
        backdropFilter: "blur(24px) saturate(135%) contrast(102%)",
        WebkitBackdropFilter: "blur(24px) saturate(135%) contrast(102%)",
        // Precision glass bevel borders & dual specular highlights
        border: "1px solid rgba(255, 255, 255, 0.22)",
        borderTop: "1.5px solid rgba(255, 255, 255, 0.55)",
        borderLeft: "1.5px solid rgba(255, 255, 255, 0.4)",
        boxShadow: `
          0 25px 60px -15px rgba(0, 0, 0, 0.65),
          0 0 35px -5px rgba(255, 255, 255, 0.06),
          inset 1px 1px 2px 0 rgba(255, 255, 255, 0.5),
          inset -1px -1px 2px 1px rgba(255, 255, 255, 0.15),
          inset 0 -2px 6px rgba(0, 0, 0, 0.3)
        `,
      }}
    >
      {/* 1. Dynamic Cursor Light Sheen (Follows Mouse Across the Glass) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-10"
        style={{
          opacity: isHovered ? 0.85 : 0.35,
          background: `radial-gradient(circle 350px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.06) 45%, transparent 75%)`,
        }}
      />

      {/* 2. Optical Glass Prism / Diagonal Reflection Sheen */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(115deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.04) 30%, transparent 55%)",
        }}
      />

      {/* 3. Subtle Cyan & Ruby Rim Glow on the Glass Edge */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          boxShadow:
            "inset 0 0 20px -2px rgba(139, 212, 255, 0.15), inset 0 0 30px -4px rgba(248, 107, 116, 0.12)",
        }}
      />

      {/* Card Content */}
      <div className={`relative z-20 w-full h-full ${contentClassName}`}>{children}</div>
    </div>
  );
}
