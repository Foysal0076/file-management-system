'use client'

import { Button, Slider, Typography } from '@mui/material'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

import { DrawingMode } from '@/components/Drawing/drawing.types'
import { useCanvasContext } from '@/context/CanvasContext'
import { getToolbarPosition } from '@/redux/slice/stateSlice'
import { delete_all_object_from_canvas } from '@/utils/canvas/delete'
import { saveAsImg } from '@/utils/canvas/save'
import { drawCircle } from '@/utils/canvas/shapes/drawCircle'
import { drawingBrush } from '@/utils/canvas/shapes/drawingBrush'
import { drawLine } from '@/utils/canvas/shapes/drawLine'
import { drawRectangle } from '@/utils/canvas/shapes/drawRectangle'
import { drawTriangle } from '@/utils/canvas/shapes/drawTriangle'
import {
  DrawingColors,
  DrawingModes,
  DrawingTools,
} from '@/utils/constants/common'

const CanvasToolbar = () => {
  const toolbarPosition = useSelector(getToolbarPosition)

  const {
    canvas,
    drawingMode,
    setDrawingMode,
    drawingColor,
    setDrawingColor,
    drawingThickness,
    setDrawingThickness,
    drawingFill,
    setDrawingFill,
    drawingTool,
    setDrawingTool,
    userInputText,
    setUserInputText,
    objectSelectForDelete,
    setObjectSelectForDelete,
    colorList,
  } = useCanvasContext()

  const isSelected = (mode: DrawingMode) => {
    return drawingMode === mode
  }
  console.log({ drawingMode })

  const _saveAsImage = () => {
    if (!canvas) return
    saveAsImg(canvas)
  }

  const _clearCanvas = () => {
    if (!canvas) return
    delete_all_object_from_canvas(canvas)
  }

  const onAddText = (e: any) => {}

  const onChangeStrokeWidth = (e: any, value: any) => {
    setDrawingThickness(value)
  }

  console.log({ drawingMode, drawingTool })
  return (
    <div className='flex min-w-[13rem] flex-col justify-between gap-8 rounded-sm border border-neutral-50 p-4'>
      <div className='flex flex-col gap-8'>
        <div className={`flex flex-col gap-4 `}>
          <Typography>Shapes</Typography>
          <div className='flex flex-col gap-4'>
            <button
              className='flex items-center gap-2 text-neutral-200  hover:text-primary-500'
              onClick={() =>
                drawRectangle(
                  canvas,
                  drawingColor,
                  drawingThickness,
                  drawingFill
                )
              }>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <rect x='3' y='3' width='18' height='18' strokeWidth='2' />{' '}
                {/* Rectangle */}
              </svg>
              Rectangle
            </button>
            <button
              className='flex items-center gap-2 text-neutral-200 hover:text-primary-500'
              onClick={() =>
                drawCircle(canvas, drawingColor, drawingThickness, drawingFill)
              }>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <circle cx='12' cy='12' r='9' strokeWidth='2' /> {/* Circle */}
              </svg>
              Circle
            </button>
            <button
              className='flex items-center gap-2 text-neutral-200 hover:text-primary-500'
              onClick={() =>
                drawTriangle(
                  canvas,
                  drawingColor,
                  drawingThickness,
                  drawingFill
                )
              }>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <polygon points='12 2, 22 22, 2 22' strokeWidth='2' />{' '}
                {/* Triangle */}
              </svg>
              Triangle
            </button>

            <button
              className='flex items-center gap-2 text-neutral-200 hover:text-primary-500'
              onClick={() => drawLine(canvas, drawingColor, drawingThickness)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <line x1='4' y1='12' x2='20' y2='12' strokeWidth='2' />{' '}
                {/* Line */}
              </svg>
              Line
            </button>
          </div>
        </div>
        <div>
          <div className={`flex flex-col gap-4 `}>
            <Typography>Options</Typography>
            <button
              className='flex items-center gap-2 text-neutral-200 hover:text-primary-500'
              onClick={() => {
                setDrawingMode(DrawingModes.FREE)
                setDrawingTool(DrawingTools.DRAW)
                drawingBrush(canvas, drawingColor, drawingThickness)
              }}>
              <svg
                id='Brush'
                className='hover:text-red-500 cursor-pointer p-0.5 duration-200'
                width='24'
                height='24'
                viewBox='0 0 14.445 14.462'
                xmlns='http://www.w3.org/2000/svg'>
                <title>Brush</title>
                <path
                  id='Path_153'
                  fill='currentColor'
                  fill-rule='evenodd'
                  d='M8.319,8.378l6.014-6.535a.4.4,0,0,0-.024-.577L13.155.111a.4.4,0,0,0-.553,0L6.066,6.125a.4.4,0,0,0,0,.577L7.742,8.378a.4.4,0,0,0,.577,0Zm-3.44-.89,2.093,2.1a.8.8,0,0,1,.249.457v.393a3.208,3.208,0,0,1-.938,2.277,6.223,6.223,0,0,1-4.739,1.732,2.326,2.326,0,0,1-1.427-.481.4.4,0,0,1-.048-.505,4.772,4.772,0,0,0,.714-2.609A3.626,3.626,0,0,1,1.744,8.17a3.208,3.208,0,0,1,2.269-.938,3.134,3.134,0,0,1,.393,0A.874.874,0,0,1,4.879,7.488Z'></path>
              </svg>
              Brush
            </button>
            {/* <button
              className={clsx('flex items-center gap-2 text-neutral-200 hover:text-primary-500', {
                'text-primary-500': drawingTool === DrawingTools.ERASE,
              })}
              onClick={() => {
                setDrawingTool(DrawingTools.ERASE)
                setDrawingMode(DrawingModes.FREE)
              }}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='25'
                height='23'
                viewBox='0 0 17.093 16.301'>
                <path
                  id='bx-eraser'
                  d='M2.543,14.46l3.985,3.985a.923.923,0,0,0,.655.272H18.309V16.862h-6.45l6.695-6.695a1.855,1.855,0,0,0,0-2.622l-4.59-4.589a1.857,1.857,0,0,0-2.622,0l-4.4,4.4L2.532,11.849a1.86,1.86,0,0,0,.011,2.61ZM12.653,4.268l4.589,4.589-2.4,2.4L10.256,6.665l2.4-2.4Zm-4.4,4.4.689-.688,4.589,4.589L9.31,16.789a.951.951,0,0,0-.064.073H7.568L3.855,13.148l4.4-4.484Z'
                  transform='translate(-2.003 -2.416)'
                  fill='currentColor'
                />
              </svg>
              Eraser
            </button> */}
            <div className='mt-2 flex flex-col gap-1'>
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
          </div>
        </div>
        <div className={`flex flex-col gap-4 `}>
          <Typography>Colors</Typography>
          <div className='colors flex justify-between gap-2'>
            {colorList.map((color) => (
              <button
                key={color}
                className={clsx(
                  'option h-6 w-6 rounded-full outline-2 outline-danger-500',
                  {
                    selected: drawingColor === color,
                  },
                  {
                    'border border-neutral-100': color === DrawingColors.WHITE,
                  }
                )}
                style={{ backgroundColor: color }}
                onClick={() => setDrawingColor(color)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <Button variant='outlined' color='warning' onClick={_clearCanvas}>
          Clear
        </Button>
        <Button variant='outlined' color='inherit' onClick={_saveAsImage}>
          Export
        </Button>
      </div>
    </div>
  )
}

export default CanvasToolbar
