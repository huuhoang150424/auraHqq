import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

const inter = Inter({ subsets: ["latin"] })


export default async  function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </div>
  )
}
