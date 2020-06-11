import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import Layout from '../Layout';

const ExternalOrInternalLink = ({ children, to, activeClassName, partiallyActive, ...other }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to);
  // Use Link for internal links, and <a> for others
  if (internal) {
    return (
      <Link to={to} activeClassName={activeClassName} partiallyActive={partiallyActive} {...other}>
        {children}
      </Link>
    );
  }
  return (
    <a href={to} {...other}>
      {children}
    </a>
  );
};

export const Module = ({ moduleName, module }) => (
  <div id={moduleName} className={`item item-red col-lg-4 col-6`}>
    <div className="item-inner">
      <ExternalOrInternalLink
        to={module.overview === false ? `#${moduleName}` : module.url || `/documentation/overview/${moduleName}.html`}
      >
        <div className="icon-holder">
          <i className={`icon ${module.icon}`} />
        </div>
        <h3 className="title">{module.title}</h3>
      </ExternalOrInternalLink>

      <p className="intro">{module.description}</p>
      {!module.url && (
        <div className="list-group">
          {module.overview !== false && (
            <Link to={`/documentation/overview/${moduleName}.html`} className="list-group-item">
              Overview
            </Link>
          )}

          {module.redocUrl && (
            <Link to={`/documentation/api/${moduleName}.html`} className="list-group-item">
              API Reference
            </Link>
          )}
          {module.redocUrl && (
            <Link to={`/documentation/console/${moduleName}`} className="list-group-item">
              API Console
            </Link>
          )}

          {module.repositoryLink !== false && (
            <a href={`https://github.com/wazo-platform/${module.repository}`} className="list-group-item">
              <i className="fab fa-github" /> {module.repository}
            </a>
          )}
        </div>
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
      {sections.map((section) => (
        <div key={section.name}>
          <h3>{section.name}</h3>
          <div className="container">
            <div className="cards-wrapper row">
              {Object.keys(section.modules).map((moduleName) => (
                <Module key={moduleName} moduleName={moduleName} module={section.modules[moduleName]} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  </Layout>
);
