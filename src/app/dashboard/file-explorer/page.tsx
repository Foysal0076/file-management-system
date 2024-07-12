import AddNewButton from '@/components/FileExplorer/AddNewButton'
import FileManager from '@/components/FileExplorer/FileManager'

const FileExplorerPage = () => {
  return (
    <div className='pt-8'>
      <FileManager />
      <div className='fixed bottom-28 right-16 z-50'>
        <AddNewButton />
      </div>
    </div>
  )
}

export default FileExplorerPage
