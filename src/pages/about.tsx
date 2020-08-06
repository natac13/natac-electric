import React from 'react'
import { PageProps, graphql } from 'gatsby'
import Layout from '../components/Layout'
import BackgroundImage from 'gatsby-background-image'
import { FluidObject } from 'gatsby-image'
import { useTheme, Typography, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import TeamCards from '../components/TeamCards'
import { Link } from 'gatsby-material-ui-components'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    minHeight: '100vh',
    height: 'auto',
  },
  bgImage: {
    width: '100vw',
    height: '66vh',
    zIndex: -1,
    [`${theme.breakpoints.up('lg')}`]: {
      height: '88vh',
    },
  },
  title: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: 900,
    marginLeft: '6vw',
    marginBottom: '6vh',
    color: theme.palette.common.white,
    [`${theme.breakpoints.up('sm')}`]: {
      fontSize: theme.typography.h2.fontSize,
    },
    [`${theme.breakpoints.up('lg')}`]: {
      fontSize: theme.typography.h1.fontSize,
    },
  },
  section: {
    minHeight: '66vh',
    width: '100vw',
    // zIndex: 1,
    background: theme.palette.background.default,
    display: 'grid',
    gridTemplateColumns: `1fr`,
    rowGap: theme.spacing(4) + 'px',
    padding: theme.spacing(6, 3),
    [`${theme.breakpoints.up('sm')}`]: {
      padding: theme.spacing(12, 10),
    },
    [`${theme.breakpoints.up('md')}`]: {
      // minHeight: '88vh',
    },
  },
  sectionLabel: {
    borderTop: `1px solid ${theme.palette.text.primary}`,
    borderRight: `1px solid ${theme.palette.text.primary}`,
    width: theme.spacing(15),
    minWidth: 'min-content',
    paddingTop: theme.spacing(3),
    fontVariant: 'small-caps',
    height: 'max-content',
    fontSize: theme.typography.body2.fontSize,
    [`${theme.breakpoints.up('sm')}`]: {
      fontSize: theme.typography.subtitle1.fontSize,
    },
    [`${theme.breakpoints.up('md')}`]: {
      width: theme.spacing(18),
      fontSize: theme.typography.h6.fontSize,
    },
  },
  sectionTitle: {
    fontSize: theme.typography.h4.fontSize,
    maxWidth: 900,
    textAlign: 'center',
    margin: '0 auto',
    [`${theme.breakpoints.up('sm')}`]: {
      fontSize: theme.typography.h3.fontSize,
    },
    [`${theme.breakpoints.up('lg')}`]: {
      fontSize: theme.typography.h2.fontSize,
    },
  },
  history: {
    display: 'grid',
    gridTemplateColumns: `1fr`,
    [`${theme.breakpoints.up('md')}`]: {
      columnGap: theme.spacing(1) + 'px',
      gridTemplateColumns: `1fr 5fr`,
      placeItems: 'baseline center',
    },
    '& div': {
      maxWidth: 900,
      marginTop: theme.spacing(4),
      display: 'grid',
      gridTemplateColumns: `1fr`,
      rowGap: theme.spacing(4) + 'px',
    },
  },
  team: {},
  locations: {
    display: 'grid',
    gridTemplateColumns: `1fr`,
    rowGap: theme.spacing(4) + 'px',
  },
  locationList: {
    padding: 0,
    margin: theme.spacing(2, 0),
    listStyle: 'none',
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(12rem, 1fr))`,
    gap: theme.spacing(4) + 'px',
    '& li': {
      borderTop: `1px solid ${theme.palette.text.primary}`,
      borderBottom: `1px solid ${theme.palette.text.primary}`,
      padding: theme.spacing(3, 0),
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  locationTitle: {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: 700,
  },
  locationContact: {},
}))
interface Prop extends PageProps {
  data: {
    header: {
      name: string
      childImageSharp: {
        fluid: FluidObject
      }
    }
    bgImage2: {
      name: string
      childImageSharp: {
        fluid: FluidObject
      }
    }
    bgImage3: {
      name: string
      childImageSharp: {
        fluid: FluidObject
      }
    }
    allLocationsYaml: {
      nodes: {
        id: string
        email: string
        location: string
      }[]
    }
  }
}

const About: React.FC<Prop> = (props: Prop) => {
  const { data } = props
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Layout pathname={props.path}>
      <section className={classes.wrapper}>
        <BackgroundImage
          fluid={data.header.childImageSharp.fluid}
          alt="Rising sun over city"
          Tag="section"
          title="Est. 1951, London On."
          backgroundColor={theme.palette.background.paper}
          durationFadeIn={300}
          style={{
            width: '100vw',
            height: '80vh',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Typography className={classes.title} variant="h1">
            Est. 1951, London On.
          </Typography>
        </BackgroundImage>

        <section className={clsx(classes.section)} id="history">
          <div className={classes.history}>
            <Typography className={classes.sectionLabel}>
              Our History.
            </Typography>
            <div>
              <Typography className={classes.sectionTitle} variant="h2">
                Our Story Of Where It All Began So Many Years Ago.
              </Typography>
              <Typography variant="body1">
                Äolsharfe umwittert die die wiederholt den euch der lispelnd
                längst ich. Einst folgenden so besitze sie die erste das, alten
                und macht jugendlich mir die. Lispelnd ein busen nach blick,
                menge ihr welt lispelnd um seh blick erste an. Gleich gut
                steigen wie mit sie zug schwebet. Vom längst widerklang
                äolsharfe bringt euch, was gezeigt das euch und verschwand ich.
              </Typography>
              <Typography variant="body1">
                It leave and some said pallas stopped. Beguiling spoken till
                name heaven gently. Wide the token shore said faintly he. The in
                i velvet raven me so floor weary. Dared core than rare.
              </Typography>
              <Typography variant="body1">
                Vom meinem weich zu und schwebet was der ich drängt, ihr jenem
                liebe manche in ist wiederholt trüben schmerz. Wenn nach gezeigt
                zerstreuet herzen und tage versuch. Unbekannten euren noch ist
                glück es wohl selbst das, lebens sang wohl macht folgenden fühlt
                fühlt ein. Mein es geisterreich freundliche froher fühlt ihr
                gesänge die. Neu ich umwittert lispelnd in. Die gut zug euch
                fühl. Gleich das es auf das. Wirklichkeiten die naht einer
                lispelnd freundschaft träne weich. Mild um lied ich und
                schwankende neu die wieder, meinem.
              </Typography>
            </div>
          </div>
        </section>
        <section className={classes.bgImage}>
          <BackgroundImage
            fluid={data.bgImage2.childImageSharp.fluid}
            alt={data.bgImage2.name}
            Tag="section"
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
            }}
            backgroundColor={theme.palette.background.default}
            durationFadeIn={300}
          ></BackgroundImage>
        </section>
        <section className={clsx(classes.section, classes.team)} id="team">
          <Typography className={classes.sectionLabel}>Our Team.</Typography>
          <Typography className={classes.sectionTitle} variant="h2">
            Meet The Men & Women Behind the Curtain In the Land of Oz Who Make
            The Magic Happen.
          </Typography>
          <TeamCards />
        </section>
        <section className={classes.bgImage}>
          <BackgroundImage
            fluid={data.bgImage3.childImageSharp.fluid}
            alt={data.bgImage3.name}
            Tag="section"
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
            }}
            backgroundColor={theme.palette.background.default}
            durationFadeIn={300}
          ></BackgroundImage>
        </section>
        <section className={clsx(classes.section)} id="locations">
          <div className={classes.locations}>
            <Typography className={classes.sectionLabel}>
              Our Location.
            </Typography>
            <Typography className={classes.sectionTitle} variant="h2">
              See Where We Are Located And Where You Can Find Us.
            </Typography>
            <ul className={classes.locationList}>
              {data.allLocationsYaml.nodes.map((node) => (
                <li key={node.id}>
                  <Link
                    underline="none"
                    color="textPrimary"
                    to={`${node.slug}`}
                  >
                    <Typography className={classes.locationTitle}>
                      {node.location}
                    </Typography>
                    <Typography className={classes.locationContact}>
                      {node.email}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    header: file(name: { eq: "city6" }) {
      name
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    bgImage2: file(name: { eq: "grinding-sparks" }) {
      name
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    bgImage3: file(name: { eq: "construction1" }) {
      name
      childImageSharp {
        fluid(
          maxWidth: 1200
          duotone: { highlight: "#7b59a4", shadow: "#14416b" }
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
    allLocationsYaml {
      nodes {
        id
        email
        location
        slug
      }
    }
  }
`

export default About
