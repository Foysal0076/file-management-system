import { Checkbox, FormControlLabel, Slider, Typography } from '@mui/material'

import { BrushIcon, TextIcon } from '@/components/Common/Icons'
import AddUserInputText from '@/components/Drawing/AddUserInputText'
import { useCanvasContext } from '@/context/CanvasContext'
import { drawingBrush } from '@/utils/canvas/shapes/drawingBrush'
import { drawInputText } from '@/utils/canvas/texts/drawInputText'
import {
  DrawingFills,
  DrawingModes,
  DrawingTools as Tools,
} from '@/utils/constants/common'

const DrawingTools = () => {
  const {
    canvas,
    drawingColor,
    drawingThickness,
    drawingFill,
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
  console.log({ fillRule })
  return (
    <div>
      <div className={`flex flex-col gap-4 `}>
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
          className='-mt-3 !text-neutral-200'
          control={
            <Checkbox defaultChecked={fillRule} onChange={onChangeFilRule} />
          }
          label={<span className='ml-0.5 text-neutral-200'>Fill</span>}
        />
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
        <div className='mt-2 flex flex-col gap-1'>
          <AddUserInputText />
        </div>
      </div>
    </div>
  )
}

export default DrawingTools
