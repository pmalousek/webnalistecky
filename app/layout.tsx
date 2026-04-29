import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
