import request from 'superagent'

async function getDuck() {
  const data = await request.get('/api/v1/routes')
  return data.body
}

async function getUserCollection() {
  const data = await request.get('/api/v1/routes/collection')
  return data.body
}

async function updateUserCollection() {
  try {
    const response = await request
      .post('/api/v1/routes/updateCollection')
      .set('Content-Type', 'application/json')
      .send({
        id: 1,
        duckId: 1,
        auth0Id: "",
        timesCollected: 0
      });

    return response.body;
  } catch (error) {
    console.error('Error updating collection:', error);
    throw error;
  }
}
export { getDuck, getUserCollection,updateUserCollection }
