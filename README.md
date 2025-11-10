# Maitri - AI-Powered Mental Health Companion 

<div align="center">

**A comprehensive multimodal mental health analysis platform combining video emotion detection, audio analysis, and intelligent journaling**

[Features](#features) • [Architecture](#architecture) • [Setup](#setup) • [Usage](#usage) • [API Documentation](#api-documentation)

</div>

---

## Application Preview

<!-- Add your screenshots here -->
<img width="960" height="540" alt="Screenshot 2025-11-10 145439" src="https://github.com/user-attachments/assets/a3a1eefe-6e61-484d-ac40-52eb38229775" />
<img width="960" height="540" alt="Screenshot 2025-11-10 145452" src="https://github.com/user-attachments/assets/1292a4a0-75e0-4993-bb76-adf753a01770" />

---

## Features

### **Multimodal Video Analysis**
- **Video Emotion Detection**: Frame-by-frame emotion analysis using fine-tuned deep learning models
- **Audio Emotion Recognition**: SpeechBrain wav2vec2 model (78.7% accuracy on IEMOCAP)
- **Speech-to-Text**: Deepgram API for accurate transcription
- **Text Analysis**: Depression detection, emotion classification, and sentiment analysis

### **Intelligent Journaling**
- **Text Journal Analysis**: Privacy-aware mental health assessment with chunked text processing
- **Video Journal Analysis**: Complete multimodal analysis pipeline
- **Activity Heatmap**: GitHub-style contribution graph for tracking consistency
- **Streak Tracking**: Monitor daily journaling habits and progress

### **AI-Powered Support**
- **Emotional Support Chatbot**: Context-aware conversations using Groq LLM (Llama 3.1)
- **Personalized Recommendations**: Based on recent mental health trends
- **PII Protection**: Optional anonymization for privacy
- **Session Memory**: Persistent chat history across sessions

### **Mental Health Insights**
- **Depression Score** (0-100): Multi-classifier ensemble with softmax distributions
- **Anxiety Score** (0-100): Derived from multimodal analysis
- **Stress Score** (0-100): Contextual assessment
- **Overall Mental Health Score** (0-100): LLM-powered comprehensive evaluation
- **Risk Level Assessment**: Low/Moderate/High/Critical classification

### **Privacy-First Design**
- **Full Privacy Mode**: Only classifier outputs sent to LLM
- **Anonymized Mode**: PII removal with masked text analysis
- **Secure Authentication**: JWT-based with bcrypt password hashing
- **User Data Isolation**: MongoDB with user-specific data partitioning

---

## Architecture

### Backend (FastAPI + Python)
```
backend/
├── main.py                          # FastAPI application & API routes
├── parallel_pipeline.py             # Multimodal analysis orchestration
├── emotion_detector.py              # Video emotion detection (MTCNN + ViT)
├── emotional_support_chatbot.py     # Groq-powered chatbot with memory
├── text_chunking_analyzer.py        # Long-text processing for journals
├── database.py                      # MongoDB connection & management
├── auth.py                          # JWT authentication utilities
├── models/
│   ├── user.py                     # User authentication models
│   └── journal.py                  # Journal entry models
├── services/
│   └── journal_service.py          # Journal CRUD & analytics
└── audio/
    ├── audio_extraction.py         # FFmpeg audio extraction
    ├── audio_emotion_recognition.py # SpeechBrain emotion analysis
    ├── text_classification.py      # Emotion classifier (DistilRoBERTa)
    ├── depression_text.py          # Depression detection (DePRoBERTa)
    └── text_analysis_pii_removal.py # PII anonymization (spaCy)
```

### Frontend (React + Vite)
```
frontend/
├── src/
│   ├── pages/
│   │   ├── DashboardHome.jsx       # Main dashboard with heatmap
│   │   ├── Progress.jsx            # Journal entries & analytics
│   │   ├── Sessions.jsx            # Chatbot interface
│   │   └── Calming.jsx             # Breathing exercises
│   ├── components/
│   │   ├── DashboardLayout.jsx     # Sidebar navigation
│   │   └── ProtectedRoute.jsx      # Auth route guards
│   ├── contexts/
│   │   └── AuthContext.jsx         # Global auth state
│   └── App.jsx                     # Root component & routing
└── vite.config.js                  # Vite configuration
```

### Tech Stack
- **Backend**: FastAPI, Python 3.10+, Motor (async MongoDB)
- **AI/ML**: 
  - Video: `facenet-pytorch` (MTCNN), `transformers` (ViT emotion)
  - Audio: `speechbrain` (wav2vec2), `deepgram` (transcription)
  - Text: `transformers` (DistilRoBERTa emotion, DePRoBERTa depression)
  - LLM: Groq API (Llama 3.1 8B Instant)
- **Frontend**: React 18, TailwindCSS, Vite
- **Database**: MongoDB Atlas
- **Authentication**: JWT (python-jose), bcrypt

---

## Setup

### Prerequisites
- **Python 3.10+**
- **Node.js 18+** and npm/yarn
- **MongoDB** (local or Atlas)
- **FFmpeg** (for audio extraction)
- **CUDA** (optional, for GPU acceleration)

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/Dhyanesh18/Maitri
cd Maitri/backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

4. **Configure environment variables**
```bash
# Create .env file in backend/
touch .env
```

Add the following to `.env`:
```env
# MongoDB
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB_NAME=maitri_db

# JWT Authentication
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200

# API Keys
GROQ_API_KEY=your-groq-api-key
DEEPGRAM_API_KEY=your-deepgram-api-key
```

5. **Start the backend server**
```bash
python main.py
# Or with uvicorn:
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Backend will run at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd ../frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment (optional)**
```bash
# Create .env file if backend URL differs
echo "VITE_API_URL=http://localhost:8000" > .env
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

Frontend will run at `http://localhost:5173`

---

## Usage

### 1. **User Registration & Login**
- Navigate to `http://localhost:5173`
- Create an account with email and password
- JWT token stored in context for authenticated requests

### 2. **Dashboard Home**
- View activity heatmap (GitHub-style contribution graph)
- Take daily wellness quiz (7 questions, 2 minutes)
- Access calming exercises and breathing techniques
- Browse curated mental health resources

### 3. **Video Journal Analysis**
```bash
POST /api/upload-video
Content-Type: multipart/form-data

Parameters:
- file: video file (.mp4, .avi, .mov, etc.)
- privacy_mode: "anonymized" | "full_privacy"
- interval_seconds: 5 (default)
- frame_skip: 2 (default, for 2x speedup)
```

**Returns:**
```json
{
  "task_id": "20241220_143052_a3f8b2c1",
  "mental_health_score": 75,
  "depression_score": 35,
  "anxiety_score": 40,
  "stress_score": 50,
  "risk_level": "moderate",
  "confidence": 0.85,
  "video_emotion": "neutral",
  "audio_emotion": "sad",
  "text_emotion": "sadness",
  "depression_level": "moderate",
  "key_indicators": [
    "Moderate stress patterns detected",
    "Low energy in speech",
    "Neutral facial expressions throughout"
  ],
  "recommendations": [
    "You should consider establishing a consistent sleep schedule",
    "Try incorporating 10-15 minutes of daily exercise",
    "Consider speaking with a counselor about stress management"
  ]
}
```

### 4. **Text Journal Analysis**
```bash
POST /api/analyze-text-journal
Content-Type: application/json

{
  "text": "Your journal entry here...",
  "privacy_mode": "anonymized",
  "session_id": "optional-session-id"
}
```

**Features:**
- Automatic text chunking for long entries (>512 tokens)
- Chunk-by-chunk emotion and depression analysis
- LLM-powered comprehensive assessment
- Privacy-aware processing

### 5. **AI Chatbot**
```bash
POST /api/chat/message

{
  "session_id": "optional-existing-session",
  "message": "I've been feeling stressed lately...",
  "remove_pii": true,
  "temperature": 0.7,
  "max_tokens": 500
}
```

**Chatbot Features:**
- Context-aware responses using recent mental health scores
- Persistent session memory (stored in JSON files)
- Optional PII removal for privacy
- Empathetic, non-judgmental support

---

## API Documentation

### Authentication Endpoints

#### `POST /api/auth/register`
Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "full_name": "John Doe"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "full_name": "John Doe",
    "date_created": "2024-12-20T10:30:00Z",
    "is_active": true
  }
}
```

#### `POST /api/auth/login`
Authenticate existing user.

#### `GET /api/auth/me`
Get current user information (requires authentication).

### Journal Endpoints

#### `GET /api/journals/my-journals`
Fetch user's journal entries.

**Query Parameters:**
- `limit`: Max entries (default: 50)
- `journal_type`: Filter by "text" | "video"

#### `GET /api/journals/heatmap/{year}`
Get activity heatmap data for specified year.

**Response:**
```json
{
  "user_id": "507f1f77bcf86cd799439011",
  "year": 2024,
  "current_streak": 7,
  "longest_streak": 15,
  "total_entries": 42,
  "data": [
    {
      "date": "2024-12-20",
      "value": 3,
      "mental_health_score": 75,
      "total_entries": 3,
      "tooltip": "Dec 20, 2024: 3 entries (avg score: 75)"
    }
  ]
}
```

#### `GET /api/journals/stats`
Get user's journal statistics.

#### `GET /api/journals/recent-scores?days=5`
Get recent mental health scores for chatbot context.

### Analysis Endpoints

#### `POST /api/upload-video`
Upload and analyze video (synchronous, returns complete results).

#### `POST /api/analyze-text-journal`
Analyze text journal entry with privacy options.

#### `GET /api/status/{task_id}`
Check analysis task status (for async operations).

#### `GET /api/result/{task_id}`
Get complete analysis results.

### Chatbot Endpoints

#### `POST /api/chat/new-session`
Create new chat session.

#### `POST /api/chat/message`
Send message to chatbot (no authentication required for anonymous support).

#### `GET /api/chat/history/{session_id}`
Retrieve chat history for session.

#### `DELETE /api/chat/clear/{session_id}`
Clear chat history.

#### `DELETE /api/chat/session/{session_id}`
Delete entire chat session.

---

## Model Performance

### Video Emotion Detection
- **Model**: `dima806/facial_emotions_image_detection` (ViT-based)
- **Face Detection**: MTCNN (Multi-task Cascaded CNN)
- **Emotions**: Neutral, Happy, Sad, Angry, Surprise, Fear, Disgust
- **Optimization**: Frame skipping (2x-3x speedup), interval-based analysis

### Audio Emotion Recognition
- **Primary Model**: `speechbrain/emotion-recognition-wav2vec2-IEMOCAP`
- **Accuracy**: 78.7% on IEMOCAP test set
- **Fallback Model**: `superb/wav2vec2-base-superb-er` (67% accuracy)
- **Emotions**: Neutral, Happy, Sad, Angry

### Text Emotion Classification
- **Model**: `j-hartmann/emotion-english-distilroberta-base`
- **Emotions**: Joy, Sadness, Anger, Fear, Surprise, Disgust, Neutral

### Depression Detection
- **Model**: `rafalposwiata/deproberta-large-depression`
- **Classes**: Not Depression, Moderate, Severe
- **Approach**: Softmax distribution analysis for nuanced assessment

---

## Privacy & Security

### Privacy Modes

**Full Privacy Mode:**
- Only classifier probability distributions sent to LLM
- No raw text or audio transmitted
- Maximum privacy, slightly reduced accuracy

**Anonymized Mode:**
- PII removal using spaCy NER
- Names, locations, emails, phone numbers masked
- Anonymized text sent to LLM for detailed analysis
- Balanced privacy and accuracy

### Security Features
- JWT-based authentication with 30-day expiration
- Bcrypt password hashing (work factor: 12)
- User data isolation in MongoDB
- CORS protection for frontend requests
- Input validation and sanitization

---

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  hashed_password: String,
  full_name: String,
  date_created: Date,
  is_active: Boolean
}
```

