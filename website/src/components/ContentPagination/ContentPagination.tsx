import React, { useState, useEffect } from 'react';
import { useTheme } from '@site/src/contexts/ThemeContext';

interface ContentPaginationProps {
  content: string; // The full content of the chapter
  itemsPerPage?: number; // Number of items per page (default 1000 characters)
  onPageChange?: (currentPage: number, totalPages: number) => void;
}

const ContentPagination: React.FC<ContentPaginationProps> = ({
  content,
  itemsPerPage = 1000,
  onPageChange
}) => {
  const { isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedContent, setPaginatedContent] = useState<string[]>([]);

  // Split content into pages
  useEffect(() => {
    if (!content) return;

    const pages = [];
    for (let i = 0; i < content.length; i += itemsPerPage) {
      pages.push(content.substr(i, itemsPerPage));
    }
    setPaginatedContent(pages);
    
    // Reset to first page when content changes
    setCurrentPage(1);
  }, [content, itemsPerPage]);

  // Handle page change
  const goToPage = (page: number) => {
    if (page < 1 || page > paginatedContent.length) return;
    
    setCurrentPage(page);
    if (onPageChange) {
      onPageChange(page, paginatedContent.length);
    }
  };

  // Handle next page
  const nextPage = () => {
    if (currentPage < paginatedContent.length) {
      goToPage(currentPage + 1);
    }
  };

  // Handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  if (paginatedContent.length <= 1) {
    // If content fits on one page, just return the full content
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return (
    <div className="flex flex-col">
      {/* Current page content */}
      <div 
        className={`p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        dangerouslySetInnerHTML={{ __html: paginatedContent[currentPage - 1] || '' }}
      />
      
      {/* Pagination controls */}
      <div className={`flex items-center justify-between px-4 py-3 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : `${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`
          }`}
        >
          Previous
        </button>
        
        <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Page {currentPage} of {paginatedContent.length}
        </div>
        
        <button
          onClick={nextPage}
          disabled={currentPage === paginatedContent.length}
          className={`px-4 py-2 rounded ${
            currentPage === paginatedContent.length
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : `${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContentPagination;