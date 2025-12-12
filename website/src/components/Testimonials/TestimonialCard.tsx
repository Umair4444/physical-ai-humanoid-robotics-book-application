import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './TestimonialCard.module.css';

type TestimonialCardProps = {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
};

export default function TestimonialCard({
  name,
  role,
  content,
  rating,
  avatar = '/img/avatar-default.png',
}: TestimonialCardProps): ReactNode {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.stars}>
        {'★'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </div>
      <p className={styles.testimonialText}>"{content}"</p>
      <div className={styles.testimonialFooter}>
        <div className={styles.testimonialAuthor}>
          <strong>{name}</strong>
          <span>{role}</span>
        </div>
      </div>
    </div>
  );
}