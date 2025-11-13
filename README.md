# Speech-to-Text Application

A modern web application that converts speech to text using Google's Speech Recognition API. Record audio directly from your browser or upload audio files for transcription.

## Features

- 🎤 **Real-time Audio Recording**: Record audio directly from your browser with optimized audio settings
- 📁 **File Upload Support**: Upload various audio formats (WAV, MP3, M4A, FLAC, AAC, WebM)
- 🌍 **Multi-language Support**: Supports 12+ languages including English, Spanish, French, German, Hindi, and more
- ⚡ **Fast Processing**: Quick transcription using Google Speech Recognition
- 🎨 **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- 🔧 **RESTful API**: Well-documented API endpoints for integration

## Tech Stack

### Frontend
- **Next.js 16** - React framework
- **Tailwind CSS** - Utility-first CSS framework
- **MediaRecorder API** - Browser audio recording

### Backend
- **Flask** - Python web framework
- **Google Speech Recognition** - Speech-to-text engine
- **pydub** - Audio processing and format conversion
- **FFmpeg** - Audio/video processing (required for pydub)

## Prerequisites

Before running this application, make sure you have the following installed:

- Python 3.8+
- Node.js 18+
- FFmpeg (required for audio processing)
- npm

### Installing FFmpeg


```bash
choco install ffmpeg
```


## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd speech-to-text
   ```

2. **Backend Setup**
   ```bash
   # Navigate to backend directory
   cd backend

   # Create virtual environment (recommended)
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate

   # Install Python dependencies
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
    
    1. cd frontend
    2.  npm install



### Running the Application

1. **Start the Backend Server**
   
   cd backend
   python app.py
   
   The backend will run on `http://localhost:5000`

2. **Start the Frontend Server**
   
   cd frontend
   npm run dev
   
   The frontend will run on `http://localhost:3000`


*** How to Use ***

#### Recording Audio
1. Click the "🎤 Start Recording" button
2. Allow microphone access when prompted
3. Speak clearly into your microphone
4. Click "⏹️ Stop Recording" when finished
5. Click "📝 Transcribe" to convert speech to text

#### Uploading Files
1. Use the file upload component to select an audio file
2. Supported formats: WAV, MP3, M4A, FLAC, AAC, WebM
3. The file will be automatically transcribed

#### Language Selection
- Choose your preferred language from the dropdown before recording
- Supported languages include English (US/UK), Spanish, French, German, Hindi, and more

## API Documentation

### Endpoints

#### Health Check
```http
GET /api/health
```
Returns the API status.

#### Transcribe Audio
```http
POST /api/transcribe
Content-Type: multipart/form-data
```

**Parameters:**
- `audio` (file): Audio file to transcribe
- `language` (string, optional): Language code (default: "en-US")

**Response:**
```json
{
  "success": true,
  "text": "Transcribed text here",
  "message": "Transcription completed successfully"
}
```

#### Supported Languages
```http
GET /api/languages
```

Returns a list of supported languages with their codes and names.

## Project Structure

```
speech-to-text/
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   └── uploads/            # Temporary file storage
├── frontend/
│   ├── components/
│   │   ├── AudioRecorder.js    # Audio recording component
│   │   ├── FileUpload.js       # File upload component
│   │   └── TranscriptionResult.js # Results display
│   ├── pages/
│   │   ├── index.tsx       # Main page
│   │   └── api/            # API routes (Next.js)
│   └── styles/
│       └── globals.css     # Global styles
├── package-lock.json       # Root package lock
└── README.md              # This file
```

## Troubleshooting

### Common Issues

1. **"FFmpeg not found" error**
   - Ensure FFmpeg is installed and added to your system PATH
   - Restart your terminal/command prompt after installation

2. **Microphone access denied**
   - Allow microphone permissions in your browser
   - Check browser settings for camera/microphone access

3. **Transcription fails**
   - Ensure audio quality is good (clear speech, minimal background noise)
   - Check internet connection (required for Google Speech API)
   - Try different languages if the audio is in a specific language

4. **Port already in use**
   - Backend uses port 5000, frontend uses port 3000
   - Change ports in the respective configuration files if needed

### Audio Quality Tips

- Speak clearly and at a normal pace
- Minimize background noise
- Use a good quality microphone
- Record in a quiet environment
- Test with shorter recordings first

## Development

### Backend Development
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Speech Recognition API for speech-to-text functionality
- pydub library for audio processing
- Next.js and Flask communities for excellent documentation
