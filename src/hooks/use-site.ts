import { graphql, useStaticQuery } from 'gatsby'

interface SiteMetadata {
  title: string
  version: string
  author: string
  email: string
  siteGithub: string
}

interface Site {
  siteMetadata: SiteMetadata
  buildTime: string
}

interface Data {
  site: Site
}

export default (): Site => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          version
          author
          email
          siteGithub
        }
        buildTime(formatString: "YYYY-MM-DD")
      }
    }
  `)

  return data.site
}
