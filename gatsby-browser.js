import { Auth } from 'aws-amplify'
import { setUser } from './src/services/auth'

export const onRouteUpdate = (state, page, pages) => {
  Auth.currentAuthenticatedUser()
    .then((user) => {
      // console.log(user)
      const userInfo = {
        ...user.attributes,
        username: user.username,
      }
      setUser(userInfo)
    })
    .catch((err) => {
      setUser(null)
    })
}

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) {
    import(`intersection-observer`)
    // console.log(`# IntersectionObserver is polyfilled!`)
  }
}
