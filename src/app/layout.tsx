import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/react-query";

const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Linkgram",
  description: "Linkgram - Made with 💗 Destiny Felix Kiisi🔥",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.className} antialiased`}
      >
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
