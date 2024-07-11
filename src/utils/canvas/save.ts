import * as fabric from 'fabric'
import { toast } from 'react-toastify'

export const saveAsImg = (canvas: fabric.Canvas) => {
  // save canvas as image...
  const img = new Image()
  img.src = canvas.toDataURL()

  // create a new anchor tag...
  const a = document.createElement('a')
  a.href = img.src
  a.download = 'canvas-image.png'
  document.body.appendChild(a)
  a.click()
}

// save into local storage
export const saveCanvas = (canvas: fabric.Canvas) => {
  const json = canvas?.toJSON()

  // canvas save into local storage...
  localStorage.setItem('canvas', JSON.stringify(json))

  // just UI toast notification for user...
  toast.success(`Your canvas is saved at local storage`)
}
