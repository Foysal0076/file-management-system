import { Box, Typography } from '@mui/material'

import { FolderIcon } from '@/components/Common/Icons'
import { ContextMenuSelectedItem } from '@/components/FileExplorer/FileManager'
import { AwsFolder } from '@/redux/apiQueries/apiQueries.type'

type Props = {
  folder: AwsFolder
  onFolderClick: (folderPath: string) => void
  onRightClick: (e: React.MouseEvent, item: ContextMenuSelectedItem) => void
}

const Folder = ({ folder, onFolderClick, onRightClick }: Props) => {
  const folderName = folder.prefix.split('/').at(-2)

  const _onFolderClick = () => {
    onFolderClick(folder.prefix)
  }

  return (
    <Box
      display='flex'
      justifyContent={'center'}
      alignItems={'center'}
      gap={0.25}
      flexDirection={'column'}
      padding={1}
      sx={{
        cursor: 'pointer',
        borderRadius: 0.25,
        position: 'relative',
        border: '1px solid rgba(0,0,0,0)',
        ':hover': {
          border: '1px solid rgba(0,0,0,0.2)',
          transition: '0.3s',
        },
      }}
      onContextMenu={(e) =>
        onRightClick(e, { path: folder.prefix, type: 'folder' })
      }
      onClick={_onFolderClick}>
      <FolderIcon width={80} />
      <Typography variant='body2' className='line-clamp-2 text-center'>
        {folderName}
      </Typography>
    </Box>
  )
}

export default Folder
