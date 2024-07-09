'use client'

import { signOut, useSession } from 'next-auth/react'

const NavbarAuthMenu = () => {
  const { data: session, status } = useSession()
  const isLogged = status === 'authenticated'
  // const isNotLogged = status === 'unauthenticated'
  const user = session?.user
  const initial =
    user?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('') || 'U'

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <>
      {isLogged ? (
        <div className='flex gap-2'>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-0 text-md font-bold text-neutral-0 dark:bg-neutral-600`}>
            <span className='text-white text-sm font-semibold'>{initial}</span>
          </div>
          <button className='' onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <a
          href='/auth/login'
          className='text-neutral-900 hover:text-primary-500 focus:text-primary-500 dark:text-neutral-0'>
          Log In
        </a>
      )}
    </>
  )
}

export default NavbarAuthMenu
