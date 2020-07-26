import React from 'react'

// import Header from "./header"
import SEO from './SEO'
import Navbar from './Navbar'
import Footer from './Footer'
import { makeStyles } from '@material-ui/core'
import SnackbarProviderComponent from './SnackbarProvider'

const useStyles = makeStyles((theme) => ({
  main: {
    margin: `0 auto`,
    maxWidth: 960,
    padding: theme.spacing(0, 1, 2),
    minHeight: '90vh',
    marginTop: theme.spacing(4),
  },
}))
interface Props {
  pathname: string
  children: React.ReactNode
  noNavbar?: boolean
  noMenu?: boolean
}

const Layout: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  const { children, noNavbar = false, noMenu = false, pathname } = props

  return (
    <>
      <SnackbarProviderComponent>
        <SEO pathname={pathname} />
        {!noNavbar && <Navbar path={pathname} />}
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        <main className={classes.main}>{children}</main>

        <Footer />
      </SnackbarProviderComponent>
    </>
  )
}

export default Layout
