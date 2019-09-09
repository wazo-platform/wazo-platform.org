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

import '../styles/main-styles.scss';

export default ({ children, isDoc, isDocHome, isHome, className, pageTitle, breadcrumbs = []}) => {
  const bodyAttributes = {};
  if (isHome) {
    bodyAttributes.class = 'home';
  }
  if (isDoc) {
    bodyAttributes.class = 'documentation';
  }
  return (
    <div className="main">
      <Helmet bodyAttributes={bodyAttributes}>
        <title>Wazo Platform</title>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800"
          rel="stylesheet"
          type="text/css"
        />
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js" />
        <script type="text/javascript" src="/prism.js" />
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script
          type="text/javascript"
          src="//cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/2.1.2/jquery.scrollTo.min.js"
        />
        <script type="text/javascript" src="/main.js" defer />
      </Helmet>

      <header id="header" className="header">
        <div className="container">
          <Link to="/"><img src={LogoHoriz} alt="Wazo Platform" id="wazo-platform-nav" /></Link>
          <nav id="main-nav" className="main-nav navbar-expand-md" role="navigation">
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
                  <Link className="nav-link" to="/documentation" activeClassName="active">
                    Documentation
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/install" activeClassName="active">
                    Install
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contribute" activeClassName="active">
                    Contribute
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

      <div className={`page-wrapper ${className}`}>

        {pageTitle && 
          <div className="page-title">
            <div className="container">
              <h1>
                {pageTitle}
              </h1>
            </div>
          </div>
        }

        {children}
      </div>

      <footer className="footer">
          <section id="contact" className="contact section has-pattern">
          <div className="container">
          <div className="col-wrapper one">
            <div className="coll">
              <h2>Support</h2>
              <p>
                The Wazo Platform project is supported by its community. Use the various channels bellow to reach out to us.
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
                <li><a href="https://projects.wazo.community/projects/1/boards">Forum</a></li>
                <li><a href="https://wazo-dev.atlassian.net/">Bug tracking</a></li>
                <li><a href="mailto:contact@wazo.community">E-Mail</a></li>
                <li><a href="https://mm.wazo.community/wazo-platform/">Mattermost</a></li>
                <li>IRC: #wazo on irc.freenode.net</li>
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
              Copyright &copy; 2019 <a href="https://wazo.io">Wazo</a>
            </small>

          </div>
        </div>
      </footer>
    </div>
  );
}
