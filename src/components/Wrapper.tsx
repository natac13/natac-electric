import React, { useMemo } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

import { lightTheme, darkTheme } from '../themes'
import { CustomThemeProvider } from '../themes/themeContext'
import useDarkMode from 'use-dark-mode'

interface Props {
  children: React.ReactNode
}

const Wrapper: React.FC<Props> = (props: Props) => {
  const darkMode = useDarkMode(false)
  const prefersDarkMode = darkMode.value
  const createdTheme = useMemo(
    () => createMuiTheme(prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode]
  )

  return (
    <ThemeProvider theme={createdTheme}>
      <CssBaseline />
      <CustomThemeProvider
        value={{ setDarkMode: darkMode.toggle, darkMode: prefersDarkMode }}
      >
        {props.children}
      </CustomThemeProvider>
    </ThemeProvider>
  )
}

export default Wrapper
