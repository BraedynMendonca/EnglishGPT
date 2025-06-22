import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocuments } from '../contexts/DocumentContext';
import { 
  FileText, 
  Folder, 
  Search, 
  Filter,
  MoreVertical,
  Download,
  Share2,
  Trash2,
  Edit,
  Clock,
  Star,
  Plus,
  Grid,
  List,
  Calendar,
  ArrowLeft,
  Upload,
  Eye
} from 'lucide-react';

const Documents: React.FC = () => {
  const navigate = useNavigate();
  const { documents, createDocument, deleteDocument, toggleStar, setCurrentDocument } = useDocuments();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const filters = [
    { id: 'all', name: 'All Files', count: documents.length },
    { id: 'document', name: 'Documents', count: documents.filter(d => d.type === 'document').length },
    { id: 'analysis', name: 'Analysis', count: documents.filter(d => d.type === 'analysis').length },
    { id: 'exercise', name: 'Exercises', count: documents.filter(d => d.type === 'exercise').length },
    { id: 'starred', name: 'Starred', count: documents.filter(d => d.starred).length },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         doc.type === selectedFilter || 
                         (selectedFilter === 'starred' && doc.starred);
    return matchesSearch && matchesFilter;
  });

  const handleNewDocument = () => {
    const newDoc = createDocument('New Document', '');
    setCurrentDocument(newDoc);
    navigate('/editor');
  };

  const handleUploadDocument = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.doc,.docx,.pdf';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const newDoc = createDocument(file.name, content);
          setCurrentDocument(newDoc);
          navigate('/editor');
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleDocumentClick = (doc: any) => {
    setCurrentDocument(doc);
    navigate('/editor');
  };

  const handleDeleteDocument = (id: string) => {
    deleteDocument(id);
    setShowDeleteConfirm(null);
    setSelectedDocuments(prev => prev.filter(docId => docId !== id));
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedDocuments.length} document(s)?`)) {
      selectedDocuments.forEach(id => deleteDocument(id));
      setSelectedDocuments([]);
    }
  };

  const handleDownload = (doc: any) => {
    const blob = new Blob([doc.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.name}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = (doc: any) => {
    if (navigator.share) {
      navigator.share({
        title: doc.name,
        text: doc.content.substring(0, 100) + '...',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(doc.content);
      alert('Document content copied to clipboard!');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return '📄';
      case 'analysis': return '📊';
      case 'exercise': return '✏️';
      default: return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'text-blue-600 bg-blue-50';
      case 'analysis': return 'text-green-600 bg-green-50';
      case 'exercise': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedDocuments(prev => 
      prev.includes(id) 
        ? prev.filter(docId => docId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
            <p className="mt-2 text-gray-600">Manage your writing projects and analysis reports.</p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button 
            onClick={handleUploadDocument}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
          <button 
            onClick={handleNewDocument}
            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Document</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Filter Tabs */}
            <div className="flex space-x-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedFilter === filter.id
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {filter.name} ({filter.count})
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Grid/List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {viewMode === 'grid' ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="group border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl">{getTypeIcon(doc.type)}</div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(doc.id);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Star className={`w-4 h-4 ${doc.starred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                      </button>
                      <div className="relative">
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <h3 
                    className="font-semibold text-gray-900 mb-2 truncate cursor-pointer hover:text-primary-600"
                    onClick={() => handleDocumentClick(doc)}
                  >
                    {doc.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getTypeColor(doc.type)}`}>
                      {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                    </span>
                    {doc.score && (
                      <span className="text-sm font-medium text-accent-600">{doc.score}%</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{doc.size}</span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {doc.modified}
                    </span>
                  </div>

                  {doc.folder && (
                    <div className="mb-3 flex items-center text-xs text-gray-400">
                      <Folder className="w-3 h-3 mr-1" />
                      {doc.folder}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDocumentClick(doc);
                      }}
                      className="flex-1 bg-primary-600 text-white text-xs font-medium py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(doc);
                      }}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteConfirm(doc.id);
                      }}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            <div className="px-6 py-3 bg-gray-50 grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-1">Score</div>
              <div className="col-span-1">Size</div>
              <div className="col-span-2">Modified</div>
              <div className="col-span-1">Actions</div>
            </div>
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-5 flex items-center space-x-3">
                  <div className="text-xl">{getTypeIcon(doc.type)}</div>
                  <div>
                    <div 
                      className="font-medium text-gray-900 cursor-pointer hover:text-primary-600"
                      onClick={() => handleDocumentClick(doc)}
                    >
                      {doc.name}
                    </div>
                    {doc.folder && (
                      <div className="text-xs text-gray-500 flex items-center">
                        <Folder className="w-3 h-3 mr-1" />
                        {doc.folder}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-2">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getTypeColor(doc.type)}`}>
                    {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                  </span>
                </div>
                <div className="col-span-1">
                  {doc.score && (
                    <span className="text-sm font-medium text-accent-600">{doc.score}%</span>
                  )}
                </div>
                <div className="col-span-1 text-sm text-gray-600">{doc.size}</div>
                <div className="col-span-2 text-sm text-gray-600">{doc.modified}</div>
                <div className="col-span-1 flex items-center space-x-2">
                  <button
                    onClick={() => toggleStar(doc.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Star className={`w-4 h-4 ${doc.starred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Download"
                  >
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(doc.id)}
                    className="p-1 hover:bg-red-100 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredDocuments.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by creating your first document.'}
            </p>
            <button
              onClick={handleNewDocument}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
            >
              Create Document
            </button>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedDocuments.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 flex items-center space-x-4 animate-slide-up">
          <span className="text-sm font-medium text-gray-700">
            {selectedDocuments.length} document{selectedDocuments.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex space-x-2">
            <button 
              onClick={handleBulkDelete}
              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <button 
            onClick={() => setSelectedDocuments([])}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Document</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this document? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteDocument(showDeleteConfirm)}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;