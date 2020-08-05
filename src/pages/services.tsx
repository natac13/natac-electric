import React from 'react'
import { PageProps, graphql } from 'gatsby'
import Layout from '../components/Layout'
import { FluidObject } from 'gatsby-image'
import { useTheme, Typography, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import BackgroundImage from 'gatsby-background-image'

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
    [`${theme.breakpoints.up('md')}`]: {
      marginLeft: '15vw',
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
  sectionContent: {
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
}))

interface Props extends PageProps {
  data: {
    header: {
      name: string
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
}

const Services: React.FC<Props> = (props: Props) => {
  const { data } = props
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Layout pathname={props.path}>
      <section className={classes.wrapper}>
        <BackgroundImage
          fluid={data.header.childImageSharp.fluid}
          alt="Electric Services background header"
          Tag="section"
          title="Electric Services."
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
            Electric Services.
          </Typography>
        </BackgroundImage>

        <section className={clsx(classes.section)} id="overall-service">
          <div className={classes.sectionContent}>
            <Typography className={classes.sectionLabel}>
              All Services.
            </Typography>
            <div>
              <Typography className={classes.sectionTitle} variant="h2">
                24/7 Emergency Electrical Service.
              </Typography>
              <Typography variant="body1">
                We pride ourselves in the exceptional service we provide. Calls
                placed to our office will be answered by a real person 24 hours
                a day, 365 days a year.
              </Typography>
              <Typography variant="body1">
                We have well stocked service vehicles operated by highly trained
                and licensed technicians at the ready.
              </Typography>
              <Typography variant="body1">
                Sed magna amet amet diam at no invidunt sadipscing lorem, kasd
                dolores at diam dolore eirmod at erat. Sed et magna nonumy
                dolore consetetur erat. Sit takimata et et justo takimata tempor
                consetetur. Est sit eirmod lorem ut, eirmod est sanctus et sit.
                Rebum diam.
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
        <section className={clsx(classes.section)} id="residential-service">
          <div className={classes.sectionContent}>
            <Typography className={classes.sectionLabel}>
              Residential.
            </Typography>
            <div>
              <Typography className={classes.sectionTitle} variant="h2">
                Residential Service.
              </Typography>
              <Typography variant="body1">
                Whether big or small we provide electrical services for all of
                your residential needs.
              </Typography>
              <Typography variant="body1">
                Duo nonumy erat sed justo rebum amet voluptua amet gubergren,
                nonumy dolor justo ipsum tempor sadipscing et, voluptua eirmod
                nonumy labore et tempor stet. Sadipscing dolor consetetur
                consetetur duo est nonumy rebum duo, consetetur dolore gubergren
                sanctus sed amet labore, diam accusam lorem dolor nonumy. Sea
                sed erat et elitr kasd kasd sit dolore. Sanctus.
              </Typography>
              <ul>
                <li>lighting and receptacles</li>
                <li>panel upgrades</li>
                <li>rewires</li>
                <li>new construction</li>
                <li>home automation</li>
                <li>generators</li>
                <li>residential solar</li>
              </ul>
            </div>
          </div>
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
        <section className={clsx(classes.section)} id="ici-sector-service">
          <div className={classes.sectionContent}>
            <Typography className={classes.sectionLabel}>
              ICI Sectors.
            </Typography>
            <div>
              <Typography className={classes.sectionTitle} variant="h2">
                Commercial and Industrial Service.
              </Typography>
              <Typography variant="body1">
                When it comes to Industrial, Commercial and Institutional
                electrical services we provide everything from small projects
                (including maintenance and design-build) to large construction
                projects. Regardless of size our goal is to safely deliver a
                quality product on time and on budget
              </Typography>
              <Typography variant="body1">
                Et lorem voluptua stet est clita amet sit ipsum et eos. Vero no
                dolor eos consetetur sed, et diam dolore ipsum ea no erat
                sadipscing sit duo. No clita eos no ut, sea est et magna nonumy
                labore est at.
              </Typography>
              <Typography variant="body1">
                Diam accusam dolor lorem at sed. Stet eos gubergren eirmod sit
                et invidunt ut. Aliquyam ut diam dolore sit. Invidunt ut sed ut
                no, gubergren justo dolore eirmod amet sit.
              </Typography>
            </div>
          </div>
        </section>

        <section className={classes.bgImage}>
          <BackgroundImage
            fluid={data.bgImage4.childImageSharp.fluid}
            alt={data.bgImage4.name}
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
        <section className={clsx(classes.section)} id="history">
          <div className={classes.sectionContent}>
            <Typography className={classes.sectionLabel}>
              Panel Builds.
            </Typography>
            <div>
              <Typography className={classes.sectionTitle} variant="h2">
                Panel Building Service.
              </Typography>
              <Typography variant="body1">
                We have a long history of panel building at Ferguson Electric.We
                both design and build in house. Quality of workmanship will be
                exceptional and panel(s) will receive approval from ESA's Field
                Evaluation department.
              </Typography>
              <Typography variant="body1">
                Eos ea tempor takimata takimata erat, accusam et duo eos kasd
                et. Ea sit vero gubergren ea at lorem no, ea sea clita et diam
                diam. Ipsum dolores accusam sadipscing ipsum et dolores, labore
                dolores vero elitr invidunt dolores, sea.
              </Typography>
              <Typography variant="body1">
                Please give us a call to discuss all of your panel building
                needs.
              </Typography>
            </div>
          </div>
        </section>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    header: file(name: { eq: "tools1" }) {
      name
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    bgImage2: file(name: { eq: "construction4" }) {
      name
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    bgImage3: file(name: { eq: "construction3" }) {
      name
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    bgImage4: file(name: { eq: "electrical1" }) {
      name
      childImageSharp {
        fluid(maxWidth: 1200, grayscale: true) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Services
