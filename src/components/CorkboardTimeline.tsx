"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  List,
  Compass,
} from "lucide-react";
import { TimelineEvent, TIMELINE_EVENTS } from "@/data/prokerData";

interface CorkboardTimelineProps {
  onSelectEvent: (event: TimelineEvent) => void;
}

// Mobile corkboard native canvas dimensions (see MOBILE_CONFIG coordinates below)
const MOBILE_CANVAS_W = 354;
const MOBILE_CANVAS_H = 1120;
// Mobile board starts slightly zoomed out so the whole board fits comfortably on a phone
const MOBILE_DEFAULT_ZOOM = 0.7;

export default function CorkboardTimeline({ onSelectEvent }: CorkboardTimelineProps) {
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  // Default zoom set to 80% so all prokers are visible at once
  const [zoomLevel, setZoomLevel] = useState<number>(0.8);
  // Mobile board has its own zoom level, independent from the desktop canvas
  const [mobileZoom, setMobileZoom] = useState<number>(MOBILE_DEFAULT_ZOOM);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"corkboard" | "linear">("corkboard");

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    if ((e.target as HTMLElement).closest(".cursor-pointer")) return;
    isDraggingRef.current = true;
    startPosRef.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: containerRef.current.scrollLeft,
      scrollTop: containerRef.current.scrollTop,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    e.preventDefault();
    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;
    containerRef.current.scrollLeft = startPosRef.current.scrollLeft - dx;
    containerRef.current.scrollTop = startPosRef.current.scrollTop - dy;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Track whether the mobile corkboard (below the sm breakpoint) is the active view
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Auto-fit zoom on mount and window resize so all 9 timeline events are immediately visible
  useEffect(() => {
    const handleAutoFit = () => {
      if (!containerRef.current || viewMode !== "corkboard") return;
      const clientW = containerRef.current.clientWidth;
      if (clientW > 0) {
        // Fits comfortably to container width (with padding buffer), capped between 0.5 and 0.8
        const fitZoom = Math.min(0.8, Math.max(0.5, +((clientW - 40) / 1320).toFixed(2)));
        setZoomLevel(fitZoom);
      }
    };

    handleAutoFit();
    window.addEventListener("resize", handleAutoFit);
    return () => window.removeEventListener("resize", handleAutoFit);
  }, [viewMode]);

  // Handle centering scroll only if content truly overflows the viewport
  useEffect(() => {
    if (containerRef.current && viewMode === "corkboard") {
      const el = containerRef.current;
      if (el.scrollWidth > el.clientWidth) {
        el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
      } else {
        el.scrollLeft = 0;
      }
      el.scrollTop = 0;
    }
  }, [viewMode, zoomLevel]);

  const handleZoom = (delta: number) => {
    if (isMobile) {
      setMobileZoom((prev) => Math.min(1.1, Math.max(0.45, +(prev + delta).toFixed(2))));
      return;
    }
    setZoomLevel((prev) => Math.min(1.2, Math.max(0.45, +(prev + delta).toFixed(2))));
  };

  const handleResetZoom = () => {
    if (isMobile) {
      setMobileZoom(MOBILE_DEFAULT_ZOOM);
      return;
    }
    if (containerRef.current) {
      const clientW = containerRef.current.clientWidth;
      const fitZoom = Math.min(0.8, Math.max(0.5, +((clientW - 40) / 1320).toFixed(2)));
      setZoomLevel(fitZoom);
      containerRef.current.scrollLeft = 0;
      containerRef.current.scrollTop = 0;
    } else {
      setZoomLevel(0.8);
    }
  };

  // Connected string sequences between the 9 timeline events (LO Lomba removed)
  const stringConnections: [string, string][] = [
    ["supermen-bali-2026", "tirta-yatra"],
    ["tirta-yatra", "ukmkhd-visit"],
    ["ukmkhd-visit", "bakti-sosial-2026"],
    ["bakti-sosial-2026", "display-ukm"],
    ["display-ukm", "jejak-ukmkhd"],
    ["jejak-ukmkhd", "mahabharata-2026"],
    ["mahabharata-2026", "nirwana-2026"],
    ["nirwana-2026", "suksesi-2026"],
  ];

  const getPinCoordinate = (event: TimelineEvent) => {
    const noteX = (event.x / 100) * 1320;
    const noteY = (event.y / 100) * 700;
    return {
      x: noteX + event.pinOffset.x,
      y: noteY + event.pinOffset.y,
    };
  };

  const createCurvedPath = (
    p1: { x: number; y: number },
    p2: { x: number; y: number }
  ) => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const sag = Math.min(28, Math.max(10, dist * 0.065));
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2 + sag;
    return `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`;
  };

  // Mobile serpentine corkboard coordinate matrix
  const MOBILE_CONFIG: Record<
    string,
    { top: number; left: number; pinX: number; pinY: number; rotate: string }
  > = {
    "supermen-bali-2026": { top: 16, left: 10, pinX: 90, pinY: 16, rotate: "-1deg" },
    "tirta-yatra": { top: 44, left: 184, pinX: 264, pinY: 44, rotate: "1deg" },
    "ukmkhd-visit": { top: 246, left: 184, pinX: 264, pinY: 246, rotate: "-1.5deg" },
    "bakti-sosial-2026": { top: 274, left: 10, pinX: 90, pinY: 274, rotate: "1.5deg" },
    "display-ukm": { top: 476, left: 10, pinX: 90, pinY: 476, rotate: "-1deg" },
    "jejak-ukmkhd": { top: 504, left: 184, pinX: 264, pinY: 504, rotate: "1.5deg" },
    "mahabharata-2026": { top: 706, left: 184, pinX: 264, pinY: 706, rotate: "-1deg" },
    "nirwana-2026": { top: 734, left: 10, pinX: 90, pinY: 734, rotate: "1deg" },
    "suksesi-2026": { top: 934, left: 97, pinX: 177, pinY: 934, rotate: "0deg" },
  };

  const createMobileCurvedPath = (
    p1: { pinX: number; pinY: number },
    p2: { pinX: number; pinY: number }
  ) => {
    const dx = p2.pinX - p1.pinX;
    const dy = p2.pinY - p1.pinY;
    if (Math.abs(dx) > Math.abs(dy)) {
      const midX = (p1.pinX + p2.pinX) / 2;
      const midY = (p1.pinY + p2.pinY) / 2 + 18;
      return `M ${p1.pinX} ${p1.pinY} Q ${midX} ${midY} ${p2.pinX} ${p2.pinY}`;
    }
    const midX = (p1.pinX + p2.pinX) / 2 + (p1.pinX > 180 ? 14 : -14);
    const midY = (p1.pinY + p2.pinY) / 2;
    return `M ${p1.pinX} ${p1.pinY} Q ${midX} ${midY} ${p2.pinX} ${p2.pinY}`;
  };

  return (
    <div className="w-full relative space-y-2.5 sm:space-y-4">
      {/* ==============================================================
          VIEW SWITCHER & ZOOM TOOLBAR (85% DEFAULT)
          ============================================================== */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        {/* Left: View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <button
            onClick={() => setViewMode("corkboard")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-subheading font-medium transition-all ${
              viewMode === "corkboard"
                ? "bg-white/15 text-white border border-white/20 shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Papan Timeline</span>
          </button>
          <button
            onClick={() => setViewMode("linear")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-subheading font-medium transition-all ${
              viewMode === "linear"
                ? "bg-white/15 text-white border border-white/20 shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Garis Waktu Linear</span>
          </button>
        </div>

        {/* Right: Zoom Controls (Visible on all screen sizes) */}
        {viewMode === "corkboard" && (
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-2xl p-1.5 rounded-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
            <button
              onClick={() => handleZoom(-0.1)}
              className="p-1.5 rounded-lg bg-white/10 border border-white/15 text-white/80 hover:text-white hover:bg-white/20 transition-colors"
              title="Perkecil"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-subheading text-white/80 px-1 font-mono min-w-[38px] text-center">
              {Math.round((isMobile ? mobileZoom : zoomLevel) * 100)}%
            </span>
            <button
              onClick={() => handleZoom(0.1)}
              className="p-1.5 rounded-lg bg-white/10 border border-white/15 text-white/80 hover:text-white hover:bg-white/20 transition-colors"
              title="Perbesar"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg bg-white/10 border border-white/15 text-white/80 hover:text-white hover:bg-white/20 transition-colors ml-0.5"
              title="Reset zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* ==============================================================
          VIEW MODE 1: PAPAN TIMELINE
          ============================================================== */}
      {viewMode === "corkboard" ? (
        <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border border-white/15">
          
          {/* Outer Frame: Midnight Titanium Glass Frame */}
          <div
            className="p-2 sm:p-5 relative"
            style={{
              background:
                "linear-gradient(135deg, rgba(2, 32, 53, 0.95) 0%, rgba(1, 20, 32, 0.98) 100%)",
              boxShadow:
                "inset 0 1px 2px rgba(255, 255, 255, 0.25), inset 0 0 20px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* Plaque: "Papan Timeline" */}
            <div className="flex justify-center -mt-0.5 mb-1.5 sm:mb-2.5 relative z-20">
              <div className="inline-flex items-center justify-center px-6 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/20 shadow-md">
                <span className="font-heading text-xs sm:text-sm font-bold tracking-wider text-white uppercase">
                  Papan Timeline 2026
                </span>
              </div>
            </div>

            {/* ========================================================
                A. MOBILE 2-WIDE SERPENTINE CORKBOARD (sm:hidden)
                Fits 358px usable width with zero horizontal overflow
                ======================================================== */}
            <div
              className="sm:hidden w-full relative rounded-2xl overflow-auto scrollbar-none"
              style={{
                height: `${Math.round(MOBILE_CANVAS_H * mobileZoom) + 24}px`,
                backgroundColor: "#021320",
                backgroundImage: `
                  radial-gradient(ellipse at center, rgba(3, 42, 68, 0.85) 0%, rgba(1, 15, 25, 0.98) 100%),
                  radial-gradient(rgba(139, 212, 255, 0.12) 1px, transparent 1px)
                `,
                backgroundSize: "100% 100%, 36px 36px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.85)",
              }}
            >
              {/* Scaled sizing wrapper: reserves the scaled footprint so the board can zoom */}
              <div
                className="relative shrink-0 mx-auto my-3"
                style={{
                  width: `${Math.round(MOBILE_CANVAS_W * mobileZoom)}px`,
                  height: `${Math.round(MOBILE_CANVAS_H * mobileZoom)}px`,
                }}
              >
              {/* Mobile Centered 354px Canvas with 1:1 Pixel Mapping (scaled by mobileZoom) */}
              <div
                className="absolute top-0 left-0 origin-top-left"
                style={{
                  width: `${MOBILE_CANVAS_W}px`,
                  height: `${MOBILE_CANVAS_H}px`,
                  transform: `scale(${mobileZoom})`,
                }}
              >
                {/* Red Yarn SVG Network for Mobile */}
                <svg
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{ width: "354px", height: "1120px" }}
                  viewBox="0 0 354 1120"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <defs>
                    <filter id="mStringShadow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.7" />
                    </filter>
                  </defs>

                  {stringConnections.map(([idA, idB], idx) => {
                    const cfgA = MOBILE_CONFIG[idA];
                    const cfgB = MOBILE_CONFIG[idB];
                    if (!cfgA || !cfgB) return null;

                    const pathD = createMobileCurvedPath(cfgA, cfgB);

                    return (
                      <g key={`m-string-${idA}-${idB}-${idx}`}>
                        <path
                          d={pathD}
                          stroke="rgba(0,0,0,0.6)"
                          strokeWidth="3"
                          fill="none"
                          transform="translate(1, 2)"
                        />
                        <path
                          d={pathD}
                          stroke="#c1111e"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          fill="none"
                          filter="url(#mStringShadow)"
                        />
                        <path
                          d={pathD}
                          stroke="#ffa3a8"
                          strokeWidth="0.6"
                          strokeDasharray="4 6"
                          fill="none"
                          opacity={0.5}
                        />
                        <circle cx={cfgA.pinX} cy={cfgA.pinY} r="3" fill="#770101" stroke="#c1111e" strokeWidth="1" />
                        <circle cx={cfgB.pinX} cy={cfgB.pinY} r="3" fill="#770101" stroke="#c1111e" strokeWidth="1" />
                      </g>
                    );
                  })}
                </svg>

                {/* Mobile 9 Pinned Cards */}
                {TIMELINE_EVENTS.map((event) => {
                  const cfg = MOBILE_CONFIG[event.id];
                  if (!cfg) return null;

                  return (
                    <div
                      key={`m-card-${event.id}`}
                      onClick={() => {
                        setSelectedEventId(event.id);
                        onSelectEvent(event);
                      }}
                      className="absolute cursor-pointer transition-all duration-200 active:scale-95 z-20"
                      style={{
                        top: `${cfg.top}px`,
                        left: `${cfg.left}px`,
                        width: "160px",
                        transform: `rotate(${cfg.rotate})`,
                        transformOrigin: "80px 0px",
                      }}
                    >
                      {/* Pushpin at top center of card */}
                      <div
                        className="absolute pointer-events-none z-30"
                        style={{
                          left: "80px",
                          top: "0px",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#ff4d5a] via-[#c1111e] to-[#770101] border border-white/60 shadow-md" />
                      </div>

                      {/* Card Content */}
                      <div
                        className="w-full pt-3.5 pb-2.5 px-3 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/20 shadow-lg text-left"
                        style={{
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                        }}
                      >
                        <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5">
                          <span className="font-heading font-extrabold text-[10px] text-[#8bd4ff] uppercase tracking-tight">
                            {event.badge || event.dateStr}
                          </span>
                          <span className="text-[9px] font-mono text-white/50 px-1 py-0.2 rounded bg-white/5">
                            #{event.order}
                          </span>
                        </div>

                        <h5 className="font-heading font-bold text-xs text-white leading-tight line-clamp-2">
                          {event.title}
                        </h5>

                        <span className="text-[9px] font-subheading text-white/60 mt-1 line-clamp-1 block">
                          {event.division}
                        </span>

                        <div className="pt-2 flex justify-end">
                          <span className="text-[9px] font-subheading font-semibold text-[#8bd4ff] flex items-center gap-0.5">
                            <span>Detail</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              </div>
            </div>

            {/* ========================================================
                B. DESKTOP CORKBOARD CANVAS (hidden sm:block)
                Original scalable canvas with zoom and pan
                ======================================================== */}
            <div
              className="hidden sm:block rounded-2xl p-1 relative overflow-hidden"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.85)",
              }}
            >
              <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="w-full overflow-auto cursor-grab active:cursor-grabbing rounded-xl select-none relative"
                style={{
                  maxHeight: "720px",
                  backgroundColor: "#021320",
                  backgroundImage: `
                    radial-gradient(ellipse at center, rgba(3, 42, 68, 0.85) 0%, rgba(1, 15, 25, 0.98) 100%),
                    radial-gradient(rgba(139, 212, 255, 0.12) 1px, transparent 1px)
                  `,
                  backgroundSize: "100% 100%, 48px 48px",
                  boxShadow: "inset 0 0 40px rgba(0, 0, 0, 0.8)",
                }}
              >
                {/* Centered Sizing Frame */}
                <div className="min-w-full w-max flex items-center justify-center p-3 sm:p-5">
                  <div
                    style={{
                      width: `${1320 * zoomLevel}px`,
                      height: `${700 * zoomLevel}px`,
                      margin: "0 auto",
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    {/* Scalable Canvas at current zoom */}
                    <div
                      className="relative transition-transform duration-200 origin-top-left"
                      style={{
                        width: "1320px",
                        height: "700px",
                        transform: `scale(${zoomLevel})`,
                      }}
                    >
                  {/* Red Yarn SVG Network */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-10"
                    viewBox="0 0 1320 700"
                    fill="none"
                  >
                    <defs>
                      <filter id="stringShadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.7" />
                      </filter>
                      <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#ff2a3b" floodOpacity="0.85" />
                      </filter>
                    </defs>

                    {stringConnections.map(([idA, idB], idx) => {
                      const evA = TIMELINE_EVENTS.find((e) => e.id === idA);
                      const evB = TIMELINE_EVENTS.find((e) => e.id === idB);
                      if (!evA || !evB) return null;

                      const isHovered =
                        hoveredEventId === idA ||
                        hoveredEventId === idB ||
                        selectedEventId === idA ||
                        selectedEventId === idB;

                      const p1 = getPinCoordinate(evA);
                      const p2 = getPinCoordinate(evB);
                      const pathD = createCurvedPath(p1, p2);

                      return (
                        <g key={`string-${idA}-${idB}-${idx}`} className="transition-all duration-300">
                          {/* Cast Shadow */}
                          <path
                            d={pathD}
                            stroke="rgba(0,0,0,0.6)"
                            strokeWidth="3.5"
                            fill="none"
                            transform="translate(1, 3)"
                          />
                          {/* Main Yarn Line */}
                          <path
                            d={pathD}
                            stroke={isHovered ? "#ff2a3b" : "#c1111e"}
                            strokeWidth={isHovered ? "3" : "2.2"}
                            strokeLinecap="round"
                            fill="none"
                            filter={isHovered ? "url(#glowRed)" : "url(#stringShadow)"}
                          />
                          {/* Subtle Weave Line */}
                          <path
                            d={pathD}
                            stroke="#ffa3a8"
                            strokeWidth="0.6"
                            strokeDasharray="4 6"
                            fill="none"
                            opacity={0.5}
                          />
                          {/* Knot points */}
                          <circle cx={p1.x} cy={p1.y} r="3" fill="#770101" stroke="#c1111e" strokeWidth="1" />
                          <circle cx={p2.x} cy={p2.y} r="3" fill="#770101" stroke="#c1111e" strokeWidth="1" />
                        </g>
                      );
                    })}
                  </svg>

                  {/* 9 Liquid Glass Pinned Elements */}
                  {TIMELINE_EVENTS.map((event) => {
                    const isHovered = hoveredEventId === event.id || selectedEventId === event.id;

                    return (
                      <div
                        key={event.id}
                        onMouseEnter={() => setHoveredEventId(event.id)}
                        onMouseLeave={() => setHoveredEventId(null)}
                        onClick={() => {
                          setSelectedEventId(event.id);
                          onSelectEvent(event);
                        }}
                        className={`absolute cursor-pointer transition-all duration-300 group ${
                          isHovered ? "z-40 scale-105" : "z-20"
                        }`}
                        style={{
                          left: `${event.x}%`,
                          top: `${event.y}%`,
                          transform: `rotate(${event.rotate}) ${isHovered ? "scale(1.06)" : ""}`,
                          transformOrigin: `${event.pinOffset.x}px ${event.pinOffset.y}px`,
                        }}
                      >
                        {/* Red Pushpin */}
                        <div
                          className="absolute pointer-events-none z-30"
                          style={{
                            left: `${event.pinOffset.x}px`,
                            top: `${event.pinOffset.y}px`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
                            <ellipse cx="13" cy="22" rx="6" ry="3" fill="rgba(0,0,0,0.5)" filter="blur(1px)" />
                            <path d="M11 11 L13 22" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
                            <circle cx="11" cy="10" r="7.5" fill="url(#unifiedPinGrad)" stroke="#770101" strokeWidth="1" />
                            <circle cx="9" cy="8" r="2.5" fill="rgba(255,255,255,0.7)" filter="blur(0.4px)" />
                            <defs>
                              <radialGradient id="unifiedPinGrad" cx="35%" cy="35%" r="65%">
                                <stop offset="0%" stopColor="#ff4d5a" />
                                <stop offset="55%" stopColor="#c1111e" />
                                <stop offset="100%" stopColor="#4a0407" />
                              </radialGradient>
                            </defs>
                          </svg>
                        </div>

                        {/* Liquid Glass Card Element */}
                        <div
                          className={`w-56 pt-4 pb-3.5 px-4 rounded-2xl transition-all duration-300 ${
                            isHovered
                              ? "bg-white/[0.12] border-white/40 shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                              : "bg-white/[0.06] border-white/20 shadow-[0_10px_25px_rgba(0,0,0,0.45)]"
                          }`}
                          style={{
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border: isHovered
                              ? "1px solid rgba(255, 255, 255, 0.45)"
                              : "1px solid rgba(255, 255, 255, 0.2)",
                            boxShadow: `
                              0 14px 30px rgba(0, 0, 0, 0.5),
                              inset 0 1px 1px rgba(255, 255, 255, 0.3)
                            `,
                          }}
                        >
                          {/* Top Header: Date Badge & Order Number */}
                          <div className="flex items-center justify-between gap-1 border-b border-white/10 pb-2 mb-2 pt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#8bd4ff]/10 border border-[#8bd4ff]/25 font-heading font-extrabold text-[11px] tracking-tight text-[#8bd4ff] uppercase">
                              {event.badge || event.dateStr}
                            </span>
                            <span className="text-[10px] font-mono font-medium text-white/50 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                              #{event.order}
                            </span>
                          </div>

                          {/* Title */}
                          <h5 className="font-heading font-bold text-sm sm:text-base text-white leading-snug line-clamp-2">
                            {event.title}
                          </h5>

                          {/* Division */}
                          <div className="text-[11px] font-subheading text-white/60 mt-1 line-clamp-1">
                            {event.division}
                          </div>

                          {/* Description */}
                          <p className="font-subheading text-[11px] text-white/70 mt-2 leading-relaxed line-clamp-2">
                            {event.description}
                          </p>

                          {/* Detail Link */}
                          <div className="pt-2 flex justify-end">
                            <span className="text-[10px] font-subheading font-semibold text-[#8bd4ff] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                              <span>Detail</span>
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* ==============================================================
           VIEW MODE 2: LINEAR TIMELINE (9 MILESTONE EVENTS)
           ============================================================== */
        <div className="relative pl-6 sm:pl-8 space-y-5 before:absolute before:left-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-[#c1111e] via-[#8bd4ff] to-[#c1111e]">
          {TIMELINE_EVENTS.map((event) => (
            <div
              key={event.id}
              onClick={() => {
                setSelectedEventId(event.id);
                onSelectEvent(event);
              }}
              className="relative group cursor-pointer"
            >
              <div className="absolute -left-6 sm:-left-8 top-5 w-6 h-6 rounded-full border border-white/30 bg-[#c1111e] flex items-center justify-center shadow-md">
                <span className="text-[10px] font-bold text-white">{event.order}</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-white/25 hover:bg-white/[0.07] transition-all shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-heading font-bold bg-white/10 text-[#8bd4ff] border border-white/10">
                    {event.dateStr}
                  </span>
                  <span className="text-[11px] font-subheading text-white/60">
                    {event.division}
                  </span>
                </div>

                <h4 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-[#8bd4ff] transition-colors">
                  {event.title}
                </h4>

                <p className="font-subheading text-xs sm:text-sm text-white/70 mt-1.5 leading-relaxed">
                  {event.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-white/10">
                  <span className="flex items-center gap-1.5 text-xs text-white/60">
                    <MapPin className="w-3.5 h-3.5 text-[#8bd4ff]" />
                    <span>{event.location}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-subheading font-medium text-[#8bd4ff] group-hover:translate-x-1 transition-transform">
                    <span>Lihat Detail Program</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
