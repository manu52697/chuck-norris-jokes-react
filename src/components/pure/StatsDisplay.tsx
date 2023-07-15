import PropTypes from 'prop-types'
import { stat } from '../../types/stat'
import { Typography } from '@mui/material'

const StatsDisplay = ({value, caption}: stat) => {
  return (
    <div>
      <Typography variant='h3'>{value}</Typography>
      <Typography variant='overline'>{caption}</Typography>
    </div>
  )
}

StatsDisplay.propTypes = {
  value: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
}

export default StatsDisplay