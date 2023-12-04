export function logError(err: Error) {
  console.log(err)
  if (err.message === 'username Taken') {
    throw new Error('username already taken - please choose another')
  } else if (err.message === 'Forbidden') {
    throw new Error(
      'Only logged in users can view collections'
    )
  } else {
    console.error('Error consuming the API (in client/api.js):', err.message)
    throw err
  }
}