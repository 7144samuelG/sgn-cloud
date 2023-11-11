import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/next-theme-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/providers/modal-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "sgn-clond",
  description: "online privancy for everyone",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/public/reading.svg",
        href: "/reading.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/public/reading-dark.svg",
        href: "/reading-dark.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="jotion-theme-2"
          >
            <Toaster position="bottom-center" />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
