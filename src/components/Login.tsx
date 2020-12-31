// import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react'
// import { makeStyles } from '@material-ui/core'
// import { RouteComponentProps, useNavigate } from '@reach/router'
// import React from 'react'
// import { isLoggedIn, setUser } from '../services/auth'
//
// const useStyles = makeStyles((theme) => ({
//   '@global': {
//     ':root': {
//       '--amplify-font-family': `${theme.typography.h1.fontFamily} !important`,
//       '--amplify-primary-color': `${theme.palette.primary.main} !important`,
//       '--amplify-primary-tint': `${theme.palette.primary.light} !important`,
//       '--amplify-primary-shade': `${theme.palette.primary.dark} !important`,
//       '--amplify-primary-contrast': `${theme.palette.primary.contrastText} !important`,
//       '--amplify-white': `${theme.palette.background.paper} !important`,
//       '--amplify-grey': `${theme.palette.text.secondary} !important`,
//       '--amplify-red': `${theme.palette.error.main} !important`,
//       '--amplify-light-grey': `${theme.palette.text.disabled} !important`,
//       '--amplify-secondary-color': `${theme.palette.text.primary} !important`,
//       '--amplify-text-xxs': `${theme.typography.caption.fontSize} !important`,
//       '--amplify-text-xs': `${theme.typography.body2.fontSize} !important`,
//       '--amplify-text-sm': `${theme.typography.body1.fontSize} !important`,
//       '--amplify-text-md': `${theme.typography.h5.fontSize} !important`,
//       '--amplify-text-lg': `${theme.typography.h4.fontSize} !important`,
//     },
//   },
//   root: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//   },
//   hidden: {
//     display: 'none',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.primary.main,
//   },
//   form: {
//     padding: theme.spacing(3, 3, 0),
//     margin: 0,
//     overflow: 'hidden',
//     boxShadow: theme.shadows[15],
//     borderRadius: theme.shape.borderRadius,
//     background: theme.palette.primary.main,
//   },
// }))
//
// const Login: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
//   const classes = useStyles()
//   const navigate = useNavigate()
//
//   if (isLoggedIn()) {
//     navigate('/app/home/')
//     return <div />
//   }
//
//   return (
//     <section className={classes.root}>
//       <AmplifyAuthenticator usernameAlias="email" className={classes.form}>
//         <AmplifySignIn
//           headerText="Employee Login"
//           usernameAlias="email"
//           slot="sign-in"
//           hideSignUp
//           submitButtonText="Login"
//           handleAuthStateChange={(nextState, data) => {
//             if (nextState === 'signedin') {
//               navigate('/app/home/')
//               setUser({
//                 ...data.attributes,
//                 username: data.username,
//               })
//             }
//           }}
//         ></AmplifySignIn>
//         {/* <AmplifyGreetings logo={}></AmplifyGreetings> */}
//       </AmplifyAuthenticator>
//     </section>
//   )
// }
//
// export default Login
