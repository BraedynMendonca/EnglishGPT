import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Document {
  id: string;
  name: string;
  content: string;
  type: 'document' | 'analysis' | 'exercise';
  size: string;
  modified: string;
  score?: number;
  starred: boolean;
  folder?: string;
  createdAt: string;
}

interface DocumentContextType {
  documents: Document[];
  currentDocument: Document | null;
  createDocument: (name: string, content?: string) => Document;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  setCurrentDocument: (doc: Document | null) => void;
  toggleStar: (id: string) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);

  useEffect(() => {
    // Load documents from localStorage
    const savedDocs = localStorage.getItem('englishgpt_documents');
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    } else {
      // Initialize with sample documents
      const sampleDocs: Document[] = [
        {
          id: '1',
          name: 'Business Proposal Draft',
          content: 'Dear Team,\n\nI hope this email finds you well...',
          type: 'document',
          size: '2.3 KB',
          modified: '2 hours ago',
          score: 87,
          starred: true,
          folder: 'Work',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          name: 'Essay Analysis Report',
          content: 'Analysis results for your recent essay...',
          type: 'analysis',
          size: '1.8 KB',
          modified: '1 day ago',
          score: 92,
          starred: false,
          folder: 'School',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      setDocuments(sampleDocs);
      localStorage.setItem('englishgpt_documents', JSON.stringify(sampleDocs));
    }
  }, []);

  const saveDocuments = (docs: Document[]) => {
    setDocuments(docs);
    localStorage.setItem('englishgpt_documents', JSON.stringify(docs));
  };

  const createDocument = (name: string, content: string = '') => {
    const newDoc: Document = {
      id: Date.now().toString(),
      name,
      content,
      type: 'document',
      size: `${(content.length / 1024).toFixed(1)} KB`,
      modified: 'Just now',
      starred: false,
      createdAt: new Date().toISOString()
    };
    
    const updatedDocs = [newDoc, ...documents];
    saveDocuments(updatedDocs);
    return newDoc;
  };

  const updateDocument = (id: string, updates: Partial<Document>) => {
    const updatedDocs = documents.map(doc => 
      doc.id === id 
        ? { 
            ...doc, 
            ...updates, 
            modified: 'Just now',
            size: updates.content ? `${(updates.content.length / 1024).toFixed(1)} KB` : doc.size
          }
        : doc
    );
    saveDocuments(updatedDocs);
    
    if (currentDocument?.id === id) {
      setCurrentDocument({ ...currentDocument, ...updates });
    }
  };

  const deleteDocument = (id: string) => {
    const updatedDocs = documents.filter(doc => doc.id !== id);
    saveDocuments(updatedDocs);
    
    if (currentDocument?.id === id) {
      setCurrentDocument(null);
    }
  };

  const toggleStar = (id: string) => {
    const updatedDocs = documents.map(doc => 
      doc.id === id ? { ...doc, starred: !doc.starred } : doc
    );
    saveDocuments(updatedDocs);
  };

  const value = {
    documents,
    currentDocument,
    createDocument,
    updateDocument,
    deleteDocument,
    setCurrentDocument,
    toggleStar
  };

  return <DocumentContext.Provider value={value}>{children}</DocumentContext.Provider>;
};