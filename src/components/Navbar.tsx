import { Hidden, List, ListItem, Switch, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Link } from 'gatsby-material-ui-components'
import React, { useCallback, useContext } from 'react'
import { animated, SetUpdateFn, useSpring } from 'react-spring'
import ThemeContext from '../themes/themeContext'
import useIsMobile from '../hooks/useIsMobile'
import useIsDesktop from '../hooks/useIsDesktop'
import { fontFamilySerif } from '../themes'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    width: '100%',
    background: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.common.black}`,
  },
  nav: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    placeItems: 'center center',
    padding: theme.spacing(16, 5, 0),
    [`${theme.breakpoints.up('sm')}`]: {
      // padding: theme.spacing(16, 5, 0),
      padding: theme.spacing(14, 10, 0),
      marginTop: theme.spacing(3),
    },
    [`${theme.breakpoints.up('md')}`]: {
      height: 'max-content',
      rowGap: theme.spacing(1) + 'px',
      gridTemplateColumns: 'repeat(5, 1fr)',
      padding: theme.spacing(14, 8, 0),
    },
    [`${theme.breakpoints.up('lg')}`]: {
      padding: theme.spacing(16, 10, 0),
    },
  },
  navLink: {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(1.5, 0),
    padding: 0,
    [`${theme.breakpoints.up('md')}`]: {
      flex: 1,
      flexFlow: 'column',
      height: '100%',
      width: 'max-content',
      margin: theme.spacing(1, 1),
    },
  },
  darkToggle: {
    [`${theme.breakpoints.up('md')}`]: {
      gridArea: `2 / 1 / 3 / 6`,
      width: '100%',
    },
  },
  navText: {
    textAlign: 'center',
    marginRight: theme.spacing(1),
    fontSize: theme.typography.h5.fontSize,
    fontWeight: 700,
    transition: `color 200ms ease-out`,

    [`${theme.breakpoints.up('md')}`]: {
      order: 0,
      margin: 0,
      fontSize: theme.typography.h4.fontSize,
    },
    [`${theme.breakpoints.up('lg')}`]: {
      fontSize: theme.typography.h3.fontSize,
      '&:hover, &:focus': {
        color: theme.palette.primary.main,
      },
    },
  },
  navSubText: {
    fontSize: theme.typography.subtitle1.fontSize,
    fontFamily: fontFamilySerif,
    marginLeft: theme.spacing(1),
    [`${theme.breakpoints.up('md')}`]: {
      margin: theme.spacing(1, 0, 0),
      fontSize: theme.typography.h5.fontSize,
      order: 1,
      flex: 1,
      whiteSpace: 'nowrap',
      '&:after': {
        content: `''`,
        backgroundColor: theme.palette.text.primary,
        display: 'block',
        height: '1px',
        margin: `${theme.spacing(6)}px auto 0`,
        width: theme.spacing(9),
      },
    },
  },
  horizontal: {
    flex: 1,
    // background: theme.palette.common.black,
    width: '1px',
    [`${theme.breakpoints.up('md')}`]: {
      display: 'none',
    },
  },
  sectionBtn: {
    border: 'none',
    background: 'transparent',
    width: '100vw',
    height: theme.spacing(8) + 'px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    '&:hover ~ button': {
      backgroundColor: `${theme.palette.primary.dark} !important` as string,
      color: theme.palette.getContrastText(theme.palette.primary.dark),
    },
    '&:active, &:hover, &:focus': {
      outline: 'none',
      border: 'none',
    },
  },
  letterBtn: {
    position: 'fixed',
    top: theme.spacing(4),
    left: '50%',
    right: '50%',
    transform: 'translate(-50%, 0)',
    backgroundColor: `${theme.palette.common.white} !important` as string,
    color: theme.palette.common.black,
    padding: theme.spacing(0.4, 1.6),
    zIndex: theme.zIndex.appBar,
    fontSize: theme.typography.h4.fontSize,
    '&:focus, &:hover': {
      backgroundColor: `${theme.palette.primary.dark} !important` as string,
      color: theme.palette.getContrastText(theme.palette.primary.dark),
    },
    [`${theme.breakpoints.up('sm')}`]: {
      padding: theme.spacing(1, 3),
    },
    [`${theme.breakpoints.up('lg')}`]: {
      top: theme.spacing(8),
    },
  },
  label: {
    '& span': {
      fontFamily: fontFamilySerif,
      fontSize: theme.typography.h6.fontSize,
    },
  },
}))

interface Props {
  path: string
  setMainSpring: SetUpdateFn<React.CSSProperties>
}

const Navbar: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  const isMobile = useIsMobile()
  const isDesktop = useIsDesktop()
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const { setMainSpring } = props

  const [navSpring, setNavSpring] = useSpring(() => ({
    height: '0vh',
    zIndex: -1,
  }))
  const toggleNavSpring = useCallback(() => {
    if (navSpring.height.getValue() === '0vh') {
      setNavSpring({
        height: isMobile ? '95vh' : isDesktop ? '50vh' : '60vh',
        zIndex: 10,
      })
      setMainSpring({
        marginTop: isMobile ? '95vh' : isDesktop ? '50vh' : '60vh',
        transform: 'scale(0.83)',
      })
    } else {
      setNavSpring({ height: '0vh', zIndex: -1 })
      setMainSpring({ marginTop: '0vh', transform: 'scale(1)' })
    }
  }, [navSpring.height, setNavSpring, setMainSpring, isMobile, isDesktop])

  return (
    <div>
      <animated.div className={classes.root} style={navSpring}>
        <List component="nav" className={classes.nav}>
          <ListItem
            className={classes.navLink}
            component={Link}
            underline="none"
            color="textPrimary"
            to="/"
          >
            <Typography className={classes.navText}>Home.</Typography>
            <hr className={classes.horizontal} />
            <Typography className={classes.navSubText}>
              Welcome page.
            </Typography>
          </ListItem>
          <ListItem
            className={classes.navLink}
            component={Link}
            underline="none"
            color="textPrimary"
            to="/services"
          >
            <Typography className={classes.navText}>Services.</Typography>
            <hr className={classes.horizontal} />
            <Typography className={classes.navSubText}>What we do.</Typography>
          </ListItem>
          <ListItem
            className={classes.navLink}
            component={Link}
            underline="none"
            color="textPrimary"
            to="/about"
          >
            <Typography className={classes.navText}>About.</Typography>
            <hr className={classes.horizontal} />
            <Typography className={classes.navSubText}>Who we are.</Typography>
          </ListItem>
          <ListItem
            className={classes.navLink}
            component={Link}
            underline="none"
            color="textPrimary"
            to="/contact"
          >
            <Typography className={classes.navText}>Contact.</Typography>
            <hr className={classes.horizontal} />
            <Typography className={classes.navSubText}>
              Get in touch.
            </Typography>
          </ListItem>
          <ListItem
            className={classes.navLink}
            component={Link}
            underline="none"
            color="textPrimary"
            to="/app/login"
          >
            <Typography className={classes.navText}>Login.</Typography>
            <hr className={classes.horizontal} />
            <Typography className={classes.navSubText}>
              For employees.
            </Typography>
          </ListItem>
          <ListItem className={clsx(classes.navLink, classes.darkToggle)}>
            <label htmlFor="colorMode" className={classes.navText}>
              Color Theme.
            </label>
            <hr className={classes.horizontal} />
            <Switch
              id="colorMode"
              checked={!!darkMode}
              onChange={() => setDarkMode?.(!darkMode)}
            />
          </ListItem>
        </List>
      </animated.div>
      <div>
        <Hidden mdDown>
          <button
            aria-hidden={true}
            tabIndex={-1}
            onClick={toggleNavSpring}
            className={classes.sectionBtn}
          ></button>
        </Hidden>
        <Button
          onClick={toggleNavSpring}
          className={classes.letterBtn}
          aria-label="Navigation Toggle"
        >
          NE
        </Button>
      </div>
    </div>
  )
}

export default Navbar
