import React from 'react';
import { Link } from 'gatsby';
import LogoSquare from '../../assets/logo.square.svg';
import TechnicalLayersImg from '../../assets/Technical_Layers_2019_V3.png';

import Layout from '../Layout';

export default () => (
  <Layout section="home">
    {/* Promo */}
    <section id="promo" className="promo section offset-header">
      <div className="container text-center">
        <img src={LogoSquare} alt="Wazo Platform" id="wazo-platform" />
        <p className="intro">An Open Source project to build your own IP telecom platform</p>
        <div className="btns">
          <Link className="btn btn-cta-secondary" to="documentation">
            Documentation
          </Link>
          <Link className="btn btn-cta-primary" to="use-cases">
            Install
          </Link>
          <Link className="btn btn-cta-secondary" to="contribute">
            Contribute
          </Link>
        </div>
      </div>
    </section>

    {/*About*/}
    <section id="why" className="about">
      <div className="container">
        <h2 className="title text-center">Why Wazo Platform?</h2>
        <p className="intro">
          Programmable is the new paradigm in the Telecom industry. Programmable telecom allows you to build the
          solution you need, aligned with your business and technical constraints, not the one vendors want you to buy.
          However, it's today impossible to find the perfect platform to rely on. Based on core Open Source components,
          Wazo Platform aims to provide all the building blocks to create a full-featured, carrier grade, Programmable
          Telecom Infrastructure.
        </p>
      </div>
    </section>
    <section id="about" className="about section">
      <div className="container">
        <h2 className="title text-center">What is Wazo Platform?</h2>
        <p className="intro">
          Wazo Platform is an Open Source project allowing to build carrier grade programmable IP communication
          infrastructures. You can pick and choose the components you need to build your infrastructures with class 5
          features like audio and video calls, chat, call centers, conferences, voicemail, etc., and class 4 features
          like security, routing, load balancing, etc. You can augment the platform and integrate it with your
          subscription and billing capabilities or any value-added services like Speech to Text, A.I. or sentiment
          analysis. These communication infrastructures can be deployed and scaled on bare metal, virtual machines or
          containers.
          <br />
          <br />
          Wazo Platform is defined by 4 layers:
          <div id="technical-layers">
            <img src={TechnicalLayersImg} alt="Technical Layers" />
          </div>
          <ul>
            <li>
              App layer: SDK to build mobile and web apps
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
              Technical layer: the internal services for the Operating System, HTTP, internal messaging, database, ...
              <br />
              <span className="small">
                Debian and Services: nginx, rabbitmq, postgresql, auth, consul, webhookd, websocketd
              </span>
            </li>
          </ul>
        </p>
      </div>
    </section>
    <section id="three" className="about section">
      <div className="container">
        <div className="row">
          <div className="clearfix visible-md" />
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-mobile-alt" />
            </div>
            <div className="content">
              <h3 className="sub-title">Mobile and Web friendly</h3>
              <p>
                All the programmable interfaces are mobile and web friendly: WebRTC, REST API, Web sockets and Web
                hooks.
              </p>
            </div>
          </div>
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-code" />
            </div>
            <div className="content">
              <h3 className="sub-title">Easy to consume</h3>
              <p>
                Building blocks are micro-services developed in Python. All APIs are described in{' '}
                <a href="https://www.openapis.org/">OpenAPI</a>.
              </p>
            </div>
          </div>
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-coffee" />
            </div>
            <div className="content">
              <h3 className="sub-title">Battlefield tested</h3>
              <p>
                The core Telecom engine is implemented using the <a href="https://www.asterisk.org/">Asterisk</a>,{' '}
                <a href="https://github.com/sipwise/rtpengine">RTPEngine</a> and{' '}
                <a href="https://www.kamailio.org/">Kamailio</a> projects. The technical core engine is based on{' '}
                <a href="https://www.rabbitmq.com/">RabbitMQ</a>, <a href="https://www.consul.io/">Consul</a>,{' '}
                <a href="https://nginx.org/">NGinx</a> and <a href="https://www.postgresql.org/">PostgreSQL</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="license" className="license section">
      <div className="container">
        <h2 className="title text-center">License</h2>
        <div className="info">
          <p>
            You may copy, distribute and modify the software as long as you track changes/dates in source files. Any
            modifications to or software including (via compiler) GPL-licensed code must also be made available under
            the GPL along with build & install instructions. More details at{' '}
            <a href="https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)">tldrlegal.com</a>
          </p>
        </div>
      </div>
    </section>

    {/* Contact has been moved into Layout.js */}
  </Layout>
);
