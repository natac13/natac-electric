// import React, { useCallback, useState, useRef, useContext } from 'react'
// import { makeStyles, Typography, TypographyProps } from '@material-ui/core'
// import Img from 'gatsby-image'
// import { useStaticQuery, graphql } from 'gatsby'
// import {
//   animated,
//   useSpring,
//   OpaqueInterpolation,
//   useTrail,
//   config as rsConfig,
//   useChain,
//   ReactSpringHook,
//   useTransition,
// } from 'react-spring'
// import R from 'ramda'
// import useEventListener from '@use-it/event-listener'
// import getScrollPercent from '../utils/getScrollPercentage'
// import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
// import light1 from '../assets/svg/lightbulb3.svg'
// import light2 from '../assets/svg/lightbulb4.svg'
// import color from 'color'
// import titleSvg from '../assets/svg/title.svg'
// import title2Svg from '../assets/svg/title2.svg'
// import debounce from 'lodash/debounce'
// import useIsMobile from '../hooks/useIsMobile'
// import useIsDesktop from '../hooks/useIsDesktop'
// import { mdiArrowDown, mdiChevronDoubleDown } from '@mdi/js'
// import Icon from '@mdi/react'
// import ThemeContext from '../themes/themeContext'
// import { fontFamilySerif } from '../themes'
// import clsx from 'clsx'
// import { Link } from 'gatsby-material-ui-components'

// const useStyles = makeStyles((theme) => ({
//   wrapper: {
//     position: 'relative',
//     height: '100vh',
//     overflow: 'hidden',
//     marginBottom: theme.spacing(100),
//     zIndex: -1,
//   },
//   hero: {
//     position: 'absolute',
//     background: theme.palette.primary.main,
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: '100%',
//     width: '100%',
//     display: 'grid',
//     placeItems: 'center center',
//     zIndex: -1,
//   },
//   page2: {
//     // position: 'relative',
//     background: theme.palette.common.black,
//     color: theme.palette.common.white,
//     display: 'flex',
//     flexFlow: 'column',
//     paddingTop: '20vh',
//   },
//   page3: {
//     background: theme.palette.primary.main,
//   },
//   title: {
//     width: '88vw',
//     height: 'auto',
//     zIndex: 1,
//     transform: 'translateY(-6vh)',
//     [`${theme.breakpoints.up('sm')}`]: {
//       width: '72vw',
//     },
//     [`${theme.breakpoints.up('md')}`]: {
//       width: '60vw',
//     },
//     [`${theme.breakpoints.up('lg')}`]: {
//       width: '48vw',
//     },
//   },
//   intro: {
//     color: theme.palette.getContrastText(theme.palette.text.primary),
//     fontFamily: fontFamilySerif,
//     fontSize: theme.typography.h6.fontSize,
//     position: 'absolute',
//     bottom: theme.spacing(5),
//     left: '50%',
//     right: '50%',
//     transform: 'translateX(-50%)',
//     width: 'max-content',
//     [`${theme.breakpoints.up('sm')}`]: {
//       fontSize: theme.typography.h5.fontSize,
//     },
//     [`${theme.breakpoints.up('lg')}`]: {
//       fontSize: theme.typography.h4.fontSize,
//     },
//   },
//   verticalBar: {
//     // width: '1px',
//     // height: theme.spacing(6),
//     // backgroundColor: theme.palette.common.black,
//     color: theme.palette.getContrastText(theme.palette.text.primary),
//     position: 'absolute',
//     bottom: theme.spacing(0),
//     left: '50%',
//     right: '50%',
//     transform: 'translateX(-50%)',
//   },
//   pageNumber: {
//     zIndex: 100,
//     // color: theme.palette.text.primary,
//     position: 'absolute',
//     marginTop: '20vh',
//     // width: '88vw',
//     marginLeft: '6vw',
//     marginRight: 'auto',
//     display: 'flex',
//   },
//   pageNumberText: {
//     fontFamily: theme.typography.fontFamily,
//     fontWeight: 700,
//     fontSize: theme.typography.h6.fontSize,
//     '&.page2': {
//       color: theme.palette.common.white,
//     },
//   },
//   pageNumberBar: {
//     borderTop: `1px solid ${theme.palette.text.primary}`,
//     display: 'inline-block',
//     // height: '4px',
//     marginLeft: theme.spacing(1),
//     transform: `translateY(50%)`,
//     width: theme.spacing(8),
//     '&.page2': {
//       borderTop: `1px solid ${theme.palette.common.white}`,
//     },
//   },
//   hidden: {
//     display: 'none',
//   },
//   pageTitle: {
//     zIndex: 1,
//     position: 'relative',
//     fontFamily: theme.typography.fontFamily,
//     fontSize: theme.typography.h3.fontSize,
//     fontWeight: 700,
//     color: theme.palette.text.primary,
//     marginTop: '5vh',
//     marginRight: 'auto',
//     marginLeft: '6vw',
//     marginBottom: '4vh',
//     '&.page2': {
//       color: theme.palette.common.white,
//     },
//   },
//   pageContent: {
//     position: 'relative',
//     marginLeft: '6vw',
//     width: '88vw',
//     marginRight: 'auto',
//     overflowY: 'hidden',
//     display: 'flex',
//     flexFlow: 'column',
//     height: '100%',
//   },
//   pageContentBar: {
//     background: 'white',
//     width: theme.spacing(18),
//     marginLeft: 0,
//     marginTop: 0,
//     marginBottom: theme.spacing(2),
//   },
//   pageContentText: {
//     ...theme.typography.h6,
//     width: '75%',
//     // lineHeight: 1.8,
//     fontFamily: fontFamilySerif,
//   },
//   pageImage: {
//     // position: 'absolute',
//     // top: 0,
//     // right: '-25vw',
//     width: '100%',
//     margin: `auto auto 4vh`,
//     transformOrigin: 'bottom',
//     zIndex: -1,
//     filter: 'brightness(0.6)',
//     objectPosition: 'bottom',
//     // transform: 'translateY(80%)',
//     // height: '200px',
//     [`${theme.breakpoints.up('md')}`]: {
//       width: '60%',
//     },
//     [`${theme.breakpoints.up('lg')}`]: {
//       width: '50%',
//     },
//   },
// }))

