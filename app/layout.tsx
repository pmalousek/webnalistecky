import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import TrackVisit from "@/components/TrackVisit";
import GoogleAnalytics from "@/components/shared/Analytics/GoogleAnalytics";
import CookieConsent from "@/components/shared/CookieConsent";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pavel Maloušek – Reality s úsměvem | Brno",
  description:
    "Reality v Brně od roku 2009. 17 let praxe, přes 700 dokončených prodejů, osobní zodpovědnost. Realitka jinak.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={montserrat.variable}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <GoogleAnalytics />
        {children}
        <TrackVisit />
        <Analytics />
        <Link
          href="/verze"
          className="fixed bottom-3 right-3 text-[10px] text-gray-300 hover:text-gray-500 transition-colors select-none z-50"
          tabIndex={-1}
          aria-hidden="true"
        >
          VERZE
        </Link>
      </body>
    </html>
  );
}
