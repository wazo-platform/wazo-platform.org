import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { withPrefix } from "gatsby"
import { corporate } from '../config-wazo';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon"
          type="image/png"
          href={`/images/${corporate ? 'corporate' : 'platform'}/icon.png`}
        />
        {props.headComponents}
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js" />
        <script type="text/javascript" src={withPrefix("/js/prism.js")} />
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
        <script
          type="text/javascript"
          src="//cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/2.1.2/jquery.scrollTo.min.js"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-56722061-8"></script>
        <meta name="google-site-verification" content="VfXUU25hamqC0zHjgxvyVDPk8CqGiWjLSRFE8BZ1mmE" />
        <script type="text/javascript" src={withPrefix("/js/main.js")} defer />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
