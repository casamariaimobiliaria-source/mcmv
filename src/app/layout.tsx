import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sua-landing-page.com.br"),
  title: "Minha Casa Minha Vida 2026 | Realize o Sonho da Casa Própria",
  description: "Programa Minha Casa Minha Vida 2026: subsídios de até 95%, juros a partir de 5% a.a. e até 420 meses para pagar. Nova Faixa 4 para classe média. Simule seu financiamento agora!",
  keywords: ["Minha Casa Minha Vida", "MCMV", "Casa Própria", "Financiamento", "Caixa", "Subsídio", "Habitação", "2026", "Apartamento na Planta", "Imóveis", "Financiamento Imobiliário"],
  authors: [{ name: "Programa Minha Casa Minha Vida" }],
  publisher: "Minha Casa Minha Vida",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo-mcmv.png",
    apple: "/logo-mcmv.png",
  },
  openGraph: {
    title: "Minha Casa Minha Vida 2026 | Simule seu Financiamento",
    description: "Subsídios de até 95%, juros a partir de 5% a.a. e até 420 meses para pagar. Realize o sonho da casa própria em 2026.",
    url: "/",
    siteName: "Programa Minha Casa Minha Vida",
    images: [
      {
        url: "/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Família feliz com as chaves da casa própria",
      },
    ],
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Minha Casa Minha Vida 2026 | Realize o Sonho",
    description: "Subsídios de até 95% e as menores taxas. Simule seu financiamento agora!",
    images: ["/hero-bg.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Google Analytics / Google Ads Tracking (gtag.js) Placeholder */}
        {/* Descomente a linha 'gtag('config', 'AW-XXXXXXXXX');' com o seu ID do Google Ads (AW-...) */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              // gtag('config', 'AW-SEU_ID_AQUI'); // ID de Conversão do Google Ads
              // gtag('config', 'G-SEU_ID_AQUI');  // ID do Google Analytics 4 (se houver)
            `,
          }}
        />
        {/* Se for utilizar Google Tag Manager em vez de gtag.js direto, substitua o bloco acima pelo snippet do GTM */}
      </head>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
