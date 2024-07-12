import {
  DrawingColors,
  DrawingFills,
  DrawingModes,
  DrawingStrokes,
  DrawingTools,
  ToolbarPositions,
} from '@/utils/constants/common'

export type DrawingMode = (typeof DrawingModes)[keyof typeof DrawingModes]
export type DrawingColor =
  | (typeof DrawingColors)[keyof typeof DrawingColors]
  | string
export type DrawingStroke = (typeof DrawingStrokes)[keyof typeof DrawingStrokes]
export type DrawingFill = (typeof DrawingFills)[keyof typeof DrawingFills]
export type DrawingTool = (typeof DrawingTools)[keyof typeof DrawingTools]
export type ToolbarPositionType =
  (typeof ToolbarPositions)[keyof typeof ToolbarPositions]
