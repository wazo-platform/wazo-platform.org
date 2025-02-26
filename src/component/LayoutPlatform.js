import Helmet from 'react-helmet';
import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import Search from './platform/search';
import LogoHoriz from '../assets/logo.horiz.svg';

import '../styles/platform/pretty-docs.scss';
import '../styles/platform/documentation.scss';
import '../styles/platform/styles.scss';

const Page = ({ children, section, className, pageTitle, pageTitleDate, PageTitleComponent = 'h1' }) => {
  const [searchEnabled, setSearchEnabled] = useState(false);

  const scrollToAnchor = (hash) => {
    if (!hash) {
      return;
    }
    const anchorName = hash.replace('#', '');
    setTimeout(function () {
      const element = document.querySelector(`a[name="${anchorName}"]`);
      if (element === null) {
        return;
      }
      const elementPosition = element.offsetTop;
      const headerHeight = document.querySelector('#header').offsetHeight;
      window.scrollTo(0, elementPosition - headerHeight - 15);
    }, 1);
  };

  useEffect(() => {
    if (typeof window === 'object') {
      scrollToAnchor(window.location.hash);
    }
  });

  const bodyAttributes = { class: section };
  const headTitle = [pageTitle, 'Wazo Platform'].filter((value) => Boolean(value)).join(' - ');

  const navigationClasses = ['main-nav', 'navbar-expand-md'];
  if (searchEnabled) {
    navigationClasses.push('main-nav-search-enabled');
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const newStateSearchEnabled = !searchEnabled;
    setSearchEnabled(newStateSearchEnabled);

    if (newStateSearchEnabled) {
      document.querySelector('input.form-control.search-input').focus();
    }
  };

  return (
    <div className="main">
      <Helmet bodyAttributes={bodyAttributes}>
        <title>{headTitle.replace(/<\/?[^>]+(>|$)/g, '')}</title>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <meta property="og:image" content="https://wazo-platform.org/images/og-image.jpg" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
      </Helmet>

      <header id="header" className="header">
        <div className="container">
          <Link to="/">
            <img src={LogoHoriz} alt="Wazo Platform" id="wazo-platform-nav" />
          </Link>
          <nav id="main-nav" className={navigationClasses.join(' ')} role="navigation">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>

            <div className="navbar-collapse collapse" id="navbar-collapse">
              <ul className="nav navbar-nav">
                <li className="nav-item sr-only">
                  <a className="nav-link scrollto" href="/#promo">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/documentation" activeClassName="active" partiallyActive>
                    API
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/use-cases" activeClassName="active">
                    Use Cases
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/blog" activeClassName="active" partiallyActive>
                    Blog
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tutorials" activeClassName="active" partiallyActive>
                    Tutorials
                  </Link>
                </li>                <li className="nav-item">
                  <Link className="nav-link" to="/contribute" activeClassName="active" partiallyActive>
                    Contribute
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/ecosystem" activeClassName="active" partiallyActive>
                    Ecosystem
                  </Link>
                </li>
                <li className="nav-item nav-item-search last">
                  <Search />
                  <a className="nav-link" href="#search" title="Search" onClick={handleSearch}>
                    {searchEnabled ? <i className="far fa-times-circle"></i> : <i className="fas fa-search"></i>}
                    &nbsp;Search
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <div className={`page-wrapper ${className}`}>
        {pageTitle && (
          <div className="page-title">
            <div className="container">
              <PageTitleComponent dangerouslySetInnerHTML={{ __html: pageTitle }} />
              {pageTitleDate && <p className="page-title-date">{pageTitleDate}</p>}
            </div>
          </div>
        )}
        {children}
      </div>

      <footer className="footer">
        <section id="contact" className="contact section has-pattern">
          <div className="container">
            <div className="col-wrapper one">
              <div className="coll">
                <h2>Community Supported</h2>
                <p>
                  Wazo Platform is supported by its community. Use our various channels to reach out.
                </p>

                <ul>
                  <li>
                    <a href="https://mm.wazo.community/wazo-platform/">Mattermost</a>
                  </li>
                  <li>
                    <a href="https://wazo-platform.discourse.group">Forum</a>
                  </li>
                  <li>
                    <a href="https://wazo-dev.atlassian.net/">Bug tracking (JIRA)</a>
                  </li>
                </ul>
              </div>
              <div className="coll">
                <div>
                  <h2>Publications</h2>
                  <p>
                    Video @ Kamailio World: <a href="https://youtu.be/d1hOR27r4uY?t=2642">Dangerous Demos</a>
                  </p>
                  <p>
                    Video @ the Telecom Application Development Summit:{' '}
                    <a href="https://youtu.be/JxKlxPDDnsk">What can you do with Wazo?</a>
                  </p>
                  <p>
                    Video @ the Telecom Application Development Summit:{' '}
                    <a href="https://youtu.be/vh43Vt40myY">WAZO Keynote: xCPaaS</a>
                  </p>
                </div>

                <h2>Get Connected, Contribute & Build value!</h2>
                <ul className="social-icons list-inline">
                  <li className="list-inline-item">
                    <a href="https://x.com/wazocommunity" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://github.com/wazo-platform" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="small-print">
          <div className="container">
            <small className="copyright">
              Designed with <i className="fas fa-heart" /> by Xiaoying Riley for developers
            </small>

            <small className="copyright">
              Copyright 2016-2023 The Wazo Authors  (see the AUTHORS file)
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page
