import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import Layout from '../components/Layout'
import { PageProps, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import Img, { FluidObject } from 'gatsby-image'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    height: 'auto',
  },
  content: {
    maxWidth: '700px',
    margin: `${theme.spacing(4)}px auto ${theme.spacing(6)}px`,
    padding: theme.spacing(0, 2),
  },
  photos: {
    padding: theme.spacing(0, 6),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
    margin: `${theme.spacing(4)}px auto`,
    gap: theme.spacing(6) + 'px',
  },
  info: {
    display: 'flex',
    flexFlow: 'column',
    width: '88vw',
  },
  location: {
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
  contact: {
    margin: theme.spacing(4, 0),
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(16rem, 1fr))`,
    placeItems: 'center center',
    width: '100%',
  },
  address: {},
  phone: {},
  email: {},
  description: {},
  specialMessage: {},
}))

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

interface Props extends PageProps {
  pageContext: {
    description: string
    email: string
    id: string
    location: string
    phone: string
    slug: string
    specialMessage: string
    kebabCase: string
    address: string
  }
}

const Location: React.FC<Props & Data> = (props: Props & Data) => {
  const classes = useStyles()
  const { path, pageContext, data } = props
  const {
    location,
    description,
    email,
    phone,
    specialMessage,
    address,
  } = pageContext

  return (
    <Layout pathname={path}>
      <section className={classes.root}>
        <BackgroundImage
          fluid={data.bgImage.childImageSharp.fluid}
          alt={data.bgImage.name}
          style={{
            width: '100vw',
            height: '80vh',
            display: 'flex',
            alignItems: 'flex-end',
            filter: 'brightness(0.9)',
            position: 'relative',
            padding: '0 0 6vh 6vw',
            color: '#fff',
          }}
          durationFadeIn={300}
          Tag="section"
        >
          <div className={classes.info}>
            <Typography variant="h1" className={classes.location}>
              {location}
            </Typography>
          </div>
        </BackgroundImage>
        <div className={classes.contact}>
          <Typography component="h2" className={classes.address}>
            {address}
          </Typography>
          <Typography component="h2" className={classes.phone}>
            {phone}
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
          >{`Welcome to Natac Electric ${location}`}</Typography>
          <Typography component="p" className={classes.description}>
            {description}
          </Typography>
          <Typography component="p" className={classes.specialMessage}>
            {specialMessage}
          </Typography>
        </div>
        <div className={classes.photos}>
          {data.images.nodes.map((n) => (
            <Img
              fluid={n.childImageSharp.fluid}
              alt={n.name}
              key={n.id}
              imgStyle={{
                height: 'auto',
              }}
            />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query LocationPage($regex: String, $bgImageName: String) {
    bgImage: file(name: { eq: $bgImageName }) {
      name
      id
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    images: allFile(filter: { name: { ne: $bgImageName, regex: $regex } }) {
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

export default Location
