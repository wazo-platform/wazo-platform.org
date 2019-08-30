import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';

import Layout from './Layout';

export default () => (
  <Layout>
    <Helmet bodyAttributes={{ class: 'landing-page' }}>
      <title>Wazo Platform</title>
    </Helmet>

    {/* Promo */}
    <section id="promo" className="promo section offset-header">
      <div className="container text-center">
        <h2 className="title">
          Wazo<span className="highlight">Platform</span>
        </h2>
        <p className="intro">An Open Source project to build your own IP telecom platform</p>
        <div className="btns">
          <Link className="btn btn-cta-secondary" to="documentation">
            API Docs
          </Link>
          <Link className="btn btn-cta-primary" to="install">
            Install
          </Link>
          <a href="https://github.com/wazo-platform">
            <img
              style={{ position: 'absolute', top: 0, right: 0, border: 0, 'z-index': 99999 }}
              src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67"
              alt="Fork me on GitHub"
              data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"
            />
          </a>
        </div>
      </div>
    </section>

    {/*About*/}
    <section id="about" className="about section">
      <div className="container">
        <h2 className="title text-center">What is Wazo Platform?</h2>
        <p className="intro">
          Wazo Platform is an Open Source project allowing to build carrier grade programmable IP communication
          infrastructure. You can pick and chose the components you need to build class 5 features like audio and video
          calls, chat, call centers, conferences, voicemail, etc., and class 4 features like security, routing, load
          balancing, etc., coupled with subscription and billing capabilities.
          <br />
          <br />
          Wazo Platform is defined by 4 layers:
          <ul>
            <li>
              App layer: an SDK to build mobile and web apps
              <br />
            </li>
            <li>
              Business layer: REST API to manage users, phones, call centers, load balancing, billing, ...
              <br />
              <span className="small">Services: calld, confd, agentd</span>
            </li>
            <li>
              Engine layer: the internal services for audio/video, provisioning, ...
              <br />
              <span className="small">Services: asterisk, confd, agid, amid, provd, kamailio, rtpengine</span>
            </li>
            <li>
              Technical layer: the internal services for HTTP, internal messaging, database, ...
              <br />
              <span className="small">Services: nginx, rabbitmq, postgresql, auth, consul, webhookd, websocketd</span>
            </li>
          </ul>
          These communication infrastructures can be deployed and scaled on bare metal, virtual machines or containers.
        </p>
        <div className="row">
          <div className="clearfix visible-md" />
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-mobile-alt" />
            </div>
            <div className="content">
              <h3 className="sub-title">Mobile and Web friendly</h3>
              <p>All the interfaces are mobile and web friendly: REST API, Web sockets and Web hooks.</p>
            </div>
          </div>
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-code" />
            </div>
            <div className="content">
              <h3 className="sub-title">Easy to customise</h3>
              <p>Building blocks are micro-services developed in Python.</p>
            </div>
          </div>
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-coffee" />
            </div>
            <div className="content">
              <h3 className="sub-title">Battlefield tested</h3>
              <p>
                The core engine is implemented using the <a href="https://www.asterisk.org/">Asterisk</a>, &nbsp;
                <a href="https://github.com/sipwise/rtpengine">RTPEngine</a> and &nbsp;
                <a href="https://www.kamailio.org/">Kamailio</a> projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section id="features" className="features section">
      <div className="container text-center">
        <h2 className="title">Features</h2>
        <ul className="feature-list list-unstyled">
          <li>
            <i className="fas fa-check" /> Full Web/Mobile interfaces: REST API, websocket and webhooks.
          </li>
          <li>
            <i className="fas fa-check" /> Class 5 capabilities:
          </li>
          <li>
            <i className="fas fa-check" /> Class 4 capabilities:
          </li>
          <li>
            <i className="fas fa-check" /> Fully Open Source under the GPL-3 license.
          </li>
        </ul>
      </div>
    </section>

    <section id="license" className="license section">
      <div className="container">
        <div className="license-inner">
          <h2 className="title text-center">License</h2>
          <div className="info">
            <p>
              You may copy, distribute and modify the software as long as you track changes/dates in source files. Any
              modifications to or software including (via compiler) GPL-licensed code must also be made available under
              the GPL along with build & install instructions. Mode details at{' '}
              <a href="https://tldrlegal.com/l/gpl-3.0">tldrlegal.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Contact */}
    <section id="contact" className="contact section has-pattern">
      <div className="container">
        <div className="contact-inner">
          <h2 className="title  text-center">Contact</h2>
          <p className="intro  text-left">
            <p>
              Forum:{' '}
              <a href="https://projects.wazo.community/projects/1/boards">
                https://projects.wazo.community/projects/1/boards
              </a>
              <br />
              Bug tracking: <a href="https://wazo-dev.atlassian.net/">https://wazo-dev.atlassian.net/</a>
              <br />
              E-Mail: <a href="mailto:contact@wazo.community">contact@wazo.community</a>
              <br />
              Mattermost:{' '}
              <a href="https://mm.wazo.community/wazo-platform/">https://mm.wazo.community/wazo-platform/</a>
              <br />
              IRC: #wazo on irc.freenode.net
            </p>
          </p>
          <div className="author-message">
            <div className="profile">
              <img className="img-fluid" src="/favicon.ico" alt="" />
            </div>
            <div className="speech-bubble">
              <h3 className="sub-title">Recent publications about Wazo Platform</h3>
              <p>
                Video @ Kamailio World 2019: <a href="https://youtu.be/d1hOR27r4uY?t=2642">Dangerous Demos</a>
              </p>
              <p>
                Video at the Telecom Application Development Summit 2018:{' '}
                <a href="https://youtu.be/JxKlxPDDnsk">What can you do with Wazo?</a>
              </p>
              <p>
                Video at the Telecom Application Development Summit 2017:{' '}
                <a href="https://youtu.be/vh43Vt40myY">WAZO Keynote: xCPaaS</a>
              </p>
            </div>
          </div>
          <div className="clearfix" />
          <div className="info text-center">
            <h4 className="sub-title">Get Connected</h4>
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
  </Layout>
);
