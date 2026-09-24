import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HudFrame } from "@/components/hud-frame";
import { formatKm, type Vehicle } from "@/data/vehicles";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const title = `${vehicle.model}${vehicle.version ? ` ${vehicle.version}` : ""}`;
  return (
    <motion.article layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <HudFrame className="group overflow-hidden transition-colors hover:border-primary/55">
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
          {vehicle.images[0] ? (
            <img src={vehicle.images[0]} alt={`${vehicle.brand} ${title}`} width={1536} height={960} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
          ) : (
            <div className="grid h-full place-items-center bg-placeholder-pattern">
              <div className="text-center"><span className="font-mono text-[10px] uppercase text-primary">Imagem 00</span><p className="mt-2 font-display text-2xl uppercase text-muted-foreground">Foto em breve</p></div>
            </div>
          )}
          {vehicle.armored && <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 border border-primary/45 bg-background/85 px-2.5 py-1 font-mono text-[10px] uppercase text-primary backdrop-blur-md"><ShieldCheck className="size-3" /> Blindado {vehicle.armorLevel}</span>}
          {vehicle.featured && <span className="absolute right-4 top-4 border border-border bg-background/80 px-2.5 py-1 font-mono text-[10px] uppercase text-foreground backdrop-blur-md">Destaque</span>}
        </div>
        <div className="p-5 sm:p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary">{vehicle.brand}</p>
          <h2 className="mt-2 font-display text-3xl uppercase leading-none text-foreground">{title}</h2>
          <p className="mt-4 font-mono text-xs text-muted-foreground">{vehicle.year} <span className="px-2 text-border">/</span> {formatKm(vehicle.km)}</p>
          <div className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-4">
            <div><p className="font-mono text-[9px] uppercase text-muted-foreground">Valor</p><p className="mt-1 text-sm text-foreground">Mediante consulta</p></div>
            <Button asChild variant="ghost" className="group/link rounded-none px-0 text-primary hover:bg-transparent hover:text-primary">
              <Link to="/veiculos/$slug" params={{ slug: vehicle.slug }}>Ver detalhes <ArrowUpRight className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" /></Link>
            </Button>
          </div>
        </div>
      </HudFrame>
    </motion.article>
  );
}
