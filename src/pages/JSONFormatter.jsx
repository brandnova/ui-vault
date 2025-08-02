import React, { useState, useEffect } from 'react';
import { Copy, FileText, RefreshCw, AlertCircle, CheckCircle, Download, Upload, Maximize2, Minimize2 } from 'lucide-react';

const JSONFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);
  const [autoFormat, setAutoFormat] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-format when input changes (if enabled)
  useEffect(() => {
    if (autoFormat && input.trim()) {
      formatJSON();
    }
  }, [input, autoFormat, indentSize]);

  const formatJSON = () => {
    if (!input.trim()) {
      setError('Please enter some JSON to format');
      setOutput('');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setError('');
      setCopied(false);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
    }
  };

  const minifyJSON = () => {
    if (!input.trim()) {
      setError('Please enter some JSON to minify');
      setOutput('');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
      setCopied(false);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
    }
  };

  const sortJSON = () => {
    if (!input.trim()) {
      setError('Please enter some JSON to sort');
      setOutput('');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const sortedJSON = sortObjectKeys(parsed);
      const formatted = JSON.stringify(sortedJSON, null, indentSize);
      setOutput(formatted);
      setError('');
      setCopied(false);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
    }
  };

  const sortObjectKeys = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(item => sortObjectKeys(item));
    } else if (obj !== null && typeof obj === 'object') {
      const sortedObj = {};
      Object.keys(obj).sort().forEach(key => {
        sortedObj[key] = sortObjectKeys(obj[key]);
      });
      return sortedObj;
    }
    return obj;
  };

  const handleCopy = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadJSON = () => {
    if (!output) return;
    
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInput(e.target.result);
        setError('');
        setCopied(false);
      };
      reader.readAsText(file);
    } else {
      setError('Please select a valid JSON file');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
  };

  const loadSample = () => {
    const sampleJSON = {
      "user": {
        "id": 12345,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "isActive": true,
        "roles": ["admin", "user"],
        "preferences": {
          "theme": "dark",
          "notifications": true,
          "language": "en"
        }
      },
      "metadata": {
        "createdAt": "2023-01-15T10:30:00Z",
        "version": "1.2.3"
      }
    };
    setInput(JSON.stringify(sampleJSON));
    setError('');
    setCopied(false);
  };

  const swapInputOutput = () => {
    if (output) {
      setInput(output);
      setOutput('');
      setError('');
      setCopied(false);
    }
  };

  const getStats = () => {
    if (!output) return null;
    
    try {
      const parsed = JSON.parse(output);
      const countObjects = (obj) => {
        let count = 0;
        if (typeof obj === 'object' && obj !== null) {
          count = 1;
          Object.values(obj).forEach(value => {
            count += countObjects(value);
          });
        }
        return count;
      };
      
      return {
        lines: output.split('\n').length,
        chars: output.length,
        size: new Blob([output]).size,
        objects: countObjects(parsed)
      };
    } catch {
      return null;
    }
  };

  const stats = getStats();
  const textareaHeight = isExpanded ? 'h-80' : 'h-48';

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">JSON Formatter</h1>
              <p className="text-xs text-gray-600 mt-0.5">
                Format, validate, minify and sort JSON data
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <label className="flex items-center text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={autoFormat}
                  onChange={(e) => setAutoFormat(e.target.checked)}
                  className="mr-1 h-3 w-3"
                />
                Auto-format
              </label>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 text-gray-400 hover:text-gray-600"
                title={isExpanded ? "Compact view" : "Expanded view"}
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Input Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Input JSON</label>
                <div className="flex items-center space-x-2">
                  <select
                    value={indentSize}
                    onChange={(e) => setIndentSize(Number(e.target.value))}
                    className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                    <option value={1}>1 space</option>
                  </select>
                  <label className="relative cursor-pointer">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Upload className="h-4 w-4 text-gray-500 hover:text-gray-700" title="Upload JSON file" />
                  </label>
                </div>
              </div>
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste JSON here or upload a file..."
                className={`w-full ${textareaHeight} px-3 py-2 border border-gray-300 rounded-lg font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
              />
              
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={formatJSON}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                >
                  <FileText className="mr-1 h-3 w-3" />
                  Format
                </button>
                
                <button
                  onClick={minifyJSON}
                  className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors"
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Minify
                </button>
                
                <button
                  onClick={sortJSON}
                  className="inline-flex items-center px-3 py-1.5 bg-purple-600 text-white text-xs font-medium rounded hover:bg-purple-700 transition-colors"
                >
                  Sort Keys
                </button>
                
                <button
                  onClick={loadSample}
                  className="inline-flex items-center px-3 py-1.5 bg-gray-500 text-white text-xs font-medium rounded hover:bg-gray-600 transition-colors"
                >
                  Sample
                </button>
                
                <button
                  onClick={clearAll}
                  className="inline-flex items-center px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition-colors"
                >
                  Clear
                </button>
                
                {output && (
                  <button
                    onClick={swapInputOutput}
                    className="inline-flex items-center px-3 py-1.5 bg-orange-500 text-white text-xs font-medium rounded hover:bg-orange-600 transition-colors"
                    title="Move output to input"
                  >
                    ↔ Swap
                  </button>
                )}
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Formatted Output</label>
                <div className="flex items-center space-x-1">
                  {output && (
                    <>
                      <button
                        onClick={downloadJSON}
                        className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        title="Download JSON file"
                      >
                        <Download className="h-3 w-3" />
                      </button>
                      <button
                        onClick={handleCopy}
                        className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                          copied 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200'
                        }`}
                      >
                        <Copy className="inline h-3 w-3 mr-1" />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <textarea
                value={output}
                readOnly
                placeholder="Formatted JSON will appear here..."
                className={`w-full ${textareaHeight} px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg font-mono text-xs focus:outline-none resize-none`}
              />
              
              {/* Status Messages */}
              {error && (
                <div className="flex items-center p-2 bg-red-50 border border-red-200 rounded">
                  <AlertCircle className="h-3 w-3 text-red-600 mr-2 flex-shrink-0" />
                  <span className="text-xs text-red-800">{error}</span>
                </div>
              )}
              
              {stats && !error && (
                <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                  <div className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-xs text-green-800">Valid JSON</span>
                  </div>
                  <span className="text-xs text-green-700">
                    {stats.lines} lines • {stats.chars} chars • {stats.objects} objects • {(stats.size / 1024).toFixed(1)}KB
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Compact Info Section */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3">
            <div className="text-xs text-blue-800 grid grid-cols-2 md:grid-cols-4 gap-2">
              <span>• <strong>Auto-format:</strong> Real-time formatting</span>
              <span>• <strong>Sort Keys:</strong> Alphabetical ordering</span>
              <span>• <strong>File Upload:</strong> Drag & drop support</span>
              <span>• <strong>Download:</strong> Save formatted JSON</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONFormatter;