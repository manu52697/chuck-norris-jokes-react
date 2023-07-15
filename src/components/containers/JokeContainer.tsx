import { Suspense, useEffect, useReducer, useState } from 'react'

import JokeComponent from '../pure/JokeComponent'
import LikeButton from '../pure/buttons/LikeButton'
import DislikeButton from '../pure/buttons/DislikeButton'
import { JokeStats } from '../../types/JokeStats'
import StatsDisplay from '../pure/StatsDisplay'
import useJokesAPI from '../../hooks/useJokesAPI'

import '../../styles/jokeContainer.scss'
import ReloadButton from '../pure/buttons/ReloadButton'
import { CircularProgress } from '@mui/material'

type FeedbackAction = {
  type: 'liked' | 'disliked' | 'load'
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function statsReducer(state: JokeStats, action: FeedbackAction): JokeStats {
  if (action.type === 'liked') {
    return {
      // if was already liked, reduce that count, and set current to 0, otherwise increment count and set current to 1
      // if was disliked, reduce that count
      likeCount: state.current > 0 ? (state.likeCount - 1) : (state.likeCount + 1),
      dislikeCount: state.current < 0 ? (state.dislikeCount - 1) : state.dislikeCount,
      current: state.current > 0 ? 0 : 1
    }
  }

  if (action.type === 'disliked') {
    return {
      // if was already disliked, reduce that count, and set current to 0, otherwise increment the count, set current to -1
      // if was liked, reduce that count
      likeCount: state.current > 0 ? (state.likeCount - 1) : state.likeCount,
      dislikeCount: state.current < 0 ? (state.dislikeCount - 1) : (state.dislikeCount + 1),
      current: state.current < 0 ? 0 : -1
    }
  }
  if (action.type === 'load') {
    return {
      likeCount: state.likeCount,
      dislikeCount: state.dislikeCount,
      current: 0
    }
  }
}

export const JokeContainer = () => {

  const [jokeStats, dispatch] = useReducer(statsReducer, { likeCount: 0, dislikeCount: 0, current: 0 } as JokeStats)
  const [joke, setJoke] = useState('test')
  const [isLoading, setIsLoading] = useState(true)

  const apiRequest = useJokesAPI()

  function handleLike() {
    dispatch(
      {
        type: 'liked',
      }
    )
  }

  function handleDislike() {
    dispatch(
      {
        type: 'disliked'
      }
    )
  }

  function handleLoadNew() {
    dispatch(
      {
        type: 'load'
      }
    )
    setIsLoading(true)
  }

  useEffect(() => {
    let isAborted = false
    console.log('Rendering, isAborted: ', isAborted)
    const requestJoke = async () => {
      const response = await apiRequest()
      !isAborted && setJoke(response.value)
      setIsLoading(false)
    }

    console.log('Loading: ', isLoading)
    isLoading && void requestJoke()

    return () => {
      isAborted = true
    }
  }, [isLoading, apiRequest])


  return (
    <div className='joke-container'>
      <section>
        <div className='stat-group'>
          <StatsDisplay value={jokeStats.likeCount} caption='Liked jokes' />
          <StatsDisplay value={jokeStats.dislikeCount} caption='Disliked jokes' />
        </div>
      </section>
      <section className='joke-section'>
        <div className='feedback-group'>
          <Suspense fallback={<CircularProgress/>}>
            <JokeComponent className='joke-component' joke={joke}></JokeComponent>
          </Suspense>
          <div className='feedback-buttons'>
            <LikeButton isActive={jokeStats.current === 1} action={handleLike}></LikeButton>
            <DislikeButton isActive={jokeStats.current === -1} action={handleDislike}></DislikeButton>
            </div>
        </div>
        <ReloadButton isLoading={isLoading} doReload={handleLoadNew} />
      </section>

    </div>
  )
}
