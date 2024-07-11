import * as fabric from 'fabric'

export const tabKeyPressing = (canvas: fabric.Canvas, status: any) => {
  const allObjs = canvas.getObjects()
  const activeObj = canvas.getActiveObject()

  if (activeObj) {
    let currentIndex = allObjs.indexOf(activeObj)

    if (status) {
      // for "tab" key press | forwards
      if (currentIndex <= allObjs.length - 2) {
        canvas.setActiveObject(allObjs[currentIndex + 1])
        currentIndex = currentIndex + 1
        canvas.requestRenderAll()
      } else if (currentIndex === allObjs.length - 1) {
        currentIndex = 0
        canvas.setActiveObject(allObjs[currentIndex])
        canvas.requestRenderAll()
      }
    } else {
      // for "shift + tab" key press | reverse
      // if (currentIndex <= allObjs.length - 2) {
      //     canvas.setActiveObject(allObjs[currentIndex + 1]);
      //     currentIndex = currentIndex + 1;
      //     canvas.requestRenderAll();
      // } else if (currentIndex === allObjs.length - 1) {
      //     currentIndex = 0;
      //     canvas.setActiveObject(allObjs[currentIndex]);
      //     canvas.requestRenderAll();
      // }
    }
  }
}

export const objectSelected = (o: any) => {
  // if value is undefined, exit form this function...
  if (o?.e === undefined || o?.selected[0] === undefined) return

  const selectedObj = o?.selected[0]

  selectedObj.set({
    // hasControls: false, // rotation + scale up down | OFF

    // border + corner styling...
    cornerStyle: 'circle',
    cornerStrokeColor: 'orange',
    borderDashArray: [5, 5],
    borderColor: 'blue',

    // fill: colorSelect,
  })

  console.log(selectedObj.type)
}

// print all object at Console
export const displayAllObj = (canvas: fabric.Canvas) => {
  canvas.getObjects().forEach((obj) => {
    // console.log(obj.aCoords.tl,)
    console.log(obj)

    if (canvas.getActiveObject() === obj) {
      console.log('Selected Object ====> ', obj)
      // obj.hasBorders = false
      // obj.hasControls = false
      // obj.selectable = false
      // obj.lockRotation  = true
      // obj.lockScalingX = obj.lockScalingY = true;
      // obj.lockMovementX = true
      // obj.lockMovementY = true
      // obj.hoverCursor = 'pointer';
    }
  })
}

export const eraseDrawing = (canvas: fabric.Canvas) => {
  // set the brush color to white, larger width
  if (canvas.freeDrawingBrush) {
    canvas.freeDrawingBrush.color = '#ffffff'
    canvas.freeDrawingBrush.width = 10
  }
}
