import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "./firebase"

export interface OrderData {
  id?: string
  // Contact Information - Updated structure for dashboard compatibility
  customerInfo: {
    name: string
    email: string
    phone: string
  }

  // Order Details - Updated structure
  orderDetails: {
    occasion: string
    size: string
    colorScheme: string
    exactWording: string
    dateNeeded: string
    specialRequests?: string
  }

  // Shipping Information
  shippingInfo?: {
    address: string
    city: string
    state: string
    zipCode: string
    method: string
  }

  // Pricing
  pricing: {
    basePrice: number
    extras: number
    shipping: number
    total: number
  }

  // Additional Options
  characters: boolean
  charactersCount: number
  highDetail: boolean
  highDetailCount: number
  scallopedEdge: boolean
  ginghamBorder: boolean

  // System fields
  inspirationPicUrls: string[]
  createdAt: any // Firestore timestamp
  status: "pending" | "in-progress" | "completed" | "cancelled"
}

// Legacy interface for backward compatibility
export interface LegacyOrderData {
  // Contact Information
  name: string
  email: string
  phone: string

  // Order Details
  occasion: string
  size: string
  colorScheme: string
  exactWording: string
  dateNeeded: string
  inspirationPics: File[]

  // Additional Options
  characters: boolean
  charactersCount: number
  highDetail: boolean
  highDetailCount: number
  scallopedEdge: boolean
  ginghamBorder: boolean

  // Shipping
  shippingLocation: string

  // Special Instructions
  specialInstructions: string
}

export interface ProcessedOrderData extends Omit<LegacyOrderData, "inspirationPics"> {
  inspirationPicUrls: string[]
  totalPrice: number
  orderDate: any // Firestore timestamp
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
  orderId?: string
}

export const getAllOrders = async (): Promise<OrderData[]> => {
  const ordersRef = collection(db, "orders");
  // Use orderDate instead of createdAt
  const q = query(ordersRef, orderBy("orderDate", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      customerInfo: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
      orderDetails: {
        occasion: data.occasion,
        size: data.size,
        colorScheme: data.colorScheme,
        exactWording: data.exactWording,
        dateNeeded: data.dateNeeded,
        specialRequests: data.specialInstructions,
      },
      pricing: {
        basePrice: data.totalPrice || 0,
        extras: 0,
        shipping: 0,
        total: data.totalPrice || 0,
      },
      characters: data.characters || false,
      charactersCount: data.charactersCount || 0,
      highDetail: data.highDetail || false,
      highDetailCount: data.highDetailCount || 0,
      scallopedEdge: data.scallopedEdge || false,
      ginghamBorder: data.ginghamBorder || false,
      inspirationPicUrls: data.inspirationPicUrls || [],
      createdAt: data.orderDate?.toDate?.() || new Date(),
      status: data.status || "pending",
    } as OrderData;
  });
};


