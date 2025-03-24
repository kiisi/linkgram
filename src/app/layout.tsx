import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/lib/react-query";
import { UserProvider } from "@/contexts/user";
import { Toaster } from "react-hot-toast";
import { sfProText } from "../fonts";

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
        className={`${sfProText.className} antialiased`}
      >
        <ReactQueryProvider>
          <UserProvider>
            {children}
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                duration: 12500,
              }}
            />
          </UserProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
