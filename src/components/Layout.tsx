import React from 'react'

// import Header from "./header"
import SEO from './SEO'
import Navbar from './Navbar'
import Footer from './Footer'

interface Props {
  pathname: string
  children: React.ReactNode
  noNavbar?: boolean
  noMenu?: boolean
}

const Layout: React.FC<Props> = (props: Props) => {
  // const classes = useStyles()
  const { children, noNavbar = false, noMenu = false, pathname } = props

  return (
    <>
      <SEO pathname={pathname} />
      {!noNavbar && <Navbar path={pathname} />}
      {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
