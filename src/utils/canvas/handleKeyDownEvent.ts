import * as fabric from 'fabric'

import { selectAll } from '@/utils/canvas/copyPasteSelect'
import { saveAsImg, saveCanvas } from '@/utils/canvas/save'
import { tabKeyPressing } from '@/utils/canvas/utils'

import {
  delete_multiple_selected_objects,
  delete_single_selected_object,
} from './delete'

// user keyboard, key pressing for object interaction...
export const handleKeyDownEvent = (e: any, canvas: fabric.Canvas) => {
  // delete ==> key press
  if (e.key === 'Delete' || e.key === 'Backspace') {
    try {
      if (!canvas) return
      // just get selected object from canvas...
      const single_object_selected = canvas.getActiveObject()

      // for singe selected object delete operation
      if (single_object_selected) {
        delete_single_selected_object(canvas)
      }

      // for multiple selected object delete operation
      if (canvas.getActiveObject() instanceof fabric.ActiveSelection) {
        // Get the selected objects
        const selectedObjects = canvas.getActiveObjects()

        // Call your custom function to delete these objects
        delete_multiple_selected_objects(canvas, selectedObjects)

        // Deselect and remove the active selection from the canvas
        canvas.discardActiveObject()
        canvas.requestRenderAll()
      }
    } catch (error) {
      console.log(error)
    }
  }

  // tab key press event
  if (e.key === 'Tab') {
    e.preventDefault() // for this statement, tab command not get out from the canvas window
    tabKeyPressing(canvas, true)
  }

  // shift + tab key press event
  if (e.shiftKey && e.key === 'Tab') {
    e.preventDefault()

    tabKeyPressing(canvas, false)
  }

  // this is responsible for checking ctrl key press
  // if we not check it, then only single press of c,v,a,s,i is going to working... which we don't want
  if (e.ctrlKey || e.metaKey) {
    // ctrl + a ==> key press | for selecting all
    if (e.key === 'a') selectAll(canvas)

    // ctrl + s ==> key press | for save canvas as JSON format to load next time
    if (e.key === 's') {
      e.preventDefault() // to prevent the browser's default save as dialog from being displayed
      saveCanvas(canvas)
    }

    // ctrl + i ==> key press | for save as image formate
    if (e.key === 'i') saveAsImg(canvas)
  }
}
