import { Checkbox, FormControlLabel, Slider, Typography } from '@mui/material'
import clsx from 'clsx'

import { BrushIcon, TextIcon } from '@/components/Common/Icons'
import AddUserInputText from '@/components/Drawing/AddUserInputText'
import { useCanvasContext } from '@/context/CanvasContext'
import { drawingBrush } from '@/utils/canvas/shapes/drawingBrush'
import { drawInputText } from '@/utils/canvas/texts/drawInputText'
import {
  DrawingFills,
  DrawingModes,
  DrawingTools as Tools,
  ToolbarPositions,
} from '@/utils/constants/common'

const DrawingTools = () => {
  const {
    canvas,
    drawingColor,
    drawingThickness,
    drawingFill,
    toolbarPosition,
    setDrawingMode,
    setDrawingTool,
    setDrawingThickness,
    setDrawingFill,
  } = useCanvasContext()

  const onChangeStrokeWidth = (e: any, value: any) => {
    setDrawingThickness(value)
  }

  const onChangeFilRule = (e: any, value: any) => {
    if (value) {
      setDrawingFill(DrawingFills.SOLID)
    } else {
      setDrawingFill(DrawingFills.HOLLOW)
    }
  }
  const fillRule = drawingFill === DrawingFills.SOLID
  const isRight = toolbarPosition === ToolbarPositions.RIGHT
  const isLeft = toolbarPosition === ToolbarPositions.LEFT
  const isTop = toolbarPosition === ToolbarPositions.TOP

  return (
    <div>
      <div
        className={clsx(`flex flex-wrap gap-4`, {
          'flex-row items-center': isTop,
          'items-center xl:flex-col xl:items-start': isLeft || isRight,
        })}>
        <Typography>Options</Typography>
        <button
          className='flex items-center gap-2 text-neutral-200 hover:text-primary-500'
          onClick={() => {
            setDrawingMode(DrawingModes.FREE)
            setDrawingTool(Tools.DRAW)
            drawingBrush(canvas, drawingColor, drawingThickness)
          }}>
          <BrushIcon />
          Brush
        </button>
        <button
          className='flex items-center gap-3 text-neutral-200 hover:text-primary-500'
          onClick={() => drawInputText(canvas, drawingColor, 'Text')}>
          <TextIcon width={20} />
          Text
        </button>

        <FormControlLabel
          className={clsx('!text-neutral-200', {
            'xl:-mt-3': isLeft || isRight,
          })}
          control={
            <Checkbox defaultChecked={fillRule} onChange={onChangeFilRule} />
          }
          label={<span className='ml-0.5 text-neutral-200'>Fill</span>}
        />
        <div
          className={clsx(
            'flex items-center gap-3',
            { 'min-w-[15rem]': isTop },
            { 'min-w-[15rem] xl:min-w-full': isRight || isLeft }
          )}>
          <Typography variant='body2' className='text-neutral-200'>
            Thickness
          </Typography>
          <Slider
            step={1}
            defaultValue={5}
            min={1}
            max={30}
            aria-label='Default'
            valueLabelDisplay='auto'
            onChange={onChangeStrokeWidth}
          />
        </div>
        <div className='flex w-full max-w-[14.75rem] items-center'>
          <AddUserInputText />
        </div>
      </div>
    </div>
  )
}

export default DrawingTools
