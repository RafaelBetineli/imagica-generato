import { createFileRoute } from "@tanstack/react-router";
import { HomeExperience } from "@/components/home/home-experience";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "GETCARS — Veículos premium, exclusivos e blindados" }, { name: "description", content: "Curadoria de veículos premium, exclusivos e blindados em São Paulo, com atendimento em todo o Brasil." }, { property: "og:title", content: "GETCARS — Veículos premium" }, { property: "og:description", content: "Veículos premium, exclusivos e blindados com atendimento em todo o Brasil." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Index,
});
function Index() { return <HomeExperience />; }
