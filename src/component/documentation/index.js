import React from 'react';
import Helmet from 'react-helmet';
import { Link as GatsbyLink} from 'gatsby';
import Search from './search';


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

export const Module = ({ moduleName, module }) => (
  <div className={`item item-blue col-lg-4 col-6`}>
    <div className="item-inner">
      <Link to={module.url || `/documentation/overview/${moduleName}.html`}>
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
              <Link to={`/documentation/overview/${moduleName}.html`}>
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
              <Link to={`/documentation/api/${moduleName}.html`} className="api-reference left">
                API Reference
              </Link>
            )}
            {module.redocUrl && (
              <Link to={`/documentation/console/${moduleName}`} className="api-reference left">
                Console (Swagger)
              </Link>
            )}

            <a href={`https://github.com/wazo-platform/${module.repository}`} className="right">
              <i className="fab fa-github" /> {module.repository}
            </a>
          </div>
        </>
      )}
    </div>
  </div>
);

export default ({ pageContext: { sections } }) => (
  <Layout section="documentation" className="landing-page" pageTitle="Documentation">
    <Helmet>
      <title>Wazo Platform - Documentation for developers</title>
    </Helmet>

    <Search />

    <section className="cards-section text-center">
      {sections.map(section => (
        <div key={section.name} id={section.slug} style={{paddingTop: 70}}>
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
