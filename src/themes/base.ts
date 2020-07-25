// const headerFont = {
//   fontFamily: ['Oswald', 'sans-serif'].join(','),
// }

export default {
  overrides: {
    MuiListItemIcon: {
      root: {
        color: 'none',
      },
    },
    MuiSnackbarContent: {
      root: {
        '&[class*="variantWarning"]': {
          color: 'rgba(0, 0, 0, 0.87)',
        },
        // .. etc for other variants
      },
    },
  },
  // typography: {
  //   fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  //   fontSize: 14,
  //   h1: {
  //     ...headerFont,
  //   },
  //   h2: {
  //     ...headerFont,
  //   },
  //   h3: {
  //     ...headerFont,
  //   },
  //   h4: {
  //     ...headerFont,
  //   },
  //   h5: {},
  //   h6: {
  //     ...headerFont,
  //     letterSpacing: '1px',
  //   },
  //   subtitle1: {
  //     ...headerFont,
  //     letterSpacing: '1px',
  //   },
  //   subtitle2: {
  //     // ...headerFont,
  //   },
  // },
  palette: {
    contrastThreshold: 4.5,
  },
}
