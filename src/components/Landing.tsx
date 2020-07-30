import { makeStyles, Typography, useTheme } from '@material-ui/core'
import {
  mdiCheckboxBlankCircle,
  mdiCheckboxBlankCircleOutline,
  mdiChevronDoubleDown,
} from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { graphql, useStaticQuery } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { IconButton, Link } from 'gatsby-material-ui-components'
import debounce from 'lodash/debounce'
import R from 'ramda'
import React, { useState } from 'react'
import { animated, config as rsConfig, useTransition } from 'react-spring'
import SwipeableViews from 'react-swipeable-views'
import { bindKeyboard } from 'react-swipeable-views-utils'
import { useDeepCompareCallback } from 'use-deep-compare'
import titleSvg from '../assets/svg/title.svg'
import { fontFamilySerif } from '../themes'

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews)

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    marginBottom: theme.spacing(100),
    zIndex: -1,
  },
  hero: {
    background: 'transparent',
    height: '100%',
    width: '100%',
    display: 'grid',
    placeItems: 'center center',
  },
  page2: {
    color: theme.palette.common.white,
    display: 'flex',
    flexFlow: 'column',
    paddingTop: '16vh',
  },
  page3: {
    color: theme.palette.background.default,
    display: 'flex',
    flexFlow: 'column',
    paddingTop: '16vh',
  },
  page4: {
    color: theme.palette.background.default,
    display: 'flex',
    flexFlow: 'column',
    paddingTop: '16vh',
  },
  title: {
    width: '88vw',
    height: 'auto',
    zIndex: 1,
    transform: 'translateY(-6vh)',
    [`${theme.breakpoints.up('sm')}`]: {
      width: '72vw',
    },
    [`${theme.breakpoints.up('md')}`]: {
      transform: 'translateY(0vh)',
      width: '60vw',
    },
    [`${theme.breakpoints.up('lg')}`]: {
      width: '48vw',
    },
  },
  intro: {
    color: `rgba(0, 0, 0, .87)`,
    fontFamily: fontFamilySerif,
    fontSize: theme.typography.h6.fontSize,
    position: 'absolute',
    bottom: theme.spacing(10),
    left: '50%',
    right: '50%',
    transform: 'translateX(-50%)',
    width: 'max-content',
    [`${theme.breakpoints.up('sm')}`]: {
      fontSize: theme.typography.h6.fontSize,
    },
    [`${theme.breakpoints.up('lg')}`]: {
      fontSize: theme.typography.h5.fontSize,
    },
  },
  verticalBar: {
    color: `rgba(0, 0, 0, .87)`,
    position: 'absolute',
    bottom: theme.spacing(5),
    left: '50%',
    right: '50%',
    transform: 'translateX(-50%)',
  },
  pageNumber: {
    zIndex: 100,
    position: 'absolute',
    marginTop: '16vh',
    marginLeft: '6vw',
    marginRight: 'auto',
    display: 'flex',
  },
  pageNumberText: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 700,
    fontSize: theme.typography.h6.fontSize,
    color: theme.palette.text.primary,
    '&.page2': {
      color: theme.palette.common.white,
    },
    '&.page3': {
      color: theme.palette.common.white,
    },
    '&.page4': {
      color: theme.palette.common.white,
    },
  },
  pageNumberBar: {
    borderTop: `1px solid ${theme.palette.text.primary}`,
    display: 'inline-block',
    marginLeft: theme.spacing(1),
    transform: `translateY(50%)`,
    width: theme.spacing(8),
    '&.page2': {
      borderTop: `1px solid ${theme.palette.common.white}`,
    },
    '&.page3': {
      borderTop: `1px solid ${theme.palette.common.white}`,
    },
    '&.page4': {
      borderTop: `1px solid ${theme.palette.common.white}`,
    },
  },
  hidden: {
    display: 'none',
  },
  pageTitle: {
    zIndex: 1,
    position: 'relative',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginTop: '1vh',
    marginRight: 'auto',
    marginBottom: '1vh',
    marginLeft: '6vw',
    '&.page2': {
      color: theme.palette.common.white,
    },
    '&.page3': {
      color: theme.palette.common.white,
    },
    '&.page4': {
      color: theme.palette.common.white,
    },
  },
  pageContent: {
    position: 'relative',
    marginLeft: '6vw',
    width: '88vw',
    marginRight: 'auto',
    overflowY: 'hidden',
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  pageContentBar: {
    width: theme.spacing(18),
    marginLeft: 0,
    marginTop: 0,
    marginBottom: theme.spacing(2),
    '&.page2': {
      borderColor: theme.palette.common.white,
    },
    '&.page3': {
      borderColor: theme.palette.common.white,
    },
    '&.page4': {
      borderColor: theme.palette.common.white,
    },
  },
  pageContentText: {
    ...theme.typography.body1,
    width: '75%',
    fontFamily: fontFamilySerif,
    '&.page2': {
      color: theme.palette.common.white,
    },
    '&.page3': {
      color: theme.palette.common.white,
    },
    '&.page4': {
      color: theme.palette.common.white,
    },
    [`${theme.breakpoints.up('sm')}`]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
  pageImage: {
    width: '100%',
    margin: `auto auto 4vh`,
    transformOrigin: 'bottom',
    filter: 'brightness(0.9)',
    objectPosition: 'bottom',

    [`${theme.breakpoints.up('md')}`]: {
      width: '60%',
    },
    [`${theme.breakpoints.up('lg')}`]: {
      width: '50%',
    },
  },
  dots: {
    position: 'fixed',
    top: '50%',
    right: '2vw',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexFlow: 'column',
    height: '15vh',
    justifyContent: 'space-around',
    zIndex: theme.zIndex.appBar,
    '& svg': {
      color: theme.palette.common.white,
    },
    '&.page2 svg': {
      color: theme.palette.common.white,
    },
    '&.page3 svg': {
      color: theme.palette.common.white,
    },
    '&.page4 svg': {
      color: theme.palette.common.white,
    },
  },
  bgImage: {
    width: '100%',
    height: '100%',
    filter: `brightness(0.7)`,
    '&.page1': {
      filter: 'unset',
    },
  },
}))

