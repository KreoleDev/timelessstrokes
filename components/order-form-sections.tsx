"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Calendar, Palette, Type, ImageIcon, User, Phone, Mail } from "lucide-react"

interface FormData {
  name: string
  email: string
  phone: string
  occasion: string
  size: string
  colorScheme: string
  exactWording: string
  dateNeeded: string
  inspirationPics: File[]
  characters: boolean
  charactersCount: number
  highDetail: boolean
  highDetailCount: number
  scallopedEdge: boolean
  ginghamBorder: boolean
  shippingLocation: string
  specialInstructions: string
}

interface FormSectionProps {
  formData: FormData
  onInputChange: (field: string, value: any) => void
  onFileUpload: (files: FileList | null) => void
}

export function ContactSection({ formData, onInputChange }: FormSectionProps) {
  return (
    <Card className="border-4 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500">
      <CardHeader className="bg-gradient-to-r from-orange-100 to-pink-100">
        <CardTitle className="font-serif text-2xl text-gray-800 flex items-center gap-2">
          <User className="w-6 h-6" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-gray-700 font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => onInputChange("name", e.target.value)}
              className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-gray-700 font-medium flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => onInputChange("phone", e.target.value)}
              className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
            required
          />
        </div>
      </CardContent>
    </Card>
  )
}

