import React from 'react'

// import Header from "./header"
import SEO from './SEO'
import Navbar from './Navbar'
import Footer from './Footer'
import { makeStyles } from '@material-ui/core'
import SnackbarProviderComponent from './SnackbarProvider'
import { useSpring, animated } from 'react-spring'

const useStyles = makeStyles((theme) => ({
  root: {
    background:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.background.paper,
  },
  main: {
    margin: `0`,
    height: '100vh',
    overflow: 'hidden',
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

  const [mainSpring, setMainSpring] = useSpring(() => ({
    marginTop: '0vh',
    marginLeft: '0vh',
    marginRight: '0vh',
    transform: 'scale(1)',
  }))
  const { children, noNavbar = false, noMenu = false, pathname } = props

  return (
    <div className={classes.root}>
      <SnackbarProviderComponent>
        <SEO pathname={pathname} />
        {!noNavbar && <Navbar path={pathname} setMainSpring={setMainSpring} />}
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        <animated.main className={classes.main} style={mainSpring}>
          {children}
        </animated.main>
        {pathname === '/' ? null : <Footer />}
      </SnackbarProviderComponent>
    </div>
  )
}

export default Layout
