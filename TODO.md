# Speech-to-Text Project Technologies

## Frontend Technologies

### Next.js
- **Purpose**: React framework for building the web application
- **Why used**: Provides server-side rendering, routing, API routes, and optimized performance. Handles the user interface and client-side logic for the speech-to-text application.

### React
- **Purpose**: JavaScript library for building user interfaces
- **Why used**: Component-based architecture for reusable UI elements like AudioRecorder, FileUpload, and TranscriptionResult components.

### TypeScript
- **Purpose**: Typed superset of JavaScript
- **Why used**: Provides type safety and better developer experience for the frontend codebase.

### Tailwind CSS
- **Purpose**: Utility-first CSS framework
- **Why used**: Rapid UI development with responsive design classes for styling the application interface.

### MediaRecorder API
- **Purpose**: Browser API for recording audio/video
- **Why used**: Captures audio from the user's microphone for real-time speech recording and transcription.

## Backend Technologies

### Flask
- **Purpose**: Python web framework
- **Why used**: Lightweight framework for building RESTful APIs to handle audio transcription requests and serve the backend services.

### Google Speech Recognition (speech_recognition library)
- **Purpose**: Speech-to-text conversion service
- **Why used**: Core functionality for converting audio files to text using Google's powerful speech recognition engine.

### pydub
- **Purpose**: Python audio processing library
- **Why used**: Audio format conversion (WebM/MP3/M4A to WAV) and preprocessing before sending to speech recognition.

### FFmpeg
- **Purpose**: Multimedia processing tool
- **Why used**: Required by pydub for audio format conversions and manipulations.

### Werkzeug
- **Purpose**: WSGI utility library for Python
- **Why used**: File upload handling and security features in Flask application.

### python-dotenv
- **Purpose**: Environment variable management
- **Why used**: Loading configuration from environment files for secure credential management.

## Development Tools

### ESLint
- **Purpose**: JavaScript/TypeScript linting
- **Why used**: Code quality and consistency enforcement in the frontend.

### PostCSS
- **Purpose**: CSS processing tool
- **Why used**: Processes Tailwind CSS and other CSS transformations.

### npm/yarn
- **Purpose**: Package managers
- **Why used**: Dependency management for Node.js packages in the frontend.

### pip
- **Purpose**: Python package manager
- **Why used**: Dependency management for Python packages in the backend.

## Project Architecture

### Why This Tech Stack?
- **Next.js + Flask**: Full-stack JavaScript/Python combination allows modern frontend with robust backend processing
- **Google Speech API**: Industry-leading accuracy for speech recognition
- **Tailwind CSS**: Rapid prototyping and consistent design system
- **MediaRecorder API**: Native browser audio recording without external dependencies
- **pydub + FFmpeg**: Reliable audio processing pipeline for various input formats

### Data Flow
1. **Frontend**: User records audio or uploads file → sends to backend API
2. **Backend**: Receives audio → converts format if needed → sends to Google Speech API → returns transcription
3. **Frontend**: Displays transcribed text to user

This technology stack provides a complete, production-ready speech-to-text application with modern web technologies and reliable audio processing capabilities.
