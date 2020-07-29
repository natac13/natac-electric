import { makeStyles, Typography, useTheme } from '@material-ui/core'
import { mdiChevronDoubleDown } from '@mdi/js'
import Icon from '@mdi/react'
import clsx from 'clsx'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { Link } from 'gatsby-material-ui-components'
import debounce from 'lodash/debounce'
import R from 'ramda'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  animated,
  config as rsConfig,
  useSpring,
  useTransition,
} from 'react-spring'
import SwipeableViews from 'react-swipeable-views'
import { bindKeyboard } from 'react-swipeable-views-utils'
import titleSvg from '../assets/svg/title.svg'
import title2Svg from '../assets/svg/title2.svg'
import useIsDesktop from '../hooks/useIsDesktop'
import useIsMobile from '../hooks/useIsMobile'
import { fontFamilySerif } from '../themes'
import ThemeContext from '../themes/themeContext'

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews)

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    height: '100vh',
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
    color: theme.palette.text.primary,
    display: 'flex',
    flexFlow: 'column',
    paddingTop: '16vh',
  },
  page4: {
    color: theme.palette.text.primary,
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
      width: '60vw',
    },
    [`${theme.breakpoints.up('lg')}`]: {
      width: '48vw',
    },
  },
  intro: {
    color: theme.palette.getContrastText(theme.palette.text.primary),
    fontFamily: fontFamilySerif,
    fontSize: theme.typography.h6.fontSize,
    position: 'absolute',
    bottom: theme.spacing(5),
    left: '50%',
    right: '50%',
    transform: 'translateX(-50%)',
    width: 'max-content',
    [`${theme.breakpoints.up('sm')}`]: {
      fontSize: theme.typography.h5.fontSize,
    },
    [`${theme.breakpoints.up('lg')}`]: {
      fontSize: theme.typography.h4.fontSize,
    },
  },
  verticalBar: {
    // width: '1px',
    // height: theme.spacing(6),
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.getContrastText(theme.palette.text.primary),
    position: 'absolute',
    bottom: theme.spacing(0),
    left: '50%',
    right: '50%',
    transform: 'translateX(-50%)',
  },
  pageNumber: {
    zIndex: 100,
    // color: theme.palette.text.primary,
    position: 'absolute',
    marginTop: '16vh',
    // width: '88vw',
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
      color: theme.palette.getContrastText(theme.palette.text.primary),
    },
  },
  pageNumberBar: {
    borderTop: `1px solid ${theme.palette.text.primary}`,
    display: 'inline-block',
    // height: '4px',
    marginLeft: theme.spacing(1),
    transform: `translateY(50%)`,
    width: theme.spacing(8),
    '&.page2': {
      borderTop: `1px solid ${theme.palette.common.white}`,
    },
    '&.page3': {
      borderTop: `1px solid ${theme.palette.getContrastText(
        theme.palette.text.primary
      )}`,
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
    marginTop: '5vh',
    marginRight: 'auto',
    marginLeft: '6vw',
    marginBottom: '4vh',
    '&.page2': {
      color: theme.palette.common.white,
    },
    '&.page3': {
      color: theme.palette.getContrastText(theme.palette.text.primary),
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
    '&.page4': {
      [`${theme.breakpoints.up('lg')}`]: {
        // flexFlow: 'row',
      },
    },
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
      borderColor: theme.palette.getContrastText(theme.palette.text.primary),
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
      color: theme.palette.getContrastText(theme.palette.text.primary),
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
}))

interface Props {}

