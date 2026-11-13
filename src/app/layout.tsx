import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UKMKHD UNAIR · Kabinet Nivaramitra 2026",
  description:
    "Situs Resmi Unit Kegiatan Mahasiswa Kerohanian Hindu Dharma Universitas Airlangga · Kabinet Nivaramitra 2026.",
  keywords: [
    "UKMKHD UNAIR",
    "Universitas Airlangga",
    "Hindu UNAIR",
    "Nivaramitra",
    "NIRWANA UNAIR",
    "Mahabharata UNAIR",
  ],
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400..700;1,400..700&family=Montserrat:ital,wght@0,400..800;1,400..800&family=Poppins:ital,wght@0,300..700;1,300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#02121e] text-white selection:bg-[#ff2035] selection:text-white">
        {children}
      </body>
    </html>
  );
}
