import Collection from './Collection'
import Nav from './Nav'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import LoginPage from './LoginPage'
import { Flex } from '@chakra-ui/react'
import Register from './Register'

function App() {
  // const navigate = useNavigate()
  // const isAuth = true

  return (
    <div>
      <IfNotAuthenticated>
        <LoginPage />
      </IfNotAuthenticated>
      <div>
        <IfAuthenticated>
          <Register />
          <Collection />
        </IfAuthenticated>
      </div>
    </div>
  )
}

export default App
