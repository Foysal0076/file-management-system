'use client'

import { Button } from '@mui/material'

import ColorSelect from '@/components/Drawing/ColorSelect'
import DrawingTools from '@/components/Drawing/DrawingTools'
import ShapeSelect from '@/components/Drawing/ShapeSelect'
import ToolbarPositionRadioButtons from '@/components/Drawing/ToolbarPositionRadioButtons'
import { useCanvasContext } from '@/context/CanvasContext'
import { delete_all_object_from_canvas } from '@/utils/canvas/delete'
import { saveAsImg } from '@/utils/canvas/save'

const CanvasToolbar = () => {
  const { canvas } = useCanvasContext()

  const _saveAsImage = () => {
    if (!canvas) return
    saveAsImg(canvas)
  }

  const _clearCanvas = () => {
    if (!canvas) return
    delete_all_object_from_canvas(canvas)
  }

  return (
    <div className='flex min-w-[13rem] max-w-[50rem] flex-col justify-between gap-4 rounded-sm border border-neutral-50 p-4'>
      <ToolbarPositionRadioButtons />
      <div className='flex flex-col gap-4'>
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
