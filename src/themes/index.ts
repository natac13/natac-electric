import base from './base'
import merge from 'lodash/merge'
export const fontFamilySerif = [
  'Merriweather',
  'Times New Roman',
  'serif',
].join(',')

import { lightPalette, darkPalette } from './demo'

export const lightTheme = merge(lightPalette, base)
export const darkTheme = merge(darkPalette, base)
