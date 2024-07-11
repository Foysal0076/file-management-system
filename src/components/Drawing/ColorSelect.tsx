import Radio from '@mui/material/Radio'
import * as React from 'react'

type Props = {
  onChange: (color: string) => void
}

const ColorSelect = ({ onChange }: Props) => {
  const [selectedValue, setSelectedValue] = React.useState('a')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
    onChange(event.target.value)
  }

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  })

  return (
    <div>
      <Radio {...controlProps('a')} />
      <Radio {...controlProps('b')} sx={{ color: 'red' }} />
      <Radio {...controlProps('c')} color='success' />
      <Radio {...controlProps('d')} color='default' />
      <Radio
        {...controlProps('e')}
        sx={{
          color: 'blue',
          '&.Mui-checked': {
            color: 'blue',
          },
        }}
      />
    </div>
  )
}

export default ColorSelect
