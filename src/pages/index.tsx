import React from 'react'
// import { Link } from 'gatsby-material-ui-components'
import { PageProps } from 'gatsby'
// import Amplify from 'aws-amplify'
// import awsExports from '../aws-exports'
import Layout from '../components/Layout'
import Landing from '../components/Landing'

// Amplify.configure(awsExports)

const IndexPage: React.FC<PageProps> = (props: PageProps) => {
  return (
    <Layout pathname={props.path}>
      <Landing />
    </Layout>
  )
}

export default IndexPage
