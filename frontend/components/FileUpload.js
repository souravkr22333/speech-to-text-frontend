import { useState, useEffect, use } from 'react';

const FileUpload = ({ onTranscription, isLoading, setIsLoading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [languages, setLanguages] = useState([]);
  const [isloginedin, setIsloginedin] = useState();
  const [token, setToken] = useState('');

  useEffect(() => {
    let token = localStorage.getItem('token');
    setToken(token);
    setIsloginedin(!token);
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/m4a', 'audio/flac', 'audio/aac'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid audio file (WAV, MP3, M4A, FLAC, or AAC)');
        return;
      }
      
      // Check file size (16MB max)
      if (file.size > 16 * 1024 * 1024) {
        alert('File size must be less than 16MB');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  // Fetch available languages on component mount
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/languages',{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setLanguages(data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };
    fetchLanguages();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('audio', selectedFile);
    formData.append('language', selectedLanguage);

    try {
      const response = await fetch('http://localhost:5000/api/transcribe', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        onTranscription(data.text);
        setSelectedFile(null);
        // Reset file input
        document.getElementById('file-input').value = '';
      } else {
        alert('Transcription failed: ' + data.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Upload Audio File</h3>

      <div className="space-y-4">
        {/* Language Selection */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="upload-language-select" className="text-sm font-medium text-gray-700">
            Select Language:
          </label>
          <select
            id="upload-language-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            id="file-input"
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <label
            htmlFor="file-input"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
          >
            Choose Audio File
          </label>
          <p className="text-sm text-gray-500 mt-2">
            Supported formats: WAV, MP3, M4A, FLAC, AAC (Max 16MB)
          </p>
        </div>

        {selectedFile && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium">Selected file: {selectedFile.name}</p>
            <p className="text-sm text-gray-600">
              Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!selectedFile || isLoading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="loading-spinner mr-2"></div>
              Transcribing...
            </>
          ) : (
            '📤 Upload & Transcribe'
          )}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;