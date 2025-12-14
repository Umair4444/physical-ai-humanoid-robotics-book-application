import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './BookList.module.css';
import BookCard from '../BookCard/BookCard'; // Use the BookCard from BookCard directory

type Book = {
  id: number;
  title: string;
  description: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
  href?: string;
};

type BookListProps = {
  books: Book[];
  columns?: number;
};

// Helper function to adapt our Book type to the BookCard expected type
const adaptBookToCardProps = (book: Book) => ({
  book: {
    id: `book-${book.id}`,
    title: book.title,
    description: book.description,
    coverImage: book.image || '/img/book-default.jpg',
    rating: 4.5, // Default rating for now
    price: 29.99, // Default price for now
    href: book.href || '/books',
  },
});

export default function BookList({
  books,
  columns = 3,
}: BookListProps): ReactNode {
  return (
    <div className={styles.bookList}>
      <div className={clsx(styles.bookGrid, styles[`columns-${columns}`])}>
        {books.map(book => {
          const adaptedProps = adaptBookToCardProps(book);
          return (
            <div key={book.id} className={styles.bookItem}>
              <BookCard {...adaptedProps} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
