import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "@/providers/ClientProvider";

export const metadata: Metadata = {
  title: "Second Brain",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
