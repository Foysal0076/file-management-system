'use client'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Box, Modal, Typography } from '@mui/material'
import Image from 'next/image'
import { useCallback } from 'react'

type Props = {
  url: string
  open: boolean
  handleClose: () => void
  fileType: 'image' | 'pdf' | 'unknown'
}

const FilePreviewModal = ({ url, handleClose, open, fileType }: Props) => {
  const renderContent = useCallback(() => {
    const isPdf = fileType === 'pdf'
    const isImage = fileType === 'image'
    if (isPdf) {
      return (
        <object data={url} width='100%' height='100%' type='application/pdf'>
          <iframe src={url} width='100%' height='100%'>
            <p className='text-center'>
              This browser does not support PDFs. Please download the PDF to
              view it: <a href={url}>Download PDF</a>.
            </p>
          </iframe>
        </object>
      )
    } else if (isImage) {
      return (
        <Box
          position={'relative'}
          display={'flex'}
          alignContent={'center'}
          justifyContent={'center'}
          width={'90%'}
          height={'90%'}
          marginLeft={'auto'}
          marginRight={'auto'}>
          <Image src={url} alt='Preview' className='object-contain' fill />
        </Box>
      )
    } else {
      return (
        <Box display='flex' justifyContent={'center'} alignItems={'center'}>
          <Typography component={'h2'} variant='h4'>
            Unknown File Type
          </Typography>
        </Box>
      )
    }
  }, [fileType, url])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='file-preview-modal'
      aria-describedby='File preview modal'>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
        }}>
        <Box display={'flex'}>
          <button
            className='ml-auto transition-colors duration-300 hover:text-danger-500'
            onClick={handleClose}>
            <CloseOutlinedIcon sx={{ fontSize: '3rem' }} />
          </button>
        </Box>
        {renderContent()}
      </Box>
    </Modal>
  )
}

export default FilePreviewModal
