import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s | ShopCatalog",
    default: "ShopCatalog",
  },
  description: "A simple product catalog.",
  metadataBase: new URL("https://shop-catalog-demo.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t mt-12 py-4 text-center text-xs text-gray-400">
          ShopCatalog · Powered by DummyJSON
        </footer>
      </body>
    </html>
  );
}
