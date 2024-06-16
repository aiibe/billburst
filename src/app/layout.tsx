import { Inter } from "next/font/google";
import { CSPostHogProvider } from "./providers";

import "./globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Billburst",
  description: "Quickly split your bill",
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout(props: Props) {
  const { children } = props;

  return (
    <html lang="en" suppressHydrationWarning>
      <CSPostHogProvider>
        <body className={`${inter.className} bg-background`}>{children}</body>
      </CSPostHogProvider>
    </html>
  );
}
