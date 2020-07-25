import { graphql, useStaticQuery } from 'gatsby'

interface SiteMetadata {
  title: string
  version: string
  author: string
  email: string
}

interface Site {
  siteMetadata: SiteMetadata
  buildTime: string
}

interface Data {
  site: Site
}

export default (): Site => {
  const data = useStaticQuery<Data>(graphql`
    {
      site {
        siteMetadata {
          title
          version
          author
          email
        }
        buildTime(formatString: "YYYY-MM-DD")
      }
    }
  `)

  return data.site
}
