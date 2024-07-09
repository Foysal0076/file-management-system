import HomeIcon from '@mui/icons-material/Home'
import { Container } from '@mui/material'
import Link from 'next/link'

import NavbarAuthMenu from '@/components/Auth/NavbarAuthMenu'

export const Navbar = () => {
  return (
    <div className='bg-primary-0 border-neutral-500 py-4 shadow-sm dark:border-b dark:bg-info-900/20'>
      <Container>
        {/* <ThemeSwitcher /> */}
        <div className='flex items-center justify-between'>
          <Link href='/' className='flex gap-1'>
            <HomeIcon />
            <h1 className='text-lg font-bold tracking-normal'>Home</h1>
          </Link>
          <div className='flex space-x-4'>
            <NavbarAuthMenu />
          </div>
        </div>
      </Container>
    </div>
  )
}
