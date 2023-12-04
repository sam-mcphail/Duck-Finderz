import express from 'express'
import { JwtRequest } from '../auth0.js'
import checkJwt from '../auth0.js'

import * as db from '../db/preferences.js'

const router = express.Router()

// GET /api/v1/preferences
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    const preferences = await db.getPreferencesById(auth0Id as string)

    res.json({ preferences })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const newPreferences = req.body
    const auth0Id = req.auth?.sub
    const [preferences] = await db.addPreferences({
      ...newPreferences,
      auth0Id,
    })

    res.json({ preferences })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router