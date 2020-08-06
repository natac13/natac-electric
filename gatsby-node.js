const fs = require('fs')
const path = require('path')
const kebabCase = require('lodash/kebabCase')
const camelCase = require('lodash/camelCase')
const capitalize = require('lodash/capitalize')
const R = require('ramda')

// 1. Make sure the directory exist
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = 'src/assets'

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

// 2. Define the Custom Types
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type StaffYaml implements Node {
      camelCase: String!
      slug: String!
    }
    type LocationsYaml implements Node {
      slug: String!
      kebabCase: String!
    }
  `)
}

const slugify = (str, basePath = '/') => {
  const slug = kebabCase(str)

  return `/${basePath}/${slug}`.replace(/\/\/+/g, '/') // replace any two slashes with one slash
}
// 3. Define Resolvers for custom fields
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    StaffYaml: {
      slug: {
        resolve: (source) => slugify(source.name, 'staff'),
      },
      camelCase: {
        resolve: (source) => camelCase(source.name),
      },
    },
    LocationsYaml: {
      slug: {
        resolve: (source) => slugify(source.location, 'locations'),
      },
      kebabCase: {
        resolve: (source) => kebabCase(source.location),
      },
    },
  })
}

// 4. query for staff and location to create pages
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const staffTemplate = path.resolve(`src/templates/Staff.tsx`)
  const locationsTemplate = path.resolve(`src/templates/Location.tsx`)
  return graphql(
    `
      query {
        allStaffYaml {
          nodes {
            slug
            camelCase
            employmentStart
            email
            description
            name
            id
            position
          }
        }
        allLocationsYaml {
          nodes {
            description
            email
            id
            location
            phone
            slug
            specialMessage
            kebabCase
            address
          }
        }
      }
    `,
    { limit: 1000 }
  ).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    result.data.allStaffYaml.nodes.forEach((node) => {
      createPage({
        path: `${node.slug}`,
        component: staffTemplate,
        context: {
          ...node,
          regex: new RegExp(node.camelCase).toString(),
          bgImageName: `${node.camelCase}-main`,
        },
      })
    })
    result.data.allLocationsYaml.nodes.forEach((node) => {
      reporter.info(`creating locations page: ${node.slug}`)
      createPage({
        path: `${node.slug}`,
        component: locationsTemplate,
        context: {
          ...node,
          regex: new RegExp(node.kebabCase).toString(),
          bgImageName: `${node.kebabCase}-main`,
        },
      })
    })
  })
}
