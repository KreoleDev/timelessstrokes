"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import {
  ContactSection,
  OrderDetailsSection,
  ExtrasSection,
  ShippingSection,
  SpecialInstructionsSection,
} from "@/components/order-form-sections"
import { submitOrder, calculateOrderTotal, type OrderData } from "@/lib/firebase-orders"
import { FirebaseSetupGuide } from "@/components/firebase-setup-guide"

export default function OrderPage() {
  const [formData, setFormData] = useState<OrderData>({
    // Contact Information
    name: "",
    email: "",
    phone: "",

    // Order Details
    occasion: "",
    size: "",
    colorScheme: "",
    exactWording: "",
    dateNeeded: "",
    inspirationPics: [] as File[],

    // Additional Options
    characters: false,
    charactersCount: 0,
    highDetail: false,
    highDetailCount: 0,
    scallopedEdge: false,
    ginghamBorder: false,

    // Shipping
    shippingLocation: "",

    // Special Instructions
    specialInstructions: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [orderId, setOrderId] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [showFirebaseSetup, setShowFirebaseSetup] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files)
      setFormData((prev) => ({ ...prev, inspirationPics: [...prev.inspirationPics, ...fileArray] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")
    setShowFirebaseSetup(false)

    try {
      const newOrderId = await submitOrder(formData)
      setOrderId(newOrderId)
      setSubmitStatus("success")

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        occasion: "",
        size: "",
        colorScheme: "",
        exactWording: "",
        dateNeeded: "",
        inspirationPics: [],
        characters: false,
        charactersCount: 0,
        highDetail: false,
        highDetailCount: 0,
        scallopedEdge: false,
        ginghamBorder: false,
        shippingLocation: "",
        specialInstructions: "",
      })
    } catch (error) {
      console.error("Error submitting order:", error)
      setSubmitStatus("error")
      const errorMsg = error instanceof Error ? error.message : "Unknown error occurred"
      setErrorMessage(errorMsg)

      if (errorMsg.includes("Firestore database not found") || errorMsg.includes("Database access denied")) {
        setShowFirebaseSetup(true)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show success message after successful submission
  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="w-full h-8 bg-gradient-to-r from-orange-200 via-pink-200 to-orange-200 bg-[length:20px_100%] bg-repeat-x opacity-60 animate-pulse"></div>

        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <AnimatedSection>
            <Card className="border-4 border-green-200 shadow-lg">
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h1 className="font-serif text-4xl text-gray-800 mb-4">Order Submitted Successfully!</h1>
                <p className="text-lg text-gray-700 mb-6">
                  Thank you for your order! We've received your custom banner request.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800 font-medium">Order ID: {orderId}</p>
                  <p className="text-green-700 text-sm mt-1">Please save this ID for your payment reference</p>
                </div>
                <div className="space-y-3 text-gray-600 mb-8">
                  <p>• We'll contact you within 24 hours to confirm your order</p>
                  <p>• You'll receive a mockup for approval within 48 hours</p>
                  <p>• Payment will be requested via Venmo or PayPal after confirmation</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Link href="/">
                    <Button className="bg-orange-400 hover:bg-orange-500 text-white">Back to Home</Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitStatus("idle")}
                    className="border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    Place Another Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        <div className="w-full h-8 bg-gradient-to-r from-orange-200 via-pink-200 to-orange-200 bg-[length:20px_100%] bg-repeat-x opacity-60 animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="w-full h-8 bg-gradient-to-r from-orange-200 via-pink-200 to-orange-200 bg-[length:20px_100%] bg-repeat-x opacity-60 animate-pulse"></div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimatedSection>
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl text-gray-800 mb-4">Place Your Order</h1>
            <p className="text-xl text-gray-700">Let's create your perfect custom banner!</p>
          </div>
        </AnimatedSection>

        {showFirebaseSetup && (
          <AnimatedSection>
            <div className="mb-8">
              <FirebaseSetupGuide />
            </div>
          </AnimatedSection>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information */}
          <AnimatedSection delay={100}>
            <ContactSection formData={formData} onInputChange={handleInputChange} onFileUpload={handleFileUpload} />
          </AnimatedSection>

          {/* Order Details */}
          <AnimatedSection delay={200}>
            <OrderDetailsSection
              formData={formData}
              onInputChange={handleInputChange}
              onFileUpload={handleFileUpload}
            />
          </AnimatedSection>

          {/* Extras & Add-ons */}
          <AnimatedSection delay={300}>
            <ExtrasSection formData={formData} onInputChange={handleInputChange} onFileUpload={handleFileUpload} />
          </AnimatedSection>

          {/* Shipping */}
          <AnimatedSection delay={400}>
            <ShippingSection formData={formData} onInputChange={handleInputChange} onFileUpload={handleFileUpload} />
          </AnimatedSection>

          {/* Special Instructions */}
          <AnimatedSection delay={500}>
            <SpecialInstructionsSection
              formData={formData}
              onInputChange={handleInputChange}
              onFileUpload={handleFileUpload}
            />
          </AnimatedSection>

          {/* Order Summary */}
          <AnimatedSection delay={600}>
            <Card className="border-4 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardHeader className="bg-gradient-to-r from-orange-100 to-pink-100">
                <CardTitle className="font-serif text-2xl text-gray-800">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-serif text-gray-800 mb-4">Total: ${calculateOrderTotal(formData)}</p>
                  <p className="text-gray-600 mb-6">
                    Payment will be requested via Venmo or PayPal after order confirmation
                  </p>

                  {submitStatus === "error" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 justify-center mb-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <p className="text-red-700 font-medium">Order Submission Failed</p>
                      </div>
                      <p className="text-red-600 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-12 py-4 text-lg hover:scale-110 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? "Submitting Order..." : "Submit Order"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </form>
      </div>

      <div className="w-full h-8 bg-gradient-to-r from-orange-200 via-pink-200 to-orange-200 bg-[length:20px_100%] bg-repeat-x opacity-60 animate-pulse"></div>
    </div>
  )
}
