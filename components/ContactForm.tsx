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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Jméno *
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          {...register("name")}
          className="w-full border border-border-line rounded-none px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand min-h-[48px]"
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
          htmlFor="contact-phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Telefon *
        </label>
        <input
          id="contact-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          {...register("phone")}
          className="w-full border border-border-line rounded-none px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand min-h-[48px]"
          placeholder="777 123 456"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          E-mail *
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className="w-full border border-border-line rounded-none px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand min-h-[48px]"
          placeholder="vas@email.cz"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Zpráva{" "}
          <span className="text-gray-500 font-normal">(nepovinné)</span>
        </label>
        <textarea
          id="contact-message"
          {...register("message")}
          rows={3}
          className="w-full border border-border-line rounded-none px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand resize-none"
          placeholder="O čem si chcete popovídat?"
        />
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
          {isSubmitting ? "Odesílám…" : "Ozvat se mi"}
        </button>
        <p className="mt-2 text-xs text-gray-600">
          Odesláním souhlasíte se zpracováním osobních údajů pro vyřízení
          vašeho dotazu.
        </p>
      </div>
    </form>
  );
}
