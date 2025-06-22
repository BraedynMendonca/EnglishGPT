import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocuments } from '../contexts/DocumentContext';
import { 
  FileText, 
  Upload, 
  Download, 
  Save,
  Zap,
  CheckCircle,
  AlertTriangle,
  Info,
  RefreshCw,
  Copy,
  Eye,
  Settings,
  Lightbulb,
  ArrowLeft,
  Share2
} from 'lucide-react';

const Editor: React.FC = () => {
  const { currentDocument, updateDocument, createDocument } = useDocuments();
  const navigate = useNavigate();
  
  const [text, setText] = useState(currentDocument?.content || `Dear Team,

I hope this email finds you well. I wanted to reach out to discuss the upcoming project deadline and ensure we're all on the same page regarding deliverables.

As we approach the final phase of development, it's crucial that we maintain our quality standards while meeting the timeline. I believe we can achieve both goals with proper coordination and communication.

Please let me know if you have any concerns or questions about your assigned tasks. We should schedule a team meeting this week to review our progress and address any blockers.

Best regards,
Alex Smith`);
  
  const [documentName, setDocumentName] = useState(currentDocument?.name || 'Untitled Document');
  const [analysisResults, setAnalysisResults] = useState([
    {
      type: 'grammar',
      severity: 'high',
      position: { start: 156, end: 169 },
      original: "it's crucial",
      suggestion: "it is crucial",
      explanation: "In formal business communication, avoid contractions. Use the full form 'it is' instead of 'it's'.",
      rule: "Formal Writing Style"
    },
    {
      type: 'style',
      severity: 'medium',
      position: { start: 89, end: 104 },
      original: "reach out to",
      suggestion: "contact",
      explanation: "In professional emails, 'contact' is more direct and formal than 'reach out to'.",
      rule: "Business Communication"
    },
    {
      type: 'clarity',
      severity: 'low',
      position: { start: 245, end: 280 },
      original: "I believe we can achieve both goals",
      suggestion: "We can achieve both goals",
      explanation: "Remove unnecessary qualifying phrases to make your writing more confident and direct.",
      rule: "Confident Writing"
    }
  ]);

  const [showAnalysis, setShowAnalysis] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && text !== currentDocument?.content) {
      const timer = setTimeout(() => {
        handleSave();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [text, autoSave]);

  const handleAnalyze = () => {
    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      // Generate new analysis based on current text
      const newAnalysis = [];
      
      if (text.includes("it's")) {
        newAnalysis.push({
          type: 'grammar',
          severity: 'high',
          position: { start: text.indexOf("it's"), end: text.indexOf("it's") + 4 },
          original: "it's",
          suggestion: "it is",
          explanation: "In formal writing, avoid contractions. Use 'it is' instead of 'it's'.",
          rule: "Formal Writing Style"
        });
      }
      
      if (text.includes("reach out")) {
        newAnalysis.push({
          type: 'style',
          severity: 'medium',
          position: { start: text.indexOf("reach out"), end: text.indexOf("reach out") + 9 },
          original: "reach out",
          suggestion: "contact",
          explanation: "In professional communication, 'contact' is more direct than 'reach out'.",
          rule: "Business Communication"
        });
      }
      
      if (text.includes("I believe")) {
        newAnalysis.push({
          type: 'clarity',
          severity: 'low',
          position: { start: text.indexOf("I believe"), end: text.indexOf("I believe") + 9 },
          original: "I believe",
          suggestion: "Remove or replace with certainty",
          explanation: "Avoid hedging language to make your writing more confident and direct.",
          rule: "Confident Writing"
        });
      }
      
      setAnalysisResults(newAnalysis);
      setAnalyzing(false);
      setShowAnalysis(true);
    }, 2000);
  };

  const handleSave = () => {
    if (currentDocument) {
      updateDocument(currentDocument.id, { 
        name: documentName, 
        content: text 
      });
    } else {
      const newDoc = createDocument(documentName, text);
    }
    setLastSaved(new Date());
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setText(content);
          setDocumentName(file.name);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: documentName,
        text: text.substring(0, 100) + '...',
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text);
      alert('Document content copied to clipboard!');
    }
  };

  const applySuggestion = (index: number) => {
    const result = analysisResults[index];
    const newText = text.substring(0, result.position.start) + 
                   result.suggestion + 
                   text.substring(result.position.end);
    setText(newText);
    
    // Remove applied suggestion
    setAnalysisResults(prev => prev.filter((_, i) => i !== index));
  };

  const generateImprovedVersion = () => {
    let improvedText = text;
    
    // Apply all suggestions automatically
    analysisResults.forEach(result => {
      improvedText = improvedText.replace(result.original, result.suggestion);
    });
    
    setText(improvedText);
    setAnalysisResults([]);
    alert('Improved version generated! All suggestions have been applied.');
  };

  const exportAnalysisReport = () => {
    const report = `Writing Analysis Report for "${documentName}"
Generated on: ${new Date().toLocaleDateString()}

Document Statistics:
- Words: ${text.split(' ').length}
- Characters: ${text.length}
- Lines: ${text.split('\n').length}

Issues Found: ${analysisResults.length}

${analysisResults.map((result, index) => `
${index + 1}. ${result.type.toUpperCase()} - ${result.severity.toUpperCase()}
   Original: "${result.original}"
   Suggestion: "${result.suggestion}"
   Explanation: ${result.explanation}
   Rule: ${result.rule}
`).join('')}

Overall Score: ${Math.max(0, 100 - (analysisResults.length * 10))}%
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentName}_analysis_report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Info className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Lightbulb className="w-4 h-4 text-blue-500" />;
      default: return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="h-screen flex">
      {/* Editor Panel */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Toolbar */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Writing Editor</h1>
              <div className="h-6 w-px bg-gray-300"></div>
              <input
                type="text"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                className="text-sm text-gray-500 bg-transparent border-none outline-none focus:text-gray-900"
                placeholder="Document name"
              />
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleUpload}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Upload document"
              >
                <Upload className="w-5 h-5" />
              </button>
              <button 
                onClick={handleDownload}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Download document"
              >
                <Download className="w-5 h-5" />
              </button>
              <button 
                onClick={handleShare}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share document"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                onClick={handleSave}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Save document"
              >
                <Save className="w-5 h-5" />
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <button 
                onClick={handleAnalyze}
                disabled={analyzing}
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
              >
                {analyzing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Zap className="w-4 h-4" />
                )}
                <span>{analyzing ? 'Analyzing...' : 'Analyze'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-full resize-none border-none outline-none text-gray-900 leading-relaxed text-lg"
            placeholder="Start writing your document here..."
            style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
          />
        </div>

        {/* Status Bar */}
        <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-6">
              <span>{text.split(' ').filter(word => word.length > 0).length} words</span>
              <span>{text.length} characters</span>
              <span>{text.split('\n').length} lines</span>
            </div>
            <div className="flex items-center space-x-4">
              {analysisResults.length > 0 && (
                <span className="flex items-center space-x-1">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span>{analysisResults.length} suggestions</span>
                </span>
              )}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                  className="w-4 h-4 text-primary-600"
                />
                <span className="text-accent-600">Auto-save</span>
              </label>
              <span className="text-gray-500">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Panel */}
      {showAnalysis && (
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Writing Analysis</h2>
              <button 
                onClick={() => setShowAnalysis(false)}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Eye className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {analysisResults.length} improvement{analysisResults.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {analysisResults.map((result, index) => (
              <div key={index} className={`border rounded-xl p-4 ${getSeverityColor(result.severity)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getSeverityIcon(result.severity)}
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {result.type}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                    {result.rule}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Original:</p>
                    <p className="text-sm bg-white p-2 rounded border font-mono">
                      "{result.original}"
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Suggestion:</p>
                    <p className="text-sm bg-white p-2 rounded border font-mono text-accent-700">
                      "{result.suggestion}"
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Explanation:</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {result.explanation}
                    </p>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button 
                      onClick={() => applySuggestion(index)}
                      className="flex-1 bg-accent-600 text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-accent-700 transition-colors flex items-center justify-center space-x-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Apply</span>
                    </button>
                    <button 
                      onClick={() => navigator.clipboard.writeText(result.suggestion)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition-colors"
                      title="Copy suggestion"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {analysisResults.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-accent-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Great work!</h3>
                <p className="text-gray-600">No writing issues found. Your text looks good to go.</p>
              </div>
            )}
          </div>

          {/* Analysis Actions */}
          <div className="border-t border-gray-200 p-4 space-y-3">
            <button 
              onClick={generateImprovedVersion}
              disabled={analysisResults.length === 0}
              className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white py-3 rounded-xl font-medium hover:from-secondary-600 hover:to-secondary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Improved Version
            </button>
            <button 
              onClick={exportAnalysisReport}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Export Analysis Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;