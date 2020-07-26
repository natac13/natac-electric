import React from 'react'
import { Link } from 'gatsby-material-ui-components'

const Home: React.FC = () => (
  <>
    You are now logged in!
    <br />
    <Link to="/app/profile">View profile</Link>
  </>
)

export default Home
