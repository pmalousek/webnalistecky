"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useUtmParams } from "@/lib/utm";

const schema = z.object({
  email: z.string().email("Zadejte platný e-mail"),
  gdpr: z
    .boolean()
    .refine((v) => v === true, { message: "Souhlas je povinný pro odeslání ebooku" }),
  marketing: z.boolean(),
});

type FormData = z.infer<typeof schema>;

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
    defaultValues: { gdpr: false, marketing: false },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...utmParams }),
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label
          htmlFor="ebook-email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          E-mail *
        </label>
        <input
          id="ebook-email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className="w-full border border-border-line rounded-none px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder="vas@email.cz"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("gdpr")}
            className="mt-0.5 h-4 w-4 shrink-0 border-border-line rounded-none accent-brand"
          />
          <span className="text-sm text-gray-700">
            Souhlasím se zpracováním e-mailu pro účely zaslání ebooku. *
          </span>
        </label>
        {errors.gdpr && (
          <p className="text-red-600 text-sm mt-1" role="alert">
            {errors.gdpr.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("marketing")}
            className="mt-0.5 h-4 w-4 shrink-0 border-border-line rounded-none accent-brand"
          />
          <span className="text-sm text-gray-700">
            Občas mi pošlete tip nebo článek o prodeji nemovitosti.
          </span>
        </label>
      </div>

      {submitError && (
        <p className="text-red-600 text-sm" role="alert">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-brand text-white font-medium rounded-none min-h-[48px] hover:bg-brand-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Odesílám…" : "Stáhnout ebook zdarma"}
      </button>
    </form>
  );
}
