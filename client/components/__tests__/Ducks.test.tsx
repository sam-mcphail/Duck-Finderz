import { describe, it, expect } from 'vitest'
import { renderApp } from '../../test/setup'
import nock from 'nock'
import { waitForElementToBeRemoved } from '@testing-library/react/pure'

const scope = nock('http://localhost').get('/api/v1/routes')
const mockDucks = [
  {
    id: '1',
    name: 'Duck 1',
    description: 'Duck 1 description',
    imageUrl: 'https://example.com/duck1.jpg',
    rarity: 1,
    creator: 'Mike',
  },
]

describe('Ducks', () => {
  it('should render loading message', async () => {})

  it('it should render ducks', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/ducks')
      .reply(200, mockDucks)

    const screen = renderApp('/ducks')

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

    const ducks = screen.getAllByRole('paragraph')
    expect(ducks[0]).toHaveTextContent('Duck 1')
    expect(ducks[0]).toHaveTextContent('Duck 1 description')

    expect(scope.isDone()).toBe(true)
  })

  it('should render error message', async () => {
    const scope = nock('http://localhost').get('/api/v1/ducks').reply(500)

    const screen = renderApp('/')

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

    const error = screen.getByText('Error')
    expect(error).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})
