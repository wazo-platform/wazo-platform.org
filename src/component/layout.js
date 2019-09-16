import React from 'react';
import Helmet from 'react-helmet';

import '../styles/bootstrap.css';
import '../styles/fontawesome.css';
import '../styles/elegant-font.css';
import '../styles/pretty-docs.css';
import '../styles/styles.css';
import { Link } from 'gatsby';
import Search from './search';

const WazoHeader = () => {
  return <>
    <div className="wazo-header container">
      <div className="site-logo">
        <a href="http://wazo.io" title="Wazo" rel="home">
          <img className="header-image" alt="Wazo" src="http://dev.digitalcreativelab.co/wazolight/wp-content/uploads/2019/09/wazo-logo-white-45pxh-1.png" title="Wazo" />
        </a>
      </div>
    
      <nav id="site-navigation" className="has-sticky-branding main-navigation stuckElement" itemtype="https://schema.org/SiteNavigationElement">
        <div className="inside-navigation grid-container grid-parent">
              
          <div id="primary-menu" className="main-nav">
            <ul id="menu-nav_light" className=" menu sf-menu">
                <li id="menu-item-1285" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1285"><a href="http://wazo.io/company/">Company</a></li>
                <li id="menu-item-1286" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1286"><a href="http://developers.wazo.io/">Developers</a></li>
                <li id="menu-item-1287" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1287"><a href="https://support.wazo.io/hc/en-us">Documentation</a></li>
                <li id="menu-item-1435" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1435"><a href="http://contact@wazo.community">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </>;
}

const HomeHeader = () => (
  <header className="header">
    <WazoHeader />
    <div className="container text-center" style={{ marginTop: 20 }}>
      <div className="branding">
        <h1 className="logo">
          <span className="text-bold">Welcome to Wazo Developers Center</span>
        </h1>
      </div>
      <div className="tagline">
        <p>
        A rich library of 450+ APIs & SDKs
        </p>
      </div>

      <Search />
    </div>
  </header>
);

const PageHeader = () => (
  <header className="header">
    <WazoHeader />
    <div className="container sub">
      <div>
        <div className="branding">
          <h1 className="logo">
            <Link to="/">
              <span className="text-bold">Documentation</span>
            </Link>
          </h1>
        </div>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Quick Start</li>
        </ol>
     </div>
    
    <Search />
    </div>
  </header>
);
      
export default ({children, isHome}) => (
  <div className="page-wrapper">
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800"
        rel="stylesheet"
        type="text/css"
      />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
      <script src="https://code.jquery.com/jquery-3.3.1.min.js" />
    </Helmet>

    {isHome ? <HomeHeader /> : <PageHeader />}

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

        <div>
          <small className="copyright">
            &copy; 2019 <a href="https://wazo.io">Wazo Communication</a>
          </small>
        </div>
      </div>
    </footer>
  </div>
);
