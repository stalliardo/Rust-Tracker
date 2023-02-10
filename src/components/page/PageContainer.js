import { Box, Paper } from '@mui/material'
import React from 'react'

const PageContainer = ({textAlign = "left", padding = "20px", mt = "20px", children}) => {
  return (
    <Box component={Paper} sx={{ textAlign, padding, mt }}>
        {children}
    </Box>
  )
}

export default PageContainer