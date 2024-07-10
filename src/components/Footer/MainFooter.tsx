'use client'
import { Box, Typography } from '@mui/material'

export const MainFooter = () => {
  const year = new Date().getFullYear()
  return (
    <Box>
      <footer className='p-4 text-center'>
        <Typography component='p'>
          &copy; {year} Sophisticated File Management System
        </Typography>
      </footer>
    </Box>
  )
}
