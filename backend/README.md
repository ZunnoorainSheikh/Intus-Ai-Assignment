# MedTech Backend API

FastAPI backend for medical image processing simulation.

## Features
- Medical image upload and processing
- Arterial phase simulation (contrast enhancement)
- Venous phase simulation (Gaussian blur)
- CORS enabled for frontend integration
- Health check endpoint

## Setup

### Local Development
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

### Using Docker
```bash
# Build image
docker build -t medtech-backend .

# Run container
docker run -p 8000:7860 medtech-backend
```

## API Endpoints

### GET /
Root endpoint with API information

### GET /health
Health check endpoint
- Response: `{"status": "healthy", "service": "medtech-api"}`

### POST /process
Process medical image
- **file**: Image file (JPG/PNG)
- **phase**: Processing phase ("arterial" or "venous")
- **Response**: Processed image as PNG stream

## Deployment

### Hugging Face Spaces
1. Create new Space with Docker runtime
2. Upload all backend files
3. Space will automatically use port 7860

### Railway
1. Connect your GitHub repository
2. Select backend folder
3. Railway will auto-detect Python and deploy

## Example Usage

```python
import requests

# Upload and process image
with open('medical_image.jpg', 'rb') as f:
    files = {'file': f}
    data = {'phase': 'arterial'}
    response = requests.post('http://localhost:8000/process', files=files, data=data)
    
    # Save processed image
    with open('processed_image.png', 'wb') as out:
        out.write(response.content)
```