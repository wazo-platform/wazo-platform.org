import { Link } from 'gatsby';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import Layout from '../Layout';

const CardItem = ({ title, introduction, icon, beta, links = [] }) => (
  <div className="item item-blue col-md-4 col-sm-12">
    <div className="item-inner item-inner-no-hover">
      <div className="text-center">
        {icon && <i className={`icon ${icon}`} />}
        <h3 className="title">
          {title}
          {beta && <span className="badge badge-secondary">BETA</span>}
        </h3>
      </div>

      {introduction && <p className="intro">{introduction}</p>}

      {links.length && (
        <div className="list-group">
          {links.map(({ to, text }) => (
            <Link key={to} to={to} className="list-group-item">
              {text}
            </Link>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Page = ({ pageContext: { installDoc } }) => (
  <Layout
    section="use-cases"
    pageTitle="Getting started"
    breadcrumbs={[{ link: '/use-cases', label: 'Use Cases', active: true }]}
  >
    <section id="use-cases" className="about section">
      <div className="container">
        <ReactMarkdown children={installDoc} />

        <h2>Use Cases</h2>
        <div className="cards-section">
          <div className="cards-wrapper row">
            <CardItem
              title="Unified Communication"
              icon="fa fa-phone"
              introduction="Audio calls, video calls, chat, call centers, conferences, voicemail and more."
              links={[
                { to: '/uc-doc/installation', text: 'Install Procedure' },
                { to: '/uc-doc/', text: 'Documentation' },
              ]}
            />

            <CardItem
              beta
              title="SIP Router"
              icon="fa fa-code-branch"
              introduction="Router key features are SIP packets routing, load balancing, NAT management, and offering high availability."
              links={[
                { to: '/use-cases/class-4', text: 'Install Procedure' },
                { to: '/documentation/overview/c4-router.html', text: 'Documentation' },
              ]}
            />

            <CardItem
              beta
              title="Session Border Controller"
              icon="fa fa fa-lock"
              introduction="His primary role is security and protection. SBCs are between your architecture and the outside."
              links={[
                { to: '/use-cases/class-4', text: 'Install Procedure' },
                { to: '/documentation/overview/c4-sbc.html', text: 'Documentation' },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Page;
