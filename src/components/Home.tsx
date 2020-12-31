// import React from 'react'
// import { Link } from 'gatsby-material-ui-components'
// import { AmplifySignOut } from '@aws-amplify/ui-react'
// import { navigate } from '@reach/router'
// import { useTheme } from '@material-ui/core'
//
// const Home: React.FC = () => {
//   const theme = useTheme()
//
//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexFlow: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '100%',
//         height: '100%',
//         marginTop: '30vh',
//       }}
//     >
//       You are now logged in!
//       <br />
//       <Link to="/app/profile">View profile</Link>
//       <AmplifySignOut
//         buttonText="Logout"
//         handleAuthStateChange={(nextAuthState, data) => {
//           if (nextAuthState === 'signedout') {
//             navigate('/')
//           } else {
//             navigate('/')
//           }
//         }}
//         color={theme.palette.primary.main}
//       />
//     </div>
//   )
// }
//
// export default Home
