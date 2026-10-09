import { CLINIC } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-navy-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">{CLINIC.name}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed">
              {CLINIC.fullAddress} · {CLINIC.phone}
            </p>
          </div>
          <div className="text-sm">
            <p className="font-medium text-white">Registro CNES</p>
            <p className="mt-1">{CLINIC.cnes}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-xs leading-relaxed text-slate-400">
          <p>
            Os horários de atendimento divulgados neste site seguem as diretrizes
            oficiais de funcionamento da unidade cadastrada no CNES (
            {CLINIC.cnes}). O pré-agendamento online não substitui a confirmação
            pela clínica. Em caso de urgência ou emergência, procure unidades de
            pronto atendimento ou ligue 192 (SAMU).
          </p>
          <p className="mt-4">
            © {year} {CLINIC.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
