import { JokeContainer } from '../components/containers/JokeContainer'
import { Container, Typography } from '@mui/material'

export const HomePage = () => {
  return (
    <Container>
      <Typography variant='h1'> Chuck Jokes </Typography>
      <JokeContainer/>
    </Container>
  )
}
