'use client'
import { Button } from '@mui/material'
import { signIn } from 'next-auth/react'

const LoginForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value
    await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/dashboard',
    })
  }

  return (
    <div className='flex h-[80vh] items-center justify-center'>
      <form
        className='mb-4 rounded bg-neutral-0 px-8 pb-8 pt-6 shadow-sm dark:bg-neutral-800'
        onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            className='text-gray-700 mb-2 block text-sm font-bold'
            htmlFor='email'>
            Email
          </label>
          <input
            className='shadow text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight focus:outline-none'
            id='email'
            type='email'
            defaultValue='test@foy.com'
            placeholder='Enter your email'
          />
        </div>
        <div className='mb-6'>
          <label
            className='text-gray-700 mb-2 block text-sm font-bold'
            htmlFor='password'>
            Password
          </label>
          <input
            className='shadow text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight focus:outline-none'
            id='password'
            type='password'
            defaultValue='Test1234'
            placeholder='Enter your password'
          />
        </div>
        <div className='flex items-center justify-center'>
          <Button color='inherit' variant='outlined' type='submit'>
            Log In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