interface Props {}

let clientY: number

const pages = [
  {
    title: `Strong History.`,
    link: `/about/#history`,
    text: `Established in 1951. Proudly serving the London Ontario Community for ${
      new Date().getFullYear() - 1951
    } years.`,
  },
  {
    title: `More than Lights.`,
    link: `/services`,
    text: `We offer licensed electrical services in residential, commercial and the industrial sectors. From home automation to industrial machine wiring, we've got your back! And don't worry we won't tell anyone you're afraid of the dark.`,
  },
  {
    title: `Dedicated Team.`,
    link: `/about/#team`,
    text: `Being in business for ${
      new Date().getFullYear() - 1951
    } our company has learned the value of great team members, those Electricians that show up each day and give it their all. We thank and treasure each member who has been, is, and will be, apart of our team.`,
  },
]
/* https://codesandbox.io/s/react-spring-usetrail-example-with-text-wv8g9 */
const Landing: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const data = useStaticQuery(graphql`
    query {
      page2: file(name: { eq: "robert-bock" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      page3: file(name: { eq: "piotr-chrobot" }) {
        childImageSharp {
          fluid(maxWidth: 1200, grayscale: false) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      page4: file(name: { eq: "matteo-vistocco" }) {
        childImageSharp {
          fluid(
            maxWidth: 1200
            duotone: { highlight: "#a783d2", shadow: "#2e69a2" }
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
    }
  `)
  const [page, setPage] = useState(0)

  const bgImages = [
    [
      `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.main})`,
    ],
    data.page2.childImageSharp.fluid,
    data.page3.childImageSharp.fluid,
    data.page4.childImageSharp.fluid,
  ]

  const bgTransitions = useTransition(page, (v) => v, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const fadeTransitions = useTransition(page !== 0, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: rsConfig.slow,
  })

  const throttledSetPage = useDeepCompareCallback(
    debounce(
      (page: number) => {
        setPage(page)
      },
      400,
      {
        leading: true,
        trailing: false,
      }
    ),
    [page, setPage]
  )

  const onScroll = useDeepCompareCallback(
    (e: React.WheelEvent) => {
      const up = e.deltaY > 0
      if (up) {
        throttledSetPage(R.min(page + 1, pages.length))
      } else {
        throttledSetPage(R.max(page - 1, 0))
      }
    },
    [throttledSetPage, page]
  )

  return (
    <section className={classes.wrapper}>
      {bgTransitions.map(({ item, key, props }) => {
        const image = bgImages[item]
        return (
          <animated.div
            key={key}
            style={{
              ...props,
              zIndex: -1,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <BackgroundImage
              fluid={image}
              className={clsx(classes.bgImage, `page${page + 1}`)}
              style={{ width: '100%', height: '100%' }}
              backgroundColor={theme.palette.background.default}
              Tag="section"
              alt="Background Image"
              durationFadeIn={200}
              critical
            />
          </animated.div>
        )
      })}
      {fadeTransitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              className={clsx(page === 0 && classes.hidden, classes.pageNumber)}
              style={props}
            >
              <Typography
                className={clsx(classes.pageNumberText, `page${page + 1}`)}
              >
                {`0${page}.`}
              </Typography>
              <span
                className={clsx(classes.pageNumberBar, `page${page + 1}`)}
              />
            </animated.div>
          )
      )}
      {fadeTransitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              className={clsx(classes.dots, `page${page + 1}`)}
              style={props}
            >
              {[...Array(pages.length + 1)].map((_, i) => (
                <IconButton key={i} onClick={() => throttledSetPage(i)}>
                  <Icon
                    path={
                      i === page
                        ? mdiCheckboxBlankCircle
                        : mdiCheckboxBlankCircleOutline
                    }
                    size={0.75}
                  />
                </IconButton>
              ))}
            </animated.div>
          )
      )}
      \
      <BindKeyboardSwipeableViews
        springConfig={{
          delay: '0s',
          duration: '0.8s',
          easeFunction: 'ease',
        }}
        axis="y"
        containerStyle={{ height: '100%', width: '100%' }}
        slideStyle={{ height: '100%', width: '100%' }}
        style={{ height: '100%', width: '100%' }}
        index={page}
        onChangeIndex={(page) => {
          // setFadeColor({ background: pageColorMap[page], opacity: 1 })
          setPage(page)
        }}
        onTouchStart={(e) => {
          clientY = e.touches[0].clientY
        }}
        onTouchEnd={(e) => {
          const deltaY = e.changedTouches[0].clientY - clientY
          const up = deltaY < 0
          if (up) {
            throttledSetPage(R.min(page + 1, pages.length))
          } else if (deltaY === 0) {
          } else {
            throttledSetPage(R.max(page - 1, 0))
          }
        }}
        onWheel={onScroll}
        threshold={1}
      >
        <section className={classes.hero}>
          <img
            src={titleSvg}
            alt={data.site.siteMetadata.title}
            className={classes.title}
          />
          <Typography variant="body2" className={classes.intro}>
            Discover more.
          </Typography>
          <Icon
            className={classes.verticalBar}
            path={mdiChevronDoubleDown}
            size={1.5}
          />
        </section>

        {pages.map((pd, i) => (
          <section
            className={clsx(classes.hero, classes[`page${i + 2}`])}
            key={i}
          >
            <Link
              className={clsx(classes.pageTitle, `page${i + 2}`)}
              to={pd.link}
              underline="none"
            >
              {pd.title}
            </Link>
            <div className={clsx(classes.pageContent, `page${i + 2}`)}>
              <hr className={clsx(classes.pageContentBar, `page${i + 2}`)} />
              <Typography
                className={clsx(classes.pageContentText, `page${i + 2}`)}
              >
                {pd.text}
              </Typography>
              {/* <Img
                fluid={data[`page${i + 2}`].childImageSharp.fluid}
                className={clsx(classes.pageImage, `page${i + 2}`)}
              /> */}
            </div>
          </section>
        ))}
      </BindKeyboardSwipeableViews>
    </section>
  )
}

export default Landing
