import React from 'react';
import OriginalDocPage from '@theme-original/DocPage';
import { useDoc } from '@docusaurus/theme-common/internal';

export default function DocPage(props) {
  const { frontMatter } = useDoc();
  const { showTitle } = frontMatter;

  return (
    <div className={showTitle === false ? 'doc-no-title' : ''}>
      <style>
        {showTitle === false ?
          `.markdown h1:first-of-type { display: none !important; }`
          : ''}
      </style>
      <OriginalDocPage {...props} />
    </div>
  );
}