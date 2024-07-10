import { Box, Typography } from '@mui/material'

import { ImageIcon } from '@/components/Common/Icons'
import { PdfIcon } from '@/components/Common/Icons/PdfIcon'
import { AwsFile } from '@/redux/apiQueries/apiQueries.type'

type Props = {
  file: AwsFile
  handleOpenPreview: (file: AwsFile) => void
}

const FileItem = ({ file, handleOpenPreview }: Props) => {
  const fileTypeExtension = file.key.split('.').pop()

  const isPdf = fileTypeExtension === 'pdf'
  const isImage = ['png', 'jpg', 'jpeg', 'gif'].includes(
    fileTypeExtension ?? ''
  )

  const fileName = file.key.split('/').pop()

  const _handleOpenPreview = () => {
    handleOpenPreview(file)
  }

  return (
    <Box
      display='flex'
      alignItems={'center'}
      gap={0.25}
      flexDirection={'column'}
      padding={0.25}
      paddingTop={1}
      onClick={_handleOpenPreview}
      sx={{
        cursor: 'pointer',
        borderRadius: 0.25,
        border: '1px solid rgba(0,0,0,0)',
        ':hover': {
          border: '1px solid rgba(0,0,0,0.2)',
          transition: '0.3s',
        },
      }}>
      {isPdf ? (
        <PdfIcon width={80} />
      ) : isImage ? (
        <ImageIcon width={80} />
      ) : (
        <div>Unknown File Type</div>
      )}

      <Typography
        variant='body2'
        className='mt-1.5 line-clamp-2'
        sx={{
          inlineSize: '100px',
          overflowWrap: 'break-word',
          hyphens: 'auto',
          textAlign: 'center',
        }}>
        {fileName}
      </Typography>
    </Box>
  )
}

export default FileItem
