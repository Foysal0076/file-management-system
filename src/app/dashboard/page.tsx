'use client'

import { Box, Button, CircularProgress, Typography } from '@mui/material'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const DashboardHomePage = () => {
  const session = useSession()
  const isLoading = session.status === 'loading'
  const isLogged = session.status === 'authenticated'
  const user = session.data?.user

  const fetchWithAccessToken = async () => {
    const res = await fetch('/api/user', {
      headers: {
        Authorization: `Bearer ${session?.data?.accessToken}`,
      },
      cache: 'no-cache',
    })
    if (res.ok) {
      const data = await res.json()
      console.log(data)
    } else {
      const error = await res.json()
      console.error(res.status, error)
    }
  }

  return (
    <Box className='py-20'>
      {isLoading && (
        <Box className='my-20 flex items-center justify-center'>
          <CircularProgress size={32} color='inherit' />
        </Box>
      )}
      {isLogged && (
        <>
          <Box>
            <Typography
              variant='h5'
              component={'h1'}
              className='text-center text-neutral-800'>
              Welcome{' '}
              <Typography
                component={'span'}
                fontSize={36}
                className='block text-neutral-900'>
                {' '}
                {user?.name}
              </Typography>
            </Typography>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            my={4}
            gap={2}>
            <Link href='/dashboard/file-explorer'>
              <Button
                variant='outlined'
                color='inherit'
                className='max-w-fit-content'>
                File Explorer
              </Button>
            </Link>
            <Link href='/dashboard/draw'>
              <Button
                variant='outlined'
                color='inherit'
                className='max-w-fit-content'>
                Draw
              </Button>
            </Link>
          </Box>
        </>
      )}
    </Box>
  )
}

export default DashboardHomePage
