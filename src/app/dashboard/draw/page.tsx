'use client'
import clsx from 'clsx'
import * as fabric from 'fabric'
import { useEffect } from 'react'

import CanvasToolbar from '@/components/Drawing/CanvasToolbar'
import { useCanvasContext } from '@/context/CanvasContext'
import { handleKeyDownEvent } from '@/utils/canvas/handleKeyDownEvent'
import { objectSelected } from '@/utils/canvas/utils'
import { zoom } from '@/utils/canvas/zoom'
import { ToolbarPositions } from '@/utils/constants/common'

const DrawPage = () => {
  const {
    fabricRef,
    toolbarPosition,
    canvas,
    setCanvas,
    setObjectSelectForDelete,
  } = useCanvasContext()

  const isRight = toolbarPosition === ToolbarPositions.RIGHT
  const isLeft = toolbarPosition === ToolbarPositions.LEFT
  const isTop = toolbarPosition === ToolbarPositions.TOP

  useEffect(() => {
    if (!fabricRef?.current) return
    const initCanvas = new fabric.Canvas(fabricRef?.current, {
      width: 800,
      height: 764,
      backgroundColor: 'white',
    })

    setCanvas(initCanvas)

    initCanvas.on({
      'selection:created': objectSelected,
      'selection:updated': objectSelected,
    })

    initCanvas.on('mouse:down', (_) => setObjectSelectForDelete(false))

    initCanvas.on('mouse:wheel', (object) => zoom(object, initCanvas))

    return () => {
      if (typeof fabricRef === 'function') {
        fabricRef(null)
      } else if (typeof fabricRef === 'object' && fabricRef) {
        fabricRef.current = null
      }
      if (canvas) {
        canvas.dispose()
      }
    }
  }, [fabricRef, setCanvas, setObjectSelectForDelete])

  useEffect(() => {
    if (!canvas) return

    window.addEventListener('keydown', (e) => handleKeyDownEvent(e, canvas))

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDownEvent as unknown as any
      )
    }
  }, [canvas])

  return (
    <div
      className={clsx(
        'relative flex  gap-6 pb-20 pt-8 ',
        { 'flex-col justify-center': isTop },
        { 'xl:flex-row': isLeft },
        { 'xl:flex-row-reverse': isRight }
      )}>
      <div className='flex justify-center'>
        <CanvasToolbar />
      </div>
      <div className='flex justify-center'>
        <canvas
          width={800}
          height={667}
          className='rounded-sm border border-neutral-50'
          ref={fabricRef}
        />
      </div>
    </div>
  )
}

export default DrawPage
