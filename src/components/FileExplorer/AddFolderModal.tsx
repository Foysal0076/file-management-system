'use client'
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import {
  useCreateS3FolderMutation,
  useLazyFetchFilesAndFoldersQuery,
} from '@/redux/apiQueries/s3bucket.queries'
import { getSelectedFolderPath } from '@/redux/slice/stateSlice'

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

  const [createS3Folder, { isLoading: isCreatingFolder }] =
    useCreateS3FolderMutation()

  const currentFolder = useSelector(getSelectedFolderPath)

  const [updateFetchedFilesAndFolders] = useLazyFetchFilesAndFoldersQuery()

  const handleFolderNameChange = (event: any) =>
    setFolderName(event.target.value)

  const handleSubmit = async () => {
    console.log({ currentFolder, folderName })
    if (isCreatingFolder) return
    if (!folderName) {
      return toast.error('Folder name cannot be empty', {
        toastId: 'empty_name',
      })
    }
    // check if the string has any aws unsupported folder character
    const hasUnsupportedCharacter = /[^a-zA-Z0-9-_ ]/.test(folderName)
    if (hasUnsupportedCharacter) {
      return toast.error(
        'Folder name should only contain letters, numbers, hyphen and underscore',
        { toastId: 'unsupported_character' }
      )
    }
    try {
      const response = await createS3Folder(
        `${currentFolder}${folderName}`
      ).unwrap()
      updateFetchedFilesAndFolders({ folder: currentFolder }) // update the current folder cache
      toast.success(response.data?.message ?? 'Folder created successfully')
      onClose()
    } catch (error: any) {
      toast.error(error?.data?.message ?? 'Error creating folder')
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
          <Typography>Create New Folder</Typography>
          <TextField
            fullWidth
            label='Folder Name'
            id='folderName'
            value={folderName}
            onChange={handleFolderNameChange}
            margin='normal'
          />
          <Box className='mt-2 flex justify-end gap-4'>
            <Button
              onClick={onClose}
              variant='outlined'
              color='error'
              className='justify-end'>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant='outlined'
              color='inherit'
              className='flex min-w-[5.635rem] justify-center'>
              {isCreatingFolder ? (
                <CircularProgress size={24} sx={{ color: 'black' }} />
              ) : (
                'Create'
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default AddFolderModal
