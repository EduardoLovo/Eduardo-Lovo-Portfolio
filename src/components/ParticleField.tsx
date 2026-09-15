"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; c: string };

// Cores do tema (violeta + ciano)
const VIOLET = "124, 92, 255";
const CYAN = "34, 211, 238";

/**
 * Fundo de "constelação" desenhado em canvas puro (sem biblioteca).
 * Partículas flutuam e se conectam por linhas; perto do cursor elas
 * se ligam a ele e o campo faz um leve parallax seguindo o mouse.
 * Respeita prefers-reduced-motion.
 */
export default function ParticleField({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;
    // Tipos já não-nulos para uso dentro das closures (build/draw/onMove)
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: P[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    const offset = { x: 0, y: 0 }; // parallax atual (suavizado)
    let raf = 0;

    const LINK_DIST = 130; // distância p/ conectar partículas
    const MOUSE_DIST = 170; // raio de conexão com o cursor

    function build() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.max(28, Math.floor((w * h) / 14000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
        c: Math.random() > 0.5 ? VIOLET : CYAN,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // parallax suave em direção ao mouse
      const tx = mouse.active ? (mouse.x - w / 2) * 0.02 : 0;
      const ty = mouse.active ? (mouse.y - h / 2) * 0.02 : 0;
      offset.x += (tx - offset.x) * 0.06;
      offset.y += (ty - offset.y) * 0.06;

      // move partículas
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }

      // linhas entre partículas próximas
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const ax = a.x + offset.x;
        const ay = a.y + offset.y;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.22;
            ctx.strokeStyle = `rgba(${VIOLET}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(b.x + offset.x, b.y + offset.y);
            ctx.stroke();
          }
        }

        // conexão com o cursor
        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_DIST) {
            const alpha = (1 - d / MOUSE_DIST) * 0.5;
            ctx.strokeStyle = `rgba(${CYAN}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // partículas (com brilho)
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.c}, 0.9)`;
        ctx.shadowColor = `rgba(${p.c}, 0.9)`;
        ctx.shadowBlur = 8;
        ctx.arc(p.x + offset.x, p.y + offset.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    }

    function onMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active =
        mouse.x >= 0 && mouse.y >= 0 && mouse.x <= w && mouse.y <= h;
    }
    function onLeave() {
      mouse.active = false;
    }

    build();

    if (reduced) {
      // versão estática, sem loop nem mouse
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeave);
    }

    const ro = new ResizeObserver(() => {
      build();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  );
}
