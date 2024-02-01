'use client'
import { StateContext } from '@/context/Context';
import { Backdrop, Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import React, { useContext } from 'react'

function backdrop() {
  
  const { state, setState } = useContext(StateContext);
  const handleClose = () => {
    setState({...state,backdrop: false})
  };
  return (
    <Box>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}

export default backdrop