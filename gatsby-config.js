const path = require('path');

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  trailingSlash: 'always',
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("dart-sass"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-plugin-styled-components',
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // In your gatsby-transformer-remark plugin array
        plugins: [
          // Auto title anchor
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `70`,
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              className: `title-anchor`,
              removeAccents: true,
              enableCustomId: true,
            },
          },
          // Emoji
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              // Deactivate the plugin globally (default: true)
              active: true,
              // default emojiConversion --> shortnameToUnicode
              emojiConversion: 'shortnameToUnicode',
              // Add a custom css class
              class: 'emoji-icon',
              // In order to avoid pattern mismatch you can specify
              // an escape character which will be prepended to the
              // actual pattern (e.g. `#:poop:`).
              escapeCharacter: '#', // (default: '')
              // Select the size (available size: 16, 24, 32, 64)
              size: 64,
              // Add custom styles
              styles: {
                display: 'inline',
                margin: '5px 0 15px',
                position: 'relative',
                width: '25px',
              },
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: true,
            },
          },
        ],
      },
    },
  ],
};
