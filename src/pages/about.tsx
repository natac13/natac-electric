import React from 'react'
import { PageProps } from 'gatsby'
import Layout from '../components/Layout'

const About: React.FC<PageProps> = (props: PageProps) => (
  <Layout pathname={props.path}>
    <h1>About</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
  </Layout>
)

export default About
