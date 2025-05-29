import Head from 'next/head';
import { use } from 'react';
import "./globals.css";

export const metadata = {
	metadataBase: new URL('https://placemat.veryroundbird.house'),
  title: "Placemat | Streamplace Overlay",
  description: "overlay system for stream.place streaming",
	openGraph: {
	  title: "Placemat | Streamplace Overlay",
	  description: "overlay system for stream.place streaming",
		url: "https://placemat.veryroundbird.house",
		siteName: "Placemat",
		images: './opengraph-image.png',
		locale: 'en_US',
		type: 'website'
	}
};

export default function RootLayout({children}) {
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
