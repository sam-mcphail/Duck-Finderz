import { describe, it, expect } from 'vitest'
import { renderApp } from '../../test/setup'
import nock from 'nock'
import {
  waitForElementToBeRemoved,
  screen,
  waitFor,
  within,
} from '@testing-library/react'

// const scope = nock('http://localhost').get('/api/v1/routes')
// const mockDucks = [
//   {
//     id: '1',
//     name: 'Duck 1',
//     description: 'Duck 1 description',
//     imageUrl: 'https://example.com/duck1.jpg',
//     rarity: 1,
//     creator: 'Mike',
//   },
// ]

describe('<Ducks />', () => {
  it('should render a loading indicator', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/routes')
      .reply(200, [
        {
          id: 1,
          name: 'Gym Duck',
          image: 'some image',
          creator: 'Teancum',
          rarity: 3,
          backstory: 'some backstory',
        },
        {
          id: 2,
          name: 'Another Gym Duck',
          image: 'some other image',
          creator: 'Another Teancum',
          rarity: 2,
          backstory: 'some other backstory',
        },
      ])
    renderApp('/ducks')
    const loading = await waitFor(() => {
      screen.getByText(/Loading.../i)
    })
    expect(loading).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})
