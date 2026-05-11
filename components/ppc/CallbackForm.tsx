"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trackFormSubmit, type CtaLocation } from "./ConversionTracker";
import { useUtmParams } from "@/lib/utm";

const CZ_PHONE = /^(\+420|00420)?[ ]?[1-9][0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$/;

const schema = z.object({
  phone: z.string().regex(CZ_PHONE, "Zadejte platné CZ číslo (např. 777 123 456)"),
});

type FormData = z.infer<typeof schema>;

type Props = { location: CtaLocation };

export default function CallbackForm({ location }: Props) {
  const utmParams = useUtmParams();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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
      <p
        className={`font-medium py-2 ${
          location === "final_cta" ? "text-white" : "text-brand"
        }`}
      >
        ✓ Číslo přijato — ozvu se ještě dnes.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col sm:flex-row gap-2 w-full max-w-xl mx-auto"
      noValidate
    >
      <div className="flex-1">
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="777 123 456"
          aria-label="Telefonní číslo"
          {...register("phone")}
          className="w-full min-w-[240px] bg-white border border-border-line rounded-none px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand min-h-[48px]"
        />
        {errors.phone && (
          <p className="text-red-600 text-xs mt-1" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 min-h-[48px] bg-brand text-white font-semibold rounded-none hover:bg-brand-dark transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {isSubmitting ? "Odesílám…" : "Odeslat"}
      </button>
      {error && (
        <p className="text-red-600 text-xs mt-1 sm:col-span-2" role="alert">
          {error}
        </p>
      )}
      <p
        className={`text-xs w-full mt-1 text-justify ${
          location === "final_cta" ? "text-brand-mist" : "text-gray-600"
        }`}
      >
        Odesláním{" "}
        <a
          href="https://www.realitakbrno.cz/gdpr-zpracovani-osobnich-udaju/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-80"
        >
          souhlasíte
        </a>{" "}
        se zpracováním tel. čísla za účelem zpětného volání.
      </p>
    </form>
  );
}
