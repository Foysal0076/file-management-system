export const LOCAL_STORAGE_THEME_KEY = 'theme'
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg']

export const DrawingModes = {
  FREE: 'free',
  LINE: 'line',
  ARROW: 'arrow',
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
  TRIANGLE: 'triangle',
  TEXT: 'text',
} as const

export const DrawingTools = {
  SELECT: 'select',
  DRAW: 'draw',
  ERASE: 'erase',
} as const

export const DrawingColors = {
  WHITE: 'white',
  BLACK: 'black',
  RED: 'red',
  GREEN: 'green',
  BLUE: 'blue',
} as const

export const DrawingStrokes = {
  THIN: 'thin',
  MEDIUM: 'medium',
  THICK: 'thick',
} as const

export const DrawingFills = {
  SOLID: true,
  HOLLOW: false,
} as const
