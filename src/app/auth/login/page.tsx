import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth/options'
import LoginForm from '@/components/Auth/LoginForm'

const LoginPage = async () => {
  const session = await getServerSession(authOptions)
  // console.log(session)
  if (session && session.accessToken) {
    return redirect('/dashboard')
  }

  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default LoginPage