let clientY: number
/* https://codesandbox.io/s/react-spring-usetrail-example-with-text-wv8g9 */
const Landing: React.FC<Props> = (props: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const { darkMode } = useContext(ThemeContext)
  const data = useStaticQuery(graphql`
    query {
      hero: file(name: { eq: "callum-shaw" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      page2: file(name: { eq: "robert-bock" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      page3: file(name: { eq: "rodion-kutsaev" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      page4: file(name: { eq: "kumiko-shimizu" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
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

  const fadeTransitions = useTransition(page !== 0, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  const [fadeColorSpring, setFadeColor] = useSpring(() => ({
    opacity: 1,
    background: theme.palette.primary.main,
    backgroundImage: 'none',
    config: rsConfig.slow,
  }))

  const pageColorMap: string[] = useMemo(
    () => [
      theme.palette.primary.main,
      theme.palette.common.black,
      theme.palette.primary.dark,
      theme.palette.background.default,
    ],
    [
      theme.palette.primary.main,
      theme.palette.common.black,
      theme.palette.primary.dark,
      theme.palette.background.default,
    ]
  )

  const throttledSetPage = useCallback(
    debounce(
      (page: number) => {
        setFadeColor({ background: pageColorMap[page] })
        setPage(page)
      },
      500,
      {
        leading: true,
        trailing: false,
      }
    ),
    [page, setPage, setFadeColor, pageColorMap]
  )

  const onScroll = useCallback(
    (e: React.WheelEvent) => {
      const up = e.deltaY > 0
      if (up) {
        throttledSetPage(R.min(page + 1, 3))
      } else {
        throttledSetPage(R.max(page - 1, 0))
      }
    },
    [throttledSetPage, page]
  )

  useEffect(() => {
    setFadeColor({ background: pageColorMap[page] })
  }, [theme.palette.type])

  return (
    <animated.section
      className={classes.wrapper}
      style={{
        background: fadeColorSpring.background.interpolate((v) =>
          page === 2
            ? `radial-gradient(circle farthest-corner at 50% 70%, ${theme.palette.secondary.light}, ${theme.palette.primary.dark} 80%)`
            : v
        ),
        opacity: fadeColorSpring.opacity.interpolate([0, 1], [0.5, 1]),
      }}
    >
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

      <BindKeyboardSwipeableViews
        axis="y"
        containerStyle={{ height: '100%', width: '100%' }}
        slideStyle={{ height: '100%', width: '100%' }}
        style={{ height: '100%', width: '100%' }}
        index={page}
        onChangeIndex={(page) => {
          setFadeColor({ background: pageColorMap[page], opacity: 1 })
          setPage(page)
        }}
        onTouchStart={(e) => {
          clientY = e.touches[0].clientY
        }}
        onTouchEnd={(e) => {
          const deltaY = e.changedTouches[0].clientY - clientY
          const up = deltaY < 0
          if (up) {
            throttledSetPage(R.min(page + 1, 3))
          } else if (deltaY === 0) {
          } else {
            throttledSetPage(R.max(page - 1, 0))
          }
        }}
        onWheel={onScroll}
        threshold={1}
        onSwitching={(page, stage) => {
          const pageNumber = +R.compose<number, string, string[], string>(
            R.head,
            R.split('.'),
            R.toString
          )(page)
          if (stage === 'end') {
            return setFadeColor({
              background: pageColorMap[pageNumber],
              opacity: 1,
            })
          }
          const opacity = R.compose(
            R.join(''),
            R.prepend('.'),
            R.last,
            R.split('.'),
            R.toString
          )(page)
          setFadeColor({
            opacity: 1 - +opacity,
            background: pageColorMap[pageNumber],
          })
        }}
        enableMouseEvents
      >
        <section className={classes.hero}>
          <animated.img
            // style={titleSpring}
            src={darkMode ? titleSvg : title2Svg}
            alt={data.site.siteMetadata.title}
            className={classes.title}
          />
          <Typography variant="body2" className={classes.intro}>
            See what we do.
          </Typography>
          <Icon
            className={classes.verticalBar}
            path={mdiChevronDoubleDown}
            size={2}
          />
        </section>

        <section className={clsx(classes.hero, classes.page2)}>
          <Link
            className={clsx(classes.pageTitle, 'page2')}
            to="/about/#history"
            underline="none"
          >
            Strong History.
          </Link>
          <div className={clsx(classes.pageContent, 'page2')}>
            <hr className={clsx(classes.pageContentBar, 'page2')} />
            <Typography className={clsx(classes.pageContentText, 'page2')}>
              {`Established in 1951. Proudly serving the London Ontario Community for ${
                new Date().getFullYear() - 1951
              } years.`}
            </Typography>
            <Img
              fluid={data.page2.childImageSharp.fluid}
              className={clsx(classes.pageImage, 'page2')}
            />
          </div>
        </section>

        <section className={clsx(classes.hero, classes.page3)}>
          <Link
            className={clsx(classes.pageTitle, 'page3')}
            to="/services"
            underline="none"
          >
            Our Services.
          </Link>
          <div className={clsx(classes.pageContent, 'page3')}>
            <hr className={clsx(classes.pageContentBar, 'page3')} />
            <Typography className={clsx(classes.pageContentText, 'page3')}>
              {`We offer licensed electrical services in residential, commercial and the industrial sectors. From home automation to industrial machine wiring, we've got your back! And don't worry we won't tell anyone you're afraid of the dark.`}
            </Typography>
            <Img
              fluid={data.page3.childImageSharp.fluid}
              className={clsx(classes.pageImage)}
            />
          </div>
        </section>

        <section className={clsx(classes.hero, classes.page4)}>
          <Link
            className={clsx(classes.pageTitle, 'page4')}
            to="/about/#team"
            underline="none"
          >
            Dedicated Team.
          </Link>
          <div className={clsx(classes.pageContent, 'page4')}>
            <hr className={clsx(classes.pageContentBar, 'page4')} />
            <Typography className={clsx(classes.pageContentText, 'page4')}>
              {`Being in business for ${
                new Date().getFullYear() - 1951
              } our company has learned the value of great team members, those Electricians that show up each day and give it their all. We thank and treasure each member who has been, is, and will be, apart of our team.`}
            </Typography>
            <Img
              fluid={data.page4.childImageSharp.fluid}
              className={clsx(classes.pageImage)}
            />
          </div>
        </section>
      </BindKeyboardSwipeableViews>
    </animated.section>
  )
}

export default Landing
