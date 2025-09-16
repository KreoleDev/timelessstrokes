"use client"

import { AlertCircle, ExternalLink } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function FirebaseSetupGuide() {
  return (
    <Alert className="border-coral-200 bg-coral-50">
      <AlertCircle className="h-4 w-4 text-coral-600" />
      <AlertDescription className="text-coral-800">
        <div className="space-y-3">
          <p className="font-medium">Firestore Database Setup Required</p>
          <p className="text-sm">
            To enable order submissions, you need to create a Firestore database in your Firebase project:
          </p>
          <ol className="text-sm space-y-1 ml-4 list-decimal">
            <li>Go to the Firebase Console</li>
            <li>Select your project</li>
            <li>Click "Firestore Database" in the left sidebar</li>
            <li>Click "Create database"</li>
            <li>Choose "Start in test mode" for now</li>
            <li>Select a location for your database</li>
          </ol>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 bg-transparent"
            onClick={() => window.open("https://console.firebase.google.com", "_blank")}
          >
            Open Firebase Console <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
