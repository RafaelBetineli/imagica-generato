import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { generalWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const nav = [{ label: "Veículos", to: "/veiculos" as const }, { label: "Vender", to: "/vender" as const }];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const reduce = useReducedMotion();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => { const y = window.scrollY; setVisible(y < 80 || y < lastY.current); lastY.current = y; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 border-b border-border bg-background/78 backdrop-blur-xl transition-transform duration-300", !visible && !open && "-translate-y-full")}>
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link to="/" aria-label="GETCARS — início"><BrandLogo compact /></Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
            {nav.map((item) => <Link key={item.to} to={item.to} activeProps={{ className: "text-primary" }} className="font-mono text-[11px] uppercase text-muted-foreground transition-colors hover:text-foreground">{item.label}</Link>)}
            <a href={generalWhatsAppLink} target="_blank" rel="noreferrer" className="font-mono text-[11px] uppercase text-muted-foreground transition-colors hover:text-foreground">Contato</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden rounded-none md:inline-flex"><a href={generalWhatsAppLink} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a></Button>
            <Button variant="ghost" size="icon" className="rounded-none md:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? "Fechar menu" : "Abrir menu"}>{open ? <X /> : <Menu />}</Button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex flex-col justify-center bg-background px-8 pt-20 md:hidden">
          <nav className="space-y-2" aria-label="Navegação móvel">
            <Link to="/" className="block border-b border-border py-5 font-display text-5xl uppercase">Início</Link>
            {nav.map((item) => <Link key={item.to} to={item.to} className="block border-b border-border py-5 font-display text-5xl uppercase">{item.label}</Link>)}
            <a href={generalWhatsAppLink} target="_blank" rel="noreferrer" className="block border-b border-border py-5 font-display text-5xl uppercase">Contato</a>
          </nav>
        </motion.div>}
      </AnimatePresence>
    </>
  );
}

export function SiteFooter() {
  return <footer className="border-t border-border bg-card px-5 py-12 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[1fr_auto_auto]"><BrandLogo compact /><nav className="flex flex-col gap-3 font-mono text-[10px] uppercase text-muted-foreground"><Link to="/veiculos">Veículos</Link><Link to="/vender">Vender</Link><a href={generalWhatsAppLink} target="_blank" rel="noreferrer">WhatsApp</a><a href="https://instagram.com/getcars_" target="_blank" rel="noreferrer">Instagram @getcars_</a></nav><div className="font-mono text-[10px] uppercase leading-7 text-muted-foreground"><p>São Paulo, Brasil</p><p>© 2026 GETCARS</p></div></div></footer>;
}

export function FloatingWhatsApp() {
  return <Button asChild size="icon" className="fixed bottom-5 right-5 z-30 size-11 rounded-full shadow-xl"><a href={generalWhatsAppLink} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp"><MessageCircle /></a></Button>;
}
