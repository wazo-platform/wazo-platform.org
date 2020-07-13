import Helmet from 'react-helmet';
import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import Search from './platform/search';
import LogoHoriz from '../assets/logo.horiz.svg';

import '../styles/platform/pretty-docs.scss';
import '../styles/platform/documentation.scss';
import '../styles/platform/styles.scss';

export default ({ children, section, className, pageTitle, PageTitleComponent = 'h1', breadcrumbs = [] }) => {
  const [searchEnabled, setSearchEnabled] = useState(false);

  const scrollToAnchor = hash => {
    if (!hash) {
      return;
    }
    const anchorName = hash.replace('#', '');
    setTimeout(function() {
      const element = document.querySelector(`a[name="${anchorName}"]`);
      if (element === null) {
        return;
      }
      const elementPosition = element.offsetTop;
      const headerHeight = document.querySelector('#header').offsetHeight;
      window.scrollTo(0, elementPosition - headerHeight - 15);
    }, 1);
  }

  if (typeof window === 'object') {
    useEffect(() => {
      scrollToAnchor(window.location.hash);
    });
  }

  const bodyAttributes = { class: section };
  const now = new Date();
  const headTitle = [pageTitle, 'Wazo Platform'].filter(value => Boolean(value)).join(' - ');

  const navigationClasses = ['main-nav', 'navbar-expand-md'];
  if (searchEnabled) {
    navigationClasses.push('main-nav-search-enabled');
  }

  const handleSearch = e => {
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
        <title>{headTitle.replace(/<\/?[^>]+(>|$)/g, "")}</title>
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
                  <Link className="nav-link" to="/contribute" activeClassName="active" partiallyActive>
                    Contribute
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/blog" activeClassName="active" partiallyActive>
                    Blog
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="ecosystem" activeClassName="active" partiallyActive>
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
              <PageTitleComponent dangerouslySetInnerHTML={{ __html: pageTitle }}/>
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
                <h2>Support</h2>
                <p>
                  The Wazo Platform project is supported by its community. Use the various channels below to reach out
                  to us.
                </p>
              </div>
              <div className="coll">
                <div>
                  <h2>Recent publications</h2>
                  <p>
                    Video @ Kamailio World 2019: <a href="https://youtu.be/d1hOR27r4uY?t=2642">Dangerous Demos</a>
                  </p>
                  <p>
                    Video @ the Telecom Application Development Summit 2018:{' '}
                    <a href="https://youtu.be/JxKlxPDDnsk">What can you do with Wazo?</a>
                  </p>
                  <p>
                    Video @ the Telecom Application Development Summit 2017:{' '}
                    <a href="https://youtu.be/vh43Vt40myY">WAZO Keynote: xCPaaS</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-wrapper">
              <div className="coll">
                <h2>Contact</h2>
                <ul>
                  <li>
                    <a href="https://wazo-platform.discourse.group">Forum</a>
                  </li>
                  <li>
                    <a href="https://wazo-dev.atlassian.net/">Bug tracking</a>
                  </li>
                  <li>
                    <a href="https://mm.wazo.community/wazo-platform/">Mattermost</a>
                  </li>
                  <li>
                    <a href="https://kiwiirc.com/nextclient/irc.freenode.net/?#wazo">IRC: #wazo on irc.freenode.net</a>
                  </li>
                </ul>
              </div>
              <div className="coll">
                <h2>Get Connected! Contribute! Build value!</h2>
                <ul className="social-icons list-inline">
                  <li className="list-inline-item">
                    <a href="https://twitter.com/wazocommunity" target="_blank" rel="noopener noreferrer">
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
              Designed with <i className="fas fa-heart" /> by{' '}
              <a href="https://themes.3rdwavemedia.com" target="_blank" rel="noopener noreferrer">
                Xiaoying Riley
              </a>{' '}
              for developers
            </small>

            <small className="copyright">
              Copyright &copy; 2016-{now.getFullYear()} <a href="https://wazo.io">Wazo Communication</a>
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
};
