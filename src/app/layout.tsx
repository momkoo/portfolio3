import type { Metadata } from "next";
import { Noto_Sans_KR, Archivo_Black, Space_Mono } from "next/font/google";
import "./globals.css";
import ClientComponents from "@/components/ClientComponents";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import GlobalLayout from "@/components/layout/GlobalLayout";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VANTAGE | 비주얼 아티스트 & 포토그래퍼",
  description: "감성을 담는 비주얼 아티스트. 서울 기반 포토그래퍼 포트폴리오",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${archivoBlack.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
        {/* Preload hero poster for faster LCP */}
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920" />
        {/* Preconnect to external hosts for faster loading */}
        <link rel="preconnect" href="https://i.ibb.co" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://assets.mixkit.co" />
      </head>
      <body className={`font-pretendard font-sans`} suppressHydrationWarning>
        <NextAuthProvider>
          <ClientComponents />
          <GlobalLayout>
            {children}
          </GlobalLayout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
