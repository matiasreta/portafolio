

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "@/context/ChatContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mi App Next.js",
  description: "Aplicación creada con Next.js, Tailwind CSS y TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ChatProvider>
          <div className="h-screen bg-gray-100 ">
            {children}
          </div>
        </ChatProvider>
      </body>
    </html>
  );
}