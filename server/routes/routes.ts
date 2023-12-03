import express from 'express'
import { getDuck } from '../db/Functions/function'
import checkJwt, { JwtRequest } from './auth0'
import {
  getUserCollection,
  updateUserCollection,
  duckCollected,
  collectedCanary,
} from '../db/Functions/function'

const router = express.Router()

//router.use(checkJwt)

router.get('/', async (req, res) => {
  try {
    const Ducks = await getDuck()
    res.status(200).json(Ducks)
  } catch (error) {
    console.error('Error fetching Ducks:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/collection', async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    if (!auth0Id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const userCollection = await getUserCollection(auth0Id)

    res.status(200).json(userCollection)
  } catch (error) {
    console.error('Error fetching user collection:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.post('/updateCollection', async (req: JwtRequest, res) => {
  try {
    console.log('Handling POST request:', req.body)

    const duckId = parseInt(req.params.duckId, 10)
    const auth0Id = req.auth?.sub

    console.log('Auth0 User ID:', auth0Id)

    if (!auth0Id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    await updateUserCollection(auth0Id, duckId)

    res.status(200).json({ message: 'Collection updated' })
  } catch (error) {
    console.error('Error updating user collection:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.put('/duck-collected', async (req, res) => {
  try {
    const { duckId, username } = req.body
    await duckCollected(duckId, username)
    const canary = await collectedCanary()
    console.log(canary, req.body)
    res.status(200).json({ message: `Duck Collected!` })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Internal Server Error ' })
  }
})

export default router
