import { Box, TablePagination } from '@mui/material'
import React from 'react'

export const PaginationContainer = ({count, page, handleChangePage, handleChangeRowsPerPage, rowsPerPage}) => {
  return (
    <Box display="flex" justifyContent="center" mt="20px">
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}
