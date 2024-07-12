'use client'
import { Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { ChangeEvent } from 'react'

import { ToolbarPositionType } from '@/components/Drawing/drawing.types'
import { useCanvasContext } from '@/context/CanvasContext'
import { ToolbarPositions } from '@/utils/constants/common'

const ToolbarPositionRadioButtons = () => {
  const { toolbarPosition, setToolbarPosition } = useCanvasContext()
  const onChange = (event: ChangeEvent<HTMLInputElement>, position: string) => {
    setToolbarPosition(position as ToolbarPositionType)
  }

  return (
    <FormControl>
      <FormLabel id='drawing-toolbar-position-radio-buttons'>
        <Typography>Toolbar Position</Typography>
      </FormLabel>
      <RadioGroup
        onChange={onChange}
        value={toolbarPosition}
        row
        aria-labelledby='drawing-toolbar-position-radio-buttons'
        name='toolbar-radio-buttons-group'>
        <FormControlLabel
          value={ToolbarPositions.TOP}
          control={<Radio />}
          label={
            <span className='text-neutral-200'>{ToolbarPositions.TOP}</span>
          }
        />
        <FormControlLabel
          value={ToolbarPositions.LEFT}
          control={<Radio />}
          label={
            <span className='text-neutral-200'>{ToolbarPositions.LEFT}</span>
          }
        />
        <FormControlLabel
          value={ToolbarPositions.RIGHT}
          control={<Radio />}
          label={
            <span className='text-neutral-200'>{ToolbarPositions.RIGHT}</span>
          }
        />
      </RadioGroup>
    </FormControl>
  )
}

export default ToolbarPositionRadioButtons
