from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from PIL import Image, ImageEnhance, ImageFilter
from io import BytesIO
import logging
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="MedTech Phase Simulator",
    description="Medical image processing API for surgical planning simulation",
    version="1.0.0"
)

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    """Root endpoint with API information"""
    return {
        "message": "MedTech Phase Simulator API",
        "version": "1.0.0",
        "endpoints": {
            "/health": "Health check",
            "/process": "Process medical images"
        }
    }

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "medtech-api"}

def simulate_arterial_phase(image: Image.Image) -> Image.Image:
    """
    Simulate arterial phase by enhancing contrast
    Arterial phase typically shows enhanced contrast due to contrast agent
    """
    enhancer = ImageEnhance.Contrast(image)
    return enhancer.enhance(1.7)  # Increase contrast by 70%

def simulate_venous_phase(image: Image.Image) -> Image.Image:
    """
    Simulate venous phase by applying Gaussian blur
    Venous phase typically shows softer, more diffused appearance
    """
    return image.filter(ImageFilter.GaussianBlur(radius=2))

@app.post("/process")
async def process_medical_image(
    file: UploadFile = File(..., description="Medical image file (JPG/PNG)"),
    phase: str = Form(..., description="Processing phase: 'arterial' or 'venous'")
):
    """
    Process uploaded medical image based on selected phase
    
    Args:
        file: Medical image file (JPG/PNG format)
        phase: Processing phase ('arterial' for contrast enhancement, 'venous' for blur)
    
    Returns:
        Processed image as PNG stream
    """
    
    # Validate file type
    if not file.content_type or not file.content_type.startswith('image/'):
        raise HTTPException(
            status_code=400, 
            detail="Invalid file type. Please upload a valid image (JPG/PNG)."
        )
    
    try:
        # Read and open image
        image_data = await file.read()
        logger.info(f"Processing image: {file.filename}, size: {len(image_data)} bytes")
        
        # Open image with PIL and convert to RGB
        image = Image.open(BytesIO(image_data)).convert("RGB")
        logger.info(f"Image loaded successfully: {image.size}")
        
    except Exception as e:
        logger.error(f"Error loading image: {str(e)}")
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid image file. Could not process: {str(e)}"
        )
    
    # Process image based on phase
    phase_lower = phase.lower().strip()
    
    if phase_lower == "arterial":
        logger.info("Applying arterial phase processing (contrast enhancement)")
        processed_image = simulate_arterial_phase(image)
    elif phase_lower == "venous":
        logger.info("Applying venous phase processing (Gaussian blur)")
        processed_image = simulate_venous_phase(image)
    else:
        raise HTTPException(
            status_code=400, 
            detail="Invalid phase. Must be 'arterial' or 'venous'."
        )
    
    # Convert processed image to bytes
    try:
        output_buffer = BytesIO()
        processed_image.save(output_buffer, format="PNG", quality=95)
        output_buffer.seek(0)
        
        logger.info("Image processing completed successfully")
        
        return StreamingResponse(
            output_buffer, 
            media_type="image/png",
            headers={
                "Content-Disposition": f"inline; filename=processed_{phase_lower}_{file.filename}"
            }
        )
        
    except Exception as e:
        logger.error(f"Error saving processed image: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"Error processing image: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get('PORT', 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)