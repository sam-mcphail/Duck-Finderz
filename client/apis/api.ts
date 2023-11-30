import request from 'superagent'

async function getDuck() {
  const data = await request.get('/api/v1/routes')
  return data.body
}

async function getUserCollection() {
  const data = await request.get('/api/v1/routes/collection')
  return data.body
}

export { getDuck, getUserCollection }
