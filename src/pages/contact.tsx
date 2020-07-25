import React from 'react'
import { PageProps } from 'gatsby'
import Layout from '../components/Layout'

const Contact: React.FC<PageProps> = (props: PageProps) => (
  <Layout pathname={props.path}>
    <h1>Contact</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
  </Layout>
)

export default Contact
