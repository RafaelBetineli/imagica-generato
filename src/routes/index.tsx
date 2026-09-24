import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { generalWhatsAppLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "GETCARS — Veículos premium, exclusivos e blindados" }, { name: "description", content: "Curadoria de veículos premium, exclusivos e blindados em São Paulo, com atendimento em todo o Brasil." }, { property: "og:title", content: "GETCARS — Veículos premium" }, { property: "og:description", content: "Veículos premium, exclusivos e blindados com atendimento em todo o Brasil." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Index,
});
function Index() { return <main className="relative grid min-h-[92vh] place-items-center overflow-hidden px-5 pt-20"><div className="absolute inset-x-5 top-1/2 h-px bg-border" /><div className="absolute inset-y-28 left-1/2 w-px bg-border" /><div className="relative z-10 flex flex-col items-center bg-background px-6 py-10 text-center"><p className="mb-5 font-mono text-[10px] uppercase tracking-widest text-primary">São Paulo / Atendimento nacional</p><BrandLogo /><h1 className="mt-7 max-w-xl font-display text-3xl uppercase leading-tight sm:text-5xl">Veículos premium, exclusivos e blindados</h1><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="rounded-none"><Link to="/veiculos" search={{ cat: "todos", sort: "ano" }}>Ver veículos <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="rounded-none"><a href={generalWhatsAppLink} target="_blank" rel="noreferrer"><MessageCircle /> Falar no WhatsApp</a></Button></div></div></main>; }
