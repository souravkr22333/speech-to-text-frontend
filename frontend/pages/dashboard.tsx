import React from 'react'
import Head from 'next/head';
import AudioRecorder from '../components/AudioRecorder';
import FileUpload from '../components/FileUpload';
import TranscriptionResult from '../components/TranscriptionResult';
import { useState, useEffect } from 'react';



function dashboard() {
  const [transcription, setTranscription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }, []);
    
  const handleTranscription = (text: string) => {
    setTranscription(text);
  };

  return (
    <div>
       <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>Speech to Text Converter</title>
        <meta name="description" content="Convert speech to text using AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎤 Speech to Text Converter
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Convert your audio files or live recordings to text using advanced speech recognition technology
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <AudioRecorder onTranscription={handleTranscription} />
            <FileUpload
              onTranscription={handleTranscription}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>

          {transcription && (
            <TranscriptionResult transcription={transcription} />
          )}

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">How to Use</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="text-center">
                <div className="text-2xl mb-2">🎤</div>
                <p><strong>Record Audio</strong> - Click start recording and speak into your microphone</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📁</div>
                <p><strong>Upload File</strong> - Choose an audio file from your device</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📝</div>
                <p><strong>Get Text</strong> - Receive your transcribed text instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default dashboard
