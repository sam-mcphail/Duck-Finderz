import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth0 } from '@auth0/auth0-react'
import { useUser } from '../hooks/preferences'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

function Register() {
  const [errorMsg, setErrorMsg] = useState('')
  const { getAccessTokenSilently } = useAuth0()
  const preferences = useUser()

  const handleMutationSuccess = () => {
    setErrorMsg('')
  }

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setErrorMsg(error.message)
    } else {
      setErrorMsg('An unknown error occurred.')
    }
  }

  const mutationOptions = {
    onSuccess: handleMutationSuccess,
    onError: handleError,
  }

  const navigate = useNavigate()
  const [form, setForm] = useState({
    userName: '',
  })

  useEffect(() => {
    if (preferences.data) navigate('/')
  }, [preferences.data, navigate])

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    const token = await getAccessTokenSilently()
    evt.preventDefault()
    preferences.add.mutate(
      {
        newPreferences: form,
        token,
      },
      mutationOptions
    )
    navigate('/register')
  }

  const hideError = () => {
    setErrorMsg('')
  }

  return (
    <div>
      <div>
        <IfAuthenticated>
          <h1>Enter your details</h1>
          {errorMsg && (
            <div>
              Error: {errorMsg}
              <button onClick={hideError}>Okay</button>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userName">User Name: </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={form.userName}
                onChange={handleChange}
              />
            </div>
          </form>
        </IfAuthenticated>
      </div>

      <IfNotAuthenticated>
        <h1>Please sign in</h1>
      </IfNotAuthenticated>
    </div>
  )
}

export default Register
