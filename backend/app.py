import os
import speech_recognition as sr
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.utils import secure_filename
from pydub import AudioSegment
import tempfile
import bcrypt
from dotenv import load_dotenv
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Configuration
app.config['MONGO_URI'] = os.getenv('MONGO_URI', 'mongodb://localhost:27017/speech_to_text')
mongo = PyMongo(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
jwt = JWTManager(app)

# Configuration
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'wav', 'mp3', 'm4a', 'flac', 'aac'}

# Create upload directory if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def allowed_file(filename):
    # Allow webm files for recorded audio
    if not filename:
        return False
    ext = filename.rsplit('.', 1)[1].lower() if '.' in filename else ''
    return ext in app.config['ALLOWED_EXTENSIONS'] or ext == 'webm'

def convert_audio_to_wav(audio_path):
    """Convert any audio format to WAV for speech recognition"""
    audio = None
    try:
        audio = AudioSegment.from_file(audio_path)
        wav_path = audio_path.rsplit('.', 1)[0] + '_converted.wav'
        audio.export(wav_path, format='wav')
        return wav_path
    except Exception as e:
        raise Exception(f"Audio conversion failed: {str(e)}")
    finally:
        # Close the audio file handle to prevent file locking issues
        if audio:
            try:
                audio.close()
            except:
                pass

def transcribe_audio(audio_path, language='en-US'):
    """Transcribe audio file to text using Google Speech Recognition"""
    recognizer = sr.Recognizer()
    converted_file_path = None

    try:
        # Convert to WAV if needed
        if not audio_path.endswith('.wav'):
            converted_file_path = convert_audio_to_wav(audio_path)
            audio_path = converted_file_path

        with sr.AudioFile(audio_path) as source:
            # Adjust for ambient noise with shorter duration to preserve speech
            recognizer.adjust_for_ambient_noise(source, duration=0.5)
            audio_data = recognizer.record(source)

            # Use Google Speech Recognition with specified language
            text = recognizer.recognize_google(audio_data, language=language)
            return text

    except sr.UnknownValueError:
        raise Exception(f"Speech Recognition could not understand the audio. Please ensure the audio is clear and in {language} language.")
    except sr.RequestError as e:
        raise Exception(f"Could not request results from Speech Recognition service; {e}")
    except Exception as e:
        raise Exception(f"Transcription failed: {str(e)}")
    finally:
        # Clean up converted files with proper error handling
        if converted_file_path and os.path.exists(converted_file_path):
            try:
                # Give a small delay to ensure file handles are released
                import time
                time.sleep(0.2)
                os.remove(converted_file_path)
            except OSError as cleanup_error:
                # Log cleanup error but don't fail the request
                print(f"Warning: Could not clean up converted file {converted_file_path}: {cleanup_error}")

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Speech to Text API is running'})
@app.route('/api/currentuser', methods=['GET'])
@jwt_required(optional=True)
def index():
        """Return basic API info or current authenticated user's info if a valid JWT is provided."""
        current_user = get_jwt_identity()
        if current_user:
            user = mongo.db.users.find_one({'email': current_user})
            if user:
                return jsonify({
                    'authenticated': True,
                    'message': 'Authenticated user info',
                    'user': {
                        'email': current_user,
                        'name': user['name']
                    }
                }), 200

        return jsonify({
            'authenticated': False,
            'message': 'Welcome to the Speech to Text API. Provide a valid JWT to get user information.'
        }), 200

@app.route('/api/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')

        if not email or not password or not name:
            return jsonify({'error': 'Email, password, and name are required'}), 400

        # Check if user already exists
        existing_user = mongo.db.users.find_one({'email': email})
        if existing_user:
            return jsonify({'error': 'User already exists'}), 409

        # Hash password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Store user in MongoDB
        user_doc = {
            'email': email,
            'password': hashed_password.decode('utf-8'),
            'name': name
        }
        mongo.db.users.insert_one(user_doc)

        return jsonify({'message': 'User registered successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    """Authenticate user and return JWT token"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400

        # Find user in MongoDB
        user = mongo.db.users.find_one({'email': email})
        if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            return jsonify({'error': 'Invalid credentials'}), 401

        # Create JWT token
        access_token = create_access_token(identity=email)

        return jsonify({
            'access_token': access_token,
            'user': {
                'email': email,
                'name': user['name']
            }
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/transcribe', methods=['POST'])
@jwt_required()
def transcribe():
    """Handle audio file upload and transcription - requires authentication"""
    temp_path = None
    try:
        # Check if file is present in request
        if 'audio' not in request.files:
            return jsonify({'error': 'No audio file provided'}), 400

        file = request.files['audio']

        # Check if file is selected
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        # Validate file type
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not allowed. Please upload WAV, MP3, M4A, FLAC, AAC, or WebM files.'}), 400

        # Get language parameter (default to English)
        language = request.form.get('language', 'en-US')

        # Save uploaded file temporarily
        filename = secure_filename(file.filename)
        temp_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(temp_path)

        # Transcribe audio with specified language
        transcribed_text = transcribe_audio(temp_path, language)

        return jsonify({
            'success': True,
            'text': transcribed_text,
            'message': 'Transcription completed successfully'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        # Always clean up the uploaded file
        if temp_path and os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except OSError as cleanup_error:
                # Log cleanup error but don't fail the request
                print(f"Warning: Could not clean up file {temp_path}: {cleanup_error}")

@app.route('/api/languages', methods=['GET'])

def get_supported_languages():
    """Return supported languages for speech recognition - requires authentication"""
    languages = [
        {'code': 'en-US', 'name': 'English (US)'},
        {'code': 'en-GB', 'name': 'English (UK)'},
        {'code': 'hi-IN', 'name': 'Hindi'},
        {'code': 'es-ES', 'name': 'Spanish'},
        {'code': 'fr-FR', 'name': 'French'},
        {'code': 'de-DE', 'name': 'German'},
        {'code': 'it-IT', 'name': 'Italian'},
        {'code': 'pt-BR', 'name': 'Portuguese (Brazil)'},
        {'code': 'ru-RU', 'name': 'Russian'},
        {'code': 'ja-JP', 'name': 'Japanese'},
        {'code': 'ko-KR', 'name': 'Korean'},
        {'code': 'zh-CN', 'name': 'Chinese (Simplified)'},
    ]
    return jsonify(languages)

@app.route('/api/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get user profile information"""
    current_user = get_jwt_identity()
    user = mongo.db.users.find_one({'email': current_user})
    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({
        'email': current_user,
        'name': user['name']
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
