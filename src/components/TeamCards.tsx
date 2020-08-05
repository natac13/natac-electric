import React from 'react'
import {
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  capitalize,
  IconButton,
} from '@material-ui/core'
import R from 'ramda'
import { useStaticQuery, graphql } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import Icon from '@mdi/react'
import {
  mdiLinkedin,
  mdiInstagram,
  mdiFacebook,
  mdiYoutube,
  mdiTwitch,
  mdiTwitter,
  mdiInformationOutline,
} from '@mdi/js'
import { Link, Button } from 'gatsby-material-ui-components'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: `1fr`,
    // placeItems: 'center center',
    width: '100%',
    height: '100%',
    gap: theme.spacing(6) + 'px',
    [`${theme.breakpoints.up('sm')}`]: {},
    [`${theme.breakpoints.up('md')}`]: {
      gap: theme.spacing(8) + 'px',
      gridTemplateColumns: `1fr 1fr`,
    },
    [`${theme.breakpoints.up('lg')}`]: {
      gap: theme.spacing(10) + 'px',
      gridTemplateColumns: `1fr 1fr`,
    },
  },
  media: {
    filter: 'grayscale(1)',
    transition: `filter 250ms ease`,
    '&:hover, &:focus, &:active': {
      filter: 'unset',
    },
  },
  cardTitle: {
    fontSize: theme.typography.h5.fontSize,
    [`${theme.breakpoints.up('sm')}`]: {
      fontSize: theme.typography.h4.fontSize,
    },
    [`${theme.breakpoints.up('md')}`]: {},
    [`${theme.breakpoints.up('lg')}`]: {
      fontSize: theme.typography.h3.fontSize,
    },
  },
  cardPosition: {
    fontSize: theme.typography.body1.fontSize,
    [`${theme.breakpoints.up('sm')}`]: {
      fontSize: theme.typography.h6.fontSize,
    },
    [`${theme.breakpoints.up('md')}`]: {},
    [`${theme.breakpoints.up('lg')}`]: {
      fontSize: theme.typography.h5.fontSize,
    },
  },
}))

interface Props {}

interface Data {
  data: {
    allStaffYaml: {
      nodes: {
        email: string
        yearsEmployed: string
        id: string
        name: string
        position: string
        camelCase: string
        slug: string
      }[]
      totalCount: number
    }
    photos: {
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

const PureTeamCards: React.FC<Props & Data> = (props: Props & Data) => {
  const classes = useStyles()
  const { data } = props
  console.log(data)

  return (
    <section className={classes.root}>
      {data.allStaffYaml.nodes.map((node) => {
        const image = R.find((n) => n.name.match(node.camelCase))(
          data.photos.nodes
        )
        return (
          <Card key={node.id}>
            <CardMedia
              className={classes.media}
              component={Img}
              alt={node.name}
              fluid={image.childImageSharp.fluid}
            />
            <CardContent>
              <Typography
                className={classes.cardTitle}
                component="h3"
                align="center"
              >
                {capitalize(node.name)}
              </Typography>
              <Typography
                gutterBottom
                className={classes.cardPosition}
                color="textSecondary"
                component="p"
                align="center"
              >
                {node.position}
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                component="p"
                gutterBottom
              >
                {`Joined: ${node.yearsEmployed}`}
              </Typography>
              <Link
                variant="body2"
                color="primary"
                underline="none"
                to={`https://mail.google.com/mail/?view=cm&fs=1&to=${node.email}&su=From Website`}
                target="_blank"
              >
                {node.email}
              </Link>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <IconButton color="default">
                <Icon path={mdiLinkedin} size={1} title="LinkedIn" />
              </IconButton>
              <IconButton color="default">
                <Icon path={mdiInstagram} size={1} title="Instagram" />
              </IconButton>
              <IconButton color="default">
                <Icon path={mdiYoutube} size={1} title="YouTube" />
              </IconButton>
              <IconButton color="default">
                <Icon path={mdiTwitter} size={1} title="Twitter" />
              </IconButton>
              <Button color="primary" to={node.slug}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        )
      })}
    </section>
  )
}

const TeamCards: React.FC<Props> = (props: Props) => {
  const data = useStaticQuery(graphql`
    query TeamCards {
      allStaffYaml {
        nodes {
          email
          yearsEmployed: employmentStart(fromNow: true)
          employmentStart(formatString: "MMMM DD, YYYY")
          id
          name
          position
          camelCase
          slug
        }
        totalCount
      }
      photos: allFile(filter: { relativePath: { regex: "/^.*-main.jpg/" } }) {
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
  `)
  return <PureTeamCards {...props} data={data}></PureTeamCards>
}

export default TeamCards
