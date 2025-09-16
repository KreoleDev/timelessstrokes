"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { getAllOrders, type OrderData } from "@/lib/firebase-orders"
import { getAllUsers } from "@/lib/firebase-users"
import { TrendingUp, DollarSign, Package, Users, BarChart3 } from "lucide-react"

interface AnalyticsData {
  totalRevenue: number
  totalOrders: number
  totalUsers: number
  averageOrderValue: number
  monthlyRevenue: Array<{ month: string; revenue: number; orders: number }>
  ordersByStatus: Array<{ status: string; count: number; color: string }>
  ordersBySize: Array<{ size: string; count: number }>
  recentTrends: {
    revenueGrowth: number
    orderGrowth: number
    userGrowth: number
  }
}

const statusColors = {
  pending: "#FFC107",
  "in-progress": "#2196F3",
  completed: "#4CAF50",
  cancelled: "#F44336",
}

export function DashboardAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      const [orders, users] = await Promise.all([getAllOrders(), getAllUsers()])

      const analyticsData = calculateAnalytics(orders, users)
      setAnalytics(analyticsData)
    } catch (error) {
      console.error("Error loading analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateAnalytics = (orders: OrderData[], users: any[]): AnalyticsData => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.pricing.total, 0)
    const totalOrders = orders.length
    const totalUsers = users.length
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    // Monthly revenue calculation
    const monthlyData = new Map<string, { revenue: number; orders: number }>()
    orders.forEach((order) => {
      const month = new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
      const existing = monthlyData.get(month) || { revenue: 0, orders: 0 }
      monthlyData.set(month, {
        revenue: existing.revenue + order.pricing.total,
        orders: existing.orders + 1,
      })
    })

    const monthlyRevenue = Array.from(monthlyData.entries())
      .map(([month, data]) => ({ month, ...data }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .slice(-6) // Last 6 months

    // Orders by status
    const statusCounts = new Map<string, number>()
    orders.forEach((order) => {
      statusCounts.set(order.status, (statusCounts.get(order.status) || 0) + 1)
    })

    const ordersByStatus = Array.from(statusCounts.entries()).map(([status, count]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1).replace("-", " "),
      count,
      color: statusColors[status as keyof typeof statusColors] || "#666",
    }))

    // Orders by size
    const sizeCounts = new Map<string, number>()
    orders.forEach((order) => {
      sizeCounts.set(order.orderDetails.size, (sizeCounts.get(order.orderDetails.size) || 0) + 1)
    })

    const ordersBySize = Array.from(sizeCounts.entries()).map(([size, count]) => ({
      size: size.charAt(0).toUpperCase() + size.slice(1),
      count,
    }))

    // Calculate growth trends (mock data for now)
    const recentTrends = {
      revenueGrowth: 12.5,
      orderGrowth: 8.3,
      userGrowth: 15.2,
    }

    return {
      totalRevenue,
      totalOrders,
      totalUsers,
      averageOrderValue,
      monthlyRevenue,
      ordersByStatus,
      ordersBySize,
      recentTrends,
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="text-center py-8">
        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Unable to load analytics data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-card-foreground">${analytics.totalRevenue.toFixed(2)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+{analytics.recentTrends.revenueGrowth}%</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-card-foreground">{analytics.totalOrders}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+{analytics.recentTrends.orderGrowth}%</span>
                </div>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-card-foreground">{analytics.totalUsers}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+{analytics.recentTrends.userGrowth}%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold text-card-foreground">${analytics.averageOrderValue.toFixed(2)}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                <Bar dataKey="revenue" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders by Status */}
        <Card>
          <CardHeader>
            <CardTitle>Orders by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.ordersByStatus}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ status, count }) => `${status}: ${count}`}
                >
                  {analytics.ordersByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Orders by Size */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Banner Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.ordersBySize} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="size" type="category" />
              <Tooltip />
              <Bar dataKey="count" fill="var(--color-secondary)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
