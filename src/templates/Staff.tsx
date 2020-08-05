import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { PageProps, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import format from 'date-fns/fp/format'
import Img, { FluidObject } from 'gatsby-image'
import Layout from '../components/Layout'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    height: 'auto',
  },
  image: {},
  content: {
    maxWidth: '700px',
    margin: `${theme.spacing(4)}px auto ${theme.spacing(6)}px`,
    padding: theme.spacing(0, 2),
  },
  photos: {
    padding: theme.spacing(0, 2),
    maxWidth: '80vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
    margin: `${theme.spacing(4)}px auto`,
  },
  info: {
    display: 'flex',
    flexFlow: 'column',
    width: '88vw',
  },
  contact: {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(16rem, 1fr))`,
    placeItems: 'center center',
    width: '100%',
  },
  name: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 900,
    color: theme.palette.common.white,
    [`${theme.breakpoints.up('sm')}`]: {
      fontSize: theme.typography.h1.fontSize,
    },
    [`${theme.breakpoints.up('lg')}`]: {
      fontSize: '10rem',
    },
  },
  position: {
    fontSize: theme.typography.h5.fontSize,
    fontFamily: theme.typography.fontFamily,
    [`${theme.breakpoints.up('sm')}`]: {
      fontSize: theme.typography.h4.fontSize,
    },
    [`${theme.breakpoints.up('lg')}`]: {
      fontSize: theme.typography.h3.fontSize,
    },
  },
  email: {
    fontSize: theme.typography.subtitle1.fontSize,
    [`${theme.breakpoints.up('sm')}`]: {
      fontSize: theme.typography.h6.fontSize,
    },
    [`${theme.breakpoints.up('lg')}`]: {
      fontSize: theme.typography.h5.fontSize,
    },
  },
  description: {},
}))

interface Props {
  pageContext: {
    employmentStart: string
    name: string
    position: string
    email: string
    description: string
  }
}

interface Data {
  data: {
    bgImage: {
      id: string
      name: string
      childImageSharp: {
        fluid: FluidObject
      }
    }
    images: {
      nodes: {
        name: string
        id: string
        childImageSharp: {
          fluid: FluidObject
        }
      }[]
    }
  }
}

const Staff: React.FC<Props & PageProps & Data> = (
  props: Props & PageProps & Data
) => {
  const classes = useStyles()
  console.log(props)
  const { pageContext, path, data } = props
  const { employmentStart, name, position, email, description } = pageContext
  return (
    <Layout pathname={path}>
      <section className={classes.root}>
        <BackgroundImage
          fluid={data.bgImage.childImageSharp.fluid}
          alt={name}
          style={{
            width: '100vw',
            height: '80vh',
            display: 'flex',
            alignItems: 'flex-end',
            filter: 'brightness(0.8)',
            position: 'relative',
            padding: '0 0 6vh 6vw',
            color: '#fff',
          }}
          durationFadeIn={300}
          Tag="section"
        >
          <div className={classes.info}>
            <Typography variant="h1" className={classes.name}>
              {name}
            </Typography>
          </div>
        </BackgroundImage>
        <div className={classes.contact}>
          <Typography component="h2" className={classes.position}>
            {position}
          </Typography>
          <Typography component="h2" className={classes.email}>
            {email}
          </Typography>
        </div>
        <div className={classes.content}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
          >{`About ${name}`}</Typography>
          <Typography
            component="p"
            variant="caption"
            color="textSecondary"
            gutterBottom
          >{`Employment Start: ${format('PPP')(
            new Date(employmentStart)
          )}`}</Typography>
          <Typography component="p" className={classes.description}>
            {description}
          </Typography>
        </div>
        <div className={classes.photos}>
          {data.images.nodes.map((n) => (
            <Img fluid={n.childImageSharp.fluid} alt={n.name} key={n.id} />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query StaffPage($regex: String, $bgImageName: String) {
    bgImage: file(name: { eq: $bgImageName }) {
      name
      id
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    images: allFile(
      filter: {
        relativeDirectory: { regex: $regex }
        name: { ne: $bgImageName }
      }
    ) {
      nodes {
        name
        id
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

export default Staff
