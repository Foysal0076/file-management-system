import { Container } from '@mui/material'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth/options'

const DashboardLayout = async ({ children }: any) => {
  const session = await getServerSession(authOptions)
  if (!session || !session.accessToken) {
    return redirect('/auth/login')
  }
  return <Container>{children}</Container>
}

export default DashboardLayout
