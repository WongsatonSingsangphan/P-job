"use client";
import React, { useContext, useRef, useState } from "react";
import { Box,  FormControlLabel, Grid, TextField,  } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { StateContext } from "@/context/Context";
import HandleShareDoc from '@/handle/sharedoc'
import MessageIcon from '@mui/icons-material/Message';

function index() {
    const {state, setState} = useContext(StateContext);
  const fileInputRef = useRef(null);
  const textFieldRef = useRef(null);
  const handleShareDoc = HandleShareDoc(textFieldRef,fileInputRef);
  return (
    <Box sx={{display:'flex',flexDirection:'column'}}>
           <Box sx={{display:"flex",justifyContent:'space-between',alignItems:'center',pb:1}}> 
           <FormControlLabel
         control={
          <handleShareDoc.IOSSwitch sx={{ m: 1 }}  />
         }
         label={(
           <span style={{fontWeight:500,color:"gray",textAlign:"center"}}>
             {state.secure_type ? "FCL file" : "HTML file"}
           </span>
         )}
       />
         <Box sx={{color:"gray.main",fontWeight:500}} display="flex" alignItems="center" flexDirection="row" > 
           <Box style={{color:"red"}}>*&nbsp;</Box>{state.secure_type ? " For recipients using the FinalCode." : ` For recipients who do not use the FinalCode.`}
         </Box>
         </Box>
         {/* <TextField disabled id="outlined-basic" label="Template policy"size="small" variant="outlined" style={{width:"100%",paddingBottom:10}}
         InputProps={{
           startAdornment: (
             <LockIcon style={{ color: "gray" }} />
           ),
         }}/> */}
         <TextField id="outlined-basic" value={state.message} onChange={handleShareDoc.handlemessageChange} label="Message Encrypt Files"size="small" variant="outlined" style={{width:"100%",paddingBottom:10}}
         InputProps={{
           startAdornment: (
             <MessageIcon style={{ color: "gray" }} />
           ),
         }}/>
         <Box sx={{width: "100%", height: "355px", borderRadius: "10px", backgroundColor: "#FFFFFF", borderWidth: "1px", borderColor: "#ccc", display: 'flex', flexDirection: 'row', justifyContent: 'center', p: 1.5 }}>
      <Box sx={{ flexGrow: 1,m:2 }}>
      <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 2, sm: 4, md: 8 }}>
            {state.secure_type
             ? ['Allow convert to original file', 'Allow copy paste','Screen Watermark', 'Allow print', 'Allow edit secured file', 'Allow run a macro', 'Allow convert to browser view file'].map((label, index) => (
              <Grid key={index} item xs={2} sm={4} md={4}>
                <Box sx={{color:"gray.main",fontWeight:500}}>
                 <handleShareDoc.SwitchBox label={label} checked={state[label.toLowerCase().replace(/ /g, '')]} onChange={(event) => handleShareDoc.handleSwitchChange(label.toLowerCase().replace(/ /g, ''), event)} />
                </Box>
                 </Grid>
               ))
             : ['Allow convert to original file', 'Allow copy paste','Screen Watermark', 'Allow print'].map((label, index) => (
              <Grid key={index} item xs={2} sm={4} md={4}>
                <Box sx={{color:"gray.main",fontWeight:500}}>
                 <handleShareDoc.SwitchBox label={label} checked={state[label.toLowerCase().replace(/ /g, '')]} onChange={(event) => handleShareDoc.handleSwitchChange(label.toLowerCase().replace(/ /g, ''), event)} />
                </Box>

                 </Grid>
               ))}
                {state.allowprint && (
               <Grid item xs={2} sm={4} md={4}>
                 <Box sx={{color:"gray.main",fontWeight:500}}>
                    <handleShareDoc.SwitchBox label="Watermark" checked={state.watermark} onChange={(event) => handleShareDoc.handleSwitchChange('watermark', event)} />
                 </Box>
               </Grid>
                )}
           
                {state.allowconverttobrowserviewfile && (
               <Grid item xs={2} sm={4} md={4}>
                 <Box sx={{color:"gray.main",fontWeight:500}}>
                    <handleShareDoc.SwitchBox label="Enable convert to original file" checked={state.enableconverttooriginalfile} onChange={(event) => handleShareDoc.handleSwitchChange('enableconverttooriginalfile', event)} />
                 </Box>
               </Grid>
                )}
        
            </Grid>
          </Box>
        </Box>

           </Box>
  )
}

export default index