import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; tx: number; ty: number; color: string; size: number; vx: number; vy: number };

type Props = { image?: string; active: boolean; paused: boolean; accent: string };

export function VehicleParticles({ image, active, paused, accent }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -9999, y: -9999 });
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image || !active) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    let frame = 0;
    let disposed = false;
    const mobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const source = new Image();
    source.src = image;
    source.onload = () => {
      if (disposed) return;
      const sample = document.createElement("canvas");
      const sw = mobile ? 92 : 160;
      const sh = Math.round(sw * (source.naturalHeight / source.naturalWidth));
      sample.width = sw;
      sample.height = sh;
      const sampleContext = sample.getContext("2d", { willReadFrequently: true });
      if (!sampleContext) return;
      sampleContext.drawImage(source, 0, 0, sw, sh);
      const pixels = sampleContext.getImageData(0, 0, sw, sh).data;
      const max = mobile ? 3500 : 9000;
      const points: Particle[] = [];
      const displayWidth = Math.min(window.innerWidth * (mobile ? 0.9 : 0.56), 920);
      const scale = displayWidth / sw;
      const left = mobile ? (window.innerWidth - displayWidth) / 2 : window.innerWidth * 0.37;
      const top = window.innerHeight * (mobile ? 0.27 : 0.2);
      const step = mobile ? 2 : 1;
      for (let y = 0; y < sh && points.length < max; y += step) {
        for (let x = 0; x < sw && points.length < max; x += step) {
          const index = (y * sw + x) * 4;
          const alpha = pixels[index + 3] ?? 0;
          const luminance = ((pixels[index] ?? 0) + (pixels[index + 1] ?? 0) + (pixels[index + 2] ?? 0)) / 3;
          if (alpha < 80 || luminance < 18 || ((x + y) % 3 === 0 && luminance < 55)) continue;
          const tx = left + x * scale;
          const ty = top + y * scale;
          points.push({
            x: window.innerWidth / 2 + (Math.random() - 0.5) * window.innerWidth,
            y: window.innerHeight / 2 + (Math.random() - 0.5) * window.innerHeight,
            tx, ty,
            color: `rgba(${pixels[index]},${pixels[index + 1]},${pixels[index + 2]},${Math.min(0.92, alpha / 255)})`,
            size: Math.max(1, scale * 0.44), vx: 0, vy: 0,
          });
        }
      }
      particles.current = points;
    };

    const move = (event: PointerEvent) => { pointer.current = { x: event.clientX, y: event.clientY }; };
    window.addEventListener("pointermove", move, { passive: true });
    const tick = () => {
      if (document.visibilityState !== "hidden") {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (const p of particles.current) {
          let fx = (p.tx - p.x) * 0.045;
          let fy = (p.ty - p.y) * 0.045;
          const dx = p.x - pointer.current.x;
          const dy = p.y - pointer.current.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 95 && distance > 0) {
            const force = (95 - distance) / 95;
            fx += (dx / distance) * force * 3.8;
            fy += (dy / distance) * force * 3.8;
          }
          p.vx = (p.vx + fx) * 0.82;
          p.vy = (p.vy + fy) * 0.82;
          p.x += p.vx;
          p.y += p.vy;
          context.fillStyle = p.color;
          context.fillRect(p.x, p.y, p.size, p.size);
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, [image, active]);

  return <canvas ref={canvasRef} aria-hidden className={`absolute inset-0 transition-opacity duration-500 ${active && !paused ? "opacity-100" : "opacity-0"}`} style={{ color: accent }} />;
}
