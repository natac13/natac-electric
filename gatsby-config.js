// const siteAddress = new URL(`http://${client.toLowerCase()}.certground.com`)
const package = require('./package.json')

module.exports = {
  siteMetadata: {
    title: `Natac Electric`,
    description: `Example of an website landing page for an electrical company`,
    author: `Sean Paul Campbell`,
    email: `sean.campbell13@gmail.com`,
    version: `${package.version}`,
    siteGithub: package.repository.url,
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': `Sean Paul Campbell`,
    'Mdx.frontmatter.author': `Sean Paul Campbell`,
  },
  plugins: [
    'gatsby-plugin-top-layout',
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    // {
    //   resolve: `gatsby-plugin-canonical-urls`,
    //   options: {
    //     siteUrl: siteAddress.href.slice(0, -1),
    //   },
    // },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto`,
            subsets: [`latin`],
            variants: [`300`, `400`, `400i`, `500`, `700`, `700i`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#663399`,
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-eslint`,
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    `gatsby-plugin-ramda`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Natac Electric`,
        short_name: `Natac Electric`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
