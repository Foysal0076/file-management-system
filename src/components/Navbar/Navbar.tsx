import ThemeSwitcher from '@/components/Common/ThemeSwitcher'

export const Navbar = () => {
  return (
    <div className='bg-primary-0 border-neutral-500 py-4 shadow-sm dark:border-b dark:bg-info-900/20'>
      <div className='container'>
        <ThemeSwitcher />
      </div>
    </div>
  )
}
