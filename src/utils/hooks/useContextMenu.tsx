import { Box } from '@mui/material'
import React, { useMemo, useRef, useState } from 'react'

import { useOutsideClick } from '@/utils/hooks/useOutsideClick'

type Position = {
  x: number
  y: number
}

const useContextMenu = (handler?: any) => {
  const [offSet, setOffSet] = useState({ xAxis: 150, yAxis: 150 })

  const [showContextMenu, setShowContextMenu] = useState<boolean>(false)
  const [contextMenuPosition, setContextMenuPosition] = useState<Position>({
    x: 0,
    y: 0,
  })

  const contextMenuRef = useRef(null)

  const _onContextMenuClick = (event: React.MouseEvent) => {
    const clickX = event.clientX
    const clickY = event.clientY
    const screenH = window.innerHeight
    const screenW = window.innerWidth
    const right = screenW - clickX > offSet.xAxis
    const left = !right
    const top = screenH - clickY > offSet.yAxis
    const bottom = !top
    let x = 0
    let y = 0
    if (right) {
      x = clickX + 5
    }
    if (left) {
      x = clickX - offSet.xAxis + 15
    }
    if (top) {
      y = clickY - 15
    }
    if (bottom) {
      y = clickY - offSet.yAxis - 5
    }
    handler && handler(event)
    setContextMenuPosition({ x, y })
    setShowContextMenu(true)
  }

  const closeContextMenu = () => {
    setShowContextMenu(false)
  }

  const Menu = useMemo(() => {
    const MenuComponent = ({ children }: any) => {
      return (
        <Box
          ref={contextMenuRef}
          sx={{
            display: showContextMenu ? 'block' : 'none',
            background: (theme) => theme.palette.background.paper,
            position: 'absolute',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
            '& ul': {
              listStyle: 'none',
              margin: 0,
              padding: '10px',
              '& li': {
                padding: '5px 0',
                '&:hover': {
                  backgroundColor: '#dedede',
                  cursor: 'pointer',
                },
              },
            },
          }}>
          {children}
        </Box>
      )
    }
    return MenuComponent
  }, [showContextMenu, contextMenuPosition])

  useOutsideClick(contextMenuRef, () => setShowContextMenu(false))

  return { _onContextMenuClick, closeContextMenu, Menu }
}

export default useContextMenu
