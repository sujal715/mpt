// Example: How to add PDF links to any component

import React from 'react';

const ExamplePDFUsage = () => {
  return (
    <div>
      {/* Simple PDF Download Link */}
      <a href="/pdfs/training-guide.pdf" download>
        Download Training Guide
      </a>

      {/* PDF Link that opens in new tab */}
      <a href="/pdfs/nutrition-plan.pdf" target="_blank" rel="noopener noreferrer">
        View Nutrition Plan
      </a>

      {/* PDF with custom styling */}
      <a 
        href="/pdfs/injury-prevention.pdf" 
        download 
        className="pdf-download-btn"
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          background: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}
      >
        📄 Download Injury Prevention Guide
      </a>
    </div>
  );
};

export default ExamplePDFUsage;
