import { render, screen } from '@testing-library/react'

import Main from '.'

describe('<Main />', () => {
  it('should render the heading', () => {
    // render de component
    const { container } = render(<Main />)
    // verify the element exists

    expect(
      screen.getByRole('heading', { name: /Boiler Plate/i })
    ).toBeInTheDocument()

    // generate a snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
})
