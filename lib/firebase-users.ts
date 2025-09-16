import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore"
import { db } from "./firebase"
import type { UserProfile } from "./firebase-auth"

// Get all users
export const getAllUsers = async (): Promise<UserProfile[]> => {
  try {
    const usersRef = collection(db, "users")
    const q = query(usersRef, orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      lastLogin: doc.data().lastLogin.toDate(),
    })) as UserProfile[]
  } catch (error) {
    console.error("Error getting users:", error)
    throw error
  }
}

// Update user role
export const updateUserRole = async (uid: string, role: "admin" | "user"): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid)
    await updateDoc(userRef, { role })
  } catch (error) {
    console.error("Error updating user role:", error)
    throw error
  }
}

// Delete user
export const deleteUser = async (uid: string): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid)
    await deleteDoc(userRef)
  } catch (error) {
    console.error("Error deleting user:", error)
    throw error
  }
}

// Get pending users
export const getPendingUsers = async () => {
  try {
    const pendingRef = collection(db, "pendingUsers")
    const querySnapshot = await getDocs(pendingRef)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    }))
  } catch (error) {
    console.error("Error getting pending users:", error)
    throw error
  }
}
