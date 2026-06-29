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
  // Name is optional to cut friction (mobile is 82 % of traffic). Phone is the
  // only required field; a filled-in name still flows through to the lead email.
  name: z.string().max(120).optional(),
  phone: z
    .string()
    .regex(CZ_PHONE, "Zadejte platné CZ číslo (např. 777 123 456)"),
});

type FormData = z.infer<typeof schema>;

// Same CZ phone live formatter as CallbackForm.
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
  for (let i = 0; i < rest.length; i += 3) groups.push(rest.slice(i, i + 3));
  return (prefix + groups.join(" ")).trimEnd();
}

const inputClass =
  "w-full bg-white border border-paper-ink rounded-none px-3.5 py-2.5 text-[16px] text-paper-ink placeholder:text-paper-secondary focus:outline-none focus:border-2 focus:border-paper-ink focus:px-[13px] focus:py-[9px] min-h-[46px] transition-colors";

/**
 * Compact above-the-fold lead form for the mobile hero (Jméno + Telefon).
 * Shares the lead endpoint + qualify_lead conversion (trackFormSubmit) with
 * CallbackForm; keeps data-form="callback" so the sticky bar can scroll/focus it.
 */
export default function HeroLeadForm({ location }: { location: CtaLocation }) {
  const utmParams = useUtmParams();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "" },
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const res = await fetch("/ppc/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          // Drop an empty optional name so the email shows "–", not a blank.
          name: data.name?.trim() || undefined,
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
        className="bg-paper text-paper-ink shadow-paper p-5 relative isolate"
      >
        <PaperGrain />
        <PaperPasparta />
        <p className="font-plex-serif text-[20px] leading-snug relative z-10">
          ✓ Máme to — ozvu se vám ještě dnes.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-form="callback"
      className="bg-paper text-paper-ink shadow-paper p-4 relative isolate"
      noValidate
    >
      <PaperGrain />
      <PaperPasparta />
      <div className="relative z-10 space-y-2.5">
        <div>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <input
                {...field}
                id={`name-${location}`}
                type="text"
                autoComplete="name"
                placeholder="Jméno (nepovinné)"
                aria-label="Jméno (nepovinné)"
                className={inputClass}
              />
            )}
          />
        </div>

        <div>
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
                placeholder="Telefon"
                aria-label="Telefon"
                value={value ?? ""}
                onChange={(e) => onChange(formatPhone(e.target.value))}
                onBlur={onBlur}
                className={`${inputClass} nums-tabular`}
              />
            )}
          />
          {errors.phone && (
            <p className="text-stamp-paper text-[12px] mt-1" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center px-6 py-3 bg-paper-ink text-paper font-plex-sans font-semibold text-[16px] rounded-none min-h-[48px] hover:-translate-y-px transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-paper-ink focus:ring-offset-2 focus:ring-offset-paper"
        >
          {isSubmitting ? "Odesílám…" : "Zjistit cenu zdarma"}
        </button>

        <p className="font-plex-sans text-[12px] text-paper-secondary text-center leading-snug">
          Písemný odhad zdarma, bez závazku · Ozvu se do 24 h.
        </p>

        {error && (
          <p className="text-stamp-paper text-[13px]" role="alert">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
