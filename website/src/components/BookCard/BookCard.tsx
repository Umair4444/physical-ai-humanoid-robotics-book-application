import React from 'react';
import { useTheme } from '@site/src/contexts/ThemeContext';
import Link from '@docusaurus/Link';

interface Book {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  rating: number;
  price: number;
  href: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { isDarkMode } = useTheme();

  // Helper function to render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ★½
        </span>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span
          key={`empty-${i}`}
          className={isDarkMode ? 'text-gray-600' : 'text-gray-300'}
        >
          ★
        </span>
      );
    }

    return <div className="flex">{stars}</div>;
  };

  return (
    <>
      <Link href={book.href}>
        <div
          className={`rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 flex flex-col h-full ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="h-48 overflow-hidden">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex-grow flex flex-col">
            <h3
              className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              {book.title}
            </h3>
            <p
              className={`mb-4 flex-grow ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {book.description}
            </p>
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  ${book.price.toFixed(2)}
                </div>
                <div className="flex items-center">
                  {renderStars(book.rating)}
                  <span
                    className={`ml-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {book.rating}
                  </span>
                </div>
              </div>
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors mt-auto">
              Learn More
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BookCard;
