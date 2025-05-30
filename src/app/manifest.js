export default function manifest() {
  return {
    name: 'Placemat | Streamplace Overlay',
    short_name: 'Placemat',
    description: 'overlay system for stream.place streaming',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
		openGraph: {
		  title: "Placemat | Streamplace Overlay",
		  description: "overlay system for stream.place streaming",
			url: "https://placemat.veryroundbird.house",
			siteName: "Placemat",
			images: './opengraph-image.png',
			locale: 'en_US',
			type: 'website'
		}
  }
}