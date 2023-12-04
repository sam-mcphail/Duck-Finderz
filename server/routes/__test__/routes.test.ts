import { expect, it, vi, describe } from 'vitest'
import request from 'supertest'
import server from '../../server'
import { getDuck, getDuckById } from '../../db/Functions/function'

vi.mock('../../db/Functions/function')

describe('/', () => {
  it('calls getDuck', async () => {
    vi.mocked(getDuck).mockResolvedValue([
      {
        id: 1,
        name: 'Gym Duck',
        image: '/images/gym-duck.png',
        rarity: 3,
        creator: 'Teancum',
        backstory: 'This duck has a backstory',
      },
    ])

    const res = await request(server).get('/api/v1/routes')
    expect(res.statusCode).toBe(200)
    expect(getDuck).toHaveBeenCalled()
  })
  it('handles an error', async () => {
    vi.mocked(getDuck).mockRejectedValue(async () => {
      throw new Error('test-error')
    })
    const res = await request(server).get('/api/v1/routes')
    expect(res.statusCode).toBe(500)
    expect(getDuck).toHaveBeenCalled()
  })
})

describe('/:id', () => {
  it('calls getDuckById', async () => {
    vi.mocked(getDuckById).mockResolvedValue({
      id: 1,
      name: 'Gym Duck',
      image: '/images/gym-duck.png',
      rarity: 3,
      creator: 'Teancum',
      backstory: 'This duck has a backstory',
    })

    const res = await request(server).get('/api/v1/routes/1')
    expect(res.statusCode).toBe(200)
    expect(getDuckById).toHaveBeenCalled()
  })
  it('handles an error', async () => {
    vi.mocked(getDuckById).mockRejectedValue(async () => {
      throw new Error('test-error')
    })
    const res = await request(server).get('/api/v1/routes/1')
    expect(res.statusCode).toBe(500)
    expect(getDuckById).toHaveBeenCalled()
  })
})
