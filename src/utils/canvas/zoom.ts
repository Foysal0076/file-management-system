import * as fabric from 'fabric'

export const zoom = (object: any, initCanvas: fabric.Canvas) => {
  let delta = object?.e.deltaY

  let zoom = initCanvas.getZoom()
  zoom *= 0.999 ** delta

  if (zoom > 20) zoom = 20
  if (zoom < 0.01) zoom = 0.01

  // top left ==> to ==> bottom right ==> zoom
  // initCanvas.setZoom(zoom);

  // where the mouse point is present, at there zoom in OR zoom out by the help of mouse while scroll up & down
  initCanvas.zoomToPoint(
    { x: object?.e.offsetX ?? 0, y: object?.e.offsetY ?? 0 } as fabric.Point,
    zoom
  )

  object?.e.preventDefault()
  object?.e.stopPropagation()
}
