import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sanskar Gupta - Senior SRE & DevOps Engineer",
  description:
    "Experienced Site Reliability Engineer and DevOps specialist with expertise in eBPF observability, Kubernetes, and cloud-native technologies. Achieving 99.9% uptime and driving operational excellence.",
  keywords: [
    "Site Reliability Engineer",
    "DevOps Engineer",
    "eBPF",
    "Kubernetes",
    "Observability",
    "Cloud Native",
    "Prometheus",
    "Grafana",
    "AWS",
    "Infrastructure",
  ],
  authors: [{ name: "Sanskar Gupta" }],
  creator: "Sanskar Gupta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sanskargupta.dev",
    title: "Sanskar Gupta - Senior SRE & DevOps Engineer",
    description:
      "Experienced Site Reliability Engineer and DevOps specialist with expertise in eBPF observability, Kubernetes, and cloud-native technologies.",
    siteName: "Sanskar Gupta Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanskar Gupta - Senior SRE & DevOps Engineer",
    description:
      "Experienced Site Reliability Engineer and DevOps specialist with expertise in eBPF observability, Kubernetes, and cloud-native technologies.",
    creator: "@sanskargupta",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="9abd0387-cd16-481c-a9ad-e8f2a32e2594"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}