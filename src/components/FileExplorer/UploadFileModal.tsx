import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  styled,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { UploadCloudIcon } from '@/components/Common/Icons'
import { useLazyFetchFilesAndFoldersQuery } from '@/redux/apiQueries/s3bucket.queries'
import { getSelectedFolderPath } from '@/redux/slice/stateSlice'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
  height: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  pt: 2,
  display: 'flex',
  flexDirection: 'column',
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

interface Props {
  open: boolean
  onClose: () => void
}

const UploadFileModal = ({ open, onClose }: Props) => {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploadingFile, setIsUploadingFile] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentFolder = useSelector(getSelectedFolderPath)
  const [updateFetchedFilesAndFolders] = useLazyFetchFilesAndFoldersQuery()

  const _onCloseModal = () => {
    setFile(null)
    setPreviewUrl(null)
    onClose()
  }

  const handleUploadFile = async () => {
    try {
      setIsUploadingFile(true)
      if (file === null) {
        return toast.error('Please select a file')
      }
      //accept only jpg jpeg png and pdf
      const allowedFileTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'application/pdf',
      ]
      if (!allowedFileTypes.includes(file.type)) {
        return toast.error(
          'Invalid file type: only jpg, jpeg, png and pdf are allowed'
        )
      }

      const formData = new FormData()
      formData.append('folderName', currentFolder) // specify the folder name
      formData.append('file', file)

      const response = await fetch('/api/upload-file', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        toast.success(data.message)
        updateFetchedFilesAndFolders({ folder: currentFolder }) // update the current folder cache
        _onCloseModal()
      } else {
        const error = await response.json()
        const errorMessage = error?.message || 'Error uploading file'
        throw new Error(errorMessage)
      }
    } catch (error: any) {
      console.log(error)
      const errorMessage =
        error?.data?.message || error?.message || 'Error uploading file'
      toast.error(errorMessage)
    } finally {
      setIsUploadingFile(false)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null
    if (selectedFile) {
      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
    } else {
      setFile(null)
      setPreviewUrl(null)
    }
  }

  const handleFileInputClick = () => {
    if (fileInputRef) {
      fileInputRef.current?.click()
    }
  }

  return (
    <Modal
      open={open}
      onClose={_onCloseModal}
      aria-labelledby='file-upload-modal'
      aria-describedby='file-upload-modal-for-current-folder'>
      <Box sx={style}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography id='file-upload-modal-title' variant='h6' component='h2'>
            Upload File
          </Typography>
          <IconButton onClick={_onCloseModal}>
            <Close />
          </IconButton>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent={'center'}
          flexGrow={1}>
          <button onClick={handleFileInputClick}>
            <VisuallyHiddenInput
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              accept='image/png, image/jpeg, image/jpg, application/pdf'
            />
            <UploadCloudIcon width={80} />
          </button>
          {previewUrl && (
            <Box
              position={'relative'}
              display='flex'
              alignItems='center'
              justifyContent={'center'}
              width={'100%'}
              height={'100%'}>
              {file?.type.startsWith('image/') ? (
                <Image
                  src={previewUrl}
                  alt='Preview'
                  fill
                  className='mx-auto max-w-md rounded-sm object-contain pb-2 lg:pb-2'
                />
              ) : (
                <embed
                  src={previewUrl}
                  type='application/pdf'
                  width='100%'
                  height='200px'
                />
              )}
            </Box>
          )}
        </Box>
        <Box
          mt={2}
          display='flex'
          justifyContent='end'
          alignItems={'center'}
          justifySelf={'end'}
          alignSelf={'end'}
          gap={2}>
          <Button
            onClick={_onCloseModal}
            variant='outlined'
            color='error'
            className='justify-end'>
            Cancel
          </Button>

          <Button
            variant='outlined'
            color='inherit'
            onClick={handleUploadFile}
            className='flex min-w-[6rem] justify-center'>
            {isUploadingFile ? (
              <CircularProgress size={24} color='inherit' />
            ) : (
              'Upload'
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default UploadFileModal