### Journals Collection
```javascript
{
  _id: ObjectId,
  user_id: String,
  journal_type: String, // "text" | "video"
  timestamp: Date,
  date: Date, // For daily aggregation
  content: String | null, // Only if anonymized mode
  privacy_mode: String,
  video_path: String | null,
  text_length: Number,
  llm_assessment: {
    mental_health_score: Number,
    depression_score: Number,
    anxiety_score: Number,
    stress_score: Number,
    risk_level: String,
    confidence: Number,
    key_indicators: [String],
    recommendations: [String],
    // ... additional analysis data
  },
  is_deleted: Boolean
}
```

### Streaks Collection
```javascript
{
  _id: ObjectId,
  user_id: String (unique),
  current_streak: Number,
  longest_streak: Number,
  last_entry_date: Date
}
```

---

## Troubleshooting

### Common Issues

**FFmpeg not found:**
```bash
# Ubuntu/Debian
sudo apt-get install ffmpeg

# macOS
brew install ffmpeg

# Windows
# Download from https://ffmpeg.org/download.html
# Add to system PATH
```

**MongoDB connection error:**
- Ensure MongoDB is running: `sudo systemctl start mongod`
- Check connection string in `.env`
- For Atlas, whitelist your IP address

**CUDA out of memory (video analysis):**
- Increase `frame_skip` parameter (2 → 3 or 4)
- Reduce `interval_seconds` (5 → 10)
- Use CPU-only mode (slower): Set `CUDA_VISIBLE_DEVICES=-1`

**spaCy model not found:**
```bash
python -m spacy download en_core_web_sm
```

**Groq API rate limit:**
- Free tier: 30 requests/minute
- Implement exponential backoff
- Consider upgrading to paid tier

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Acknowledgments

- **Hugging Face** for pre-trained models
- **SpeechBrain** for audio emotion recognition
- **Deepgram** for transcription API
- **Groq** for LLM API (Llama 3.1)
- **MongoDB** for database solutions
- Mental health research community for validation datasets

---
