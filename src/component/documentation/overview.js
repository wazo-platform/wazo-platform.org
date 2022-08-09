import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import handleViewport from 'react-in-viewport';
import Helmet from 'react-helmet';

import Layout from '../Layout';

const flatten = (text, child) =>
  typeof child === 'string' ? text + child : React.Children.toArray(child.props.children).reduce(flatten, text);

const getMenuComponents = currentMenus => {
  const BigHeading = props => {
    const text = props.children.reduce(flatten, '');
    const slug = text.toLowerCase().replace(/\W/g, '-');
    const active = slug in currentMenus;

    return (
      <a className={`nav-link scrollto${active ? ' active' : ''}`} href={`#${slug}`}>
        {props.children}
      </a>
    );
  };

  const SmallHeading = props => {
    const text = props.children.reduce(flatten, '');
    const slug = text.toLowerCase().replace(/\W/g, '-');
    const active = slug in currentMenus;

    return (
      <nav className="doc-sub-menu nav flex-column">
        <a className={`nav-link scrollto${active ? ' active' : ''}`} href={`#${slug}`}>
          {props.children}
        </a>
      </nav>
    );
  };

  return {
    h1: () => null,
    h2: BigHeading,
    h3: SmallHeading,
    h4: SmallHeading,
    h5: SmallHeading,
    h6: SmallHeading,
  };
};

const Section = props => {
  return (
    <div className={props.inViewport ? 'in' : 'out'} ref={props.innerRef}>
      {props.children}
    </div>
  );
};
const ViewportSection = handleViewport(Section);

const getContentComponents = (module, onEnter, onLeave) => {
  const BigHeading = props => {
    const text = props.children.reduce(flatten, '');
    const slug = text.toLowerCase().replace(/\W/g, '-');

    return (
      <ViewportSection onEnterViewport={() => onEnter(slug)} onLeaveViewport={() => onLeave(slug)}>
        <section className="doc-section" id={slug}>
          <h2 className="section-title">{text}</h2>
          <div className="section-block" />
        </section>
      </ViewportSection>
    );
  };

  const SmallHeading = props => {
    const text = props.children.reduce(flatten, '');
    const slug = text.toLowerCase().replace(/\W/g, '-');

    return (
      <ViewportSection onEnterViewport={() => onEnter(slug)} onLeaveViewport={() => onLeave(slug)}>
        <h3 className="block-title" id={slug}>
          {props.children}
        </h3>
      </ViewportSection>
    );
  };

  return {
    h1: () => null,
    h2: BigHeading,
    h3: SmallHeading,
    h4: SmallHeading,
    h5: SmallHeading,
    h6: SmallHeading,
    img: props => (
      <object
        type="image/svg+xml"
        data={`../../diagrams/${module.repository
          .split('-')
          .splice(1)
          .join('-')}-${props.src}`}
        aria-label={props.alt}
      />
    ),
  };
};

const Page = ({ pageContext: { moduleName, module, overview } }) => {
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
    <Layout section="documentation" className="body-green" pageTitle={module.title}>
      <Helmet>
        <title>Documentation: {module.title} - Wazo Platform</title>
      </Helmet>
      <div className="doc-wrapper">
        <div className="container">
          <div className="doc-body row">
            <div className="doc-content  col-md-9 col-12 order-1">
              <div className="content-inner">
                <ReactMarkdown
                  moduleName={moduleName}
                  children={overview}
                  components={getContentComponents(module, onEnter, onLeave)}
                />
              </div>
            </div>

            <div className="doc-sidebar col-md-3 col-12 order-0 d-none d-md-flex">
              <div id="doc-nav" className="doc-nav">
                <nav id="doc-menu" className="nav doc-menu flex-column sticky">
                  <ReactMarkdown
                    allowedElements={['heading', 'text']}
                    children={overview}
                    components={getMenuComponents(currentMenus)}
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

export default Page
