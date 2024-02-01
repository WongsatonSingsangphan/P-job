'use client'
import { StateContext } from '@/context/Context';
import { Box, CircularProgress } from '@mui/material'
import React from 'react'

function Index() {
  const { state } = React.useContext(StateContext);

  return (
    <Box
      sx={{
        display: state.pageloader ? "flex" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ margin: "auto", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress color="textgreen" />
      </Box>
    </Box>
  );
}

export default Index;
