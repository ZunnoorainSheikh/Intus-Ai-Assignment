# 🧠 MedTech Mini Web-App

A full-stack medical image processing simulation app for surgical planning.

## Features
- Upload 2D medical images (JPG/PNG)
- Simulate Arterial Phase (enhanced contrast)
- Simulate Venous Phase (Gaussian blur)
- Side-by-side comparison view
- Backend processing with FastAPI + Python PIL

## Tech Stack
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: FastAPI + Python + Pillow
- **Deployment**: GitHub Pages + Hugging Face Spaces

## Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Project Structure
```
/
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── UploadForm.jsx
│   │   │   └── ImageDisplay.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
├── backend/           # FastAPI Python server
│   ├── app.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── README.md
└── README.md
```

## Deployment
- **Frontend**: GitHub Pages or Vercel
- **Backend**: Hugging Face Spaces or Railway

## Usage
1. Start both frontend and backend servers
2. Upload a medical image
3. Select phase (Arterial/Venous)
4. View original vs processed image side-by-side"# Intus-Ai-Assignment" 
