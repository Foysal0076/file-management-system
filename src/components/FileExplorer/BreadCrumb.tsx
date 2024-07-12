'use client'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs } from '@mui/material'
import { useEffect, useState } from 'react'

type Props = {
  pathList: string[]
  onFolderPathClick: (folderPath: string) => void
}

type BearCrumbPath = {
  prefix: string
  pathName: string
}

const BreadCrumb = ({ pathList, onFolderPathClick }: Props) => {
  const [paths, setPaths] = useState<BearCrumbPath[]>([])

  useEffect(() => {
    if (pathList.length > 0) {
      const paths = pathList.map((path, index) => ({
        prefix: pathList.slice(0, index + 1).join('/') + '/',
        pathName: path,
      }))
      setPaths(paths)
    } else {
      setPaths([])
    }
  }, [pathList])

  return (
    <div role='navigation'>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        aria-label='breadcrumb'>
        <button onClick={() => onFolderPathClick('')}>
          <HomeOutlinedIcon />
        </button>
        {paths.map((path, index) => (
          <button
            className='disabled:text-neutral-900'
            disabled={index === paths.length - 1}
            key={index}
            onClick={() => onFolderPathClick(path.prefix)}>
            {path.pathName}
          </button>
        ))}
      </Breadcrumbs>
    </div>
  )
}

export default BreadCrumb
