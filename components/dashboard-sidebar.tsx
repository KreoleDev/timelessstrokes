"use client"

import type { UserProfile } from "@/lib/firebase-auth"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, Users, BarChart3 } from "lucide-react"

type DashboardView = "overview" | "orders" | "users" | "analytics"

interface DashboardSidebarProps {
  currentView: DashboardView
  onViewChange: (view: DashboardView) => void
  userProfile: UserProfile
}

const sidebarItems = [
  {
    id: "overview" as DashboardView,
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    id: "orders" as DashboardView,
    label: "Orders",
    icon: Package,
  },
  {
    id: "users" as DashboardView,
    label: "Users",
    icon: Users,
  },
  {
    id: "analytics" as DashboardView,
    label: "Analytics",
    icon: BarChart3,
  },
]

export function DashboardSidebar({ currentView, onViewChange, userProfile }: DashboardSidebarProps) {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">Timeless Strokes</h1>
        <p className="text-sm text-sidebar-foreground/70">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id

            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3">
          {userProfile.photoURL && (
            <img
              src={userProfile.photoURL || "/placeholder.svg"}
              alt={userProfile.displayName}
              className="h-8 w-8 rounded-full"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{userProfile.displayName}</p>
            <p className="text-xs text-sidebar-foreground/70 truncate">{userProfile.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
