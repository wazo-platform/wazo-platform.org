import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { ThemeClassNames } from '@docusaurus/theme-common';
import PageHero from '@site/src/components/PageHero';
import MDXContent from '@theme/MDXContent';
import clsx from 'clsx';
import type { ReactNode } from 'react';

// Swizzled from @docusaurus/theme-classic 3.6: replaces the plain <h1> header
// of docs pages with the site-wide PageHero (title + front-matter description).
// Docs with an inline `# title` in their markdown keep it and get no hero.
const useSyntheticTitle = (): string | null => {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
};

const DocItemContent = ({ children }: { children: ReactNode }) => {
  const { frontMatter } = useDoc();
  const syntheticTitle = useSyntheticTitle();

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <PageHero
          title={syntheticTitle}
          description={frontMatter.description}
        />
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
};

export default DocItemContent;
