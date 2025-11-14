const TranscriptionResult = ({ transcription }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transcription);
      alert('Text copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const downloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([transcription], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'transcription.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!transcription) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Transcription Result</h3>
        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            📋 Copy
          </button>
          <button
            onClick={downloadText}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            💾 Download
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p className="text-gray-800 whitespace-pre-wrap">{transcription}</p>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 flex justify-between">
        <span>Characters: {transcription.length}</span>
        <span>Words: {transcription.split(/\s+/).filter(word => word.length > 0).length}</span>
      </div>
    </div>
  );
};

export default TranscriptionResult;