import Helmet from 'react-helmet';
import React from 'react';
import { Link } from 'gatsby';
import LogoHoriz from '../assets/logo.horiz.svg';

import '../styles/bootstrap.css';
import '../styles/fontawesome.css';
import '../styles/prism.css';
import '../styles/devaid.scss';

import '../styles/elegant-font.css';
import '../styles/pretty-docs.scss';
import '../styles/documentation-styles.scss';

import { PageHeader as DocPageHeader, HomeHeader as DocHomeHeader } from './documentation/Layout';

import '../styles/main-styles.scss';

export default ({ children, isDoc, isDocHome, className, breadcrumbs = []}) => (
    <div className="main">
      <Helmet bodyAttributes={isDoc ? { class: 'documentation' } : {}}>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800"
          rel="stylesheet"
          type="text/css"
        />
        <script type="text/javascript" src="/prism.js" />
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js" />
        <script
          type="text/javascript"
          src="//cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/2.1.2/jquery.scrollTo.min.js"
        />
        <script type="text/javascript" src="/main.js" defer />
      </Helmet>

      <header id="header" className="header">
        <div className="container">
          <Link to="/"><img src={LogoHoriz} alt="Wazo Platform" id="wazo-platform-nav" /></Link>
          <nav id="main-nav" className="main-nav navbar-expand-md float-right" role="navigation">
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
                  <a className="nav-link scrollto" href="/#about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link scrollto" href="/#features">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/documentation" activeClassName="active">
                    Documentation
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link scrollto" href="/#license">
                    License
                  </a>
                </li>
                <li className="nav-item last">
                  <a className="nav-link scrollto" href="/#contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {isDoc && isDocHome && <DocHomeHeader />}
      {isDoc && !isDocHome && <DocPageHeader breadcrumbs={breadcrumbs} />}

      <div className={`page-wrapper ${className}`}>
        {children}
      </div>

      <footer className="footer">
        <div className="container text-center">
          <small className="copyright">
            Designed with <i className="fas fa-heart" /> by{' '}
            <a href="https://themes.3rdwavemedia.com" target="_blank" rel="noopener noreferrer">
              Xiaoying Riley
            </a>{' '}
            for developers
          </small>
        </div>
      </footer>
    </div>
  );
