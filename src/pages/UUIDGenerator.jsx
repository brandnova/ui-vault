import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, History, Download, Settings, Eye, EyeOff } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const generateUUID = () => uuidv4();

// Simple UUID v4 generator (since we can't import uuid package in artifacts)

// const generateUUID = () => {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//     const r = Math.random() * 16 | 0;
//     const v = c === 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// };

const UUIDGenerator = () => {
  const [uuid, setUuid] = useState(generateUUID());
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [generateCount, setGenerateCount] = useState(1);
  const [bulkUuids, setBulkUuids] = useState([]);
  const [showBulk, setShowBulk] = useState(false);
  const [format, setFormat] = useState('standard'); // standard, uppercase, no-hyphens
  const [showSettings, setShowSettings] = useState(false);

  // Auto-generate effect
  useEffect(() => {
    let interval;
    if (autoGenerate) {
      interval = setInterval(() => {
        const newUuid = generateUUID();
        setUuid(newUuid);
        setHistory(prev => [{ id: newUuid, timestamp: new Date() }, ...prev.slice(0, 19)]);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [autoGenerate]);

  const formatUuid = (rawUuid) => {
    switch (format) {
      case 'uppercase':
        return rawUuid.toUpperCase();
      case 'no-hyphens':
        return rawUuid.replace(/-/g, '');
      case 'uppercase-no-hyphens':
        return rawUuid.replace(/-/g, '').toUpperCase();
      default:
        return rawUuid;
    }
  };

  const handleGenerate = () => {
    const newUuid = generateUUID();
    setUuid(newUuid);
    setHistory(prev => [{ id: newUuid, timestamp: new Date() }, ...prev.slice(0, 19)]);
    setCopied(false);
  };

  const handleBulkGenerate = () => {
    const count = Math.min(Math.max(generateCount, 1), 100);
    const newUuids = Array.from({ length: count }, () => ({
      id: generateUUID(),
      timestamp: new Date()
    }));
    setBulkUuids(newUuids);
    setShowBulk(true);
  };

  const handleCopy = async (textToCopy = uuid) => {
    try {
      const formattedText = formatUuid(textToCopy);
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyAll = async () => {
    try {
      const allUuids = bulkUuids.map(item => formatUuid(item.id)).join('\n');
      await navigator.clipboard.writeText(allUuids);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadUuids = () => {
    const data = bulkUuids.map(item => formatUuid(item.id)).join('\n');
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getUuidInfo = (uuidStr) => {
    const cleanUuid = uuidStr.replace(/-/g, '');
    return {
      version: parseInt(cleanUuid[12], 16),
      variant: parseInt(cleanUuid[16], 16) >> 2,
      timestamp: cleanUuid.substring(0, 8),
      node: cleanUuid.substring(20)
    };
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">UUID Generator</h1>
              <p className="mt-1 text-sm text-gray-600">
                Generate universally unique identifiers (UUID v4) for your applications
              </p>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Generator */}
            <div className="lg:col-span-2 space-y-6">
              {/* Settings Panel */}
              {showSettings && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Format</label>
                      <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="standard">Standard (lowercase)</option>
                        <option value="uppercase">Uppercase</option>
                        <option value="no-hyphens">No hyphens</option>
                        <option value="uppercase-no-hyphens">Uppercase, no hyphens</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="autoGenerate"
                        checked={autoGenerate}
                        onChange={(e) => setAutoGenerate(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="autoGenerate" className="ml-2 text-sm text-gray-700">
                        Auto-generate every 2s
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Generated UUID Display */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Generated UUID
                  {autoGenerate && <span className="ml-2 text-xs text-blue-600 animate-pulse">● Auto-generating</span>}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formatUuid(uuid)}
                    readOnly
                    className="w-full px-4 py-3 pr-24 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute right-2 top-2 flex space-x-1">
                    <button
                      onClick={() => handleCopy()}
                      className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                        copied 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200'
                      }`}
                    >
                      <Copy className="inline h-3 w-3 mr-1" />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={autoGenerate}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate New UUID
                </button>
                
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="inline-flex items-center px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  <History className="mr-2 h-4 w-4" />
                  History ({history.length})
                </button>
              </div>

              {/* Bulk Generator */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-3">Bulk Generator</h3>
                <div className="flex items-center space-x-3">
                  <div>
                    <label className="block text-xs font-medium text-blue-800 mb-1">Count</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={generateCount}
                      onChange={(e) => setGenerateCount(parseInt(e.target.value) || 1)}
                      className="w-20 px-3 py-2 text-sm border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="pt-5">
                    <button
                      onClick={handleBulkGenerate}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Generate Bulk
                    </button>
                  </div>
                </div>
              </div>

              {/* UUID Analysis */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-green-900 mb-2">UUID Analysis</h3>
                <div className="text-xs text-green-800 grid grid-cols-2 gap-2">
                  <div>Version: {getUuidInfo(uuid).version}</div>
                  <div>Variant: {getUuidInfo(uuid).variant}</div>
                  <div>Length: {formatUuid(uuid).length} chars</div>
                  <div>Entropy: ~122 bits</div>
                </div>
              </div>
            </div>

            {/* History Sidebar */}
            <div className="space-y-6">
              {/* History Panel */}
              <div className={`transition-all duration-300 ${showHistory ? 'opacity-100' : 'opacity-50'}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Recent UUIDs</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      {showHistory ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    {history.length > 0 && (
                      <button
                        onClick={clearHistory}
                        className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
                
                {showHistory && (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {history.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-4">No history yet</p>
                    ) : (
                      history.map((item, index) => (
                        <div key={index} className="group flex items-center justify-between p-2 bg-gray-50 rounded text-xs hover:bg-gray-100">
                          <div className="flex-1 min-w-0">
                            <div className="font-mono text-gray-800 truncate">{formatUuid(item.id)}</div>
                            <div className="text-gray-500">{item.timestamp.toLocaleTimeString()}</div>
                          </div>
                          <button
                            onClick={() => handleCopy(item.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 transition-opacity"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-2">About UUIDs</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>• UUID v4 uses random numbers</p>
                  <p>• Extremely low collision probability</p>
                  <p>• Perfect for unique identifiers</p>
                  <p>• Standard: 8-4-4-4-12 format</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bulk Results Modal */}
          {showBulk && bulkUuids.length > 0 && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-lg font-medium">Generated {bulkUuids.length} UUIDs</h3>
                  <button
                    onClick={() => setShowBulk(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex space-x-2 mb-3">
                    <button
                      onClick={handleCopyAll}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded hover:bg-blue-200 transition-colors"
                    >
                      <Copy className="inline h-3 w-3 mr-1" />
                      Copy All
                    </button>
                    <button
                      onClick={downloadUuids}
                      className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded hover:bg-green-200 transition-colors"
                    >
                      <Download className="inline h-3 w-3 mr-1" />
                      Download
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded border max-h-64 overflow-y-auto p-3">
                    <pre className="text-xs font-mono">
                      {bulkUuids.map(item => formatUuid(item.id)).join('\n')}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UUIDGenerator;