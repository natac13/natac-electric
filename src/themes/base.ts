// const headerFont = {
//   fontFamily: ['Oswald', 'sans-serif'].join(','),
// }

export const fontFamilySerif = [
  'Merriweather',
  'Times New Roman',
  'serif',
].join(',')

export default {
  overrides: {
    MuiListItemIcon: {
      root: {
        color: 'none',
      },
    },
    MuiCssBaseline: {
      '@global': {
        'body::-webkit-scrollbar': {
          display: 'none' /* Hide scrollbars */,
        },
      },
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    // fontSize: 14,
    // h1: {
    //   ...headerFont,
    // },
    // h2: {
    //   ...headerFont,
    // },
    // h3: {
    //   ...headerFont,
    // },
    // h4: {
    //   ...headerFont,
    // },
    // h5: {},
    // h6: {
    //   ...headerFont,
    //   letterSpacing: '1px',
    // },
    // subtitle1: {
    //   ...headerFont,
    //   letterSpacing: '1px',
    // },
    // subtitle2: {
    //   // ...headerFont,
    // },
    body1: {
      fontFamily: fontFamilySerif,
      lineHeight: 1.8,
    },
  },
  palette: {
    contrastThreshold: 4.5,
  },
}
