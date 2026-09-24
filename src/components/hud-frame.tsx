import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HudFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("hud-frame relative border border-border bg-card", className)}>
      {children}
    </div>
  );
}
