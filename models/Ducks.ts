export interface Duck {
  id: number
  name: string
  image: string
  rarity: number
}

export interface User {
  id: number
  name: string
  email: string
}

export interface Collection {
  id: number
  duckId: number
  auth0Id: number
  timesCollected: number
}
