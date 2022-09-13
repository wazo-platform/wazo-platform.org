import React from 'react';
import Helmet from 'react-helmet';
import { Link as GatsbyLink } from 'gatsby';

import Search from '../corporate/search';
import { corporate } from '../../../config-wazo';
import Layout from '../Layout';

const Link = ({ children, to, activeClassName, partiallyActive, ...other }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to)
  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </GatsbyLink>
    )
  }
  return (
    <a href={to} {...other}>
      {children}
    </a>
  )
}

const Module = ({ moduleName, module }) => (
  <div id={moduleName} className={`item item-blue col-lg-4 col-6`}>
    <div className="item-inner">
      <Link to={module.overview === false ? `#${moduleName}` : module.url || `/documentation/overview/${moduleName}.html`}>
        <div className="icon-holder">
          <i className={`icon ${module.icon}`} />
        </div>
        <h3 className="title">
          {module.title}
          {module.beta && <span className="badge badge-secondary">BETA</span>}
        </h3>
      </Link>

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

          {module.redocUrl && (
            <Link to={`/documentation/events/${moduleName}`} className="list-group-item">
              API Events
            </Link>
          )}

          {module.graphql && (
            <Link to={`/documentation/graphql/${moduleName}`} className="list-group-item">
              GraphQL
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

const Page = ({ pageContext: { sections } }) => (
  <Layout section="documentation" className="landing-page" pageTitle="Documentation">
    <Helmet>
      <title>Wazo Platform - Documentation for developers</title>
    </Helmet>

    {/* Add search here, only if on corporate site */}
    {corporate && <Search />}

    <section className="cards-section text-center">
      {sections.map(section => (
        <div key={section.name} id={section.slug} style={{ paddingTop: 70 }}>
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

export default Page
