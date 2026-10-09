import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CLINIC } from "@/lib/constants";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${CLINIC.doctor} | Consultório Médico em ${CLINIC.city}`,
  description:
    "Excelência e cuidado humanizado em saúde. Consultório médico em Itaqui - RS. Agende sua consulta online.",
  openGraph: {
    title: CLINIC.name,
    description: "Atendimento humanizado com excelência clínica em Itaqui - RS.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
