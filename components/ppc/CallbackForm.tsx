"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trackFormSubmit } from "./ConversionTracker";
import { useUtmParams } from "@/lib/utm";

const CZ_PHONE = /^(\+420|00420)?[ ]?[1-9][0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$/;

const schema = z.object({
  phone: z.string().regex(CZ_PHONE, "Zadejte platné CZ číslo (např. 777 123 456)"),
});

type FormData = z.infer<typeof schema>;

export default function CallbackForm() {
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
        trackFormSubmit();
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
      <p className="text-brand font-medium py-2">
        ✓ Číslo přijato — ozvu se do hodiny.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col sm:flex-row gap-2 max-w-sm"
      noValidate
    >
      <div className="flex-1">
        <input
          type="tel"
          autoComplete="tel"
          placeholder="777 123 456"
          {...register("phone")}
          className="w-full border border-border-line rounded-none px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand"
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
        className="px-5 py-2.5 bg-brand text-white font-medium rounded-none hover:bg-brand-dark transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {isSubmitting ? "Odesílám…" : "Zavolám vám"}
      </button>
      {error && (
        <p className="text-red-600 text-xs mt-1 sm:col-span-2" role="alert">
          {error}
        </p>
      )}
      <p className="text-xs text-gray-400 w-full mt-1">
        Odesláním souhlasíte se zpracováním tel. čísla za účelem zpětného volání.
      </p>
    </form>
  );
}
