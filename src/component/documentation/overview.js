import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import handleViewport from 'react-in-viewport';
import Helmet from 'react-helmet';

import Layout from '../Layout';

const flatten = (text, child) =>
  typeof child === 'string' ? text + child : React.Children.toArray(child.props.children).reduce(flatten, text);

const getMenuRenderers = currentMenus => ({
  heading: props => {
    const text = props.children.reduce(flatten, '');
    const slug = text.toLowerCase().replace(/\W/g, '-');
    const active = slug in currentMenus;

    if (props.level === 1) {
      return null;
    }

    if (props.level === 2) {
      return (
        <a className={`nav-link scrollto${active ? ' active' : ''}`} href={`#${slug}`}>
          {props.children}
        </a>
      );
    }

    return (
      <nav className="doc-sub-menu nav flex-column">
        <a className={`nav-link scrollto${active ? ' active' : ''}`} href={`#${slug}`}>
          {props.children}
        </a>
      </nav>
    );
  },
});

const Section = props => {
  return (
    <div className={props.inViewport ? 'in' : 'out'} ref={props.innerRef}>
      {props.children}
    </div>
  );
};
const ViewportSection = handleViewport(Section);

const getContentRenderers = (module, onEnter, onLeave) => ({
  heading: props => {
    const text = props.children.reduce(flatten, '');
    const slug = text.toLowerCase().replace(/\W/g, '-');

    if (props.level === 1) {
      return null;
    }

    if (props.level === 2) {
      return (
        <ViewportSection onEnterViewport={() => onEnter(slug)} onLeaveViewport={() => onLeave(slug)}>
          <section className="doc-section" id={slug}>
            <h2 className="section-title">{text}</h2>
            <div className="section-block" />
          </section>
        </ViewportSection>
      );
    }

    return (
      <ViewportSection onEnterViewport={() => onEnter(slug)} onLeaveViewport={() => onLeave(slug)}>
        <h3 className="block-title" id={slug}>
          {props.children}
        </h3>
      </ViewportSection>
    );
  },
  image: props => (
    <object
      type="image/svg+xml"
      data={`../../diagrams/${module.repository
        .split('-')
        .splice(1)
        .join('-')}-${props.src}`}
      aria-label={props.alt}
    />
  ),
});

export default ({ pageContext: { moduleName, module, overview } }) => {
  const [currentMenus, setCurrentMenu] = useState({});

  const onEnter = slug => {
    currentMenus[slug] = true;
    setCurrentMenu(currentMenus);
  };
  const onLeave = slug => {
    delete currentMenus[slug];

    setCurrentMenu(currentMenus);
  };

  return (
    <Layout isDoc className="body-green" pageTitle={module.title}>
      <Helmet>
        <title>Wazo Platform - Documentation: {module.title}</title>
      </Helmet>
      <div className="doc-wrapper">
        <div className="container">
          <div className="doc-body row">
            <div className="doc-content  col-md-9 col-12 order-1">
              <div className="content-inner">
                <ReactMarkdown
                  moduleName={moduleName}
                  source={overview}
                  renderers={getContentRenderers(module, onEnter, onLeave)}
                />
              </div>
            </div>

            <div className="doc-sidebar col-md-3 col-12 order-0 d-none d-md-flex">
              <div id="doc-nav" className="doc-nav">
                <nav id="doc-menu" className="nav doc-menu flex-column sticky">
                  <ReactMarkdown
                    allowedTypes={['heading', 'text']}
                    source={overview}
                    renderers={getMenuRenderers(currentMenus)}
                  />
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
