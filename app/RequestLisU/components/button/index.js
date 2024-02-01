import { Box, Button } from '@mui/material'
import React from 'react'
import HandleUserList from '@/handle/userlist'
function index() {
  const handleUserList = HandleUserList();

  return (
    <Box sx={{display:'flex',justifyContent:'center',mt:1,pb:3}}>
     <Box sx={{ display: 'flex', justifyContent: 'flex-end',width:"90%" }}>
       <Button onClick={handleUserList.handleNewRequest} variant="contained" style={{backgroundColor:'#84BAA1',textTransform:''}}>New Request +</Button>
     </Box>
    </Box>
  )
}

export default index