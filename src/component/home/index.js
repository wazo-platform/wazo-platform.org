import React from 'react';
import { Link } from 'gatsby';
import LogoSquare from '../../assets/logo.square.svg';
import TechnicalLayersImg from '../../assets/Technical_Layers_2019_V3.png';

import Layout from '../Layout';

const Page = () => (
  <Layout section="home">
    {/* Promo */}
    <section id="promo" className="promo section offset-header">
      <div className="container text-center">
        <img src={LogoSquare} alt="Wazo Platform" id="wazo-platform" />
        <p className="intro">An Open Source project to build your own IP&nbsp;telecom platform</p>
        <div className="btns">
          <Link className="btn btn-cta-secondary" to="uc-doc/installation/install-system">
            Install
          </Link>
          <Link className="btn btn-cta-primary" to="documentation">
            API Documentation
          </Link>
          <Link className="btn btn-cta-primary" to="contribute">
            Contribute
          </Link>
        </div>
      </div>
    </section>

    {/*About*/}
    <section id="why" className="about">
      <div className="container">
        <h2 className="title text-center">Why Wazo Platform?</h2>

        <div className="row">
          <div className="clearfix visible-md" />
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-mobile-alt" />
            </div>
            <div className="content">
              <h3>Programmable Interfaces</h3>
              <p>
                All the programmable interfaces are mobile and web friendly: WebRTC, REST API,
                WebSockets and Webhooks.
              </p>
            </div>
          </div>
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-code" />
            </div>
            <div className="content">
              <h3>Easy to Consume (API-First)</h3>
              <p>
                We designed the platform with an API-First approach. Building blocks are
                micro-services developed in Python. All APIs are described in{' '}
                <a className="soft-link" href="https://www.openapis.org/">
                  OpenAPI specification
                </a>
                .
              </p>
            </div>
          </div>
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-coffee" />
            </div>
            <div className="content">
              <h3>Battlefield Tested</h3>
              <p>
                The core Telecom engine is implemented using the{' '}
                <a className="soft-link" href="https://www.asterisk.org/">
                  Asterisk
                </a>
                ,{' '}
                <a className="soft-link" href="https://github.com/sipwise/rtpengine">
                  RTPEngine
                </a>{' '}
                and{' '}
                <a className="soft-link" href="https://www.kamailio.org/">
                  Kamailio
                </a>{' '}
                projects. The technical core engine is based on{' '}
                <a className="soft-link" href="https://www.rabbitmq.com/">
                  RabbitMQ
                </a>
                ,{' '}
                <a className="soft-link" href="https://nginx.org/">
                  NGinx
                </a>{' '}
                and{' '}
                <a className="soft-link" href="https://www.postgresql.org/">
                  PostgreSQL
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <p className="intro">
          Wazo Platform allows developers to build solutions that fit any business and technical
          requirements. Fully open source and based on open Source components, Wazo Platform aims to
          provide all the building blocks to create a full-featured, carrier-grade, Programmable
          Telecom Infrastructure.
        </p>
      </div>
    </section>
    <section id="about" className="about section">
      <div className="container">
        <h2 className="title text-center">What is Wazo Platform</h2>
        <div className="intro">
          <p>
            Wazo Platform is an Open Source project allowing to{' '}
            <strong>build carrier grade programmable IP communication infrastructures</strong>. You
            can pick and choose the components you need to build your infrastructures with
            class&nbsp;5 features like <strong>audio and video calls</strong>, chat, call centers,
            conferences, voicemail, etc.
          </p>

          <p>
            From our APIs, <strong>integrate any kind of integration</strong> with the platform.
            Wazo be could integrate with your own billing capabilities or any value-added services
            like Speech to Text, A.I. or sentiment analysis.
          </p>

          <p>
            <strong>Deployable and scalable</strong> on bare metal, virtual machines or containers.
          </p>
        </div>

        <h2 className="title text-center">How We Built It</h2>
        <div className="intro">
          <p>Wazo Platform is defined by 4 layers:</p>

          <ul>
            <li>
              <strong>Application layer</strong>: SDK to build mobile and web apps
            </li>
            <li>
              <strong>Business layer</strong>: REST API to manage users, phones, call centers, load
              balancing, billing, ...
              <br />
              <span className="small">Services: calld, confd, agentd</span>
            </li>
            <li>
              <strong>Engine layer</strong>: internal services for audio/video, provisioning, ...
              <br />
              <span className="small">
                Services: asterisk, confd, agid, amid, provd, kamailio, rtpengine
              </span>
            </li>
            <li>
              <strong>Technical layer</strong>: internal services for the Operating System, HTTP,
              internal messaging, database, ...
              <br />
              <span className="small">
                Debian and Services: nginx, rabbitmq, postgresql, auth, webhookd, websocketd
              </span>
            </li>
          </ul>

          <div id="technical-layers">
            <img src={TechnicalLayersImg} alt="Technical Layers" />
          </div>
        </div>
      </div>
    </section>

    <section id="license" className="license section">
      <div className="container">
        <h2 className="title text-center">License</h2>
        <div className="info">
          <p>
            You may copy, distribute and modify the software as long as you track changes/dates in
            source files. Any modifications to or software including (via compiler) GPL-licensed
            code must also be made available under the GPL along with build & install instructions.
            More details at{' '}
            <a href="https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)">
              tldrlegal.com
            </a>
          </p>
        </div>
      </div>
    </section>

    {/* Contact has been moved into Layout.js */}
  </Layout>
);

export default Page;
