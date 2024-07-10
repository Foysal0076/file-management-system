'use client'
import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import BreadCrumb from '@/components/FileExplorer/BreadCrumb'
import FileItem from '@/components/FileExplorer/FileItem'
import FilePreviewModal from '@/components/FileExplorer/FilePreview'
import Folder from '@/components/FileExplorer/Folder'
import { AwsFile, AwsFolder } from '@/redux/apiQueries/apiQueries.type'
import {
  useDeleteFileMutation,
  useDeleteFolderWithFilesMutation,
  useFetchAwsSignedUrlQuery,
  useFetchFilesAndFoldersQuery,
  useLazyFetchFilesAndFoldersQuery,
} from '@/redux/apiQueries/s3bucket.queries'
import { setSelectedFolderPath } from '@/redux/slice/stateSlice'
import { getFileType } from '@/utils/helpers'
import useContextMenu from '@/utils/hooks/useContextMenu'

export type ContextMenuSelectedItem = { path: string; type: 'folder' | 'file' }

const FileManager = () => {
  const [files, setFiles] = useState<AwsFile[]>([])
  const [folders, setFolders] = useState<AwsFolder[]>([])
  const [openPreview, setOpenPreview] = useState(false)
  const [selectedFile, setSelectedFile] = useState<AwsFile | null>(null)
  const [selectedFolder, setSelectedFolder] = useState<string>('')
  const [pathList, setPathList] = useState<string[]>([])
  const [selectedContextMenuItem, setSelectedContextMenuItem] =
    useState<ContextMenuSelectedItem | null>(null)

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
  const [updateFetchedData] = useLazyFetchFilesAndFoldersQuery()

  const [deleteFolderWithFiles, { isLoading: isDeletingFolder }] =
    useDeleteFolderWithFilesMutation()
  const [deleteFile, { isLoading: isDeletingFile }] = useDeleteFileMutation()

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

  const { _onContextMenuClick, closeContextMenu, Menu } = useContextMenu()

  const onRightClick = (e: React.MouseEvent, item: ContextMenuSelectedItem) => {
    e.preventDefault()
    _onContextMenuClick(e)
    setSelectedContextMenuItem(item)
  }

  const onDelete = async () => {
    if (!selectedContextMenuItem) return

    const isFile = selectedContextMenuItem.type === 'file'
    try {
      Swal.fire({
        title: 'Warning!',
        text: `Do you want to Delete this ${isFile ? 'file' : 'folder'}?`,
        icon: 'question',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
        confirmButtonColor: 'red',
        denyButtonColor: 'black',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            if (isFile) {
              const response = await deleteFile(
                selectedContextMenuItem.path
              ).unwrap()
              console.log(response)
              closeContextMenu()
              updateFetchedData({ folder: selectedFolder })
              Swal.fire({
                title: 'Success!',
                text: `${isFile ? 'File' : 'Folder'} has been deleted successfully`,
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: 'black',
              })
            } else {
              await deleteFolderWithFiles(selectedContextMenuItem.path).unwrap()
              closeContextMenu()
              updateFetchedData({ folder: selectedFolder })
              Swal.fire({
                title: 'Success!',
                text: `${isFile ? 'File' : 'Folder'} has been deleted successfully`,
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: 'black',
              })
            }
          } catch (error: any) {
            const errorMessage =
              error?.data?.message ||
              error?.message ||
              `Failed to delete ${isFile ? 'file' : 'folder'}`
            toast.error(errorMessage)
          }
        } else if (result.isDenied) {
          Swal.fire({
            title: 'Canceled!',
            text: `Data is unchanged`,
            icon: 'info',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'black',
          })
        }
      })
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        `Failed to delete ${isFile ? 'file' : 'folder'}`
      toast.error(errorMessage)
    }
    closeContextMenu()
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
      <ul className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-8 xl:grid-cols-8'>
        {folders.map((folder) => (
          <li key={folder.prefix}>
            <Folder
              folder={folder}
              onFolderClick={onFolderPathClick}
              onRightClick={onRightClick}
            />
          </li>
        ))}
        {files.map((file) => (
          <li key={file.key}>
            <FileItem
              file={file}
              handleOpenPreview={handleOpenPreview}
              onRightClick={onRightClick}
            />
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

      {selectedContextMenuItem && (
        <Menu>
          <ul className='rounded-sm !border border-neutral-500 !p-0'>
            <li className='!px-4'>
              <button onClick={onDelete}>
                Delete{' '}
                {selectedContextMenuItem.type === 'file' ? 'File' : 'Folder'}
              </button>
            </li>
            {/* <li className='!px-4'>Edit</li> */}
          </ul>
        </Menu>
      )}
    </div>
  )
}

export default FileManager
