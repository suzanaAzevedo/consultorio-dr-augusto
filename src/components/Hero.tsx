import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { CLINIC, WHATSAPP_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-800 to-navy-950 pt-28 pb-20 text-white sm:pt-32 sm:pb-28"
    >
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-teal-accent/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-white/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-fade-in-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4 text-teal-light" aria-hidden />
            <span>Atendimento em {CLINIC.city}</span>
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Excelência e Cuidado Humanizado em Saúde
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
            Consultório médico do {CLINIC.doctor}, com foco em acolhimento,
            escuta ativa e medicina de qualidade para você e sua família em{" "}
            {CLINIC.city}.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#agendar"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-accent px-7 py-3.5 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-teal-light"
            >
              Agendar Consulta
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-base font-semibold backdrop-blur-sm transition hover:bg-white/20"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              Fale Conosco via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
