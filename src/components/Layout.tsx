import React from 'react'

// import Header from "./header"
import SEO from './SEO'
import Navbar from './Navbar'
import Footer from './Footer'
import { makeStyles } from '@material-ui/core'
import { useSpring, animated, config as rsConfig } from 'react-spring'

const useStyles = makeStyles((theme) => ({
  root: {},
  main: {
    margin: `0`,
    minHeight: '100vh',
    overflow: 'hidden',
  },
  shadowBorder: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer,
    background: 'transparent',
    pointerEvents: 'none',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderColor: theme.palette.grey[400],
    borderStyle: 'solid',
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
    // clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  }))
  const [frameSpring, setFrameSpring] = useSpring(() => ({
    borderRightWidth: `0px`,
    borderLeftWidth: `0px`,
    borderTopWidth: `0px`,
    borderBottomWidth: `0px`,
    config: rsConfig.stiff,
  }))

  const { children, noNavbar = false, noMenu = false, pathname } = props

  return (
    <div className={classes.root}>
      <SEO pathname={pathname} />
      {!noNavbar && (
        <Navbar
          path={pathname}
          setMainSpring={setMainSpring}
          setFrameSpring={setFrameSpring}
        />
      )}
      <animated.main className={classes.main} style={mainSpring}>
        {children}
      </animated.main>
      {pathname === '/' ? null : <Footer />}
      <animated.div className={classes.shadowBorder} style={frameSpring} />
    </div>
  )
}

export default Layout
