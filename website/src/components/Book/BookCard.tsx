import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './BookCard.module.css';

type BookCardProps = {
  id: number;
  title: string;
  description: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
  onClick?: () => void;
};

export default function BookCard({
  id,
  title,
  description,
  image = '/img/book-default.jpg',
  featured = false,
  tags = [],
  onClick,
}: BookCardProps): ReactNode {
  const { isDarkMode } = useTheme();

  return (
    <div 
      className={clsx(
        styles.bookCard, 
        featured && styles.featured,
        isDarkMode ? styles.darkMode : styles.lightMode
      )}
      onClick={onClick}
    >
      <div className={styles.bookImage}>
        <img 
          src={image} 
          alt={title} 
          width={300}
          height={200}
        />
      </div>
      <div className={styles.bookContent}>
        <h3 className={styles.bookTitle}>{title}</h3>
        <p className={styles.bookDescription}>{description}</p>
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
        <div className={styles.buttonContainer}>
          <Link to={`/docs/book-${id}`} className="button button--primary">
            Explore Book
          </Link>
        </div>
      </div>
    </div>
  );
}