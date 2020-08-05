import React from 'react'
import { SnackbarProvider, SnackbarKey } from 'notistack'
import CloseSnack from './CloseSnack'
// import { makeStyles } from '@material-ui/core'

const notistackRef = React.createRef<{
  closeSnackbar: (key?: SnackbarKey) => void
}>()
const closeSnack = (key: SnackbarKey) =>
  notistackRef?.current?.closeSnackbar(key)

// const useStyles = makeStyles((theme) => ({
//   warning: {
//     color: theme.palette.getContrastText(theme.palette.warning.main),
//     // color: theme.palette.getContrastText(theme.palette.warning.main),
//   },
//   info: {
//     color: theme.palette.getContrastText(theme.palette.info.main),
//     // color: theme.palette.getContrastText(theme.palette.info.main),
//   },
//   success: {
//     color: theme.palette.getContrastText(theme.palette.success.main),
//     // color: theme.palette.getContrastText(theme.palette.success.main),
//   },
//   error: {
//     color: theme.palette.getContrastText(theme.palette.error.main),
//     // color: theme.palette.getContrastText(theme.palette.error.main),
//   },
// }))

const SnackbarProviderComponent: React.FC = ({ children }) => {
  // const classes = useStyles()

  return (
    <SnackbarProvider
      maxSnack={6}
      preventDuplicate
      ref={notistackRef}
      action={(key) => <CloseSnack closeSnackbar={() => closeSnack(key)} />}
      // classes={{
      //   variantSuccess: classes.success,
      //   variantError: classes.error,
      //   variantWarning: classes.warning,
      //   variantInfo: classes.info,
      // }}
    >
      {children}
    </SnackbarProvider>
  )
}

export default SnackbarProviderComponent
