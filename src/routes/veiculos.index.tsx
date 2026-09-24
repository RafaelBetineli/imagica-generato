import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { z } from "zod";
import { VehicleCard } from "@/components/vehicle-card";
import { Button } from "@/components/ui/button";
import { vehicles } from "@/data/vehicles";

const searchSchema = z.object({ cat: z.enum(["todos", "esportivos", "suvs", "blindados"]).catch("todos"), sort: z.enum(["ano", "km"]).catch("ano") });
export const Route = createFileRoute("/veiculos/")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({ meta: [{ title: "Veículos disponíveis — GETCARS" }, { name: "description", content: "Conheça a curadoria GETCARS de veículos premium, exclusivos e blindados." }, { property: "og:title", content: "Veículos disponíveis — GETCARS" }, { property: "og:description", content: "Catálogo de veículos premium, exclusivos e blindados." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: VehiclesPage,
});
const filters = [{ value: "todos", label: "Todos" }, { value: "esportivos", label: "Esportivos" }, { value: "suvs", label: "SUVs" }, { value: "blindados", label: "Blindados" }] as const;
function VehiclesPage() {
  const search = Route.useSearch(); const navigate = Route.useNavigate();
  const list = useMemo(() => vehicles.filter((v) => search.cat === "todos" || (search.cat === "esportivos" && v.category === "Esportivo") || (search.cat === "suvs" && v.category.includes("SUV")) || (search.cat === "blindados" && v.armored)).sort((a,b) => search.sort === "ano" ? b.year-a.year : a.km-b.km), [search]);
  return <main className="min-h-screen px-5 pb-24 pt-36 sm:px-8 lg:px-12"><div className="mx-auto max-w-[1500px]"><div className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between"><div><p className="font-mono text-[10px] uppercase text-primary">Estoque / 2026</p><h1 className="mt-3 font-display text-6xl uppercase sm:text-8xl">Veículos</h1><p className="mt-2 font-mono text-xs text-muted-foreground">{String(list.length).padStart(2,"0")} resultados</p></div><label className="font-mono text-[10px] uppercase text-muted-foreground">Ordenar por<select value={search.sort} onChange={(e) => navigate({ search: (prev) => ({ ...prev, sort: e.target.value as "ano" | "km" }) })} className="ml-3 border-b border-border bg-background px-2 py-2 text-xs text-foreground outline-none focus:border-primary"><option value="ano">Ano</option><option value="km">Quilometragem</option></select></label></div><div className="flex gap-2 overflow-x-auto py-6" aria-label="Filtros">{filters.map((filter) => <Button key={filter.value} variant={search.cat === filter.value ? "default" : "outline"} size="sm" className="rounded-none" onClick={() => navigate({ search: (prev) => ({ ...prev, cat: filter.value }) })}>{filter.label}</Button>)}</div><motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"><AnimatePresence mode="popLayout">{list.map((vehicle) => <VehicleCard key={vehicle.slug} vehicle={vehicle} />)}</AnimatePresence></motion.div>{list.length === 0 && <div className="border border-border py-24 text-center"><p className="font-display text-4xl uppercase">Nenhum veículo nesta seleção</p><Button className="mt-5 rounded-none" onClick={() => navigate({ search: { cat: "todos", sort: search.sort } })}>Ver todos</Button></div>}</div></main>;
}
