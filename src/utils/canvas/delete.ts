import * as fabric from 'fabric'

export const delete_single_selected_object = (canvas: fabric.Canvas) => {
  const activeObject = canvas.getActiveObject()
  if (
    activeObject instanceof fabric.Textbox ||
    activeObject instanceof fabric.IText
  ) {
    if (activeObject.isEditing) {
      return
    }
  }

  if (activeObject) {
    canvas.remove(activeObject)
  }
}

export const delete_multiple_selected_objects = (
  canvas: fabric.Canvas,
  multipleObject: any
) => {
  multipleObject.forEach((obj: any) => canvas.remove(obj))

  canvas.discardActiveObject()
}

export const delete_all_object_from_canvas = (canvas: fabric.Canvas) => {
  canvas.getObjects().forEach((obj) => canvas.remove(obj))

  canvas.clear()
}
