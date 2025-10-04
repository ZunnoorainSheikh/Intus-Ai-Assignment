import { useState } from 'react'
import { Toaster } from 'sonner'
import UploadForm from './components/UploadForm'
import ImageDisplay from './components/ImageDisplay'

// Backend URL - change this to your deployed backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [originalImage, setOriginalImage] = useState(null)
  const [processedImage, setProcessedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPhase, setSelectedPhase] = useState('')

  const handleImageProcessed = (original, processed, phase) => {
    setOriginalImage(original)
    setProcessedImage(processed)
    setSelectedPhase(phase)
  }

  const handleReset = () => {
    setOriginalImage(null)
    setProcessedImage(null)
    setSelectedPhase('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-grey-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🧠 MedTech Phase Simulator
              </h1>
            </div>
            {/* <div className="text-sm text-gray-500">
              Backend: {BACKEND_URL}
            </div> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <UploadForm
              onImageProcessed={handleImageProcessed}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              backendUrl={BACKEND_URL}
            />
            
     
          </div>

          {/* Results Section */}
          <div>
            <ImageDisplay
              originalImage={originalImage}
              processedImage={processedImage}
              isLoading={isLoading}
              selectedPhase={selectedPhase}
            />
          </div>
        </div>

 
      </main>

   

      {/* Toast Notifications */}
      <Toaster />
    </div>
  )
}

export default App