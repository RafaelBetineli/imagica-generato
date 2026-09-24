import porscheImage from "@/assets/porsche-911-carrera-t.jpg";
import suburbanImage from "@/assets/chevrolet-suburban-high-country.jpg";
import bmwImage from "@/assets/bmw-330e-blue.jpg";

export type Vehicle = {
  slug: string;
  brand: string;
  model: string;
  version?: string;
  year: number;
  km: number;
  category: string;
  armored: boolean;
  armorLevel?: string;
  tags: string[];
  images: string[];
  featured: boolean;
  status: "available" | "sold";
};

export const vehicles: Vehicle[] = [
  {
    slug: "porsche-911-carrera-t-2024",
    brand: "Porsche",
    model: "911 Carrera T",
    year: 2024,
    km: 7800,
    category: "Esportivo",
    armored: false,
    tags: ["Original de fábrica"],
    images: [porscheImage],
    featured: true,
    status: "available",
  },
  {
    slug: "chevrolet-suburban-high-country-2026",
    brand: "Chevrolet",
    model: "Suburban",
    version: "High Country",
    year: 2026,
    km: 0,
    category: "SUV de luxo",
    armored: false,
    tags: ["Original de fábrica"],
    images: [suburbanImage],
    featured: false,
    status: "available",
  },
  {
    slug: "bmw-330e-2025",
    brand: "BMW",
    model: "330e",
    year: 2025,
    km: 19000,
    category: "Alta performance",
    armored: false,
    tags: ["Original de fábrica"],
    images: [bmwImage],
    featured: false,
    status: "available",
  },
  {
    slug: "volkswagen-nivus-gts-2026",
    brand: "Volkswagen",
    model: "Nivus GTS",
    year: 2026,
    km: 6000,
    category: "Esportividade urbana",
    armored: true,
    armorLevel: "III-A",
    tags: [],
    images: [],
    featured: false,
    status: "available",
  },
];

export function formatKm(km: number) {
  return km === 0 ? "ZERO KM" : `${new Intl.NumberFormat("pt-BR").format(km)} KM`;
}
