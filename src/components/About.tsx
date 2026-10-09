import { Award, HeartHandshake, UserRound } from "lucide-react";
import { CLINIC } from "@/lib/constants";

const highlights = [
  {
    icon: HeartHandshake,
    title: "Atendimento humanizado",
    text: "Consultas com tempo adequado para escuta, orientação clara e relação de confiança entre médico e paciente.",
  },
  {
    icon: Award,
    title: "Excelência clínica",
    text: "Prática médica alinhada às melhores diretrizes, com registro CNES e compromisso com a segurança do paciente.",
  },
  {
    icon: UserRound,
    title: "Cuidado próximo",
    text: "Atendimento presencial em ambiente acolhedor, pensado para o conforto de quem busca saúde com responsabilidade.",
  },
];

export function About() {
  return (
    <section id="sobre" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-accent">
              Sobre o médico
            </p>
            <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
              {CLINIC.doctor}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              O consultório do {CLINIC.doctor} em Itaqui - RS foi estruturado
              para oferecer uma experiência de saúde de alto padrão: ambiente
              organizado, processos claros e atendimento respeitoso em todas as
              etapas — do agendamento à consulta.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Nossa missão é unir competência técnica e cuidado humanizado,
              priorizando o bem-estar integral de cada paciente, com
              transparência nas orientações e acompanhamento responsável.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-1">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-950/5 text-teal-accent">
                    <item.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
