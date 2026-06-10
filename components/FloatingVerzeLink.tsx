"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Floating /verze deep-link, hidden under /ppc* (PPC has it inside the footer).
export default function FloatingVerzeLink() {
  const pathname = usePathname();
  if (pathname?.startsWith("/ppc")) return null;
  return (
    <Link
      href="/verze"
      className="fixed bottom-3 right-3 text-[10px] text-gray-300 hover:text-gray-500 transition-colors select-none z-50"
      tabIndex={-1}
      aria-hidden="true"
    >
      VERZE
    </Link>
  );
}
