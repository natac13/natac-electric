import React from 'react'
import { IconButton } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'
// import { Close as CloseIcon } from 'mdi-material-ui'

interface Props {
  closeSnackbar: () => void
}

const CloseSnack: React.FC<Props> = ({ closeSnackbar }: Props) => {
  return (
    <IconButton
      key="close"
      aria-label="Close"
      color="inherit"
      onClick={() => closeSnackbar()}
    >
      <Icon path={mdiClose} title="Close" size={1} />
    </IconButton>
  )
}

export default CloseSnack
