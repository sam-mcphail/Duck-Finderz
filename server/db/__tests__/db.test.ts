import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { getDuck, getDuckById } from '../Functions/function'
import connection from '../connection'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('getDuck', () => {
  it('should return all ducks', async () => {
    const allDucks = await getDuck()
    expect(allDucks).toHaveLength(14)
    expect(allDucks[0].name).toBe('Gym Duck')
  })
})

describe('getDuckById', () => {
  it('should return a single duck', async () => {
    const singleDuck = await getDuckById(1)
    expect(singleDuck.name).toBe('Gym Duck')
  })
})

afterAll(() => {
  connection.destroy()
})
