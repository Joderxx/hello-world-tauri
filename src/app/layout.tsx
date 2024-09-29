import type { Metadata } from "next";
import "./globals.css";
import AppMenu from "@/components/app-menu";
import {Suspense} from "react";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <AppMenu />
          <div>
            {children}
          </div>
        </Suspense>
      </body>
    </html>
  );
}
