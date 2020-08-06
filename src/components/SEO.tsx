import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import R from 'ramda'
import startCase from 'lodash/startCase'
import capitalize from 'lodash/capitalize'

interface MetaWithProperty {
  property: string
  content: string
}

interface MetaWithName {
  name: string
  content: string
}

interface Props {
  pathname: string
  description?: string
  lang?: 'en'
  meta?: MetaWithProperty[] | MetaWithName[]
}

const SEO: React.FC<Props> = ({
  description,
  lang = 'en',
  meta = [],
  pathname = '',
}: Props) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  const createTitle = R.compose<
    string,
    string[],
    string[],
    string[],
    string[],
    string[],
    string
  >(
    R.join(' | '),
    R.append(`${site.siteMetadata.title}`),
    R.reverse,
    R.reject(R.isEmpty),
    R.map(R.compose(startCase, capitalize)),
    R.split('/')
  )
  const title = createTitle(pathname)

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      // titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: 'viewport',
          content:
            'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no',
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

export default SEO
