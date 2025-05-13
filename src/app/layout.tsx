import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Streamplace Overlay",
  description: "overlay system for stream.place streaming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
