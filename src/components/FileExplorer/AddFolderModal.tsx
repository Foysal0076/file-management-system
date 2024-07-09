import { Box, Button, Modal, TextField } from '@mui/material'
import { useState } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
}

type Props = {
  open: boolean
  onClose: () => void
}

const AddFolderModal = ({ onClose, open }: Props) => {
  const [folderName, setFolderName] = useState('')

  const handleFolderNameChange = (event: any) =>
    setFolderName(event.target.value)

  const handleSubmit = () => {
    console.log(folderName) // Here you can handle the submission, e.g., updating state or sending to an API
    // onClose()
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby='modal-add-folder'
        aria-describedby='modal-add-a-new-folder'>
        <Box sx={style}>
          <TextField
            fullWidth
            label='Folder Name'
            id='folderName'
            value={folderName}
            onChange={handleFolderNameChange}
            margin='normal'
          />
          <Box className='mt-2 flex justify-end'>
            <Button
              onClick={handleSubmit}
              variant='outlined'
              color='inherit'
              className='justify-end'>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default AddFolderModal
