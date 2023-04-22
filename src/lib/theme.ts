import { ThemeDefinition } from 'vuetify/lib/framework.mjs'

type Colors = ThemeDefinition['colors']
type ThemeColor = {
  [key: string]: string | ThemeColor
}

const themeColors: ThemeColor = {
  white: '#ffffff',
  black: '#002849',
  grey: '#cccccc',
  deepBlue: {
    base: '#002849',
  },
  sun: '#fedb41',
  cloud: '#6e9eff',
  background: '#009688',
  // background: '#002849',
  // background: '#005499',
  teal: {
    base: '#009688',
    lighten1: '#26A69A',
    lighten2: '#4DB6AC',
    lighten3: '#80CBC4',
    lighten4: '#B2DFDB',
    lighten5: '#E0F2F1',
    darken1: '#00897B',
    darken2: '#00796B',
    darken3: '#00695C',
    darken4: '#004D40',
  },
}

// ネストされたオブジェクトを平坦化する
function flattenNestedObject(
  obj: ThemeColor,
  prefix: string = '', // eslint-disable-line  @typescript-eslint/no-inferrable-types
  result: { [key: string]: any } = {}
): ThemeColor {
  Object.entries(obj).forEach(([key, value]) => {
    const newKey = prefix ? (key === 'base' ? prefix : `${prefix}-${key}`) : key
    if (typeof value === 'object') {
      flattenNestedObject(value, newKey, result)
    } else {
      result[newKey] = value
    }
  })
  return result
}

// ThemeColorをColorsに変換する
function convertThemeColors(colors: ThemeColor): Colors {
  return flattenNestedObject(colors) as Colors
}

export const customTheme: ThemeDefinition = {
  dark: false,
  colors: convertThemeColors(themeColors),
}
