import { Box, Button, Modal, TextField } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { useCreateS3FolderMutation } from '@/redux/apiQueries/s3bucket.queries'

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

  const [createS3Folder] = useCreateS3FolderMutation()

  const handleFolderNameChange = (event: any) =>
    setFolderName(event.target.value)

  const handleSubmit = async () => {
    console.log(folderName)
    const response = await createS3Folder(folderName).unwrap()
    console.log(response)
    if (response?.data) {
      toast.success(response.data?.message ?? 'Folder created successfully')
      onClose()
    } else if (response.error) {
      toast.error(response.error?.data?.message ?? 'Error creating folder')
    }
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
