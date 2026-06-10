"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trackFormSubmit, type CtaLocation } from "./ConversionTracker";
import { useUtmParams } from "@/lib/utm";
import PaperGrain, { PaperPasparta } from "./PaperGrain";

const CZ_PHONE = /^(\+420|00420)?[ ]?[1-9][0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$/;

const schema = z.object({
  phone: z.string().regex(CZ_PHONE, "Zadejte platné CZ číslo (např. 777 123 456)"),
});

type FormData = z.infer<typeof schema>;

type Props = { location: CtaLocation };

// Format CZ phone as user types: optional +420 / 00420 prefix followed by
// XXX XXX XXX. Always returns a string the Zod regex above will accept.
function formatPhone(input: string): string {
  const raw = input.replace(/[^\d+]/g, "");
  let prefix = "";
  let rest = raw;
  if (raw.startsWith("+420")) {
    prefix = "+420 ";
    rest = raw.slice(4);
  } else if (raw.startsWith("00420")) {
    prefix = "00420 ";
    rest = raw.slice(5);
  }
  rest = rest.replace(/\D/g, "").slice(0, 9);
  const groups: string[] = [];
  for (let i = 0; i < rest.length; i += 3) {
    groups.push(rest.slice(i, i + 3));
  }
  return (prefix + groups.join(" ")).trimEnd();
}

export default function CallbackForm({ location }: Props) {
  const utmParams = useUtmParams();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { phone: "" } });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const res = await fetch("/ppc/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          ...utmParams,
          referrer: typeof document !== "undefined" ? document.referrer : "",
        }),
      });
      if (res.ok) {
        trackFormSubmit(location);
        setSent(true);
      } else if (res.status === 429) {
        setError("Příliš mnoho pokusů. Zkuste to za chvíli.");
      } else {
        setError("Něco se pokazilo. Zavolejte přímo na 777 759 590.");
      }
    } catch {
      setError("Připojení selhalo. Zavolejte přímo na 777 759 590.");
    }
  };

  if (sent) {
    return (
      <div
        data-form="callback"
        className="bg-paper text-paper-ink shadow-paper p-6 sm:p-8 relative isolate"
      >
        <PaperGrain />
        <PaperPasparta />
        <p className="font-plex-serif text-[22px] leading-snug relative z-10">
          ✓ Číslo přijato — ozvu se ještě dnes.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-form="callback"
      className="bg-paper text-paper-ink shadow-paper p-6 sm:p-8 relative isolate"
      noValidate
    >
      <PaperGrain />
      <PaperPasparta />
      <div className="relative z-10 space-y-5">
        <div>
          <label
            htmlFor={`phone-${location}`}
            className="block font-plex-mono text-[12px] uppercase tracking-[0.15em] text-paper-secondary mb-2"
          >
            Telefonní číslo
          </label>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <input
                id={`phone-${location}`}
                ref={ref}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="777 123 456"
                aria-label="Telefonní číslo"
                value={value ?? ""}
                onChange={(e) => onChange(formatPhone(e.target.value))}
                onBlur={onBlur}
                className="w-full bg-white border border-paper-ink rounded-none px-4 py-3 text-[17px] nums-tabular text-paper-ink placeholder:text-paper-secondary focus:outline-none focus:border-2 focus:border-paper-ink focus:px-[15px] focus:py-[11px] min-h-[48px] transition-colors"
              />
            )}
          />
          {errors.phone && (
            <p className="text-stamp-paper text-[13px] mt-2" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center px-7 py-4 bg-paper-ink text-paper font-plex-sans font-semibold text-[17px] rounded-none min-h-[48px] hover:-translate-y-px transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-paper-ink focus:ring-offset-2 focus:ring-offset-paper"
        >
          {isSubmitting ? "Odesílám…" : "Chci znát skutečnou cenu"}
        </button>

        <p className="font-plex-sans text-[13px] text-paper-secondary">
          Zavolám vám ještě dnes. Já osobně — žádné callcentrum.
        </p>

        {error && (
          <p className="text-stamp-paper text-[14px]" role="alert">
            {error}
          </p>
        )}

        <p className="font-plex-sans text-[12px] text-paper-secondary leading-relaxed">
          Odesláním{" "}
          <a
            href="https://www.realitakbrno.cz/gdpr-zpracovani-osobnich-udaju/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            souhlasíte
          </a>
          {" "}se zpracováním tel. čísla za účelem zpětného volání.
        </p>
      </div>
    </form>
  );
}
