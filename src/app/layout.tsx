import '@/styles/globals.css'
import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

import { Open_Sans } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

import { AuthProvider } from '@/auth/AuthProvider'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { ReduxProvider } from '@/redux/ReduxProvider'

// eslint-disable-next-line no-unused-vars
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
  fallback: ['Poppins', 'sans-serif'],
})

export const metadata = {
  title: 'File management and drawing app',
  description:
    'Amazon S3 bucket file management system, and drawing canvas using fabric.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <link
        rel='icon'
        type='image/ico'
        sizes='32x32'
        href='/assets/favicons/favicon.ico'
      />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/assets/favicons/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/assets/favicons/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/assets/favicons/favicon-16x16.png'
      />
      <body suppressHydrationWarning>
        <ReduxProvider>
          <AuthProvider>
            <div className='flex min-h-screen flex-col justify-between bg-neutral-0 dark:bg-neutral-900'>
              <div>
                <Navbar />
                <main>{children}</main>
              </div>
              <Footer />
            </div>
          </AuthProvider>
        </ReduxProvider>
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          draggable
          pauseOnHover
          pauseOnFocusLoss={false}
        />
      </body>
    </html>
  )
}
