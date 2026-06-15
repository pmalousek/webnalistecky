"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useUtmParams } from "@/lib/utm";

const schema = z.object({
  name: z.string().min(1, "Jméno je povinné"),
  email: z.string().email("Zadejte platný e-mail"),
});

type FormData = z.infer<typeof schema>;

// Paper-card field styles (matches components/ppc/CallbackForm.tsx).
const fieldClass =
  "w-full bg-white border border-paper-ink rounded-none px-4 py-3 text-[16px] text-paper-ink placeholder:text-paper-secondary focus:outline-none focus:border-2 focus:border-paper-ink focus:px-[15px] focus:py-[11px] min-h-[48px] transition-colors";
const labelClass =
  "block font-plex-mono text-[12px] uppercase tracking-[0.15em] text-paper-secondary mb-2";

export default function EbookForm() {
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
      const res = await fetch("/api/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, gdpr: true, marketing: true, ...utmParams }),
      });
      if (res.ok) {
        router.push("/ebook-odeslan");
      } else {
        setSubmitError("Něco se pokazilo. Zkuste to prosím znovu.");
      }
    } catch {
      setSubmitError("Připojení se nezdařilo. Zkuste to prosím znovu.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5 sm:grid-cols-2 sm:items-start"
      noValidate
    >
      <div>
        <label htmlFor="ebook-name" className={labelClass}>
          Jméno *
        </label>
        <input
          id="ebook-name"
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
        <label htmlFor="ebook-email" className={labelClass}>
          E-mail *
        </label>
        <input
          id="ebook-email"
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

      {submitError && (
        <p className="text-stamp-paper text-[14px] sm:col-span-2" role="alert">
          {submitError}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 bg-paper-ink text-paper font-plex-sans font-semibold text-[17px] rounded-none min-h-[48px] hover:-translate-y-px transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-paper-ink focus:ring-offset-2 focus:ring-offset-paper"
        >
          {isSubmitting ? "Odesílám…" : "Stáhnout ebook zdarma"}
        </button>
        <p className="mt-3 font-plex-sans text-[12px] text-paper-secondary leading-relaxed">
          Odesláním souhlasíte se zpracováním e-mailu za účelem zaslání ebooku
          a&nbsp;následného marketingu.
        </p>
      </div>
    </form>
  );
}
