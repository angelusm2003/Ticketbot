import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "TicketBot - IT Service Desk AI",
  description: "AI-powered IT service desk assistant that creates support tickets through natural conversation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
