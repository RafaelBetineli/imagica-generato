import logoAsset from "@/assets/getcars-logo.png.asset.json";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <img
      src={logoAsset.url}
      alt="GETCARS"
      width={compact ? 128 : 288}
      height={compact ? 88 : 200}
      className={compact ? "h-12 w-auto object-contain" : "h-auto w-full max-w-72 object-contain"}
    />
  );
}
