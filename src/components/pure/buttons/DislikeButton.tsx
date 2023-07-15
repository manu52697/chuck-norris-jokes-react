import PropTypes from 'prop-types'
import { IconButton } from '@mui/material'
import { ThumbDown, ThumbDownAltOutlined } from '@mui/icons-material'

const DislikeButton = ({isActive, action}: {isActive: boolean, action: () => void}) => {
  return (
    <>
    {
        isActive
        ? <IconButton onClick={action}><ThumbDown color='error'></ThumbDown></IconButton>
        : <IconButton onClick={action}><ThumbDownAltOutlined color='error'></ThumbDownAltOutlined></IconButton>
    }
    </>
  )
}

DislikeButton.propTypes = {
    isActive: PropTypes.bool.isRequired,
    action: PropTypes.func.isRequired,
}

export default DislikeButton