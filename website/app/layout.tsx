import type { Metadata } from "next";
import {
  Fraunces,
  Hanken_Grotesk,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  JetBrains_Mono,
  Lora,
  Mona_Sans,
  Source_Sans_3,
} from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  // opsz lets the browser auto-pick display-optimized letterforms at large
  // sizes (font-optical-sizing: auto is the browser default).
  axes: ["opsz"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

// Loaded for the Demonstration section's Dashboard surface — a hypothetical
// financial/analytics product whose own context calls for a technical sans
// rather than the site's editorial Fraunces+Hanken pairing. Other demo
// surfaces (Pricing, Settings) load their own contextually-appropriate faces.
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

// Pricing surface — consumer-facing SaaS context. Lora (humanist serif) for
// display moments + Source Sans 3 for body. Warmer character than the
// dashboard's technical Plex.
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

// Settings surface — enterprise admin/developer-tool context. Mona Sans as
// a single-family workhorse; JetBrains Mono (already loaded above) covers
// the technical labels.
const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Spruce — design reasoning for AI coding tools",
  description:
    "Spruce is a design reasoning system that installs into AI coding tools. It teaches them real design thinking, and gives you creative-director control over every output.",
};

// Runs synchronously before first paint to apply the right theme class
// without a flash. Reads localStorage first, falls back to system preference.
//
// Why a raw <script> tag and not next/script: with strategy="beforeInteractive"
// in App Router, next/script serializes the inline body into the RSC payload
// rather than emitting an inline script in the HTML, so it never runs before
// paint. React 19 logs an informational message about <script> tags rendered
// inside components, but the script still executes during initial SSR/parse,
// which is the only time we need it to.
const themeScript = `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(!s&&d))document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${hanken.variable} ${jetbrains.variable} ${plexSans.variable} ${plexMono.variable} ${lora.variable} ${sourceSans.variable} ${monaSans.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