// interface Props {}
// const AnimatedTypography = animated(Typography)
// const desc = ['A Company', 'That Lights', 'Your Way in', 'The Darkness']
// let clientX
// let clientY
// /* https://codesandbox.io/s/react-spring-usetrail-example-with-text-wv8g9 */
// const Landing: React.FC<Props> = (props: Props) => {
//   const classes = useStyles()
//   const isMobile = useIsMobile()
//   const { darkMode, setDarkMode } = useContext(ThemeContext)
//   const isDesktop = useIsDesktop()
//   const data = useStaticQuery(graphql`
//     query {
//       hero: file(name: { eq: "callum-shaw" }) {
//         childImageSharp {
//           fluid {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//       page2: file(name: { eq: "robert-bock" }) {
//         childImageSharp {
//           fluid(maxWidth: 1200) {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//       site {
//         siteMetadata {
//           title
//         }
//       }
//     }
//   `)
//   const [page, setPage] = useState(0)
//   const [touch, setTouch] = useState({ clientX: 0, clientY: 0 })
//   // const [trail, set] = useTrail(R.length(desc), () => ({
//   //   scroll: 0,
//   //   mass: 6,
//   // }))
//   const transitions = useTransition(page, (section) => section, {
//     from: { opacity: 0, transform: 'scale(0.5)' },
//     enter: { opacity: 1, transform: 'scale(1)' },
//     leave: { opacity: 0, transform: 'scale(3)' },
//   })
//   const fadeTransitions = useTransition(page !== 0, null, {
//     from: { opacity: 0 },
//     enter: { opacity: 1 },
//     leave: { opacity: 0 },
//   })

