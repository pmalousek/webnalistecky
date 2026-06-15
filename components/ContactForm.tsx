"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useUtmParams } from "@/lib/utm";

const CZ_PHONE_REGEX =
  /^(\+420|00420)?[ ]?[1-9][0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$/;

const schema = z.object({
  name: z.string().min(1, "Jméno je povinné"),
  phone: z
    .string()
    .regex(CZ_PHONE_REGEX, "Zadejte platné CZ číslo (např. 777 123 456)"),
  email: z.string().email("Zadejte platný e-mail"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

// Paper-card field styles (matches components/ppc/CallbackForm.tsx).
const fieldClass =
  "w-full bg-white border border-paper-ink rounded-none px-4 py-3 text-[16px] text-paper-ink placeholder:text-paper-secondary focus:outline-none focus:border-2 focus:border-paper-ink focus:px-[15px] focus:py-[11px] min-h-[48px] transition-colors";
const labelClass =
  "block font-plex-mono text-[12px] uppercase tracking-[0.15em] text-paper-secondary mb-2";

export default function ContactForm() {
  const router = useRouter();
  const utmParams = useUtmParams();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, gdpr: true, ...utmParams }),
      });
      if (res.ok) {
        router.push("/dekujeme");
      } else {
        setSubmitError("Něco se pokazilo. Zkuste to prosím znovu.");
      }
    } catch {
      setSubmitError("Připojení se nezdařilo. Zkuste to prosím znovu.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Jméno *
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          {...register("name")}
          className={fieldClass}
          placeholder="Jan Novák"
        />
        {errors.name && (
          <p className="text-stamp-paper text-[13px] mt-2" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-phone" className={labelClass}>
          Telefon *
        </label>
        <input
          id="contact-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          {...register("phone")}
          className={`${fieldClass} nums-tabular`}
          placeholder="777 123 456"
        />
        {errors.phone && (
          <p className="text-stamp-paper text-[13px] mt-2" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>
          E-mail *
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className={fieldClass}
          placeholder="vas@email.cz"
        />
        {errors.email && (
          <p className="text-stamp-paper text-[13px] mt-2" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Zpráva <span className="lowercase tracking-normal">(nepovinné)</span>
        </label>
        <textarea
          id="contact-message"
          {...register("message")}
          rows={3}
          className={`${fieldClass} resize-none`}
          placeholder="O čem si chcete popovídat?"
        />
      </div>

      {submitError && (
        <p className="text-stamp-paper text-[14px]" role="alert">
          {submitError}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center px-7 py-4 bg-paper-ink text-paper font-plex-sans font-semibold text-[17px] rounded-none min-h-[48px] hover:-translate-y-px transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-paper-ink focus:ring-offset-2 focus:ring-offset-paper"
        >
          {isSubmitting ? "Odesílám…" : "Ozvat se mi"}
        </button>
        <p className="mt-3 font-plex-sans text-[12px] text-paper-secondary leading-relaxed">
          Odesláním souhlasíte se zpracováním osobních údajů pro vyřízení
          vašeho dotazu.
        </p>
      </div>
    </form>
  );
}
