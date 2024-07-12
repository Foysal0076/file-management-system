import * as fabric from 'fabric'

export const selectAll = (canvas: fabric.Canvas) => {
  let selectAllObject = canvas?.getObjects()

  canvas?.discardActiveObject()

  const selectedObjects = new fabric.ActiveSelection(selectAllObject, {
    canvas: canvas,
  })
  canvas?.setActiveObject(selectedObjects)
  canvas?.requestRenderAll()
}
