import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Head>
        <title>Speech2Text - Advanced Speech Recognition</title>
        <meta name="description" content="Convert speech to text with AI-powered accuracy. Record audio or upload files for instant transcription." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-blue-100 p-4 rounded-full">
                <span className="text-6xl">🎤</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Speech into
              <span className="text-blue-600 block">Text Instantly</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the power of advanced AI speech recognition. Convert audio files,
              live recordings, and voice messages to accurate text in multiple languages.
              Perfect for content creators, professionals, and anyone who needs reliable transcription.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isLoggedIn ? (
                <Link
                  href="/"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Start Transcribing →
                </Link>
              ) : (
                <>
                  <Link
                    href="Rregister"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    href="Login"
                    className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-gray-200 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full opacity-20"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Every Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered speech recognition technology delivers exceptional accuracy
              across multiple use cases and languages.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🎙️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Live Recording</h3>
              <p className="text-gray-600">
                Record audio directly in your browser and get instant transcription.
                Perfect for meetings, interviews, and voice notes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">📁</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">File Upload</h3>
              <p className="text-gray-600">
                Upload audio files in multiple formats (WAV, MP3, M4A, FLAC, AAC, WebM)
                and convert them to text with high accuracy.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-Language</h3>
              <p className="text-gray-600">
                Support for 12+ languages including English, Spanish, French, German,
                Hindi, and many more for global accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started with speech-to-text conversion in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Input</h3>
              <p className="text-gray-600">
                Select live recording or upload an audio file. Our system supports
                various formats and handles different audio qualities.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Processing</h3>
              <p className="text-gray-600">
                Our advanced Google Speech Recognition engine processes your audio
                with high accuracy and converts it to text in real-time.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Results</h3>
              <p className="text-gray-600">
                Receive your transcribed text instantly. Copy, download, or use
                it directly in your applications and workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Formats Section */}
      <section id="supported-formats" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Supported Audio Formats
            </h2>
            <p className="text-xl text-gray-600">
              Upload files in any of these popular audio formats
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['WAV', 'MP3', 'M4A', 'FLAC', 'AAC', 'WebM'].map((format) => (
              <div key={format} className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors duration-200">
                <div className="text-2xl mb-2">🎵</div>
                <div className="font-semibold text-gray-900">{format}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Audio?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust our AI-powered speech recognition technology
          </p>

          {isLoggedIn ? (
            <Link
              href="/"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg inline-block"
            >
              Start Transcribing Now →
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Create Free Account
              </Link>
              <Link
                href="/login"
                className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-400 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
