"use client";

import React, { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth || 1200);
    let height = (canvas.height = window.innerHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth || 1200;
      height = canvas.height = window.innerHeight || 800;
    };

    window.addEventListener("resize", handleResize);

    // Mouse coordinates for gentle interactive fluid attraction
    let mouseX = width * 0.7;
    let mouseY = height * 0.45;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Flowing Gradient Blobs: Noticeable warm red on left & center, with deep dark blue behind 3D card
    const blobs = [
      // 1. Deep Midnight Blue Anchor (Directly behind 3D card on right - Keeps 3D container sleek & dark)
      {
        x: width * 0.78,
        y: height * 0.45,
        vx: 0.35,
        vy: 0.30,
        baseRadius: Math.max(380, Math.min(width, height) * 0.52),
        r: 2,
        g: 35,
        b: 62,
        a: 0.88,
      },
      // 2. Warm Redwood Flame Red (Upper-left atmosphere above hero title - Noticeable & warm)
      {
        x: width * 0.28,
        y: height * 0.24,
        vx: 0.55,
        vy: 0.40,
        baseRadius: Math.max(340, Math.min(width, height) * 0.44),
        r: 210,
        g: 28,
        b: 42,
        a: 0.46, // Distinct, noticeable warmth without blinding brightness
      },
      // 3. Crimson Warm Flame Accent (Lower-left floor under stats cards)
      {
        x: width * 0.38,
        y: height * 0.74,
        vx: -0.50,
        vy: -0.35,
        baseRadius: Math.max(360, Math.min(width, height) * 0.46),
        r: 195,
        g: 24,
        b: 38,
        a: 0.45,
      },
      // 4. Deep Burnt Umber / Dark Maroon (Center drift between left column and right card)
      {
        x: width * 0.48,
        y: height * 0.42,
        vx: -0.40,
        vy: 0.45,
        baseRadius: Math.max(320, Math.min(width, height) * 0.42),
        r: 135,
        g: 16,
        b: 24,
        a: 0.50,
      },
      // 5. Deep Midnight Base Anchor (Far left base)
      {
        x: width * 0.12,
        y: height * 0.55,
        vx: 0.40,
        vy: -0.35,
        baseRadius: Math.max(360, Math.min(width, height) * 0.50),
        r: 1,
        g: 25,
        b: 48,
        a: 0.80,
      },
      // 6. Cyan Highlight (Subtle cool flame contrast at bottom right)
      {
        x: width * 0.85,
        y: height * 0.80,
        vx: 0.35,
        vy: 0.35,
        baseRadius: Math.max(180, Math.min(width, height) * 0.24),
        r: 56,
        g: 189,
        b: 248,
        a: 0.10,
      },
    ];

    let time = 0;

    const render = () => {
      try {
        time += 0.016;

        // 1. Dark Base Gradient (Warm dark maroon tone on upper-left, cool dark navy on right)
        const baseGrad = ctx.createLinearGradient(0, 0, width, height);
        baseGrad.addColorStop(0, "#010e18"); // Deep dark navy
        baseGrad.addColorStop(0.35, "#160409"); // Subtle warm dark maroon tone on left
        baseGrad.addColorStop(0.70, "#021624"); // Dark cool blue on right
        baseGrad.addColorStop(1, "#010e18"); // Deep navy
        ctx.fillStyle = baseGrad;
        ctx.fillRect(0, 0, width, height);

        // 2. Render each flowing gradient blob with natural soft blending
        for (let i = 0; i < blobs.length; i++) {
          const b = blobs[i];

          // Floating velocity with sine wave
          b.x += b.vx + Math.sin(time * 1.3 + i) * 0.7;
          b.y += b.vy + Math.cos(time * 1.6 + i * 1.4) * 0.7;

          // Subtle cursor attraction for interactive fluid feel
          if (i === 1 || i === 2) {
            b.x += (mouseX - b.x) * 0.012;
            b.y += (mouseY - b.y) * 0.012;
          }

          // Pulsing radius
          const currentRadius = Math.max(
            50,
            b.baseRadius * (1 + Math.sin(time * 2.2 + i) * 0.08)
          );

          // Screen edge boundaries
          const pad = currentRadius * 0.25;
          if (b.x < -pad) {
            b.x = -pad;
            b.vx = Math.abs(b.vx);
          }
          if (b.x > width + pad) {
            b.x = width + pad;
            b.vx = -Math.abs(b.vx);
          }
          if (b.y < -pad) {
            b.y = -pad;
            b.vy = Math.abs(b.vy);
          }
          if (b.y > height + pad) {
            b.y = height + pad;
            b.vy = -Math.abs(b.vy);
          }

          // Draw radial gradient
          const grad = ctx.createRadialGradient(
            b.x,
            b.y,
            0,
            b.x,
            b.y,
            currentRadius
          );
          grad.addColorStop(0, `rgba(${b.r}, ${b.g}, ${b.b}, ${b.a})`);
          grad.addColorStop(
            0.55,
            `rgba(${b.r}, ${b.g}, ${b.b}, ${b.a * 0.52})`
          );
          grad.addColorStop(
            0.85,
            `rgba(${b.r}, ${b.g}, ${b.b}, ${b.a * 0.16})`
          );
          grad.addColorStop(1, `rgba(${b.r}, ${b.g}, ${b.b}, 0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(b.x, b.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // 3. Ambient overlay wash
        const wash = ctx.createLinearGradient(0, 0, width, height);
        wash.addColorStop(0, "rgba(1, 14, 24, 0.30)");
        wash.addColorStop(0.40, "rgba(35, 6, 12, 0.14)"); // Subtle warm center-left warmth
        wash.addColorStop(1, "rgba(1, 14, 24, 0.45)");
        ctx.fillStyle = wash;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = wash;
        ctx.fillRect(0, 0, width, height);
      } catch (err) {
        console.error("AnimatedBackground render error:", err);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: "block" }}
    />
  );
}
