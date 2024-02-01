"use client";
import * as React from 'react';
import { Box } from '@mui/material'
import AppBar from './components/appbar'
import Title from './components/title'
import TableList from './components/table'
import BtNewReq from './components/button'
import GetLeadOrder from '@/services/getleadorder'
import { StateContext } from '@/context/Context';

function Page() {
  const {state, setState} = React.useContext(StateContext);

  React.useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (state.pageloader) {
        const message = "Leaving this page may result in data loss. Are you sure?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };

  }, [state.pageloader]);

  return (
    <Box style={{ filter: state.pageloader ? 'blur(4px)' : 'none', pointerEvents: state.pageloader ? 'none' : 'auto' }}>
      <GetLeadOrder/>
      <AppBar />
      <Title />
      <TableList />
      {/* <BtNewReq/> */}
    </Box>
  );
}

export default Page;
