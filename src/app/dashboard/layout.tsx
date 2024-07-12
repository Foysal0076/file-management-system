import { Container } from '@mui/material'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth/options'
import { CanvasContextProvider } from '@/context/CanvasContext'

const DashboardLayout = async ({ children }: any) => {
  const session = await getServerSession(authOptions)
  if (!session || !session.accessToken) {
    return redirect('/auth/login')
  }
  return (
    <CanvasContextProvider>
      <Container>{children}</Container>
    </CanvasContextProvider>
  )
}

export default DashboardLayout
