import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Teste',
  description: 'DFCom',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
