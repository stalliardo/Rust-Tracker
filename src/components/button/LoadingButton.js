import React from 'react';

import { Button, CircularProgress } from "@mui/material";

const LoadingButton = ({isLoading, text, styles, type, disabled}) => {
  return (
    <Button variant="contained" type={type} sx={styles} disabled={disabled}>
        {
            isLoading ? <CircularProgress color='loader' size="24px"/> : text
        }
    </Button>
  )
}

export default LoadingButton;