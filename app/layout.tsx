import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import Link from "next/link";
import { Search, User, ShoppingBag } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "DUNNE",
  description: "Bespoke Jewelry Customizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
