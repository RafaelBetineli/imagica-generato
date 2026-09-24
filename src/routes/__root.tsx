import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, useRouterState, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { FloatingWhatsApp, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";

function NotFoundComponent() {
  return <main className="grid min-h-[80vh] place-items-center px-5 pt-20"><div className="text-center"><p className="font-mono text-xs uppercase text-primary">Erro / 404</p><h1 className="mt-4 font-display text-7xl uppercase">Rota não encontrada</h1><p className="mt-3 text-muted-foreground">A página que você procura não está disponível.</p><Button asChild className="mt-8 rounded-none"><Link to="/">Voltar ao início</Link></Button></div></main>;
}
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return <main className="grid min-h-screen place-items-center px-5"><div className="text-center"><h1 className="font-display text-5xl uppercase">Esta página não carregou</h1><Button className="mt-6 rounded-none" onClick={() => { router.invalidate(); reset(); }}>Tentar novamente</Button></div></main>;
}
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({ meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { name: "theme-color", content: "#070708" }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "stylesheet", href: appCss }, { rel: "icon", href: "/favicon.png", type: "image/png" }, { rel: "preconnect", href: "https://fonts.googleapis.com" }, { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }, { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500;600;700&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600&display=swap" }] }),
  shellComponent: RootShell, component: RootComponent, notFoundComponent: NotFoundComponent, errorComponent: ErrorComponent,
});
function RootShell({ children }: { children: ReactNode }) { return <html lang="pt-BR"><head><HeadContent /></head><body>{children}<Scripts /></body></html>; }
function RootComponent() { const { queryClient } = Route.useRouteContext(); const isHome = useRouterState({ select: (state) => state.location.pathname === "/" }); return <QueryClientProvider client={queryClient}>{!isHome && <SiteHeader />}<Outlet />{!isHome && <><SiteFooter /><FloatingWhatsApp /></>}</QueryClientProvider>; }
