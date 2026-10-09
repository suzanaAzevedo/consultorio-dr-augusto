import {
  Building2,
  Clock,
  ExternalLink,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { CLINIC, MAPS_URL, TEL_URL } from "@/lib/constants";

const structureItems = [
  "Recepção acolhedora e fluxo organizado de atendimento",
  "Consultório preparado para consultas presenciais com conforto e privacidade",
  "Equipe orientada a confirmar agendamentos e esclarecer dúvidas",
];

export function Info() {
  return (
    <>
      <section id="estrutura" className="border-y border-slate-200/80 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-accent">
              Estrutura
            </p>
            <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
              Ambiente pensado para o seu cuidado
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Instalações do {CLINIC.name}, com foco em higiene, organização e
              uma experiência tranquila desde a chegada.
            </p>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {structureItems.map((text) => (
              <li
                key={text}
                className="flex gap-3 rounded-2xl bg-ice p-5 text-sm leading-relaxed text-slate-700"
              >
                <Building2
                  className="mt-0.5 h-5 w-5 shrink-0 text-teal-accent"
                  aria-hidden
                />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="horarios" className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-accent">
              Informações práticas
            </p>
            <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
              Horários e localização
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Dados oficiais de funcionamento conforme cadastro CNES (
              {CLINIC.cnes}).
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <MapPin className="h-6 w-6 text-teal-accent" aria-hidden />
                <h3 className="mt-4 font-semibold text-navy-950">Endereço</h3>
                <p className="mt-2 text-slate-600">{CLINIC.fullAddress}</p>
              </article>

              <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <Phone className="h-6 w-6 text-teal-accent" aria-hidden />
                <h3 className="mt-4 font-semibold text-navy-950">Telefone</h3>
                <a
                  href={TEL_URL}
                  className="mt-2 inline-block font-medium text-navy-800 hover:text-teal-accent"
                >
                  {CLINIC.phone}
                </a>
              </article>

              <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
                <Clock className="h-6 w-6 text-teal-accent" aria-hidden />
                <h3 className="mt-4 font-semibold text-navy-950">
                  Horário de atendimento
                </h3>
                <p className="mt-2 text-slate-600">{CLINIC.schedule}</p>
                <p className="mt-1 text-sm text-slate-500">{CLINIC.morningSlot}</p>
              </article>
            </div>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-navy-950 to-navy-800 p-8 text-white shadow-lg transition hover:shadow-xl"
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
                aria-hidden
              />
              <span className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-teal-accent/90 shadow-md">
                <MapPin className="h-6 w-6" aria-hidden />
              </span>
              <div className="relative">
                <p className="text-sm font-medium text-teal-light">Como chegar</p>
                <p className="mt-2 text-xl font-semibold">{CLINIC.address}</p>
                <p className="mt-1 text-slate-300">{CLINIC.city}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition group-hover:gap-3">
                  Abrir no Google Maps
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="contato" className="scroll-mt-24 pb-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500">
            Dúvidas? Ligue{" "}
            <Link href={TEL_URL} className="font-medium text-teal-accent hover:underline">
              {CLINIC.phone}
            </Link>{" "}
            ou utilize o formulário de agendamento abaixo.
          </p>
        </div>
      </section>
    </>
  );
}
