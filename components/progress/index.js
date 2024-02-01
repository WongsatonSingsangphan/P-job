'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { StateContext } from '@/context/Context';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#84BAA1' : '#48846B',
  },
}));

export default function CustomizedProgressBars() {
    const {state, setState} = React.useContext(StateContext);

  return (
    <Box sx={{ flexGrow: 1,mt:0.3}}>
      <BorderLinearProgress variant="determinate" value={state.size_progress} />
    </Box>
  );
}
