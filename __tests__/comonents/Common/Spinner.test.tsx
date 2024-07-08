import { render, screen } from '@testing-library/react'

import Spinner from '@/components/Common/Spinner'

describe('Spinner', () => {
  it('matches the snapshot', () => {
    const { container } = render(<Spinner className='h-4 w-4 text-info-800' />)
    expect(container).toMatchSnapshot()
  })

  it('renders with the default className', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('text-neutral-500')
    expect(spinner).toHaveTextContent('Loading...')
  })

  it('renders with a custom className', () => {
    render(<Spinner className='custom-spinner' />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('custom-spinner')
    expect(spinner).toHaveTextContent('Loading...')
  })
})
