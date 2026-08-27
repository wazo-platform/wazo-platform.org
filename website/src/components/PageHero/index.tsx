import type { ReactNode } from 'react';

import './styles.css';

type Props = {
  title: string;
  description?: string;
  children?: ReactNode;
};

// Shared page header: light green band with the page title and an optional
// description, used across the site's pages.
const PageHero = ({ title, description, children }: Props) => (
  <header className="page-hero">
    <div className="container page-hero__inner">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      {children}
    </div>
  </header>
);

export default PageHero;
