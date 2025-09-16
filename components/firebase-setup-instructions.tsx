import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExternalLink, Database, Shield } from "lucide-react"

export default function FirebaseSetupInstructions() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Firebase Firestore Setup Required
          </CardTitle>
          <CardDescription>
            Your Firebase project needs a Firestore database to store orders. Follow these steps to set it up.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> You need to create a Firestore database in your Firebase project console
              before orders can be submitted.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="border-l-4 border-coral-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Step 1: Go to Firebase Console</h3>
              <p className="text-gray-600 mb-2">Visit the Firebase Console and select your project.</p>
              <a
                href="https://console.firebase.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-coral-600 hover:text-coral-700 underline"
              >
                Open Firebase Console <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="border-l-4 border-coral-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Step 2: Create Firestore Database</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>In the left sidebar, click on "Firestore Database"</li>
                <li>Click "Create database"</li>
                <li>Choose "Start in test mode" (for now)</li>
                <li>Select your preferred location (closest to your users)</li>
                <li>Click "Done"</li>
              </ol>
            </div>

            <div className="border-l-4 border-coral-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Step 3: Configure Security Rules (Optional)</h3>
              <p className="text-gray-600 mb-2">
                For production, you may want to update your Firestore security rules. The default test mode rules allow
                all reads and writes for 30 days.
              </p>
              <code className="block bg-gray-100 p-3 rounded text-sm">
                {`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{document} {
      allow read, write: if true;
    }
  }
}`}
              </code>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Step 4: Test the Connection</h3>
              <p className="text-gray-600">
                Once you've created the Firestore database, refresh this page and try submitting an order again.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
