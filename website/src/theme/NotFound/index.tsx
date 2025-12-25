import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { Button } from '../../components/Button/Button';
import styles from './NotFound.module.css';

export default function NotFound() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="Page Not Found"
      description="The requested page could not be found"
    >
      <main className={styles.notFoundContainer}>
        <div className="max-w-2xl w-full text-center pt-14">
          <h1 className={styles.notFoundTitle}>404</h1>
          <h2 className={styles.notFoundSubtitle}>Page Not Found</h2>
          <p className={styles.notFoundText}>
            We couldn't find the page you're looking for. It might have been
            moved or removed.
          </p>

          <div className={styles.buttonGroup}>
            <Link to="/">
              <Button variant="primary">Go to Homepage</Button>
            </Link>
            <Link to="/books">
              <Button variant="outline">Browse Books</Button>
            </Link>
          </div>

          <div className={styles.supportText}>
            <p>
              Need help?{' '}
              <Link to="/contact" className={styles.supportLink}>
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
