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
        body: JSON.stringify({ ...data, gdpr: true, marketing: false, ...utmParams }),
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label
          htmlFor="ebook-name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Jméno *
        </label>
        <input
          id="ebook-name"
          type="text"
          autoComplete="name"
          {...register("name")}
          className="w-full border border-border-line rounded-none px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder="Jan Novák"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

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

      {submitError && (
        <p className="text-red-600 text-sm" role="alert">
          {submitError}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-brand text-white font-medium rounded-none min-h-[48px] hover:bg-brand-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Odesílám…" : "Stáhnout ebook zdarma"}
        </button>
        <p className="mt-2 text-xs text-gray-600">
          Odesláním souhlasíte se zpracováním e-mailu za účelem zaslání ebooku.
        </p>
      </div>
    </form>
  );
}
