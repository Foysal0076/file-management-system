'use client'

import { Button } from '@mui/material'
import { useSelector } from 'react-redux'

import ColorSelect from '@/components/Drawing/ColorSelect'
import DrawingTools from '@/components/Drawing/DrawingTools'
import ShapeSelect from '@/components/Drawing/ShapeSelect'
import { useCanvasContext } from '@/context/CanvasContext'
import { getToolbarPosition } from '@/redux/slice/stateSlice'
import { delete_all_object_from_canvas } from '@/utils/canvas/delete'
import { saveAsImg } from '@/utils/canvas/save'

const CanvasToolbar = () => {
  const toolbarPosition = useSelector(getToolbarPosition)

  const { canvas, drawingMode } = useCanvasContext()

  const _saveAsImage = () => {
    if (!canvas) return
    saveAsImg(canvas)
  }

  const _clearCanvas = () => {
    if (!canvas) return
    delete_all_object_from_canvas(canvas)
  }

  return (
    <div className='flex min-w-[13rem] flex-col justify-between gap-8 rounded-sm border border-neutral-50 p-4'>
      <div className='flex flex-col gap-8'>
        <ShapeSelect />
        <DrawingTools />
        <ColorSelect />
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
