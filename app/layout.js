import './globals.css';

export const metadata = {
  metadataBase: new URL('https://greenova8.io'),
  title: 'Greenova8 — Invest in verified clean-energy projects',
  description:
    'A clean-energy investment marketplace for fractional access to vetted renewable projects, with performance-linked reporting and standard payment rails.',
  keywords: [
    'renewable energy investment',
    'climate fintech',
    'solar investment',
    'wind investment',
    'clean energy marketplace'
  ],
  openGraph: {
    title: 'Greenova8 — Real projects. Real performance.',
    description:
      'Explore vetted renewable-energy projects and track investment performance through a transparent fintech experience.',
    type: 'website'
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
