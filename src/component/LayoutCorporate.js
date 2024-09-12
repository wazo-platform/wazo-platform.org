import React from 'react';
import Helmet from 'react-helmet';

import { Link } from 'gatsby';
import Search from './corporate/search';

const WazoHeader = () => {
  return (
    <>
      <div className="wazo-header">
        <div className="container">
          <div className="site-logo">
            <a href="/" title="Wazo" rel="home">
              <img
                className="header-image"
                alt="Wazo"
                src="/images/logo-wazo.svg"
                title="Wazo"
              />
            </a>
          </div>

          <nav
            id="site-navigation"
            className="has-sticky-branding main-navigation stuckElement"
            itemType="https://schema.org/SiteNavigationElement"
          >
            <div className="inside-navigation grid-container grid-parent">
              <div id="primary-menu" className="main-nav">
                <ul id="menu-nav_light" className=" menu sf-menu">
                  <li>
                    <a target="_blank" rel="noreferrer" href="https://developers.wazo.io">Developers Docs</a>
                  </li>
                  <li>
                    <a target="_blank" rel="noreferrer" href="https://wazo.io/">Corporate Site</a>
                  </li>
                  <li>
                    <a target="_blank" rel="noreferrer" href="https://support.wazo.io/hc/en-us">Support</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

const Header = ({ children }) => (
  <header className="header">
    <WazoHeader />

    <div className='sub'>
      { children }
    </div>
  </header>
)

const HomeHeader = () => (
  <Header>
    <div className="container text-center">
      <div className="branding">
        <h1 className="logo">
          <span className="text-bold">API References</span>
        </h1>
      </div>
      <div className="tagline">
        <p>A rich library of 450+ APIs & SDKs</p>
      </div>

      <Search />
    </div>
  </Header>
);

const PageHeader = () => (
  <header className="header">
    <WazoHeader />

    <div className="sub">
      <div className="container">
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
    </div>
  </header>
);

const Page = ({children, isHome}) => {
  const now = new Date();
  return (
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
          Designed with <i className="fas fa-heart" /> by Xiaoying Riley for developers
        </small>

        <div>
          <small className="copyright">
            Copyright &copy; 2016-{ now.getFullYear() } <a href="https://wazo.io">Wazo Communication Inc</a>
          </small>
        </div>
      </div>
    </footer>
  </div>
  );
};

export default Page
