//@vitest-environment jsdom

import { describe, it, expect } from 'vitest'
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react'
import { renderApp } from '../../test/setup'
import nock from 'nock'
import userEvent from '@testing-library/user-event'

describe('<LoginPage />', () => {
  it('should render some buttons', async () => {
    renderApp('/')

    const signIn = screen.getAllByRole('button')[1]
    const details = screen.getAllByRole('button')[2]
    const ducks = screen.getAllByRole('button')[3]

    expect(signIn.textContent).toBe('Sign In')
    expect(details.textContent).toBe('More Details')
    expect(ducks.textContent).toBe('Ducks')

    userEvent.click(details)
    await waitFor(() => {
      const detailsText = screen.getByText(
        /Embark on a whimsical web adventure as you use this extension/i
      )
      expect(detailsText).toBeInTheDocument()
    })
  })
  it('should render details when details button is clicked', async () => {
    renderApp('/')

    const details = screen.getAllByRole('button')[2]

    userEvent.click(details)
    await waitFor(() => {
      const detailsText = screen.getByText(
        /Embark on a whimsical web adventure as you use this extension/i
      )
      expect(detailsText).toBeInTheDocument()
    })
  })
})
