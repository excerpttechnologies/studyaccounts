'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from './use-reduced-motion';

export function PremiumHeroBackground() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const [spotlightPos, setSpotlightPos] = useState({ x: -1000, y: -1000, active: false });

  // Update mouse position — use ref for canvas loop (no re-render), state for spotlight overlay
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y, active: true };
      setSpotlightPos({ x, y, active: true });
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      setSpotlightPos((prev) => ({ ...prev, active: false }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      baseAlpha: number;
      color: string;
    }

    const particleCount = Math.min(55, Math.floor((width * height) / 32000));
    const particles: Particle[] = [];
    // Light-mode colors: orange family with low opacity
    const colors = ['#FF7A00', '#FF9D2E', '#FFC857'];

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 2.5 + 1;
      const baseAlpha = Math.random() * 0.25 + 0.08;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size,
        alpha: baseAlpha,
        baseAlpha,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let waveOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      waveOffset += 0.0025;

      // Subtle wave 1 — soft orange shimmer
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 18) {
        const y =
          height - 140 +
          Math.sin(x * 0.0018 + waveOffset) * 28 +
          Math.cos(x * 0.0009 + waveOffset * 0.6) * 12;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const wg1 = ctx.createLinearGradient(0, height - 180, 0, height);
      wg1.addColorStop(0, 'rgba(255, 122, 0, 0.00)');
      wg1.addColorStop(1, 'rgba(255, 122, 0, 0.035)');
      ctx.fillStyle = wg1;
      ctx.fill();

      // Subtle wave 2 — gold tone
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 18) {
        const y =
          height - 100 +
          Math.sin(x * 0.0025 - waveOffset * 0.7) * 18 +
          Math.cos(x * 0.0013 - waveOffset) * 10;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const wg2 = ctx.createLinearGradient(0, height - 130, 0, height);
      wg2.addColorStop(0, 'rgba(255, 200, 87, 0.00)');
      wg2.addColorStop(1, 'rgba(255, 200, 87, 0.025)');
      ctx.fillStyle = wg2;
      ctx.fill();

      // Particles + connections
      const mouse = mouseRef.current;
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const force = (160 - dist) / 160;
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * force * 1.4;
            p.y -= Math.sin(angle) * force * 1.4;
            p.alpha = Math.min(p.baseAlpha * 3, 0.75);
          } else {
            p.alpha += (p.baseAlpha - p.alpha) * 0.06;
          }
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.06;
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Particle dot with soft glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 16;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;

        // Constellation lines
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const lineAlpha = ((110 - dist) / 110) * 0.08 * Math.min(p.alpha, p2.alpha) * 8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 157, 46, ${Math.min(lineAlpha, 0.12)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FAFBFC 0%, #F5F7FA 45%, #EEF1F6 100%)',
      }}
      aria-hidden
    >
      {/* 1. Cursor soft spotlight — warm white light */}
      {spotlightPos.active && !reduced && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(700px circle at ${spotlightPos.x}px ${spotlightPos.y}px,
              rgba(255, 157, 46, 0.06) 0%,
              rgba(255, 122, 0, 0.025) 35%,
              transparent 70%)`,
            transition: 'opacity 0.4s ease',
          }}
        />
      )}

      {/* 2. Ambient background glow orbs — very subtle on light bg */}
      <motion.div
        className="absolute top-[5%] left-[18%] rounded-full"
        style={{
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(255,122,0,0.07) 0%, transparent 68%)',
          filter: 'blur(80px)',
        }}
        animate={reduced ? undefined : { x: ['-3%', '3%', '-3%'], y: ['-2%', '2%', '-2%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[8%] top-[15%] rounded-full"
        style={{
          width: 560,
          height: 560,
          background: 'radial-gradient(circle, rgba(255,200,87,0.06) 0%, transparent 68%)',
          filter: 'blur(70px)',
        }}
        animate={reduced ? undefined : { x: ['0%', '-3%', '0%'], y: ['0%', '2.5%', '0%'] }}
        transition={{ duration: 27, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      <motion.div
        className="absolute left-[35%] bottom-[5%] rounded-full"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(255,157,46,0.055) 0%, transparent 68%)',
          filter: 'blur(90px)',
        }}
        animate={reduced ? undefined : { x: ['2%', '-2%', '2%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Top-right warm accent blush */}
      <div
        className="absolute -top-32 -right-32 rounded-full"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(255,122,0,0.05) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* 3. Canvas particle layer */}
      {!reduced && <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />}

      {/* 4. Floating geometric outlines — light-mode opacity */}
      {!reduced && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Large hex — left mid */}
          <motion.div
            className="absolute left-[7%] top-[28%]"
            style={{ color: 'rgba(255,122,0,0.10)' }}
            animate={{ y: [0, -18, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          >
            <svg width="56" height="64" viewBox="0 0 48 54" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M24 2L46 14.7V40.1L24 52.8L2 40.1V14.7L24 2Z" />
            </svg>
          </motion.div>

          {/* Dashed ring — top right */}
          <motion.div
            className="absolute right-[12%] top-[10%]"
            style={{ color: 'rgba(255,157,46,0.09)' }}
            animate={{ y: [0, -22, 0], scale: [1, 1.07, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5,5">
              <circle cx="50" cy="50" r="46" />
            </svg>
          </motion.div>

          {/* Small hex — center top */}
          <motion.div
            className="absolute left-[48%] top-[12%]"
            style={{ color: 'rgba(255,200,87,0.10)' }}
            animate={{ y: [0, -12, 0], rotate: [0, -360] }}
            transition={{ duration: 38, repeat: Infinity, ease: 'linear', delay: 1 }}
          >
            <svg width="26" height="30" viewBox="0 0 24 27" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 1L23 7.3V20.1L12 26.4L1 20.1V7.3L12 1Z" />
            </svg>
          </motion.div>

          {/* Isometric cube — bottom right */}
          <motion.div
            className="absolute right-[20%] bottom-[22%]"
            style={{ color: 'rgba(255,122,0,0.08)' }}
            animate={{ y: [0, -20, 0], rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay: 4 }}
          >
            <svg width="44" height="50" viewBox="0 0 40 46" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M20 2L38 12V33.6L20 43.6L2 33.6V12L20 2Z" />
              <path d="M2 12.4L20 22.8L38 12.4" />
              <path d="M20 22.8V43.6" />
            </svg>
          </motion.div>

          {/* Extra circle ring — left bottom */}
          <motion.div
            className="absolute left-[20%] bottom-[15%]"
            style={{ color: 'rgba(255,157,46,0.07)' }}
            animate={{ y: [0, -14, 0], rotate: [0, 360] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear', delay: 2.5 }}
          >
            <svg width="36" height="36" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,4">
              <circle cx="30" cy="30" r="26" />
            </svg>
          </motion.div>
        </div>
      )}

      {/* 5. Soft horizontal grid lines — very faint for depth */}
      {!reduced && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, transparent 0%, rgba(15,23,42,0.018) 50%, transparent 100%)',
            backgroundSize: '100% 80px',
            backgroundRepeat: 'repeat-y',
          }}
        />
      )}

      {/* 6. Very subtle vertical grid for enterprise feel */}
      {!reduced && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, transparent 0%, rgba(15,23,42,0.012) 50%, transparent 100%)',
            backgroundSize: '120px 100%',
            backgroundRepeat: 'repeat-x',
          }}
        />
      )}
    </div>
  );
}
