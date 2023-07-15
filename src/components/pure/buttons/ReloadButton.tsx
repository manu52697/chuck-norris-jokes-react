import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import { Refresh } from '@mui/icons-material'

const ReloadButton = ({isLoading, doReload}: {isLoading: boolean, doReload: () => void}) => {
  return (
    <Button variant='outlined' disabled={isLoading} onClick={doReload} startIcon={<Refresh color='primary'/>}>
        Load new
    </Button>
  )
}

ReloadButton.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    doReload: PropTypes.func.isRequired,
}

export default ReloadButton