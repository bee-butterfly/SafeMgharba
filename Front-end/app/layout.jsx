import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SafeMgharba - تطبيق التبليغ الأمني",
  description: "تطبيق التبليغ السريع عن الأحداث الأمنية في المغرب",
    generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
