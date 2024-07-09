import { Typography } from '@mui/material'

import AddNewButton from '@/components/FileExplorer/AddNewButton'

const FileExplorerPage = () => {
  return (
    <div>
      <Typography>FileExplorerPage</Typography>
      <div className='fixed bottom-28 right-16 z-50'>
        <AddNewButton />
      </div>
    </div>
  )
}

export default FileExplorerPage
