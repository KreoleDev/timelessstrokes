"use client"

import type { OrderData } from "@/lib/firebase-orders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Package, DollarSign, Clock, CheckCircle, XCircle } from "lucide-react"

interface OrderDetailsModalProps {
  order: OrderData
  onStatusUpdate: (orderId: string, status: string) => void
}

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  "in-progress": { label: "In Progress", color: "bg-blue-100 text-blue-800", icon: Package },
  completed: { label: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle },
}

export function OrderDetailsModal({ order, onStatusUpdate }: OrderDetailsModalProps) {
  const statusInfo = statusConfig[order.status as keyof typeof statusConfig]
  const StatusIcon = statusInfo.icon

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* Order Status */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Order #{order.id?.slice(-8)}</h3>
          <p className="text-sm text-muted-foreground">Created on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <Badge className={statusInfo.color}>
          <StatusIcon className="h-3 w-3 mr-1" />
          {statusInfo.label}
        </Badge>
      </div>

      <Separator />

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{order.customerInfo.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{order.customerInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{order.customerInfo.phone}</span>
          </div>
        </CardContent>
      </Card>

      {/* Order Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Occasion</p>
              <p>{order.orderDetails.occasion}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Size</p>
              <p>{order.orderDetails.size}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Color Scheme</p>
              <p>{order.orderDetails.colorScheme}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date Needed</p>
              <p>{new Date(order.orderDetails.dateNeeded).toLocaleDateString()}</p>
            </div>
          </div>

          {order.orderDetails.exactWording && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Exact Wording</p>
              <p className="bg-muted p-3 rounded-md">{order.orderDetails.exactWording}</p>
            </div>
          )}

          {order.orderDetails.specialRequests && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Special Requests</p>
              <p className="bg-muted p-3 rounded-md">{order.orderDetails.specialRequests}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shipping Information */}
      {order.shippingInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Shipping Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p>{order.shippingInfo.address}</p>
              <p>
                {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Shipping Method</p>
              <p>{order.shippingInfo.method}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Base Price</span>
            <span>${order.pricing.basePrice}</span>
          </div>
          {order.pricing.extras > 0 && (
            <div className="flex justify-between">
              <span>Extras</span>
              <span>${order.pricing.extras}</span>
            </div>
          )}
          {order.pricing.shipping > 0 && (
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${order.pricing.shipping}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${order.pricing.total}</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-2 pt-4">
        {order.status === "pending" && (
          <Button onClick={() => onStatusUpdate(order.id!, "in-progress")} className="bg-primary hover:bg-primary/90">
            Start Processing
          </Button>
        )}
        {order.status === "in-progress" && (
          <Button onClick={() => onStatusUpdate(order.id!, "completed")} className="bg-green-600 hover:bg-green-700">
            Mark Complete
          </Button>
        )}
        {order.status !== "cancelled" && (
          <Button variant="destructive" onClick={() => onStatusUpdate(order.id!, "cancelled")}>
            Cancel Order
          </Button>
        )}
      </div>
    </div>
  )
}
