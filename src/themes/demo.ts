import { Palette } from '@material-ui/core/styles/createPalette'

export const lightPalette: Record<string, Partial<Palette>> = {
  palette: {
    type: 'light',
    primary: {
      main: '#1d5d99',
      light: '#4a7dad',
      dark: '#14416b',
      contrastText: '#fff',
    },
    secondary: {
      main: '#887400',
      light: '#9f8f33',
      dark: '#5f5100',
      contrastText: '#fff',
    },
    background: {
      default: '#fcfcfc',
      paper: '#ffffff',
    },
  },
}

export const darkPalette: Record<string, Partial<Palette>> = {
  palette: {
    type: 'dark',
    primary: {
      main: '#2a85db',
      light: '#549de2',
      dark: '#1d5d99',
      contrastText: '#1a1a1a',
    },
    secondary: {
      main: '#B29700',
      light: '#c1ab33',
      dark: '#7c6900',
      contrastText: '#1a1a1a',
    },
    background: {
      default: '#1a1a1a',
      paper: '#2b2b2b',
    },
  },
}