export function OrderDetailsSection({ formData, onInputChange, onFileUpload }: FormSectionProps) {
  return (
    <Card className="border-4 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500">
      <CardHeader className="bg-gradient-to-r from-orange-100 to-pink-100">
        <CardTitle className="font-serif text-2xl text-gray-800 flex items-center gap-2">
          <Palette className="w-6 h-6" />
          Order Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="occasion" className="text-gray-700 font-medium">
              Occasion *
            </Label>
            <Input
              id="occasion"
              value={formData.occasion}
              onChange={(e) => onInputChange("occasion", e.target.value)}
              placeholder="Birthday, Wedding, Graduation, etc."
              className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
              required
            />
          </div>
          <div>
            <Label htmlFor="size" className="text-gray-700 font-medium">
              Size *
            </Label>
            <Select value={formData.size} onValueChange={(value) => onInputChange("size", value)}>
              <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-200">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mini">Mini (2'x3') - $20</SelectItem>
                <SelectItem value="square">Square (3'x3') - $25</SelectItem>
                <SelectItem value="standard">Standard (5'x3') - $35</SelectItem>
                <SelectItem value="large">Large (6'x3') - $50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="colorScheme" className="text-gray-700 font-medium">
            Color Scheme *
          </Label>
          <Input
            id="colorScheme"
            value={formData.colorScheme}
            onChange={(e) => onInputChange("colorScheme", e.target.value)}
            placeholder="Pink and gold, blue and white, etc."
            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
            required
          />
        </div>

        <div>
          <Label htmlFor="exactWording" className="text-gray-700 font-medium flex items-center gap-2">
            <Type className="w-4 h-4" />
            Exact Wording *
          </Label>
          <Textarea
            id="exactWording"
            value={formData.exactWording}
            onChange={(e) => onInputChange("exactWording", e.target.value)}
            placeholder="Enter the exact text you want on your banner"
            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 min-h-[100px]"
            required
          />
        </div>

        <div>
          <Label htmlFor="dateNeeded" className="text-gray-700 font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date Needed *
          </Label>
          <Input
            id="dateNeeded"
            type="date"
            value={formData.dateNeeded}
            onChange={(e) => onInputChange("dateNeeded", e.target.value)}
            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
            required
          />
        </div>

        <div>
          <Label className="text-gray-700 font-medium flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Inspiration Pictures
          </Label>
          <div className="border-2 border-dashed border-orange-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors duration-300">
            <Upload className="w-8 h-8 mx-auto mb-2 text-orange-400" />
            <p className="text-gray-600 mb-2">Upload inspiration images</p>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => onFileUpload(e.target.files)}
              className="border-orange-200"
            />
          </div>
          {formData.inspirationPics.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">{formData.inspirationPics.length} file(s) selected</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function ExtrasSection({ formData, onInputChange }: FormSectionProps) {
  return (
    <Card className="border-4 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500">
      <CardHeader className="bg-gradient-to-r from-orange-100 to-pink-100">
        <CardTitle className="font-serif text-2xl text-gray-800">Extras & Add-ons</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border-2 border-orange-200 rounded-lg hover:border-orange-300 transition-colors duration-300">
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.characters}
                    onChange={(e) => onInputChange("characters", e.target.checked)}
                    className="w-4 h-4 text-orange-500 border-orange-300 rounded focus:ring-orange-200"
                  />
                  <span className="text-gray-700 font-medium">Characters ($5 each)</span>
                </label>
                <p className="text-sm text-gray-500 ml-7">Add Disney characters, animals, etc.</p>
              </div>
              {formData.characters && (
                <Input
                  type="number"
                  min="1"
                  value={formData.charactersCount}
                  onChange={(e) => onInputChange("charactersCount", Number.parseInt(e.target.value) || 0)}
                  className="w-20 border-orange-200 focus:border-orange-400"
                  placeholder="Qty"
                />
              )}
            </div>

            <div className="flex items-center justify-between p-4 border-2 border-orange-200 rounded-lg hover:border-orange-300 transition-colors duration-300">
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.highDetail}
                    onChange={(e) => onInputChange("highDetail", e.target.checked)}
                    className="w-4 h-4 text-orange-500 border-orange-300 rounded focus:ring-orange-200"
                  />
                  <span className="text-gray-700 font-medium">High Detail ($10 each)</span>
                </label>
                <p className="text-sm text-gray-500 ml-7">Intricate designs and detailed artwork</p>
              </div>
              {formData.highDetail && (
                <Input
                  type="number"
                  min="1"
                  value={formData.highDetailCount}
                  onChange={(e) => onInputChange("highDetailCount", Number.parseInt(e.target.value) || 0)}
                  className="w-20 border-orange-200 focus:border-orange-400"
                  placeholder="Qty"
                />
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border-2 border-orange-200 rounded-lg hover:border-orange-300 transition-colors duration-300">
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.scallopedEdge}
                    onChange={(e) => onInputChange("scallopedEdge", e.target.checked)}
                    className="w-4 h-4 text-orange-500 border-orange-300 rounded focus:ring-orange-200"
                  />
                  <span className="text-gray-700 font-medium">Scalloped Edge ($5)</span>
                </label>
                <p className="text-sm text-gray-500 ml-7">Decorative curved border edge</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border-2 border-orange-200 rounded-lg hover:border-orange-300 transition-colors duration-300">
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.ginghamBorder}
                    onChange={(e) => onInputChange("ginghamBorder", e.target.checked)}
                    className="w-4 h-4 text-orange-500 border-orange-300 rounded focus:ring-orange-200"
                  />
                  <span className="text-gray-700 font-medium">Gingham/Checkered Border ($10)</span>
                </label>
                <p className="text-sm text-gray-500 ml-7">Classic checkered pattern border</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ShippingSection({ formData, onInputChange }: FormSectionProps) {
  return (
    <Card className="border-4 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500">
      <CardHeader className="bg-gradient-to-r from-orange-100 to-pink-100">
        <CardTitle className="font-serif text-2xl text-gray-800">Shipping & Delivery</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Label htmlFor="shipping" className="text-gray-700 font-medium">
          Delivery Location *
        </Label>
        <Select value={formData.shippingLocation} onValueChange={(value) => onInputChange("shippingLocation", value)}>
          <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-200">
            <SelectValue placeholder="Select delivery location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="riverton">Riverton - $3</SelectItem>
            <SelectItem value="lander">Lander - $5</SelectItem>
            <SelectItem value="thermopolis">Thermopolis - $7</SelectItem>
            <SelectItem value="other">Everywhere Else - $10</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-500 mt-2">
          Local delivery available to Riverton, Lander, and Thermopolis. All other locations ship for $10.
        </p>
      </CardContent>
    </Card>
  )
}

export function SpecialInstructionsSection({ formData, onInputChange }: FormSectionProps) {
  return (
    <Card className="border-4 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500">
      <CardHeader className="bg-gradient-to-r from-orange-100 to-pink-100">
        <CardTitle className="font-serif text-2xl text-gray-800">Special Instructions</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Textarea
          value={formData.specialInstructions}
          onChange={(e) => onInputChange("specialInstructions", e.target.value)}
          placeholder="Any additional details, special requests, or notes for your custom banner..."
          className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 min-h-[120px]"
        />
        <p className="text-sm text-gray-500 mt-2">
          Let us know about any specific requirements, themes, or details you'd like included.
        </p>
      </CardContent>
    </Card>
  )
}
