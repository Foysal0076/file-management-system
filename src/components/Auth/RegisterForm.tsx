'use client'
import React from 'react'

const RegisterForm = () => {
  //add onchange and onsubmit functions

  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //get the form values
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value
    //call the register function
    console.log(email, password)
  }

  return (
    <div className='flex h-[80vh] flex-col items-center justify-center bg-neutral-900'>
      <div className='bg-white w-96 rounded-lg p-8 shadow-lg'>
        <h2 className='text-2xl mb-4 font-bold'>Register</h2>
        <form>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='mb-2 block font-bold text-neutral-700'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='focus:border-indigo-500 w-full rounded border border-neutral-300 px-3 py-2 focus:outline-none'
              placeholder='Enter your email'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='mb-2 block font-bold text-neutral-700'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='focus:border-indigo-500 w-full rounded border border-neutral-300 px-3 py-2 focus:outline-none'
              placeholder='Enter your password'
            />
          </div>
          <button
            type='submit'
            className='bg-indigo-500 text-white hover:bg-indigo-600 w-full rounded px-4 py-2 focus:outline-none'>
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
