import type React from "react"
import { AuthProvider } from "@/components/auth-provider"
import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ProtectedRoute requireAdmin={true}>{children}</ProtectedRoute>
    </AuthProvider>
  )
}