//   const pages = [
//     ({ style }) => (
//       <animated.section className={classes.hero} style={style}>
//         <animated.img
//           // style={titleSpring}
//           src={darkMode ? titleSvg : title2Svg}
//           alt={data.site.siteMetadata.title}
//           className={classes.title}
//         />
//         <Typography variant="body2" className={classes.intro}>
//           See what we do.
//         </Typography>
//         <Icon
//           className={classes.verticalBar}
//           path={mdiChevronDoubleDown}
//           size={2}
//         />
//       </animated.section>
//     ),
//     ({ style }) => (
//       <animated.section
//         className={clsx(classes.hero, classes.page2)}
//         style={style}
//       >
//         <Link
//           className={clsx(classes.pageTitle, 'page2')}
//           to="/about"
//           underline="none"
//         >
//           Strong History.
//         </Link>
//         <div className={clsx(classes.pageContent, 'page2')}>
//           <hr className={clsx(classes.pageContentBar, 'page2')} />
//           <Typography className={clsx(classes.pageContentText, 'page2')}>
//             {`Established in 1951. Proudly serving the London Ontario Community for ${
//               new Date().getFullYear() - 1951
//             } years.`}
//           </Typography>
//           <Img
//             fluid={data.page2.childImageSharp.fluid}
//             className={clsx(classes.pageImage, 'page2')}
//           />
//         </div>
//       </animated.section>
//     ),
//     ({ style }) => (
//       <animated.section
//         className={clsx(classes.hero, classes.page3)}
//         style={style}
//       >
//         <animated.img
//           // style={titleSpring}
//           src={darkMode ? titleSvg : title2Svg}
//           alt={data.site.siteMetadata.title}
//           className={classes.title}
//         />
//         <Typography variant="body2" className={classes.intro}>
//           See what we do.
//         </Typography>
//         <Icon
//           className={classes.verticalBar}
//           path={mdiChevronDoubleDown}
//           size={2}
//         />
//       </animated.section>
//     ),
//   ]

//   const throttledSetPage = useCallback(
//     debounce((page: number) => setPage(page), 500, {
//       leading: true,
//       trailing: false,
//     }),
//     []
//   )

//   const onScroll = (e: React.WheelEvent) => {
//     const up = e.deltaY > 0
//     if (up) {
//       throttledSetPage(R.min(page + 1, pages.length - 1))
//     } else {
//       throttledSetPage(R.max(page - 1, 0))
//     }
//   }

//   useEventListener('wheel', onScroll, window)
//   useEventListener('touchstart', (e) => {
//     console.log('etf', e.touches[0].clientX)
//     // setTouch({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY })
//     clientX = e.touches[0].clientX
//     clientY = e.touches[0].clientY
//   })
//   useEventListener('touchend', (e) => {
//     const deltaY = e.changedTouches[0].clientY - clientY
//     console.log('wtf', deltaY)
//     const up = deltaY < 0
//     if (up) {
//       throttledSetPage(R.min(page + 1, pages.length - 1))
//     } else if (deltaY === 0) {
//     } else {
//       throttledSetPage(R.max(page - 1, 0))
//     }
//   })

//   // useEventListener('scroll', onScroll, sectionRef.current)

//   return (
//     <section className={classes.wrapper}>
//       {fadeTransitions.map(
//         ({ item, key, props }) =>
//           item && (
//             <animated.div
//               key={key}
//               className={clsx(page === 0 && classes.hidden, classes.pageNumber)}
//               style={props}
//             >
//               <Typography
//                 className={clsx(classes.pageNumberText, `page${page + 1}`)}
//               >
//                 {`0${page + 1}.`}
//               </Typography>
//               <span
//                 className={clsx(classes.pageNumberBar, `page${page + 1}`)}
//               />
//             </animated.div>
//           )
//       )}

//       {transitions.map(({ item, props, key }) => {
//         const Page = pages[item]
//         return <Page key={key} style={props} />
//       })}
//     </section>
//   )
// }

// export default Landing
