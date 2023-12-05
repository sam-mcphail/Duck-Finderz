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
import handleSignIn from '../Nav'

describe('<Nav />', () => {
  it('should render title', async () => {
    renderApp('/ducks')

    const title = screen.getByRole('heading')
    expect(title.textContent).toBe('DUCK FINDERZ')
  })
  it('should render two links', async () => {
    renderApp('/ducks')

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
  })
  it('should render a button', async () => {
    renderApp('/ducks')

    const button = screen.getAllByRole('button')
    expect(button).toHaveLength(1)
  })
})
