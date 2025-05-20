import Head from 'next/head';
import "./globals.css";

export const metadata = {
  title: "Placemat | Streamplace Overlay",
  description: "overlay system for stream.place streaming",
};

export default function RootLayout({
  children,
}) {
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
