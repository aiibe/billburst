import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Billburst",
  description: "Quickly split your bill",
};

type Props = Readonly<{ children: React.ReactNode }>;

export default function RootLayout(props: Props) {
  const { children } = props;

  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
