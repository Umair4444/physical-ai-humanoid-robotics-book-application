import type { ReactNode } from 'react';
import clsx from 'clsx';
import BookCard from './BookCard';
import styles from './BookList.module.css';

type Book = {
  id: number;
  title: string;
  description: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
};

type BookListProps = {
  books: Book[];
  columns?: number;
};

export default function BookList({ 
  books, 
  columns = 3 
}: BookListProps): ReactNode {
  return (
    <div className={styles.bookList}>
      <div className={clsx(styles.bookGrid, styles[`columns-${columns}`])}>
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            description={book.description}
            image={book.image}
            featured={book.featured}
            tags={book.tags}
          />
        ))}
      </div>
    </div>
  );
}