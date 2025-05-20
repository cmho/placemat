import type { Metadata } from "next";
import Head from 'next/head';
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
			<Head>
				<title>Placemat | Your Stream.Place Overlay</title>
			</Head>
      <body>
        {children}
      </body>
    </html>
  );
}
