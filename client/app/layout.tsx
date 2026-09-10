import type { Metadata } from 'next';
import './globals.css';
import CloudBackground from '@/components/CloudBackground';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Feeding Brennen',
  description: 'Track restaurants, visits, and spending.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <CloudBackground />
        <header className="border-b border-gray-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto max-w-3xl px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Feeding Brennen</h1>
              <nav className="flex gap-4 text-sm">
                <Link href="/" className="text-gray-600 hover:text-blue-600">
                  Restaurants
                </Link>
                <Link href="/visits" className="text-gray-600 hover:text-blue-600">
                  Visits
                </Link>
                <Link href="/stats" className="text-gray-600 hover:text-blue-600">
                  Stats
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
