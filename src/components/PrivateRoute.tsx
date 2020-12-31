// import React from 'react'
// import { navigate } from 'gatsby'
// import { isLoggedIn } from '../services/auth'
// import { RouteComponentProps } from '@reach/router'
//
// interface Props extends RouteComponentProps {
//   component: React.ReactType
// }
//
// const PrivateRoute: React.FC<Props> = ({
//   component: Component,
//   location,
//   ...rest
// }: Props) => {
//   if (!isLoggedIn() && location?.pathname !== '/app/login') {
//     navigate('/app/login')
//     return null
//   }
//   return <Component {...rest} />
// }
//
// export default PrivateRoute
