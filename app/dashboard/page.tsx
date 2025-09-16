"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { signOut } from "@/lib/firebase-auth"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { OrdersOverview } from "@/components/orders-overview"
import { UsersManagement } from "@/components/users-management"
import { DashboardAnalytics } from "@/components/dashboard-analytics"

type DashboardView = "overview" | "orders" | "users" | "analytics"

export default function DashboardPage() {
  const { userProfile } = useAuth()
  const [currentView, setCurrentView] = useState<DashboardView>("overview")

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "overview":
        return <OrdersOverview />
      case "orders":
        return <OrdersOverview />
      case "users":
        return <UsersManagement />
      case "analytics":
        return <DashboardAnalytics />
      default:
        return <OrdersOverview />
    }
  }

  // userProfile is guaranteed to exist and be admin due to ProtectedRoute
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <DashboardSidebar currentView={currentView} onViewChange={setCurrentView} userProfile={userProfile!} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader userProfile={userProfile!} onSignOut={handleSignOut} />
          <main className="flex-1 p-6">{renderCurrentView()}</main>
        </div>
      </div>
    </div>
  )
}
