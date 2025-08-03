"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Users,
  FolderOpen,
  Settings,
  Menu,
  LogOut,
  BarChart3,
  Briefcase,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Moon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Members", href: "/dashboard/members", icon: Users },
  { name: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { name: "Services", href: "/dashboard/services", icon: Briefcase },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        {(!sidebarCollapsed || mobile) && (
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Team Admin</h1>
        )}
        {sidebarCollapsed && !mobile && <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">T</h1>}
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                sidebarCollapsed && !mobile ? "justify-center" : "",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100",
              )}
              onClick={() => mobile && setSidebarOpen(false)}
            >
              <item.icon className="h-4 w-4" />
              {(!sidebarCollapsed || mobile) && <span className="ml-3">{item.name}</span>}
            </Link>
          )
        })}
      </nav>
      <div className="px-2 py-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          className={cn(
            "text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 text-sm h-9",
            sidebarCollapsed && !mobile ? "w-full justify-center px-3" : "w-full justify-start",
          )}
          onClick={() => {
            console.log("Logout")
          }}
        >
          <LogOut className="h-4 w-4" />
          {(!sidebarCollapsed || mobile) && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex md:flex-col transition-all duration-300",
          sidebarCollapsed ? "md:w-16" : "md:w-64",
        )}
      >
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <Sidebar />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-white dark:bg-gray-800">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Mobile Menu Button */}
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              </Sheet>

              {/* Desktop Sidebar Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden md:flex"
              >
                {sidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
              </Button>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
                </h2>
              </div>
            </div>

            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  )
}
