'use client'
import * as fabric from 'fabric'
import { useEffect } from 'react'

import CanvasToolbar from '@/components/Drawing/CanvasToolbar'
import { useCanvasContext } from '@/context/CanvasContext'
import { handleKeyDownEvent } from '@/utils/canvas/handleKeyDownEvent'
import { objectSelected } from '@/utils/canvas/utils'
import { zoom } from '@/utils/canvas/zoom'

const DrawPage = () => {
  const { fabricRef, canvas, setCanvas, setObjectSelectForDelete } =
    useCanvasContext()

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
    <div className='relative flex flex-col justify-center gap-6 py-20 xl:flex-row'>
      <CanvasToolbar />
      <canvas
        width={800}
        height={667}
        className='rounded-sm border border-neutral-50'
        ref={fabricRef}
      />
    </div>
  )
}

export default DrawPage
