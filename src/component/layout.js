import React from 'react';
import Helmet from 'react-helmet';

import '../styles/bootstrap.css';
import '../styles/fontawesome.css';
import '../styles/elegant-font.css';
import '../styles/pretty-docs.css';
import '../styles/styles.css';

const HomeHeader = () => (
  <header className="header text-center">
    <div className="container">
      <div className="branding">
        <h1 className="logo">
          <span aria-hidden="true" className="icon_documents_alt icon" />
          <span className="text-highlight">Wazo</span>
          <span className="text-bold">Docs</span>
        </h1>
      </div>
      <div className="tagline">
        <p>Developers Wazo documentation</p>
        <p>
          Created with <i className="fas fa-heart" /> for developers
        </p>
      </div>

      <div className="main-search-box pt-3 pb-4 d-inline-block">
        <form
          className="form-inline search-form justify-content-center"
          action=""
          method="get"
        >
          <input
            type="text"
            placeholder="Enter search terms..."
            name="search"
            className="form-control search-input"
            disabled
          />
          <button type="submit" className="btn search-btn" value="Search">
            <i className="fas fa-search" />
          </button>
        </form>
      </div>
    </div>
  </header>
);

const PageHeader = () => (
  <header id="header" className="header">
    <div className="container">
      <div className="branding">
        <h1 className="logo">
          <a href="/">
            <span aria-hidden="true" className="icon_documents_alt icon" />
            <span className="text-highlight">Wazo</span>
            <span className="text-bold">Documentation</span>
          </a>
        </h1>
      </div>

      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">Home</a>
        </li>
        <li className="breadcrumb-item active">Quick Start</li>
      </ol>

      <div className="top-search-box">
        <form
          className="form-inline search-form justify-content-center"
          action=""
          method="get"
        >
          <input
            type="text"
            disabled
            placeholder="Search..."
            name="search"
            className="form-control search-input"
          />
          <button type="submit" className="btn search-btn" value="Search">
            <svg
              className="svg-inline--fa fa-search fa-w-16"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="search"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              data-fa-i2svg=""
            >
              <path
                fill="currentColor"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </header>
);

export default ({ children, isHome }) => (
  <div className="page-wrapper">
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800"
        rel="stylesheet"
        type="text/css"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
      />
      <script src="https://code.jquery.com/jquery-3.3.1.min.js" />
    </Helmet>

    {isHome ? <HomeHeader /> : <PageHeader />}

    {children}

    <footer className="footer text-center">
      <div className="container">
        <small className="copyright">
          Designed with <i className="fas fa-heart" /> by{' '}
          <a
            href="https://themes.3rdwavemedia.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Xiaoying Riley
          </a>{' '}
          for developers
        </small>
      </div>
    </footer>
  </div>
);
