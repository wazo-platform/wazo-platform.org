import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import Layout from './layout';

export const Module = ({ moduleName, module }) => (
  <div className={`item item-red col-lg-4 col-6`}>
    <div className="item-inner">
      <Link to={module.url || `/overview/${moduleName}.html`}>
        <div className="icon-holder">
          <i className={`icon ${module.icon}`} />
        </div>
        <h3 className="title">{module.title}</h3>
      </Link>

      <p className="intro">{module.description}</p>
      {!module.url && (
        <>
          <ul className="links clearfix">
            <li>
              <Link to={`/overview/${moduleName}.html`}>
                <i className="fas fa-home" /> Overview
              </Link>
            </li>
            <li>
              <i className="fas fa-book" /> Guides
            </li>
            <li>
              <i className="fas fa-code" /> Code snippets
            </li>
            <li>
              <i className="fas fa-road" /> Tutorials
            </li>
          </ul>

          <div className="bottom-links clearfix">
            {module.redocUrl && (
              <Link to={`/api/${moduleName}.html`} className="api-reference left">
                API Reference
              </Link>
            )}

            <a href={`https://github.com/wazo-pbx/${module.repository}`} className="right">
              <i className="fab fa-github" /> {module.repository}
            </a>
          </div>
        </>
      )}
    </div>
  </div>
);

export default ({ pageContext: { sections } }) => (
  <Layout isHome>
    <Helmet bodyAttributes={{ class: 'landing-page' }}>
      <title>Wazo project documentation for developers</title>
    </Helmet>
    <section className="cards-section text-center">
      {sections.map(section => (
        <div key={section.name}>
          <h3>{section.name}</h3>
          <div className="container">
            <div className="cards-wrapper row">
              {Object.keys(section.modules).map(moduleName => (
                <Module key={moduleName} moduleName={moduleName} module={section.modules[moduleName]} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  </Layout>
);
