import React from 'react'
import { Link } from 'gatsby-material-ui-components'

import Layout from '../components/Layout'
import { PageProps } from 'gatsby'

const IndexPage: React.FC<PageProps> = (props: PageProps) => (
  <Layout pathname={props.path}>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

export default IndexPage
