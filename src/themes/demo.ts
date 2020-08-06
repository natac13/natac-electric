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
      main: '#5a308e',
      light: '#3e2163',
      dark: '#7b59a4',
      contrastText: '#fff',
    },
    // background: {
    //   default: '#fcfcfc',
    //   paper: '#ffffff',
    // },
  },
}

export const darkPalette: Record<string, Partial<Palette>> = {
  palette: {
    type: 'dark',
    primary: {
      main: '#4297e8',
      light: '#67abec',
      dark: '#2e69a2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#a783d2',
      light: '#b89bdb',
      dark: '#745b93',
      contrastText: '#fff',
    },
    background: {
      default: '#1a1a1a',
      paper: '#2b2b2b',
    },
  },
}
