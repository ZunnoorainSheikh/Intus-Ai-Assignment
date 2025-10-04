# 🧠 MedTech Mini Web-App

A full-stack medical image processing simulation app for surgical planning.

## Features
- Upload 2D medical images (JPG/PNG)
- Simulate Arterial Phase (enhanced contrast)
- Simulate Venous Phase (Gaussian blur)
- Side-by-side comparison view
- Backend processing with FastAPI + Python PIL

## Tech Stack
- **Frontend**: Next.js 15 + React 19 + TypeScript + Tailwind CSS
- **Backend**: FastAPI + Python + Pillow
- **Deployment**: Vercel + Railway

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
├── frontend/          # Next.js app with app router
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── UploadForm.tsx
│   │   │   └── ImageDisplay.tsx
│   │   ├── services/
│   │   │   ├── apiService.ts
│   │   │   └── alertService.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── utils/
│   │       ├── constants.ts
│   │       └── helpers.ts
│   ├── public/
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
├── backend/           # FastAPI Python server
│   ├── app.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── README.md
├── docker-compose.yml
├── railway.json
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
