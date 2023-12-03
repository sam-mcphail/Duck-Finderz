import { Duck } from '../../../models/Ducks.ts'
import connection from '../connection.ts'

function getDuck(): Promise<Duck[]> {
  return connection('Ducks')
    .select('*')
    .then((data) => {
      console.log('API Response:', data)
      return data as Duck[]
    })
    .catch((error) => {
      console.error('API Error:', error)
      throw error
    })
}

export { getDuck }

function getUserCollection(auth0Id: string): Promise<string[]> {
  return connection('Collections').where('auth0Id', auth0Id).pluck('duckId')
}

export { getUserCollection }

function updateUserCollection(userId: string, duckId: number): Promise<void> {
  return connection('Collections')
    .update({ duckId })
    .where('userId', userId)
    .then(() => {})
}

export { updateUserCollection }

export function collectedCanary() {
  return connection('Collection').select('*')
}

export function duckCollected(duckId: number, username: string) {
  return connection('Collection')
    .update({
      timesCollected: connection.raw('timesCollected + 1'),
    })
    .where('username', username)
    .andWhere('duckId', duckId)
}
