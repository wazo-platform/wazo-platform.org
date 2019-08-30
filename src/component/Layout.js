import Helmet from 'react-helmet';
import React from 'react';
import { Link } from 'gatsby';

import '../styles/bootstrap.css';
import '../styles/fontawesome.css';
import '../styles/prism.css';
import '../styles/devaid.scss';
import '../styles/main-styles.scss';

export default ({ children }) => (
  <div className="main">
    <Helmet>
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
        <h1 className="logo float-left">
          <a className="scrollto" href="#promo">
            <span className="logo-title">Wazo Platform</span>
          </a>
        </h1>
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
                <a className="nav-link scrollto" href="#promo">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link scrollto" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link scrollto" href="#features">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link scrollto" to="documentation">
                  Documentation
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link scrollto" href="#license">
                  License
                </a>
              </li>
              <li className="nav-item last">
                <a className="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>

    {children}

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
