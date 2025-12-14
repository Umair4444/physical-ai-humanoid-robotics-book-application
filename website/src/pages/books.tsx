import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import BookList from '../components/Book/BookList';

// Define the Book type that matches the BookList component requirements
type Book = {
  id: number;
  title: string;
  description: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
  href?: string;
};

const BooksPage: React.FC = () => {
  // Static book data to match the homepage book structure
  const allBooks: Book[] = [
    {
      id: 1,
      title: 'Physical AI Humanoid Robotics',
      description: 'Learn the fundamentals of humanoid robotics',
      image: '/img/book1-cover.jpg',
      featured: true,
      tags: ['Physical AI', 'Robotics', 'Humanoid Robotics'],
      href: '/books/physical-ai-humanoid-robotics-book',
    },
    {
      id: 2,
      title: 'Humanoid Design Principles',
      description:
        'Deep dive into the design and engineering of humanoid robots',
      image: '/img/book2-cover.jpg',
      featured: true,
      tags: ['Humanoid Design', 'Engineering', 'Robotics'],
    },
    {
      id: 3,
      title: 'Neural Networks in Motion',
      description:
        'Explore how neural networks enable complex robotic movements',
      image: '/img/book3-cover.jpg',
      featured: true,
      tags: ['Neural Networks', 'Movement Control', 'AI'],
    },
    {
      id: 4,
      title: 'Ethics in AI Robotics',
      description:
        'Critical examination of ethical considerations in AI-powered robotics',
      image: '/img/book4-cover.jpg',
      featured: true,
      tags: ['Ethics', 'AI', 'Society'],
    },
    {
      id: 5,
      title: 'Physical Computing for Robotics',
      description:
        'Understanding sensors, actuators, and control systems in robotic applications',
      image: '/img/book-default.jpg',
      featured: false,
      tags: ['Physical Computing', 'Sensors', 'Actuators'],
    },
    {
      id: 6,
      title: 'Computer Vision in Robotics',
      description:
        'How robots perceive and interpret visual information from their environment',
      image: '/img/book-default.jpg',
      featured: false,
      tags: ['Computer Vision', 'Perception', 'AI'],
    },
    {
      id: 7,
      title: 'Robotics Simulation Environments',
      description:
        'Building and testing robotic systems in virtual environments',
      image: '/img/book-default.jpg',
      featured: false,
      tags: ['Simulation', 'Testing', 'Virtual Environments'],
    },
    {
      id: 8,
      title: 'Manipulation and Grasping',
      description:
        'Understanding how robots interact with and manipulate objects',
      image: '/img/book-default.jpg',
      featured: false,
      tags: ['Manipulation', 'Grasping', 'Interaction'],
    },
    {
      id: 9,
      title: 'Locomotion and Mobility',
      description:
        'Principles of robot movement and navigation in various terrains',
      image: '/img/book-default.jpg',
      featured: false,
      tags: ['Locomotion', 'Navigation', 'Mobility'],
    },
    {
      id: 10,
      title: 'Human-Robot Interaction',
      description:
        'Designing interfaces and behaviors for effective human-robot collaboration',
      image: '/img/book-default.jpg',
      featured: false,
      tags: ['Human-Robot Interaction', 'UX', 'Collaboration'],
    },
  ];

  const [selectedCategory, setSelectedCategory] =
    useState<string>('All Categories');
  const [showFeatured, setShowFeatured] = useState<boolean>(false);

  // Filter books based on selected category and featured status
  const filteredBooks = allBooks.filter(book => {
    const categoryMatch =
      selectedCategory === 'All Categories' ||
      (book.tags &&
        book.tags.some(tag =>
          tag
            .toLowerCase()
            .includes(selectedCategory.toLowerCase().replace(' ', ''))
        ));
    const featuredMatch = !showFeatured || book.featured;
    return categoryMatch && featuredMatch;
  });

  return (
    <MainLayout
      title="All Books - AI Robotics Textbook"
      description="Browse all available books on AI Robotics and Humanoid Design"
    >
      <main className="container mx-auto px-4">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            AI Robotics Textbook Library
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore our comprehensive collection of books covering all aspects
            of artificial intelligence in robotics
          </p>
        </section>

        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold">All Books</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <select
                className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 w-full sm:w-auto"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                <option>All Categories</option>
                <option>AI Fundamentals</option>
                <option>Humanoid Design</option>
                <option>Neural Networks</option>
                <option>Ethics</option>
                <option>Computer Vision</option>
                <option>Human-Robot Interaction</option>
              </select>
              <button
                className={`border rounded-lg px-4 py-2 w-full sm:w-auto ${
                  showFeatured
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setShowFeatured(!showFeatured)}
              >
                Featured
              </button>
            </div>
          </div>

          <BookList books={filteredBooks} columns={3} />
        </section>
      </main>
    </MainLayout>
  );
};

export default BooksPage;
