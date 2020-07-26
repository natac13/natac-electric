import React, { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, Button, IconButton } from 'gatsby-material-ui-components'
import clsx from 'clsx'
import {
  Hidden,
  AppBar,
  Toolbar,
  Tooltip,
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
  Divider,
} from '@material-ui/core'
import Icon from '@mdi/react'
import {
  // mdiAccountCircle,
  mdiGithub,
  mdiWhiteBalanceSunny,
  mdiBrightness3,
  mdiLightningBolt,
  mdiInformation,
  mdiAt,
  mdiLoginVariant,
  mdiExitToApp,
  mdiLogoutVariant,
  mdiMenu,
  mdiAccount,
  mdiAccountOutline,
  mdiAccountCircleOutline,
} from '@mdi/js'
import ThemeContext from '../themes/themeContext'
import { navigate } from 'gatsby'
import useSite from '../hooks/use-site'
import { logout, isLoggedIn } from '../services/auth'
import { Auth } from 'aws-amplify'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    position: 'relative',
  },
  title: {
    display: 'flex',
    flex: 1,
  },
  homeLink: {
    textDecoration: 'none',
    padding: theme.spacing(1),
    '&:hover, &:focus': {
      textDecoration: 'none',
      textShadow: theme.shadows[10],
      outline: `1px solid ${theme.palette.primary.main}`,
    },
  },
  mainNav: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around',
  },
  navLink: {},
  iconsDesktop: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
  },
  icon: {},
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}))

interface Props {
  path: string
}

const Navbar: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  const siteData = useSite()
  const { path } = props
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState(null)
  const isAccountMenuOpen = Boolean(accountMenuAnchorEl)
  const handleAccountMenuClose = () => {
    setAccountMenuAnchorEl(null)
  }

  const handleAccountMenuOpen = (event) => {
    setAccountMenuAnchorEl(event.currentTarget)
  }
  const accountMenuId = 'account-menu'
  const [stage, setStage] = useState<0 | 1>(0)
  const { darkMode, setDarkMode } = useContext(ThemeContext)

  const renderAccountMenu = (
    <Menu
      classes={{
        paper: classes.mobileMenu,
      }}
      id={accountMenuId}
      onClose={handleAccountMenuClose}
      open={isAccountMenuOpen}
      anchorEl={accountMenuAnchorEl}
      keepMounted
      getContentAnchorEl={null}
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <MenuItem
        component={Link}
        to="/app/profile"
        onClick={handleAccountMenuClose}
      >
        {/* <IconButton>
          <ChevronIcon />
        </IconButton> */}
        <p>User Profile</p>
      </MenuItem>
      <Divider />
      <MenuItem
        // component={Link}
        // to="/app/profile"
        onClick={async () => {
          handleAccountMenuClose()
          logout(() => navigate('/app/login'))
        }}
      >
        {/* <IconButton>
          <ChevronIcon />
        </IconButton> */}
        <p>Logout</p>
      </MenuItem>
      {/* <MenuItem className={classes.mobileDarkModeToggle}>
        <FormControlLabel
          control={
            <Switch
              aria-label={'Toggle Color mode'}
              onClick={() => setDarkMode(!darkMode)}
              checked={darkMode}
            />
          }
          label={darkMode ? 'Dark Mode' : 'Light Mode'}
        />
      </MenuItem>
      <Divider /> */}
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar color="transparent" position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Link
              variant="h6"
              noWrap
              color="textPrimary"
              to="/"
              className={classes.homeLink}
            >
              {siteData.siteMetadata.title}
            </Link>
          </div>
          <Hidden xsDown>
            <nav className={classes.mainNav} id="main-nav">
              <Button
                className={classes.navLink}
                to="/services"
                color="primary"
              >
                Services
              </Button>
              <Button className={classes.navLink} to="/about" color="primary">
                About
              </Button>
              <Button className={classes.navLink} to="/contact" color="primary">
                Contact
              </Button>
            </nav>
          </Hidden>
          <nav className={classes.iconsDesktop} id="icon-nav">
            <Tooltip
              arrow
              placement="bottom"
              title={`Toggle ${darkMode ? 'Light Mode' : 'Dark Mode'}`}
            >
              <IconButton
                onClick={() => setDarkMode?.(!darkMode)}
                className={clsx(classes.icon)}
                aria-label={'Toggle Color mode'}
              >
                {darkMode ? (
                  <Icon path={mdiWhiteBalanceSunny} size={1} />
                ) : (
                  <Icon path={mdiBrightness3} size={1} rotate={33} />
                )}
              </IconButton>
            </Tooltip>
            {isLoggedIn() ? (
              <Tooltip arrow placement="bottom" title="User Account">
                <IconButton
                  className={classes.icon}
                  onClick={handleAccountMenuOpen}
                >
                  <Icon path={mdiAccountCircleOutline} size={1} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip arrow placement="bottom" title="Employee Login">
                <IconButton className={classes.icon} to="/app/login">
                  <Icon path={mdiLoginVariant} size={1} />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip arrow placement="bottom" title="Github">
              <IconButton
                className={classes.icon}
                to={siteData.siteMetadata.siteGithub}
              >
                <Icon path={mdiGithub} size={1} />
              </IconButton>
            </Tooltip>
          </nav>
        </Toolbar>
      </AppBar>
      <Hidden smUp>
        <BottomNavigation
          value={path}
          onChange={(event, newValue) => {
            navigate(`${newValue}`)
          }}
          showLabels
          className={classes.bottomNav}
        >
          <BottomNavigationAction
            label="Services"
            value="/services/"
            icon={<Icon path={mdiLightningBolt} size={1} />}
          />
          <BottomNavigationAction
            label="About"
            value="/about/"
            icon={<Icon path={mdiInformation} size={1} />}
          />
          <BottomNavigationAction
            label="Contact"
            value="/contact/"
            icon={<Icon path={mdiAt} size={1} />}
          />
        </BottomNavigation>
      </Hidden>
      {renderAccountMenu}
    </div>
  )
}

export default Navbar
