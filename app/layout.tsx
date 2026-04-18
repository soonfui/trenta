import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.trenta.my"),

  title: {
    default: "Trenta Media | Event & Advertising Malaysia",
    template: "%s | Trenta Media",
  },

  description:
    "Malaysia trusted event management, roadshows, advertising campaigns, weddings, branding, light & sound solutions.",

  keywords: [
    "Trenta Media",
    "Event Malaysia",
    "Advertising Malaysia",
    "Roadshow Malaysia",
    "Light and Sound Malaysia",
    "Corporate Event Malaysia",
    "Wedding Event Malaysia",
  ],

  authors: [{ name: "Trenta Media" }],
  creator: "Trenta Media",
  publisher: "Trenta Media",

    openGraph: {
    title: "Trenta Media | Event & Advertising Malaysia",
    description:
      "Trusted event management, advertising campaigns and live experiences in Malaysia.",
    url: "https://www.trenta.my",
    siteName: "Trenta Media",
    locale: "en_MY",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Trenta Media",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Trenta Media",
    description:
      "Trusted event management and advertising solutions in Malaysia.",
    images: ["/images/logo.png"],
  },

  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className={`min-h-full flex flex-col ${inter.className} ${poppins.className}`}
      >
        {children}
      </body>
    </html>
  );
}