import { Typography } from '@mui/material'
import React from 'react'

const PageTitle = ({title, textAlign, color}) => {
  return (
    <Typography variant='h5' textAlign={textAlign} color={color}>{title}</Typography>
  )
}

export default PageTitle;