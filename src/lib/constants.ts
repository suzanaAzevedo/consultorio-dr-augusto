export const CLINIC = {
  name: "Consultório Médico Dr. Augusto Dutra Ribeiro",
  doctor: "Dr. Augusto Dutra Ribeiro",
  city: "Itaqui - RS",
  address: "Rua São Francisco, 694, Bairro São Francisco",
  fullAddress: "Rua São Francisco, 694, Bairro São Francisco, Itaqui - RS",
  phone: "(55) 3433-2101",
  phoneDigits: "555534332101",
  cnes: "5248787",
  schedule: "Segunda a Sexta-feira, das 08:00 às 10:00",
  morningSlot: "Manhã: 08h – 10h",
} as const;

export const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre o Médico" },
  { href: "#estrutura", label: "Estrutura" },
  { href: "#horarios", label: "Horários" },
  { href: "#contato", label: "Contato" },
] as const;

export const MAPS_QUERY = encodeURIComponent(CLINIC.fullAddress);
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
export const WHATSAPP_URL = `https://wa.me/${CLINIC.phoneDigits}?text=${encodeURIComponent("Olá! Gostaria de agendar uma consulta no consultório do Dr. Augusto Dutra Ribeiro.")}`;
export const TEL_URL = `tel:+${CLINIC.phoneDigits}`;
