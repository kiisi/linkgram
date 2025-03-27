import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/lib/react-query";
import { Toaster } from "react-hot-toast";
import { sfProText } from "../fonts";
import ProviderWrapper from "./provider-wrapper";

export const metadata: Metadata = {
  title: "Linkgram",
  description: "Linkgram - Made with 💗 Destiny Felix Kiisi🔥",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){

  return (
    <html lang="en">
      <body
        className={`${sfProText.className} antialiased`}
      >
        <ReactQueryProvider>
          <ProviderWrapper>
            {children}
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                duration: 12500,
              }}
            />
          </ProviderWrapper>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
