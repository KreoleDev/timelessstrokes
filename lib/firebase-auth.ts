import {
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import { auth } from "./firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "./firebase"

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: "admin" | "user"
  createdAt: Date
  lastLogin: Date
}

export const signIn = async (email: string, password: string): Promise<UserProfile | null> => {
  try {
    const result = await firebaseSignInWithEmailAndPassword(auth, email, password)
    const user = result.user

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (userDoc.exists()) {
      // Update last login
      const existingProfile = userDoc.data() as UserProfile
      await setDoc(
        doc(db, "users", user.uid),
        {
          ...existingProfile,
          lastLogin: new Date(),
        },
        { merge: true },
      )

      return existingProfile
    } else {
      throw new Error("User profile not found. Please contact an administrator.")
    }
  } catch (error) {
    console.error("Error signing in:", error)
    throw error
  }
}

export const createUser = async (
  email: string,
  password: string,
  displayName: string,
  role: "admin" | "user" = "user",
): Promise<UserProfile> => {
  try {
    const result = await firebaseCreateUserWithEmailAndPassword(auth, email, password)
    const user = result.user

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      role,
      createdAt: new Date(),
      lastLogin: new Date(),
    }

    await setDoc(doc(db, "users", user.uid), userProfile)
    return userProfile
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth)
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

export const getCurrentUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid))
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile
    }
    return null
  } catch (error) {
    console.error("Error getting user profile:", error)
    return null
  }
}

export const addUserByEmail = async (
  email: string,
  password: string,
  displayName: string,
  role: "admin" | "user" = "user",
): Promise<void> => {
  try {
    await createUser(email, password, displayName, role)
  } catch (error) {
    console.error("Error adding user:", error)
    throw error
  }
}

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}

export const signInWithEmailAndPassword = signIn
