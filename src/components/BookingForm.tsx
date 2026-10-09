"use client";

import { CalendarCheck, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { CLINIC, WHATSAPP_URL } from "@/lib/constants";
import {
  BookingFormData,
  BookingErrors,
  getNextWeekdays,
  validateBooking,
} from "@/lib/booking-utils";

const STEPS = ["Seus dados", "Data e horário", "Observações"] as const;

const initialData: BookingFormData = {
  fullName: "",
  phone: "",
  date: "",
  shift: "manha",
  notes: "",
};

export function BookingForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingFormData>(initialData);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const dateOptions = useMemo(() => getNextWeekdays(14), []);

  function updateField<K extends keyof BookingFormData>(
    key: K,
    value: BookingFormData[K],
  ) {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validateStep(current: number): boolean {
    const partial: BookingFormData = { ...data };
    if (current === 0) {
      const e = validateBooking({
        ...partial,
        date: "2099-01-02",
        shift: "manha",
      });
      const stepErrors: BookingErrors = {};
      if (e.fullName) stepErrors.fullName = e.fullName;
      if (e.phone) stepErrors.phone = e.phone;
      setErrors(stepErrors);
      return Object.keys(stepErrors).length === 0;
    }
    if (current === 1) {
      const e = validateBooking(partial);
      const stepErrors: BookingErrors = {};
      if (e.date) stepErrors.date = e.date;
      if (e.shift) stepErrors.shift = e.shift;
      setErrors(stepErrors);
      return Object.keys(stepErrors).length === 0;
    }
    return true;
  }

  function nextStep() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      nextStep();
      return;
    }
    const allErrors = validateBooking(data);
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) {
      if (allErrors.fullName || allErrors.phone) setStep(0);
      else if (allErrors.date || allErrors.shift) setStep(1);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section id="agendar" className="py-20 sm:py-24">
        <div className="mx-auto max-w-lg px-4 sm:px-6">
          <div className="rounded-2xl border border-teal-accent/30 bg-white p-10 text-center shadow-lg">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-accent/10 text-teal-accent">
              <CheckCircle2 className="h-9 w-9" aria-hidden />
            </span>
            <h2 className="mt-6 text-2xl font-bold text-navy-950">
              Pré-agendamento enviado
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Recebemos sua solicitação,{" "}
              <strong className="font-semibold text-navy-950">
                {data.fullName.trim()}
              </strong>
              . A confirmação final será feita pela equipe do consultório por
              telefone ou WhatsApp em breve.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Horário de atendimento: {CLINIC.schedule}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-teal-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-light"
              >
                Falar no WhatsApp
              </a>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-slate-50"
                onClick={() => {
                  setSubmitted(false);
                  setStep(0);
                  setData(initialData);
                  setErrors({});
                }}
              >
                Novo agendamento
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="agendar" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-accent">
            Agendamento online
          </p>
          <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
            Reserve seu horário
          </h2>
          <p className="mt-4 text-slate-600">
            Preencha em poucos passos. Turnos disponíveis: {CLINIC.morningSlot}.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200/80 bg-ice p-6 shadow-sm sm:p-8">
          <ol className="mb-8 flex justify-between gap-2" aria-label="Etapas">
            {STEPS.map((label, i) => (
              <li
                key={label}
                className={`flex flex-1 flex-col items-center gap-2 text-center text-xs font-medium sm:text-sm ${
                  i <= step ? "text-teal-accent" : "text-slate-400"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    i <= step
                      ? "bg-teal-accent text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="hidden sm:block">{label}</span>
              </li>
            ))}
          </ol>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {step === 0 && (
              <>
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-navy-950"
                  >
                    Nome completo do paciente
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={data.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-navy-950 outline-none transition focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/20"
                    placeholder="Ex: Maria Silva Santos"
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-sm text-red-600" role="alert">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-navy-950"
                  >
                    Telefone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={data.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-navy-950 outline-none transition focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/20"
                    placeholder="(55) 99999-9999"
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-sm text-red-600" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-navy-950"
                  >
                    Data disponível (dias úteis)
                  </label>
                  <div className="relative mt-2">
                    <CalendarCheck
                      className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                      aria-hidden
                    />
                    <select
                      id="date"
                      name="date"
                      value={data.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-navy-950 outline-none transition focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/20"
                    >
                      <option value="">Selecione uma data</option>
                      {dateOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.date && (
                    <p className="mt-1.5 text-sm text-red-600" role="alert">
                      {errors.date}
                    </p>
                  )}
                </div>
                <fieldset>
                  <legend className="text-sm font-medium text-navy-950">
                    Turno / horário preferencial
                  </legend>
                  <div className="mt-3 space-y-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 has-[:checked]:border-teal-accent has-[:checked]:ring-2 has-[:checked]:ring-teal-accent/20">
                      <input
                        type="radio"
                        name="shift"
                        value="manha"
                        checked={data.shift === "manha"}
                        onChange={() => updateField("shift", "manha")}
                        className="h-4 w-4 accent-teal-accent"
                      />
                      <span className="text-sm text-slate-700">
                        Manhã — 08h às 10h
                      </span>
                    </label>
                  </div>
                  {errors.shift && (
                    <p className="mt-1.5 text-sm text-red-600" role="alert">
                      {errors.shift}
                    </p>
                  )}
                </fieldset>
              </>
            )}

            {step === 2 && (
              <>
                <div className="rounded-xl bg-white p-4 text-sm text-slate-600">
                  <p>
                    <strong className="text-navy-950">Paciente:</strong>{" "}
                    {data.fullName || "—"}
                  </p>
                  <p className="mt-1">
                    <strong className="text-navy-950">Contato:</strong>{" "}
                    {data.phone || "—"}
                  </p>
                  <p className="mt-1">
                    <strong className="text-navy-950">Data:</strong>{" "}
                    {dateOptions.find((d) => d.value === data.date)?.label ??
                      "—"}
                  </p>
                  <p className="mt-1">
                    <strong className="text-navy-950">Turno:</strong> Manhã (08h
                    – 10h)
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-navy-950"
                  >
                    Observações (convênio, particular ou dúvidas)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={data.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-navy-950 outline-none transition focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/20"
                    placeholder="Ex: Atendimento particular; primeira consulta..."
                  />
                </div>
              </>
            )}

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center justify-center gap-1 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-navy-950 transition hover:bg-white"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  Voltar
                </button>
              ) : (
                <span />
              )}
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1 rounded-full bg-teal-accent px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-teal-light hover:shadow-lg"
              >
                {step === STEPS.length - 1 ? "Enviar pré-agendamento" : "Continuar"}
                {step < STEPS.length - 1 && (
                  <ChevronRight className="h-4 w-4" aria-hidden />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
