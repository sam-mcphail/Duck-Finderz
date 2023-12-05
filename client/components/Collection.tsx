import { useQuery } from '@tanstack/react-query'
import { getCollectionByUserName } from '../apis/api'
import {
  Box,
  Card,
  CardBody,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Stack,
} from '@chakra-ui/react'
import { Collection } from '../../models/Ducks'
import { Link, useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { duckCollected } from '../../server/db/Functions/function'

const UserCollection = () => {
  const { user } = useAuth0()
  const username = user?.nickname as string
  console.log(user?.nickname)

  const {
    data: Ducks,
    isLoading,
    error,
  } = useQuery<[Collection]>({
    queryKey: ['Collection', username],
    queryFn: () => getCollectionByUserName(username),
  })

  console.log(Ducks)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error fetching Ducks: </p>
  }

  return (
    <div>
      <Container marginTop="25px">
        <Grid templateColumns="repeat(3, 1fr)">
          <GridItem colSpan={3}>
            {' '}
            <Center>
              <Heading
                fontFamily="shadows into  light"
                size="3xl"
                marginTop="20px"
                marginBottom="40px"
              >
                Duck Collection
              </Heading>
            </Center>
          </GridItem>

          <GridItem colSpan={3}>
            <Box
              bg="#044c34"
              w="100%"
              p={4}
              color="white"
              marginBottom="10px"
              borderRadius="5px"
            >
              <Text
                textAlign="center"
                fontFamily="shadows into  light"
                fontSize="2xl"
                fontWeight="bold"
              >
                Common
              </Text>
            </Box>
          </GridItem>

          {Ducks ? (
            Ducks.map((Duck: Collection) =>
              Duck.rarity == 1 && Duck.timesCollected > 0 ? (
                <GridItem key={Duck.id} colSpan={1} margin="0 10px 20px 10px">
                  <Grid templateColumns="repeat(3, 1fr)">
                    <Link to={`/ducks/${Duck.id}`}>
                      <Card borderColor="#044c34" borderWidth="1px">
                        {/* <CardBody> */}
                        <Image src={Duck.image} alt={Duck.name}></Image>
                        {/* </CardBody> */}
                      </Card>
                    </Link>
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      textAlign="center"
                      fontFamily="shadows into  light"
                      margin="auto auto auto auto"
                    >
                      {Duck.timesCollected}
                    </Text>
                  </Grid>
                </GridItem>
              ) : null
            )
          ) : (
            <p>No Ducks available</p>
          )}
          <GridItem colSpan={3}>
            <Box
              bg="#472273"
              w="100%"
              p={4}
              color="white"
              marginBottom="10px"
              borderRadius="5px"
            >
              <Text
                textAlign="center"
                fontFamily="shadows into  light"
                fontSize="2xl"
                fontWeight="bold"
              >
                Rare
              </Text>
            </Box>
          </GridItem>

          {Ducks ? (
            Ducks.map((Duck: Collection) =>
              Duck.rarity == 2 && Duck.timesCollected > 0 ? (
                <GridItem key={Duck.id} colSpan={1} margin="0 10px 20px 10px">
                  <Grid templateColumns="repeat(3, 1fr)">
                    <Link to={`/ducks/${Duck.id}`}>
                      <Card borderColor="#472273" borderWidth="1px">
                        {/* <CardBody> */}
                        <Image src={Duck.image} alt={Duck.name}></Image>
                        {/* </CardBody> */}
                      </Card>
                    </Link>
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      textAlign="center"
                      fontFamily="shadows into  light"
                      margin="auto auto auto auto"
                    >
                      {Duck.timesCollected}
                    </Text>
                  </Grid>
                </GridItem>
              ) : null
            )
          ) : (
            <p>No Ducks available</p>
          )}
          <GridItem colSpan={3}>
            <Box
              bg="#fcc200"
              w="100%"
              p={4}
              color="white"
              marginBottom="10px"
              borderRadius="5px"
            >
              <Text
                textAlign="center"
                fontFamily="shadows into  light"
                fontSize="2xl"
                fontWeight="bold"
              >
                Legendary
              </Text>
            </Box>
          </GridItem>

          {Ducks ? (
            Ducks.map((Duck: Collection) =>
              Duck.rarity == 3 && Duck.timesCollected > 0 ? (
                <GridItem key={Duck.id} colSpan={1} margin="0 10px 20px 10px">
                  <Grid templateColumns="repeat(3, 1fr)">
                    <Link to={`/ducks/${Duck.id}`}>
                      <Card borderColor="#fcc200" borderWidth="1px">
                        {/* <CardBody> */}
                        <Image src={Duck.image} alt={Duck.name}></Image>
                        {/* </CardBody> */}
                      </Card>
                    </Link>
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      textAlign="center"
                      fontFamily="shadows into  light"
                      margin="auto auto auto auto"
                    >
                      {Duck.timesCollected}
                    </Text>
                  </Grid>
                </GridItem>
              ) : null
            )
          ) : (
            <p>No Ducks available</p>
          )}
        </Grid>
      </Container>
    </div>
  )
}

export default UserCollection
