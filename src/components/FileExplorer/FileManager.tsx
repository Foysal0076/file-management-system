'use client'
import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'

import FileItem from '@/components/FileExplorer/FileItem'
import FilePreviewModal from '@/components/FileExplorer/FilePreview'
import Folder from '@/components/FileExplorer/Folder'
import { AwsFile, AwsFolder } from '@/redux/apiQueries/apiQueries.type'
import {
  useFetchAwsSignedUrlQuery,
  useFetchFilesAndFoldersQuery,
} from '@/redux/apiQueries/s3bucket.queries'
import { getFileType } from '@/utils/helpers'

const FileManager = () => {
  const [files, setFiles] = useState<AwsFile[]>([])
  const [folders, setFolders] = useState<AwsFolder[]>([])
  const [openPreview, setOpenPreview] = useState(false)
  const [selectedFile, setSelectedFile] = useState<AwsFile | null>(null)
  const { data: signedUrl, isLoading: isFetchingSignedUrl } =
    useFetchAwsSignedUrlQuery(
      {
        key: selectedFile?.key ?? '',
      },
      { skip: !selectedFile }
    )

  const { data, isLoading } = useFetchFilesAndFoldersQuery({
    folder: 'First Folder/',
  })

  const handleOpenPreview = (file: AwsFile) => {
    setSelectedFile(file)
    setOpenPreview(true)
  }

  const handleClosePreview = () => {
    setOpenPreview(false)
    setSelectedFile(null)
  }

  console.log(data)

  useEffect(() => {
    if (data) {
      setFiles(data.files)
      setFolders(data.folders)
    }
  }, [data])

  if (isLoading) {
    return (
      <div className='flex h-[70vh] items-center justify-center'>
        <CircularProgress sx={{ color: '#000' }} />
      </div>
    )
  }

  return (
    <div>
      <ul className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 xl:grid-cols-8'>
        {folders.map((folder) => (
          <li key={folder.prefix}>
            <Folder folder={folder} />
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
