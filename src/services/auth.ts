// import { Auth } from 'aws-amplify'
//
// export const isBrowser = (): boolean => typeof window !== 'undefined'
//
// export const getUser = (): Record<string, unknown> => {
//   if (isBrowser()) {
//     const user = window.localStorage.getItem('gatsbyUser')
//     if (user) {
//       return JSON.parse(user)
//     }
//   }
//   return {}
// }
//
// export const setUser = (user: Record<string, unknown> | null): void =>
//   window.localStorage.setItem('gatsbyUser', JSON.stringify(user))
//
// export const isLoggedIn = (): boolean => {
//   if (!isBrowser()) {
//     return false
//   }
//   const user = getUser()
//   if (user) {
//     return !!user.username
//   }
//   return false
// }
//
// export const logout = async (cb?: () => void, global?: boolean): void => {
//   try {
//     await Auth.signOut({ global })
//     setUser({})
//     typeof cb === 'function' && cb()
//   } catch (err) {}
// }
