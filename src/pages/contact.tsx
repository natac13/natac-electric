import React, { useCallback } from 'react'
import { PageProps, graphql } from 'gatsby'
import Layout from '../components/Layout'
import {
  makeStyles,
  useTheme,
  Typography,
  List,
  ListItem,
  TextField,
  MenuItem,
  Divider,
} from '@material-ui/core'
import BackgroundImage from 'gatsby-background-image'
import { animated } from 'react-spring/renderprops-universal'
import { FluidObject } from 'gatsby-image'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, Button } from 'gatsby-material-ui-components'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    minHeight: '100vh',
    height: 'auto',
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
  contacts: {
    display: 'grid',
    placeItems: 'center center',
    gridTemplateColumns: `repeat(auto-fit, minmax(18rem, 1fr))`,
    gap: theme.spacing(8) + 'px',
  },
  contactItem: {
    display: 'grid',
    gap: theme.spacing(3) + 'px',
  },
  form: {
    display: 'grid',
    gap: theme.spacing(3) + 'px',
    '& button': {
      height: '3.2rem',
    },
  },
}))

interface Props {}

interface Data {
  data: {
    header: {
      name: string
      childImageSharp: {
        fluid: FluidObject
      }
    }
    allLocationsYaml: {
      nodes: {
        id: string
        email: string
        phone: string
        address: string
        slug: string
        location: string
      }[]
    }
  }
}

interface FormValues {
  /** Dummy Field for bots */
  company: string
  name: string
  email: string
  service: 'Residential' | 'Commercial' | 'Industrial'
  description: string
}

const AnimatedTypography = animated(Typography)

const defaultValues: FormValues = {
  company: '',
  name: '',
  email: '',
  service: 'Commercial',
  description: '',
}

const Contact: React.FC<PageProps & Data> = (props: PageProps & Data) => {
  const classes = useStyles()
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const { data } = props

  // const resolver = yupResolver()

  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    // resolver,
    defaultValues,
  })

  const { register, handleSubmit, reset } = form

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (values) => {
      if (values.company !== '') {
        enqueueSnackbar(
          'You appear to be a bot since a hidden field was filled out',
          {
            variant: 'error',
          }
        )
        return Promise.resolve()
      }
      enqueueSnackbar('Thank you, we will be in touch shortly', {
        variant: 'success',
      })
      reset(defaultValues)
      return Promise.resolve()
    },
    [reset, enqueueSnackbar]
  )

  return (
    <Layout pathname={props.path}>
      <section className={classes.wrapper}>
        <BackgroundImage
          fluid={data.header.childImageSharp.fluid}
          alt="Rising sun over city"
          Tag="section"
          title="Contact Us."
          backgroundColor={theme.palette.background.paper}
          durationFadeIn={300}
          style={{
            width: '100vw',
            height: '80vh',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <AnimatedTypography className={classes.title} variant="h1">
            Contact Us.
          </AnimatedTypography>
        </BackgroundImage>
        <section className={classes.section} id="contact">
          <div className={classes.sectionContent}>
            <Typography className={classes.sectionLabel}>
              Our History.
            </Typography>
            <div>
              <Typography className={classes.sectionTitle} variant="h2">
                We are always looking for new friends.
              </Typography>
              <List className={classes.contacts}>
                {data.allLocationsYaml.nodes.map((n) => (
                  <ListItem key={n.id} className={classes.contactItem}>
                    <Link
                      variant="h6"
                      align="center"
                      underline="none"
                      color="textPrimary"
                      to={n.slug}
                    >
                      {n.location}
                    </Link>
                    <Typography align="center" color="textSecondary">
                      {n.address}
                    </Typography>
                    <Typography>{n.email}</Typography>
                    <Typography>{n.phone}</Typography>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </section>
        <Divider color="textPrimary" />

        <section className={classes.section} id="contact-form">
          <div className={classes.sectionContent}>
            <Typography className={classes.sectionLabel}>
              Send us an Email.
            </Typography>
            <div>
              <Typography className={classes.sectionTitle} variant="h2">
                Tell us how we can help.
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  id="contact-form-company"
                  name="company"
                  type="text"
                  margin="dense"
                  label="Your Company"
                  color="primary"
                  style={{
                    display: 'none',
                  }}
                  aria-label="Do not fill out"
                  aria-hidden="true"
                  inputRef={register}
                />
                <TextField
                  id="contact-form-name"
                  name="name"
                  type="text"
                  margin="dense"
                  required
                  label="Your Name"
                  color="primary"
                  inputRef={register({ required: true, maxLength: 120 })}
                />
                <TextField
                  id="contact-form-email"
                  name="email"
                  label="Your Email"
                  color="primary"
                  type="email"
                  required
                  margin="dense"
                  inputRef={register({ required: true })}
                />
                <TextField
                  id="contact-form-service"
                  name="service"
                  label="Service Type"
                  select
                  required
                  helperText="Please select the service type for your inquiry"
                  margin="dense"
                  color="primary"
                  inputRef={register({ required: true })}
                  defaultValue={defaultValues.service}
                >
                  <MenuItem value={'Residential'}>Residential</MenuItem>
                  <MenuItem value={'Commercial'}>Commercial</MenuItem>
                  <MenuItem value={'Industrial'}>Industrial</MenuItem>
                </TextField>
                <TextField
                  id="contact-form-description"
                  name="description"
                  label="Your Inquiry"
                  multiline
                  required
                  rows={3}
                  rowsMax={6}
                  margin="dense"
                  color="primary"
                  inputRef={register({ required: true, maxLength: 3000 })}
                />
                <Typography variant="caption" color="textSecondary">
                  Please read over Natac Electric{' '}
                  <Link to="/privacy-policy">Privacy Policy</Link> so you can be
                  assured of how we use your personal information.
                </Typography>
                <Button type="submit" variant="contained" color="primary">
                  Contact Us.
                </Button>
              </form>
            </div>
          </div>
        </section>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    header: file(name: { eq: "construction2" }) {
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
        phone
        address
        location
        slug
      }
    }
  }
`

export default Contact
