import React from 'react'

import Layout from '../components/Layout'
import { PageProps } from 'gatsby'

const NotFoundPage: React.FC<PageProps> = (props: PageProps) => (
  <Layout pathname={props.path}>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
