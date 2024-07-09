'use client'
import { Box, Typography } from '@mui/material'

export const MainFooter = () => {
  const year = new Date().getFullYear()
  return (
    <Box>
      <footer className='bg-gray-800 text-white p-4 text-center'>
        <Typography component='p'>
          &copy; {year} Sophisticated File Management
        </Typography>
      </footer>
    </Box>
  )
}
