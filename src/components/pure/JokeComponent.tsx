import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Typography } from '@mui/material'

const JokeComponent = ({ joke, className }: { joke: string, className?: string }): React.JSX.Element => {
  return (
    <Paper className={className ?? ''} elevation={3} style={{padding:'1.5rem'}}>
      <Typography variant='h5'>
        {joke}
      </Typography>
    </Paper>
  )
}

JokeComponent.propTypes = {
  joke: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default JokeComponent
