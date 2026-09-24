import { ClientOnly, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Instagram, MessageCircle, ShieldCheck } from "lucide-react";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { animate, createTimeline, splitText } from "animejs";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";
import { formatKm, vehicles } from "@/data/vehicles";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import { VehicleParticles } from "./vehicle-particles";

const ShieldScene = lazy(() => import("./shield-scene"));
const collection = [vehicles[0], vehicles[2], vehicles[1]].filter((vehicle) => vehicle !== undefined);
const scenes = [
  { label: "Abertura", at: 0 },
  { label: "Coleção", at: 0.35 },
  { label: "Blindados", at: 0.7 },
  { label: "Vender", at: 0.8 },
  { label: "Contato", at: 0.9 },
];

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HomeExperience() {
  const trackRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [progress, setProgress] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const [scrolling, setScrolling] = useState(true);
  const [cursor, setCursor] = useState({ x: -50, y: -50 });

  const collectionProgress = Math.min(0.999, Math.max(0, (progress - 0.35) / 0.35));
  const vehicleIndex = Math.min(collection.length - 1, Math.floor(collectionProgress * collection.length));
  const vehicle = collection[vehicleIndex];
  const inCollection = progress >= 0.35 && progress < 0.7;
  const accent = vehicleIndex === 1 ? "var(--home-blue)" : vehicleIndex === 0 ? "var(--home-silver)" : "var(--home-graphite)";

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnhanced(!reduced && hasWebGL());
    if (reduced) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.1 });
    lenisRef.current = lenis;
    const timeline = createTimeline({ autoplay: false }).add(".home-scan", { x: ["-110vw", "110vw"], opacity: [0, 0.85, 0], duration: 1000, ease: "linear" });
    let raf = 0;
    const update = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(update); };
    const onScroll = () => {
      const track = trackRef.current;
      if (!track) return;
      const maximum = Math.max(1, track.offsetHeight - window.innerHeight);
      const next = Math.min(1, Math.max(0, window.scrollY / maximum));
      setProgress(next);
      timeline.seek(next * timeline.duration);
      setScrolling(true);
      if (stopTimer.current) clearTimeout(stopTimer.current);
      stopTimer.current = setTimeout(() => setScrolling(false), 600);
    };
    lenis.on("scroll", onScroll);
    raf = requestAnimationFrame(update);
    onScroll();

    let splitter: ReturnType<typeof splitText> | undefined;
    if (titleRef.current) {
      splitter = splitText(titleRef.current, { chars: { wrap: "clip" } });
      animate(splitter.chars, { y: ["110%", "0%"], opacity: [0, 1], delay: (_el, index) => index * 42, duration: 900, ease: "out(4)" });
    }
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      timeline.cancel();
      splitter?.revert();
      if (stopTimer.current) clearTimeout(stopTimer.current);
    };
  }, []);

  useEffect(() => {
    const move = (event: PointerEvent) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const opacity = (start: number, end: number, feather = 0.025) => {
    const enter = Math.min(1, Math.max(0, (progress - start) / feather));
    const exit = Math.min(1, Math.max(0, (end - progress) / feather));
    return Math.min(enter, exit);
  };
  const jump = (at: number) => lenisRef.current?.scrollTo(at * Math.max(1, (trackRef.current?.offsetHeight ?? innerHeight) - innerHeight), { duration: 1.5 });
  const showPhoto = inCollection && !scrolling && Boolean(vehicle?.images[0]);

  return (
    <main ref={trackRef} className="home-track relative h-[500dvh] bg-background">
      <div className="fixed inset-0 z-0 h-dvh overflow-hidden bg-background">
        <div className="home-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="home-scan absolute inset-y-0 left-0 w-1/3" aria-hidden />

        <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: progress < 0.36 || progress >= 0.9 ? 1 : 0 }}>
          {enhanced ? (
            <ClientOnly fallback={<StaticShield />}>
              <Suspense fallback={<StaticShield />}><ShieldScene progress={progress} /></Suspense>
            </ClientOnly>
          ) : <StaticShield />}
        </div>

        {vehicle && <VehicleParticles image={vehicle.images[0]} active={inCollection && enhanced} paused={showPhoto} accent={accent} />}
        {vehicle?.images[0] && <img src={vehicle.images[0]} alt={`${vehicle.brand} ${vehicle.model}`} className={`pointer-events-none absolute left-1/2 top-1/2 max-h-[58dvh] w-[88vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 object-contain transition-all duration-700 md:left-[65%] md:w-[58vw] ${showPhoto ? "scale-100 opacity-90" : "scale-[.98] opacity-0"}`} />}

        <section aria-labelledby="opening-title" className="absolute inset-0 flex items-center justify-center px-5 text-center transition-opacity duration-300" style={{ opacity: opacity(0, 0.21, 0.04), pointerEvents: progress < 0.21 ? "auto" : "none" }}>
          <div className="relative z-10 mt-[28dvh] md:mt-[34dvh]">
            <p className="font-mono text-[10px] uppercase text-primary">Curadoria automotiva / São Paulo</p>
            <h1 id="opening-title" ref={titleRef} className="mt-2 font-display text-[clamp(4rem,13vw,10rem)] font-semibold uppercase leading-[.78]">GETCARS</h1>
            <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">Veículos premium, exclusivos e blindados.</p>
          </div>
        </section>

        <section aria-label="Portal" className="pointer-events-none absolute inset-0 grid place-items-center text-center transition-opacity" style={{ opacity: opacity(0.2, 0.36, 0.035) }}>
          <p className="font-mono text-[10px] uppercase text-primary">Atravesse o extraordinário</p>
        </section>

        <section aria-live="polite" className="absolute inset-0 flex items-end px-5 pb-28 pt-28 transition-opacity md:items-center md:px-12 md:pb-0" style={{ opacity: opacity(0.34, 0.71, 0.025), pointerEvents: inCollection ? "auto" : "none" }}>
          {vehicle && <div key={vehicle.slug} className="home-vehicle-copy relative z-10 max-w-md" style={{ "--vehicle-accent": accent } as React.CSSProperties}>
            <p className="font-mono text-[10px] uppercase text-[var(--vehicle-accent)]">Coleção / 0{vehicleIndex + 1}</p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-[.86] sm:text-7xl">{vehicle.brand}<br />{vehicle.model}</h2>
            <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase text-muted-foreground">
              <div><dt className="sr-only">Ano</dt><dd>{vehicle.year}</dd></div>
              <div><dt className="sr-only">Quilometragem</dt><dd>{formatKm(vehicle.km)}</dd></div>
              <div><dt className="sr-only">Categoria</dt><dd>{vehicle.category}</dd></div>
            </dl>
            <p className="home-decode mt-4 font-mono text-xs uppercase">Mediante consulta</p>
            <Link to="/veiculos/$slug" params={{ slug: vehicle.slug }} className="mt-7 inline-flex items-center gap-2 border-b border-primary pb-2 font-mono text-[10px] uppercase">Ver detalhes <ArrowRight className="size-3.5" /></Link>
          </div>}
        </section>

        <section className="absolute inset-0 grid place-items-center px-5 text-center transition-opacity" style={{ opacity: opacity(0.69, 0.81, 0.025), pointerEvents: progress >= 0.69 && progress < 0.81 ? "auto" : "none" }}>
          <div className="relative z-10">
            <ShieldCheck className="mx-auto size-9 text-primary" />
            <p className="mt-5 font-mono text-[10px] uppercase text-primary">Proteção balística</p>
            <h2 className="mt-3 font-display text-6xl uppercase sm:text-8xl">Blindado nível III-A</h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">Segurança e discrição, preservando a experiência de condução.</p>
            <Link to="/veiculos" search={{ cat: "blindados", sort: "ano" }} className="mt-7 inline-flex items-center gap-2 border-b border-primary pb-2 font-mono text-[10px] uppercase">Ver blindados <ArrowRight className="size-3.5" /></Link>
          </div>
          <div className="home-security-scan absolute inset-x-0 top-1/2 h-px bg-primary" aria-hidden />
        </section>

        <section className="absolute inset-0 grid place-items-center px-5 text-center transition-opacity" style={{ opacity: opacity(0.79, 0.91, 0.025), pointerEvents: progress >= 0.79 && progress < 0.91 ? "auto" : "none" }}>
          <div className="relative z-10">
            <p className="font-mono text-[10px] uppercase text-primary">Seu próximo movimento</p>
            <h2 className="mt-3 font-display text-7xl uppercase leading-none sm:text-9xl">Quer vender<br />o seu?</h2>
            <Button asChild size="lg" className="mt-8 rounded-none"><Link to="/vender">Solicitar avaliação <ArrowRight /></Link></Button>
          </div>
        </section>

        <section className="absolute inset-0 flex items-center justify-center px-5 text-center transition-opacity" style={{ opacity: opacity(0.89, 1.01, 0.025), pointerEvents: progress >= 0.89 ? "auto" : "none" }}>
          <div className="relative z-10 mt-32">
            <p className="font-mono text-[10px] uppercase text-primary">Curadoria sem fronteiras</p>
            <h2 className="mt-3 font-display text-6xl uppercase leading-none sm:text-8xl">O extraordinário<br />espera por você</h2>
            <Button asChild size="lg" className="mt-7 rounded-none"><Link to="/veiculos" search={{ cat: "todos", sort: "ano" }}>Ver todos os veículos <ArrowRight /></Link></Button>
            <div className="mt-5 flex justify-center gap-3">
              <Button asChild variant="outline" size="icon" className="home-magnetic rounded-none"><a href={generalWhatsAppLink} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle /></a></Button>
              <Button asChild variant="outline" size="icon" className="home-magnetic rounded-none"><a href="https://instagram.com/getcars_" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a></Button>
            </div>
            <p className="mt-6 font-mono text-[9px] uppercase text-muted-foreground">Atendimento em São Paulo e em todo o Brasil</p>
          </div>
        </section>

        <div className="fixed left-5 top-5 z-30 font-display text-2xl uppercase sm:left-8">GET<span className="text-primary">CARS</span></div>
        <div className="fixed right-5 top-4 z-30 flex items-center gap-2 sm:right-8">
          <Button asChild variant="ghost" size="sm" className="rounded-none font-mono text-[9px] uppercase"><Link to="/veiculos" search={{ cat: "todos", sort: "ano" }}>Pular para o estoque <ArrowRight /></Link></Button>
          <Button asChild size="icon" className="rounded-none"><a href={generalWhatsAppLink} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle /></a></Button>
        </div>

        <nav aria-label="Capítulos da experiência" className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
          {scenes.map((scene) => <button key={scene.label} onClick={() => jump(scene.at)} className={`group flex items-center gap-3 font-mono text-[8px] uppercase transition-colors ${Math.abs(progress - scene.at) < 0.11 ? "text-primary" : "text-muted-foreground"}`}><span className="opacity-0 transition-opacity group-hover:opacity-100">{scene.label}</span><span className="block h-px w-5 bg-current" /></button>)}
        </nav>

        {progress < 0.18 && <button onClick={() => jump(0.35)} className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[8px] uppercase text-muted-foreground"><span>Role para explorar</span><ArrowDown className="size-4 animate-bounce text-primary" /></button>}
        <div className="fixed inset-x-0 bottom-0 z-30 h-px bg-border"><span className="block h-full origin-left bg-primary" style={{ transform: `scaleX(${progress})` }} /></div>
        <div className="home-cursor pointer-events-none fixed z-[70] hidden size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary lg:block" style={{ left: cursor.x, top: cursor.y }} aria-hidden />
      </div>
    </main>
  );
}

function StaticShield() {
  return <div className="absolute left-1/2 top-[42%] aspect-[.78] w-[min(42vw,290px)] -translate-x-1/2 -translate-y-1/2" aria-hidden><div className="home-static-shield size-full" /><span className="absolute -top-10 left-1/2 -translate-x-1/2 text-4xl text-primary">★</span></div>;
}
