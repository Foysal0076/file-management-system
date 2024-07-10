'use client'

import { useState } from 'react'

import AddFolderModal from '@/components/FileExplorer/AddFolderModal'
import UploadFileModal from '@/components/FileExplorer/UploadFileModal'

const AddNewButton = () => {
  const [openFolderModal, setOpenFolderModal] = useState(false)
  const [openAddFileModal, setOpenAddFileModal] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const handleOpenUploadModal = () => setIsUploadModalOpen(true)

  const handleCloseUploadModal = () => setIsUploadModalOpen(false)

  const handleCloseFolderModal = () => {
    setOpenFolderModal(false)
  }

  const handleOpenFolderModal = () => {
    setOpenFolderModal(true)
  }

  return (
    <>
      <div className='group relative pt-8'>
        <div className='absolute right-0 -mt-24 hidden w-40 pt-2 group-hover:block'>
          <div className='bg-white shadow-none rounded-sm border border-neutral-900'>
            <button
              className='w-full cursor-pointer px-4 py-2 text-right hover:bg-neutral-20'
              onClick={handleOpenUploadModal}>
              Add File
            </button>
            <hr className='text-neutral-500' />
            <button
              className='w-full cursor-pointer px-4 py-2 text-right hover:bg-neutral-20'
              onClick={handleOpenFolderModal}>
              Add Folder
            </button>
          </div>
        </div>
        <button className='flex h-12 w-12 items-center justify-center rounded-full border border-neutral-900'>
          <span className='-mt-1 text-display-xs'>+</span>
        </button>
      </div>
      <AddFolderModal open={openFolderModal} onClose={handleCloseFolderModal} />

      <UploadFileModal
        open={isUploadModalOpen}
        onClose={handleCloseUploadModal}
      />
    </>
  )
}

export default AddNewButton
