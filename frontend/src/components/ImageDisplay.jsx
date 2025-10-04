import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'

const ImageDisplay = ({ originalImage, processedImage, isLoading, selectedPhase }) => {
  const [imageView, setImageView] = useState('side-by-side') // 'side-by-side', 'overlay', 'original', 'processed'
  const [sliderValue, setSliderValue] = useState(50)

  // Switch to side-by-side view if current view requires processed image but it's not available
  useEffect(() => {
    if (!processedImage && (imageView === 'overlay' || imageView === 'processed')) {
      setImageView('side-by-side')
    }
  }, [processedImage, imageView])

  if (isLoading) {
    return (
      <div className="card p-8">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Processing Image...
          </h3>
          <p className="text-gray-600">
            Applying {selectedPhase} phase simulation
          </p>
        </div>
      </div>
    )
  }

  if (!originalImage) {
    return (
      <div className="card p-8">
        <div className="text-center">
          <div className="text-6xl text-gray-400 mb-4">🖼️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Images to Display
          </h3>
          <p className="text-gray-600">
            Upload and process an image to see the results here
          </p>
        </div>
      </div>
    )
  }

  const handleDownload = (imageUrl, filename) => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const renderSideBySide = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Original Image */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">Original Image</h4>
          <button
            onClick={() => handleDownload(originalImage, 'original-image.png')}
            className="text-sm text-medical hover:text-medical-dark p-1"
            title="Download Original"
          >
            <Download size={16} />
          </button>
        </div>
        <div className="image-container">
          <img
            src={originalImage}
            alt="Original medical image"
            className="w-full h-auto max-h-96 object-contain"
          />
        </div>
      </div>

      {/* Processed Image */}
      {processedImage ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">
              Processed ({selectedPhase.charAt(0).toUpperCase() + selectedPhase.slice(1)})
            </h4>
            <button
              onClick={() => handleDownload(processedImage, `processed-${selectedPhase}.png`)}
              className="text-sm text-medical hover:text-medical-dark p-1"
              title="Download Processed"
            >
              <Download size={16} />
            </button>
          </div>
          <div className="image-container">
            <img
              src={processedImage}
              alt={`${selectedPhase} phase processed image`}
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Processed Image</h4>
          <div className="image-container bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">⚙️</div>
              <p className="text-sm">Select a phase and process to see results</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderOverlay = () => {
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">Overlay Comparison</h4>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Original</span>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(e.target.value)}
              className="w-20"
            />
            <span className="text-sm text-gray-600">Processed</span>
          </div>
        </div>
        
        <div className="relative image-container overflow-hidden">
          <img
            src={processedImage}
            alt="Processed image"
            className="w-full h-auto max-h-96 object-contain"
          />
          <div
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${sliderValue}%` }}
          >
            <img
              src={originalImage}
              alt="Original image"
              className="w-full h-auto max-h-96 object-contain"
              style={{ width: `${100 * 100 / sliderValue}%` }}
            />
          </div>
          <div
            className="absolute top-0 bg-white border-2 border-medical h-full w-1 pointer-events-none"
            style={{ left: `${sliderValue}%`, transform: 'translateX(-50%)' }}
          />
        </div>
      </div>
    )
  }

  const renderSingleImage = (imageUrl, title) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <button
          onClick={() => handleDownload(imageUrl, `${title.toLowerCase().replace(' ', '-')}.png`)}
          className="text-sm text-medical hover:text-medical-dark p-1"
          title={`Download ${title}`}
        >
          <Download size={16} />
        </button>
      </div>
      <div className="image-container">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  )

  return (
    <div className="card p-6 fade-in">
      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Processing Results
        </h3>
        
        {/* <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setImageView('side-by-side')}
            className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
              imageView === 'side-by-side'
                ? 'bg-white text-medical shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Side by Side
          </button>
          <button
            onClick={() => setImageView('overlay')}
            disabled={!processedImage}
            className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
              imageView === 'overlay'
                ? 'bg-white text-medical shadow-sm'
                : processedImage
                  ? 'text-gray-600 hover:text-gray-900'
                  : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            Overlay
          </button>
          <button
            onClick={() => setImageView('original')}
            className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
              imageView === 'original'
                ? 'bg-white text-medical shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Original
          </button>
          <button
            onClick={() => setImageView('processed')}
            disabled={!processedImage}
            className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
              imageView === 'processed'
                ? 'bg-white text-medical shadow-sm'
                : processedImage
                  ? 'text-gray-600 hover:text-gray-900'
                  : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            Processed
          </button>
        </div> */}
      </div>

      {/* Image Display */}
      <div className="space-y-4">
        {imageView === 'side-by-side' && renderSideBySide()}
        {imageView === 'overlay' && processedImage && renderOverlay()}
        {imageView === 'original' && renderSingleImage(originalImage, 'Original Image')}
        {imageView === 'processed' && processedImage && renderSingleImage(processedImage, `${selectedPhase.charAt(0).toUpperCase() + selectedPhase.slice(1)} Phase`)}
      </div>


      {/* Bulk Download */}
      {processedImage && (
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => {
              handleDownload(originalImage, 'original-image.png')
              setTimeout(() => handleDownload(processedImage, `processed-${selectedPhase}.png`), 500)
            }}
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Download Both Images
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageDisplay