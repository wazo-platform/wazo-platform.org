import React from 'react';
// import Helmet from 'react-helmet';
import { Link } from 'gatsby';

// duplicated from ../Layout
import '../../styles/bootstrap.css';
import '../../styles/fontawesome.css';
import '../../styles/prism.css';
import '../../styles/devaid.scss';
import '../../styles/main-styles.scss';

import '../../styles/elegant-font.css';
import '../../styles/pretty-docs.scss';
import '../../styles/documentation-styles.scss';
import Search from './search';

export const HomeHeader = () => (
  <div className="doc-main-header text-center">
    <div className="container">
      <h2>Wazo Platform Documentation</h2>
      <div className="subtitle">Created with <i className="fas fa-heart"></i> for developers</div>
    </div>
    <Search />
  </div>
);

export const Breadcrumbs = ({ breadcrumbs }) => {
  if (!breadcrumbs.length) {
    return <li className="breadcrumb-item active">Quick Start</li>;
  }

  return (
    <>
      {breadcrumbs.map(breadcrumb => (
        <li className={`breadcrumb-item ${breadcrumb.active ? 'active' : ''}`}>
          {breadcrumb.link ? <Link to={breadcrumb.link}>{breadcrumb.label}</Link> : breadcrumb.label}
        </li>
      ))}
    </>
  );
};

export const PageHeader = ({ breadcrumbs }) => (
  <div className="doc-main-header">
    <div className="container">
      <h2>Wazo Platform Documentation</h2>

      {/* <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </ol>

      <div className="top-search-box">
        <Search />
      </div> */}
    </div>
  </div>
);
/* 
export default ({ children, className, isHome, breadcrumbs = [] }) => (
  <div className={`page-wrapper ${className}`}>
    <Helmet bodyAttributes={{ class: 'documentation' }}>
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800"
        rel="stylesheet"
        type="text/css"
      />
      <script src="https://code.jquery.com/jquery-3.3.1.min.js" />
    </Helmet>

    {isHome ? <HomeHeader /> : <PageHeader breadcrumbs={breadcrumbs} />}

    {children}

    <footer className="footer text-center">
      <div className="container">
        <small className="copyright">
          Designed with <i className="fas fa-heart" /> by{' '}
          <a href="https://themes.3rdwavemedia.com/" target="_blank" rel="noopener noreferrer">
            Xiaoying Riley
          </a>{' '}
          for developers
        </small>
      </div>
    </footer>
  </div>
); */
