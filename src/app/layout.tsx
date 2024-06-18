import { Inter } from "next/font/google";
import { CSPostHogProvider } from "./providers";
import { ThemeProvider } from "@/components/themeProvider";

import "./globals.css";

import type { Metadata, Viewport } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Billburst",
  description: "Quickly split your bill",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout(props: Props) {
  const { children } = props;

  return (
    <html lang="en">
      <CSPostHogProvider>
        <body className={`${inter.className}`} suppressHydrationWarning>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
