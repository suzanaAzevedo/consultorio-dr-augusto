export type BookingFormData = {
  fullName: string;
  phone: string;
  date: string;
  shift: string;
  notes: string;
};

export type BookingErrors = Partial<Record<keyof BookingFormData, string>>;

const PHONE_REGEX = /^(\(?\d{2}\)?\s?)?(\d{4,5}[-\s]?\d{4})$/;

export function validateBooking(data: BookingFormData): BookingErrors {
  const errors: BookingErrors = {};

  const name = data.fullName.trim();
  if (name.length < 3) {
    errors.fullName = "Informe seu nome completo (mínimo 3 caracteres).";
  } else if (!/\s/.test(name)) {
    errors.fullName = "Informe nome e sobrenome.";
  }

  const phoneDigits = data.phone.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    errors.phone = "Informe um telefone ou WhatsApp válido com DDD.";
  } else if (!PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = "Use um formato válido, ex: (55) 99999-9999.";
  }

  if (!data.date) {
    errors.date = "Selecione uma data disponível.";
  } else if (!isWeekday(data.date)) {
    errors.date = "Agendamentos apenas em dias úteis (segunda a sexta).";
  } else if (isPastDate(data.date)) {
    errors.date = "Selecione uma data futura.";
  }

  if (!data.shift) {
    errors.shift = "Escolha o turno preferencial.";
  }

  return errors;
}

function isWeekday(isoDate: string): boolean {
  const day = new Date(`${isoDate}T12:00:00`).getDay();
  return day >= 1 && day <= 5;
}

function isPastDate(isoDate: string): boolean {
  const selected = new Date(`${isoDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected < today;
}

/** Próximos N dias úteis para select de data */
export function getNextWeekdays(count = 14): { value: string; label: string }[] {
  const options: { value: string; label: string }[] = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);

  while (options.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    const day = cursor.getDay();
    if (day >= 1 && day <= 5) {
      const value = formatLocalIsoDate(cursor);
      const label = cursor.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      options.push({ value, label: label.charAt(0).toUpperCase() + label.slice(1) });
    }
  }

  return options;
}

function formatLocalIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
