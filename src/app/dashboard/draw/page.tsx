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
      height: 600,
      backgroundColor: 'white',
    })

    setCanvas(initCanvas)

    // drawStickyNote(initCanvas)

    // binaryTree(initCanvas)

    // preventing from crash, when data become ==> undefined
    // try {
    //   // get old data from localStorage if have...
    //   const oldSavedCanvasLocally = localStorage.getItem('canvas')
    //     ? JSON.parse(localStorage.getItem('canvas') ?? '')
    //     : localStorage.removeItem('canvas')

    //   initCanvas?.loadFromJSON(oldSavedCanvasLocally)
    // } catch (e) {
    //   console.log(e)
    // }

    // these are mouse events...
    // mouseHoverIn(initCanvas);
    // mouseHoverOut(initCanvas);
    // objectSelected(initCanvas);

    initCanvas.on({
      'selection:created': objectSelected,
      'selection:updated': objectSelected,

      // 'selection:created': (o) => objectSelected(o, initCanvas),
      // 'selection:updated': (o) => objectSelected(o, initCanvas),

      // 'selection:updated': (o) => objectSelected(o, canvas, colorSelect),
      // 'object:selected': objectSelected(colorSelect),
    })

    initCanvas.on('mouse:down', (_) => setObjectSelectForDelete(false))

    // only for zooming the canvas...
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

  // all keyboard [ctrl+] related command code calling here...
  // text searching also calling here...
  useEffect(() => {
    // call here | define it another file...
    // handleSearchText(canvas, textSearching)
    if (!canvas) return

    window.addEventListener('keydown', (e) => handleKeyDownEvent(e, canvas))
    // window.addEventListener('mousemove', getMousePointerLocation);

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
      <canvas className='rounded-sm border border-neutral-50' ref={fabricRef} />
    </div>
  )
}

export default DrawPage
