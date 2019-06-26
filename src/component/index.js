import React from 'react';
import Helmet from 'react-helmet';

import Layout from './Layout';

export default () => (
  <Layout>
    <Helmet bodyAttributes={{ class: 'landing-page' }}>
      <title>Wazo platform</title>
    </Helmet>

    {/* Promo */}
    <section id="promo" className="promo section offset-header">
      <div className="container text-center">
        <h2 className="title">
          Wazo<span className="highlight">Platform</span>
        </h2>
        <p className="intro">A free Bootstrap 4 theme designed to help developers promote their personal projects</p>
        <div className="btns">
          <a className="btn btn-cta-secondary" href="https://themes.3rdwavemedia.com/" target="_blank" rel="noopener noreferrer">
            Demo
          </a>
          <a
            className="btn btn-cta-primary"
            href="https://themes.3rdwavemedia.com/bootstrap-templates/startup/devaid-free-bootstrap-theme-for-developers-side-projects/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        </div>
      </div>
    </section>

    {/*About*/}
    <section id="about" className="about section">
      <div className="container">
        <h2 className="title text-center">What is devAid?</h2>
        <p className="intro text-center">
          Explain your project in detail. Ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
        </p>
        <div className="row">
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-heart" />
            </div>
            <div className="content">
              <h3 className="sub-title">Designed for developers</h3>
              <p>
                Outline a benefit here. Tell users what your plugin/software can do for them. You can change the icon
                above to any of the 1000+{' '}
                <a href="http://fortawesome.github.io/Font-Awesome/icons/" target="_blank" rel="noopener noreferrer">
                  FontAwesome
                </a>{' '}
                icons available.
              </p>
            </div>
          </div>
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="far fa-clock" />
            </div>
            <div className="content">
              <h3 className="sub-title">Time saver</h3>
              <p>
                Outline a benefit here. Tell users what your plugin/software can do for them. You can change the icon
                above to any of the 1000+{' '}
                <a href="http://fortawesome.github.io/Font-Awesome/icons/" target="_blank" rel="noopener noreferrer">
                  FontAwesome
                </a>{' '}
                icons available.
              </p>
            </div>
          </div>
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-crosshairs" />
            </div>
            <div className="content">
              <h3 className="sub-title">UX-centred</h3>
              <p>
                Outline a benefit here. Tell users what your plugin/software can do for them. You can change the icon
                above to any of the 1000+{' '}
                <a href="http://fortawesome.github.io/Font-Awesome/icons/" target="_blank" rel="noopener noreferrer">
                  FontAwesome
                </a>{' '}
                icons available.
              </p>
            </div>
          </div>
          <div className="clearfix visible-md" />
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-mobile-alt" />
            </div>
            <div className="content">
              <h3 className="sub-title">Mobile-friendly</h3>
              <p>
                Outline a benefit here. Tell users what your plugin/software can do for them. You can change the icon
                above to any of the 1000+{' '}
                <a href="http://fortawesome.github.io/Font-Awesome/icons/" target="_blank" rel="noopener noreferrer">
                  FontAwesome
                </a>{' '}
                icons available.
              </p>
            </div>
          </div>
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-code" />
            </div>
            <div className="content">
              <h3 className="sub-title">Easy to customise</h3>
              <p>
                Outline a benefit here. Tell users what your plugin/software can do for them. You can change the icon
                above to any of the 1000+{' '}
                <a href="http://fortawesome.github.io/Font-Awesome/icons/" target="_blank" rel="noopener noreferrer">
                  FontAwesome
                </a>{' '}
                icons available.
              </p>
            </div>
          </div>
          <div className="item col-lg-4 col-md-6 col-12">
            <div className="icon-holder">
              <i className="fas fa-coffee" />
            </div>
            <div className="content">
              <h3 className="sub-title">SCSS source files included</h3>
              <p>
                Outline a benefit here. Tell users what your plugin/software can do for them. You can change the icon
                above to any of the 1000+{' '}
                <a href="http://fortawesome.github.io/Font-Awesome/icons/" target="_blank" rel="noopener noreferrer">
                  FontAwesome
                </a>{' '}
                icons available.
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
            <i className="fas fa-check" /> Fully responsive
          </li>
          <li>
            <i className="fas fa-check" /> HTML5 + CSS3
          </li>
          <li>
            <i className="fas fa-check" /> Built on Bootstrap 4
          </li>
          <li>
            <i className="fas fa-check" /> SCSS source files included
          </li>
          <li>
            <i className="fas fa-check" /> 1000+ FontAwesome 5 icons
          </li>
          <li>
            <i className="fas fa-check" /> 4 colour schemes
          </li>
          <li>
            <i className="fas fa-check" /> Compatible with all modern browsers
          </li>
        </ul>
      </div>
    </section>

    {/*Docs*/}
    <section id="docs" className="docs section">
      <div className="container">
        <div className="docs-inner">
          <h2 className="title text-center">Get Started</h2>
          <div className="block">
            <h3 className="sub-title text-center">CSS</h3>
            <p>
              Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
              Nam eget dui. Etiam rhoncus.
            </p>

            <div className="code-block">
              <pre>
                <code
                  className="language-css"
                  dangerouslySetInnerHTML={{
                    __html: `
body {
  font - family: 'Lato', arial, sans-serif;
  color: #444444;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
       `,
                  }}
                />
              </pre>
            </div>
          </div>

          <div className="block">
            <h3 className="sub-title text-center">JavaScript</h3>
            <p>
              Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
              Nam eget dui. Etiam rhoncus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit ligula eget dolor.
            </p>
            <div className="code-block">
              <pre>
                <code className="language-javascript">
                  {`
if( awesome ){
  console.log('This is Awesome');
}else{
  $('body').addClass('give-me-awesome');
}
                    `}
                </code>
              </pre>
            </div>
          </div>
          <div className="block">
            <h3 className="sub-title text-center">Full Documentation</h3>
            <p>
              If your documentation is very long you can host the full docs page (including FAQ etc) on GitHub and
              provide a Call to Action button below to direct users there.
            </p>
            <p className="text-center">
              <a className="btn btn-cta-primary" href="https://github.com/xriley/devAid-Theme" target="_blank" rel="noopener noreferrer">
                More on GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="license" className="license section">
      <div className="container">
        <div className="license-inner">
          <h2 className="title text-center">License</h2>
          <div className="info">
            <p>
              This Bootstrap theme is made by UX/UI designer{' '}
              <a href="https://twitter.com/3rdwave_themes" target="_blank" rel="noopener noreferrer">
                Xiaoying Riley
              </a>{' '}
              at 3rd Wave Media for developers and is <strong>100% FREE</strong> under the{' '}
              <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer">
                Creative Commons Attribution 3.0 License (CC BY 3.0)
              </a>
            </p>
            <p>
              <strong>[Tip for developers]:</strong> If your project is open source, you might want to put a{' '}
              <a href="https://www.paypal.com/us/cgi-bin/?cmd=_donate-intro-outside" target="_blank" rel="noopener noreferrer">
                PayPal "Donate" button
              </a>{' '}
              below so your users can express their gratitude. If your project is commercial, you can put a{' '}
              <a href="https://www.paypal.com/us/cgi-bin/webscr?cmd=_singleitem-intro-outside" target="_blank" rel="noopener noreferrer">
                PayPal "Buy Now" button
              </a>{' '}
              instead.
            </p>
          </div>
          <div className="cta-container">
            <div className="speech-bubble">
              <p className="intro">
                If you want to <strong>use this template without the footer attribution link</strong>, you can{' '}
                <a
                  href="https://themes.3rdwavemedia.com/bootstrap-templates/startup/devaid-free-bootstrap-theme-for-developers-side-projects/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  buy the commercial license
                </a>{' '}
                via my website. Thank you for your support!
              </p>
              <div className="icon-holder  text-center">
                <i className="far fa-smile" />
              </div>
            </div>
            <div className="btn-container  text-center">
              <a
                className="btn btn-cta-secondary"
                href="https://themes.3rdwavemedia.com/bootstrap-templates/startup/devaid-free-bootstrap-theme-for-developers-side-projects/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy Commercial License
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Contact */}
    <section id="contact" className="contact section has-pattern">
      <div className="container">
        <div className="contact-inner">
          <h2 className="title  text-center">Contact</h2>
          <p className="intro  text-center">
            I hope you find this Bootstrap template useful. <br />
            Feel free to get in touch if you have any questions or suggestions.
          </p>
          <div className="author-message">
            <div className="profile">
              <img
                className="img-fluid"
                src="https://themes.3rdwavemedia.com/demo/devaid/assets/images/profile.png"
                alt=""
              />
            </div>
            <div className="speech-bubble">
              <h3 className="sub-title">Love free Bootstrap themes and templates?</h3>
              <p>
                <a href="https://twitter.com/3rdwave_themes" target="_blank" rel="noopener noreferrer">
                  Follow me on Twitter
                </a>{' '}
                so you don’t miss any future freebies! You can find all the freebies I made for developers{' '}
                <a href="https://themes.3rdwavemedia.com/bootstrap-templates/free/" target="_blank" rel="noopener noreferrer">
                  here
                </a>
                .
              </p>
              <p>
                <strong>[Tip for developers]:</strong> If you take on freelance work you can put a tailored message here
                about your availability to attract potential clients. Be creative and good luck! :)
              </p>
              <div className="source">
                <span className="name">
                  <a href="https://twitter.com/3rdwave_themes" target="_blank" rel="noopener noreferrer">
                    Xiaoying Riley
                  </a>
                </span>
                <br />
                <span className="title">UX/UI Designer</span>
              </div>
            </div>
          </div>
          <div className="clearfix" />
          <div className="info text-center">
            <h4 className="sub-title">Get Connected</h4>
            <ul className="social-icons list-inline">
              <li className="list-inline-item">
                <a href="https://twitter.com/3rdwave_themes" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.facebook.com/3rdwavethemes" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>

              <li className="list-inline-item">
                <a href="https://medium.com/@3rdwave_themes/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-medium-m" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://dribbble.com/Xiaoying" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-dribbble" />
                </a>
              </li>
              <li className="list-inline-item last">
                <a href="https://themes.3rdwavemedia.com/contact/" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-envelope" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);
