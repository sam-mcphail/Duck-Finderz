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

describe('<SingleDuck/>', () => {
  it('should render a loading indicator', async () => {
    const scope = nock('http://localhost').get('/api/v1/routes/1').reply(200, {
      id: 1,
      name: 'Gym Duck',
      image: 'some image',
      creator: 'Teancum',
      rarity: 3,
      backstory: 'some backstory',
    })
    renderApp('/ducks/1')
    const loading = await waitFor(() =>
      screen.getByText(/The duck is loading.../i)
    )
    expect(loading).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
  it('should render a duck', async () => {
    const scope = nock('http://localhost').get('/api/v1/routes/1').reply(200, {
      id: 1,
      name: 'Gym Duck',
      image: 'some image',
      creator: 'Teancum',
      rarity: 3,
      backstory: 'some backstory',
    })
    renderApp('/ducks/1')
    await waitForElementToBeRemoved(() =>
      screen.getByText(/The duck is loading.../i)
    )
    const duckName = screen.getAllByRole('heading')
    expect(duckName[1].textContent).toMatchInlineSnapshot('"Gym Duck"')
    expect(scope.isDone()).toBe(true)
  })
  it('should show an error message when there is an error', async () => {
    const scope = nock('http://localhost').get('/api/v1/routes/1').reply(500)
    renderApp('/ducks/1')
    await waitForElementToBeRemoved(() =>
      screen.getByText(/The duck is loading.../i)
    )
    const error = screen.getByText(/There was an error getting the duck.../i)
    expect(error).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})
