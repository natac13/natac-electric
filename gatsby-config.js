// const siteAddress = new URL(`http://${client.toLowerCase()}.certground.com`)
const package = require('./package.json')

module.exports = {
  siteMetadata: {
    title: `Natac Electric`,
    description: `Example of an website landing page for an electrical company. Founded in 2020. Through hard labor and no retirement the work will get done.`,
    address: '1234 Paper Street. City Province Country ZipCode',
    phone: '555-555-1234',
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
          {
            family: `Merriweather`,
            subsets: [`latin`],
            variants: [`400`, `400i`, `700`, `900`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#4297e8`,
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
      resolve: `gatsby-transformer-yaml`,
      // options: {
      //   typeName: ({ node }) => node.name,
      // },
    },
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
        background_color: `#4297e8`,
        theme_color: `#4297e8`,
        display: `minimal-ui`,
        icon: `src/assets/images/logoBlack.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
