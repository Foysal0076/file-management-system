'use client'
import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import BreadCrumb from '@/components/FileExplorer/BreadCrumb'
import FileItem from '@/components/FileExplorer/FileItem'
import FilePreviewModal from '@/components/FileExplorer/FilePreview'
import Folder from '@/components/FileExplorer/Folder'
import { AwsFile, AwsFolder } from '@/redux/apiQueries/apiQueries.type'
import {
  useFetchAwsSignedUrlQuery,
  useFetchFilesAndFoldersQuery,
} from '@/redux/apiQueries/s3bucket.queries'
import { setSelectedFolderPath } from '@/redux/slice/stateSlice'
import { getFileType } from '@/utils/helpers'

const FileManager = () => {
  const [files, setFiles] = useState<AwsFile[]>([])
  const [folders, setFolders] = useState<AwsFolder[]>([])
  const [openPreview, setOpenPreview] = useState(false)
  const [selectedFile, setSelectedFile] = useState<AwsFile | null>(null)
  const [selectedFolder, setSelectedFolder] = useState<string>('')
  const [pathList, setPathList] = useState<string[]>([])

  const dispatch = useDispatch()

  const { data: signedUrl, isLoading: isFetchingSignedUrl } =
    useFetchAwsSignedUrlQuery(
      {
        key: selectedFile?.key ?? '',
      },
      { skip: !selectedFile }
    )

  const { data, isLoading, isSuccess } = useFetchFilesAndFoldersQuery({
    folder: selectedFolder,
  })

  const handleOpenPreview = (file: AwsFile) => {
    setSelectedFile(file)
    setOpenPreview(true)
  }

  const handleClosePreview = () => {
    setSelectedFile(null)
    setOpenPreview(false)
  }

  const onFolderPathClick = (folderPath: string) => {
    setSelectedFolder(folderPath)
    dispatch(setSelectedFolderPath(folderPath))
  }

  useEffect(() => {
    if (data) {
      setPathList(selectedFolder.split('/').filter((path) => path !== ''))
      setFiles(data.files)
      setFolders(data.folders)
    }
  }, [data])

  const isEmptyFolder = isSuccess && files.length === 0 && folders.length === 0

  if (isLoading) {
    return (
      <div className='flex h-[70vh] items-center justify-center'>
        <CircularProgress sx={{ color: '#000' }} />
      </div>
    )
  }

  return (
    <div>
      <div className='mb-8'>
        <BreadCrumb pathList={pathList} onFolderPathClick={onFolderPathClick} />
      </div>
      {isEmptyFolder && (
        <div className='flex h-[40vh] items-center justify-center'>
          <div className='text-center text-lg font-semibold'>
            No file or folder found.
          </div>
        </div>
      )}
      <ul className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 xl:grid-cols-8'>
        {folders.map((folder) => (
          <li key={folder.prefix}>
            <Folder folder={folder} onFolderClick={onFolderPathClick} />
          </li>
        ))}
        {files.map((file) => (
          <li key={file.key}>
            <FileItem file={file} handleOpenPreview={handleOpenPreview} />
          </li>
        ))}
      </ul>
      {selectedFile && signedUrl && (
        <FilePreviewModal
          open={openPreview}
          handleClose={handleClosePreview}
          url={signedUrl.url}
          fileType={getFileType(selectedFile)}
        />
      )}
    </div>
  )
}

export default FileManager
