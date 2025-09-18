import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PDFViewer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ pdfUrl, title = "PDF Document" }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    setError('Failed to load PDF document');
    setLoading(false);
    console.error('PDF load error:', error);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  return (
    <div className="pdf-viewer-container">
      <div className="pdf-header">
        <h3>{title}</h3>
        <div className="pdf-controls">
          <button onClick={zoomOut} disabled={scale <= 0.5}>-</button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} disabled={scale >= 3.0}>+</button>
          <button onClick={resetZoom}>Reset</button>
        </div>
      </div>

      <div className="pdf-navigation">
        <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
          ← Previous
        </button>
        <span>Page {pageNumber} of {numPages}</span>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
          Next →
        </button>
      </div>

      <div className="pdf-content">
        {loading && <div className="pdf-loading">Loading PDF...</div>}
        {error && <div className="pdf-error">{error}</div>}
        
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={<div className="pdf-loading">Loading PDF...</div>}
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale}
            className="pdf-page"
          />
        </Document>
      </div>

      <div className="pdf-footer">
        <a href={pdfUrl} download className="download-btn">
          📥 Download PDF
        </a>
      </div>
    </div>
  );
};

export default PDFViewer;
