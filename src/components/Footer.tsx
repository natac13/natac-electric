import React from 'react'
import {
  makeStyles,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  LinkProps,
} from '@material-ui/core'
import useSite from '../hooks/use-site'
import { Link } from 'gatsby-material-ui-components'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 2),
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    zIndex: 10,
    background: theme.palette.background.default,
    position: 'absolute',
    // bottom: 'min-content',
    left: 0,
    right: 0,
  },
  sectionWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  section: {
    display: 'flex',
    flexFlow: 'column',
  },
  sectionTitle: {
    fontSize: theme.typography.h5.fontSize,
    textAlign: 'center',
    fontWeight: 700,
    letterSpacing: '1px',
  },
  copyright: {
    alignSelf: 'center',
    margin: theme.spacing(1, 0, 9),
    [`${theme.breakpoints.up('sm')}`]: {
      margin: theme.spacing(1, 0, 2),
    },
  },
}))

interface LinkListItemProps extends LinkProps {
  title: string
  to: string
}

const LinkListItem: React.FC<LinkListItemProps> = (
  props: LinkListItemProps
) => (
  <ListItem component={Link} color="textPrimary" underline="none" {...props}>
    <ListItemText>{props.title}</ListItemText>
  </ListItem>
)

const Footer: React.FC = () => {
  const classes = useStyles()
  const siteData = useSite()

  return (
    <>
      <Divider />
      <footer className={classes.root}>
        <section className={classes.sectionWrapper}>
          <section className={classes.section}>
            <Typography className={classes.sectionTitle}>Company</Typography>
            <List>
              <LinkListItem to="/about/#team" title="Team" />
              <LinkListItem to="/about/#history" title="History" />
              <LinkListItem to="/contact" title="Contact Us" />
              <LinkListItem to="/locations" title="Locations" />
            </List>
          </section>
          <section className={classes.section}>
            <Typography className={classes.sectionTitle}>Services</Typography>
            <List>
              <LinkListItem to="/services/#residential" title="Residential" />
              <LinkListItem to="/services/#industrial" title="Industrial" />
              <LinkListItem to="/services/#commercial" title="Commercial" />
              <LinkListItem
                to="/services/#home-automation"
                title="Home Automation"
              />
            </List>
          </section>
          <section className={classes.section}>
            <Typography className={classes.sectionTitle}>Legal</Typography>
            <List>
              <LinkListItem to="/privacy-policy" title="Privacy Policy" />
              <LinkListItem to="/terms-of-service" title="Terms of Services" />
            </List>
          </section>
        </section>
        <section className={classes.copyright}>
          <Link
            variant="caption"
            href="https://github.com/natac13"
            color="textSecondary"
            underline="none"
          >
            {`Copyright © ${
              siteData.siteMetadata.author
            } ${new Date().getFullYear()}`}
          </Link>
        </section>
      </footer>
    </>
  )
}

export default Footer
