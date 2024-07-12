import { Box, Container, Typography } from '@mui/material'

import NavigateButton from '@/components/Home/NavigateButton'

export const HomeHero = () => {
  return (
    <Container>
      <Box className='flex h-[80vh] flex-col items-center justify-center'>
        <Typography
          component={'h1'}
          align='center'
          className='text-display-md text-neutral-600 md:text-display-lg'>
          Welcome to{' '}
          <Typography
            component={'span'}
            display={'block'}
            className='text-display-md text-neutral-900 md:text-display-xl'>
            Sophisticated File Management
          </Typography>{' '}
          Application
        </Typography>
        <Box mb={4} />
        <NavigateButton />
      </Box>
    </Container>
  )
}