export const updateOrderStatus = async (orderId: string, status: string): Promise<void> => {
  try {
    const orderRef = doc(db, "orders", orderId)
    await updateDoc(orderRef, {
      status,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating order status:", error)
    throw error
  }
}

export const getOrderById = async (orderId: string): Promise<OrderData | null> => {
  try {
    const orderRef = doc(db, "orders", orderId)
    const orderDoc = await getDoc(orderRef)

    if (!orderDoc.exists()) {
      return null
    }

    const data = orderDoc.data()

    // Handle both new and legacy data structures
    if (data.customerInfo) {
      return {
        id: orderDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as OrderData
    } else {
      // Legacy structure - convert to new format
      return {
        id: orderDoc.id,
        customerInfo: {
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
        orderDetails: {
          occasion: data.occasion,
          size: data.size,
          colorScheme: data.colorScheme,
          exactWording: data.exactWording,
          dateNeeded: data.dateNeeded,
          specialRequests: data.specialInstructions,
        },
        pricing: {
          basePrice: data.totalPrice || 0,
          extras: 0,
          shipping: 0,
          total: data.totalPrice || 0,
        },
        characters: data.characters || false,
        charactersCount: data.charactersCount || 0,
        highDetail: data.highDetail || false,
        highDetailCount: data.highDetailCount || 0,
        scallopedEdge: data.scallopedEdge || false,
        ginghamBorder: data.ginghamBorder || false,
        inspirationPicUrls: data.inspirationPicUrls || [],
        createdAt: data.orderDate?.toDate() || data.createdAt?.toDate() || new Date(),
        status: data.status || "pending",
      } as OrderData
    }
  } catch (error) {
    console.error("Error getting order:", error)
    throw error
  }
}

export const calculateOrderTotal = (orderData: LegacyOrderData): number => {
  const basePrices = { mini: 20, square: 25, standard: 35, large: 50 }
  const basePrice = basePrices[orderData.size as keyof typeof basePrices] || 0

  let extras = 0
  if (orderData.characters) extras += orderData.charactersCount * 5
  if (orderData.highDetail) extras += orderData.highDetailCount * 10
  if (orderData.scallopedEdge) extras += 5
  if (orderData.ginghamBorder) extras += 10

  const shippingCosts = {
    riverton: 3,
    lander: 5,
    thermopolis: 7,
    other: 10,
  }
  const shipping = shippingCosts[orderData.shippingLocation as keyof typeof shippingCosts] || 0

  return basePrice + extras + shipping
}

export const submitOrder = async (orderData: LegacyOrderData): Promise<string> => {
  try {
    // Generate a temporary order ID for file uploads
    const tempOrderId = `temp-${Date.now()}`

    // Upload inspiration images if any
    let inspirationPicUrls: string[] = []
    if (orderData.inspirationPics.length > 0) {
      inspirationPicUrls = await uploadInspirationImages(orderData.inspirationPics, tempOrderId)
    }

    // Calculate total price
    const totalPrice = calculateOrderTotal(orderData)

    // Prepare order data for Firestore
    const processedOrderData: Omit<ProcessedOrderData, "orderId"> = {
      // Contact Information
      name: orderData.name,
      email: orderData.email,
      phone: orderData.phone,

      // Order Details
      occasion: orderData.occasion,
      size: orderData.size,
      colorScheme: orderData.colorScheme,
      exactWording: orderData.exactWording,
      dateNeeded: orderData.dateNeeded,
      inspirationPicUrls,

      // Additional Options
      characters: orderData.characters,
      charactersCount: orderData.charactersCount,
      highDetail: orderData.highDetail,
      highDetailCount: orderData.highDetailCount,
      scallopedEdge: orderData.scallopedEdge,
      ginghamBorder: orderData.ginghamBorder,

      // Shipping
      shippingLocation: orderData.shippingLocation,

      // Special Instructions
      specialInstructions: orderData.specialInstructions,

      // System fields
      totalPrice,
      orderDate: serverTimestamp(),
      status: "pending",
    }

    // Add order to Firestore
    const docRef = await addDoc(collection(db, "orders"), processedOrderData)

    return docRef.id
  } catch (error) {
    console.error("Error submitting order:", error)

    if (error instanceof Error) {
      if (error.message.includes("PERMISSION_DENIED")) {
        throw new Error("Database access denied. Please check your Firestore security rules.")
      } else if (error.message.includes("NOT_FOUND") || error.message.includes("400")) {
        throw new Error(
          "Firestore database not found. Please create a Firestore database in your Firebase project console.",
        )
      } else if (error.message.includes("UNAUTHENTICATED")) {
        throw new Error("Authentication required. Please check your Firebase configuration.")
      } else if (error.message.includes("Failed to fetch") || error.message.includes("network")) {
        throw new Error("Network error. Please check your internet connection and try again.")
      }
    }

    throw new Error("Failed to submit order. Please ensure your Firestore database is created and configured properly.")
  }
}

export const uploadInspirationImages = async (files: File[], orderId: string): Promise<string[]> => {
  const uploadPromises = files.map(async (file, index) => {
    const fileName = `${orderId}/inspiration-${index}-${file.name}`
    const storageRef = ref(storage, `orders/${fileName}`)

    try {
      const snapshot = await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)
      return downloadURL
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error)
      throw error
    }
  })

  return Promise.all(uploadPromises)
}
