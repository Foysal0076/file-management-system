'use client'
import { KeyboardEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { useCanvasContext } from '@/context/CanvasContext'
import { drawInputText } from '@/utils/canvas/texts/drawInputText'

const AddUserInputText = () => {
  const { canvas, drawingColor, drawingThickness } = useCanvasContext()
  const [userInputText, setUserInputText] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputText(e.target.value)
  }

  const onSubmit = (
    e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      if (userInputText.length === 0) {
        toast.error('Text is required')
        return
      }
      drawInputText(canvas, drawingColor, userInputText)
      setUserInputText('')
    }
  }

  return (
    <input
      value={userInputText}
      type='text'
      placeholder='Add Text'
      onChange={onChange}
      onKeyDown={onSubmit}
      className='h-8 w-full rounded-md border border-neutral-50 p-2 text-sm !text-neutral-200 outline-none transition-colors duration-200 ease-in-out focus:border-neutral-900'
    />
  )
}

export default AddUserInputText
