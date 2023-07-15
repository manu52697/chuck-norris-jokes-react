import PropTypes from 'prop-types'
import { IconButton } from '@mui/material'
import { ThumbUp, ThumbUpAltOutlined } from '@mui/icons-material'

const LikeButton = ({isActive, action}: {isActive: boolean, action: () => void}) => {

  return (
    <>
    {
        isActive
        ? <IconButton onClick={action}><ThumbUp color='success'></ThumbUp></IconButton>
        : <IconButton onClick={action}><ThumbUpAltOutlined color='success'></ThumbUpAltOutlined></IconButton>
    }
    </>
  )
}

LikeButton.propTypes = {
    isActive: PropTypes.bool.isRequired,
    action: PropTypes.func.isRequired,
}

export default LikeButton