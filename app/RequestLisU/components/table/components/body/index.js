"use client";
import * as React from 'react';
import { Box, Button, ClickAwayListener, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import { StateContext } from '@/context/Context';
import AddIcon from '@mui/icons-material/Add';
import another from '@/assets/assets/images/marco.png'
import pdf from '@/assets/assets/images/pdficon.png'
import jpg from '@/assets/assets/images/jpg.png'
import png from '@/assets/assets/images/png.png'
import text from '@/assets/assets/images/text.png'
import ai from '@/assets/assets/images/ai.png'
import code from '@/assets/assets/images/code.png'
import doc from '@/assets/assets/images/doc.png'
import iso from '@/assets/assets/images/iso.png'
import js from '@/assets/assets/images/js.png'
import mp3 from '@/assets/assets/images/mp3.png'
import mp4 from '@/assets/assets/images/mp4.png'
import ppt from '@/assets/assets/images/ppt.png'
import ps from '@/assets/assets/images/ps.png'
import sql from '@/assets/assets/images/sql.png'
import svg from '@/assets/assets/images/svg.png'
import ttf from '@/assets/assets/images/ttf.png'
import xls from '@/assets/assets/images/xls.png'
import zip from '@/assets/assets/images/zip.png'
import file from '@/assets/assets/images/file.png'
import recipient from '@/assets/assets/images/recipient.png'
import dropdown from '@/assets/assets/images/dropdown.png'
import Image from 'next/image';
import HandleUserList from '@/handle/userlist'

function index() {
  const {state, setState} = React.useContext(StateContext);
  const handleUserList = HandleUserList();
  handleUserList.groupedOrders?.sort((a, b) => b[0].created_at - a[0].created_at);

  return (
    <div>
      {handleUserList.groupedOrders?.map((row,index)=>(
        <TableRow key={`${index}`}>
      <TableCell align="center">{row[0].scdact_reqid}</TableCell>
          <TableCell id="cellheader" align="center">{handleUserList.convertTimestampToLocalTime(row[0].scdact_timestamp)}</TableCell>
          <TableCell id="cellheader" align="center" style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            <ClickAwayListener onClickAway={handleUserList.handleTooltipClose}>
            <div>
              <handleUserList.CustomTooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleUserList.handleTooltipClose}
                open={state.viewfile}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <Box sx={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start" }}>
                   <Box component="h3" sx={{ml:1,color:"gray.main"}}>All Files</Box>
                   {row.map((item, itemIndex) => {
                    const filenameMatch = row[itemIndex].scdact_command.match(/-src:([^ ]+)/);
                    const fullPath = filenameMatch[1]; 
                    const filename = fullPath.split('/').pop();
                 return (
                  <Button onClick={() =>row[0].scdact_status!=="Approved"&&row[0].scdact_status!=="Rejected"?handleUserList.handleClicktoGetFile(item.scdact_id):""} key={`button-${itemIndex}`} style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                      <Box sx={{pr:1}}>{filename}</Box>
                      <Box>32Mb</Box>
                  </Button>
                 );
               })}  
                 </Box>
                }
              >
               <Box sx={{display:"flex",alignItems:"center"}} onClick={handleUserList.handleTooltipOpen}>
                <Button sx={{display:'flex' ,backgroundColor:"rgba(119, 130, 150, 0.13)", borderRadius: "10px",justifyContent:'space-around',alignItems:'center'}}>
                  <Image src={file} alt="file"/>
                  <Box sx={{color:"gray.main"}}>{row.length}</Box>
                </Button>
                <Box sx={{ml:0.5,cursor:"pointer"}}>
                  <Image alt="dropdown" style={{ transform: state.viewfile ? "rotate(180deg)" : "rotate(0)" }} src={dropdown}></Image>
                </Box>
                </Box>              
                </handleUserList.CustomTooltip>
            </div>
          </ClickAwayListener>
          </TableCell>
          <TableCell align="center">{row[0].scdact_sender}</TableCell>
          <TableCell id="cellheader" align="center" style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <ClickAwayListener onClickAway={handleUserList.handleTooltipCloseRecipient}>
            <div>
              <handleUserList.CustomTooltipRecipient
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleUserList.handleTooltipCloseRecipient}
                open={state.viewRecipient}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <Box sx={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start" }}>
                   <Box component="h3" sx={{ml:1,color:"gray.main"}}>All Recipients</Box>
                   {row.map((item, itemIndex) => {
                    console.log("🚀 ~ file: index.js:166 ~ {row.map ~ item:", item)
                    const filenameMatch = row[itemIndex].scdact_command.match(/-src:([^ ]+)/);
                    const fullPath = filenameMatch[1]; 
                    const filename = fullPath.split('/').pop();
                 return (
                  <Button key={`button-${itemIndex}`} style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                      <Box sx={{pr:1}}>{filename}</Box>
                  </Button>
                 );
               })}  
                 </Box>
                }
              >
               <Box sx={{display:"flex",alignItems:"center"}} onClick={handleUserList.handleTooltipOpenRecipient}>
                <Button sx={{display:'flex' ,backgroundColor:"rgba(119, 130, 150, 0.13)", borderRadius: "10px",justifyContent:'space-around',alignItems:'center'}}>
                  <Image src={recipient} alt="recipient"/>
                  <Box sx={{color:"gray.main"}}>{row.length}</Box>
                </Button>
                <Box sx={{ml:0.5,cursor:"pointer"}}>
                  <Image alt="dropdown" style={{ transform: state.viewRecipient ? "rotate(180deg)" : "rotate(0)" }} src={dropdown}></Image>
                </Box>
                </Box>              
                </handleUserList.CustomTooltipRecipient>
            </div>
          </ClickAwayListener>  
          </TableCell>
          <TableCell align="center">{row[0].scdact_status}</TableCell>
        </TableRow>
        ))}
    </div>
  )
}

export default index