import { ReactNode, useEffect, useState } from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { Main } from "./Main"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [paddingClass, setPaddingClass] = useState("lg:pl-64")

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem("gk:sidebar-collapsed")
    if (stored) {
      const collapsed = stored === "true"
      setSidebarCollapsed(collapsed)
      setPaddingClass(collapsed ? "lg:pl-24" : "lg:pl-64")
    }
  }, [])

  useEffect(() => {
    setPaddingClass(sidebarCollapsed ? "lg:pl-24" : "lg:pl-64")
    if (typeof window !== "undefined") {
      window.localStorage.setItem("gk:sidebar-collapsed", sidebarCollapsed ? "true" : "false")
    }
  }, [sidebarCollapsed])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onCollapseChange={setSidebarCollapsed}
      />

      <div className={`transition-all duration-300 ${paddingClass}`}>
        <Header />

        <Main>{children}</Main>
      </div>
    </div>
  )
}
