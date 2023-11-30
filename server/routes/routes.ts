import express from 'express'
import { getDuck} from '../db/Functions/function'
import  checkJwt, { JwtRequest }  from './auth0'
import { getUserCollection } from '../db/Functions/function'



const router = express.Router()

router.use(checkJwt)

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
    
    const auth0Id = req.auth?.sub;
    if (!auth0Id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userCollection = await getUserCollection(auth0Id);

    res.status(200).json(userCollection);
  } catch (error) {
    console.error('Error fetching user collection:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', checkJwt, async (req: JwtRequest, res) => {

})
