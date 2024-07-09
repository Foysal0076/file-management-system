'use client'

import { Box, Button, CircularProgress } from '@mui/material'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const NavigateButton = () => {
  const { data: session, status } = useSession()
  const isLogged = session?.user
  const isLoading = status === 'loading'

  return (
    <Box>
      {isLoading ? (
        <CircularProgress size={32} />
      ) : isLogged ? (
        <Link href='/dashboard'>
          <Button variant='outlined' color='inherit'>
            Go to Dashboard
          </Button>
        </Link>
      ) : (
        <Link href='/auth/login' className='mt-8'>
          <Button variant='outlined' color='inherit'>
            Please log in to continue
          </Button>
        </Link>
      )}
    </Box>
  )
}

export default NavigateButton
