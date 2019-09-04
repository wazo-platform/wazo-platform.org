import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import LogoSquare from '../assets/logo.square.svg';

import Layout from './Layout';

export default () => (
  <Layout>
    <Helmet bodyAttributes={{ class: 'landing-page' }}>
      <title>Wazo Platform</title>
    </Helmet>

    {/* Promo */}
    <section id="promo" className="promo section offset-header">
      <div className="container text-center">
        <img src={LogoSquare} alt="Wazo Platform" id="wazo-platform" />
        <p className="intro">An Open Source project to build your own IP telecom platform</p>
        <div className="btns">
          <Link className="btn btn-cta-secondary" to="documentation">
            API Docs
          </Link>
          <Link className="btn btn-cta-primary" to="install">
            Install
          </Link>
        </div>
      </div>
    </section>

    {/*About*/}
    <section id="about" className="about section">
      <div className="container">
        <h2 className="title text-center">What is Wazo Platform?</h2>
        <p className="intro">
          Wazo Platform is an Open Source project allowing to build carrier grade programmable IP communication
          infrastructure. You can pick and choose the components you need to build class 5 features like audio and video
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
          These communication infrastructures can be deployed and scaled on bare metal, virtual machines or
          containers.
        </p>
        <h2 className="title text-center">Why Wazo Platform?</h2>
        <p className="intro">
          There was no building blocks to create programmable Telecom infrastructure so we evolved our own
          telecom stack based on Asterisk to make it fully programmable, multi-tenant and user centric. The
          target use cases were Unified Communications, Chat server, Call centers, IoT, Fax services in Distributed
          or all-in-one setups.
        </p>
        <div className="row">
          <div className="clearfix visible-md" />
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-mobile-alt" />
            </div>
            <div className="content">
              <h3 className="sub-title">Mobile and Web friendly</h3>
              <p>All the programmable interfaces are mobile and web friendly: WebRTC, REST API, Web sockets and Web hooks.</p>
            </div>
          </div>
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-code" />
            </div>
            <div className="content">
              <h3 className="sub-title">Easy to consume</h3>
              <p>Building blocks are micro-services developed in Python. All API are described in <a href="https://www.openapis.org/">OpenAPI</a>.</p>
            </div>
          </div>
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-coffee" />
            </div>
            <div className="content">
              <h3 className="sub-title">Battlefield tested</h3>
              <p>
                The core Telecom engine is implemented using the <a href="https://www.asterisk.org/">Asterisk</a>, &nbsp;
                <a href="https://github.com/sipwise/rtpengine">RTPEngine</a> and &nbsp; <a href="https://www.kamailio.org/">Kamailio</a> projects. The technical core engine is based on <a href="https://www.rabbitmq.com/">RabbitMQ</a>, <a href="https://www.consul.io/">Consul</a>, <a href="https://nginx.org/">NGinx</a> and <a href="https://www.postgresql.org/">PosgreSQL</a>.
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
              the GPL along with build & install instructions. More details at{' '}
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
          <div className="col-wrapper one">
            <div className="coll">
              <h2>Contact</h2>
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
            </div>
            <div className="coll">
              <div>
                <h2>Recent publications</h2>
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
          </div>
          <div className="col-wrapper">
              <div className="coll">
                <h2>Support</h2>
                <p>
                  The Wazo Platform project is supported by its community. Use the various channels above to reach out to us.
                </p>
              </div>
              <div className="coll">
                <h2>Get Connected</h2>
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
      </div>
    </section>
  </Layout>
);
