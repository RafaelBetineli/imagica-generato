const WHATSAPP_NUMBER = "5511997292805";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const generalWhatsAppLink = buildWhatsAppLink(
  "Olá, GETCARS! Gostaria de receber mais informações.",
);
