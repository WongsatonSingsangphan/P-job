"use client";
import * as React from 'react';
import { Box, Button, ClickAwayListener, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import { StateContext } from '@/context/Context';
import file from '@/assets/assets/images/file.png'
import recipient from '@/assets/assets/images/recipient.png'
import dropdown from '@/assets/assets/images/dropdown.png'
import Image from 'next/image';
import HandleLeadList from '@/handle/leadlist'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SecurityIcon from '@mui/icons-material/Security';

function index() {
  const {state, setState} = React.useContext(StateContext);
  const handleLeadList = HandleLeadList();
  handleLeadList.groupedOrders?.sort((a, b) => b[0].scdact_timestamp - a[0].scdact_timestamp);
  const [tooltipOpen, setTooltipOpen] = React.useState({});
  console.log("🚀 ~ index ~ tooltipOpen:", tooltipOpen)
  const [tooltipContent, setTooltipContent] = React.useState({});

  const handleOpen = (index, sender) => {
    setTooltipOpen({ ...tooltipOpen, [index]: true });
    setTooltipContent({ ...tooltipContent, [index]: sender });
  };

  const handleClose = (index) => {
    setTooltipOpen({ ...tooltipOpen, [index]: false });
  };

  const [tooltipOpenRecipient, setTooltipOpenRecipient] = React.useState({});
  const [tooltipContentRecipient, setTooltipContentRecipient] = React.useState({});

  const handleOpenRecipient = (index, sender) => {
    setTooltipOpenRecipient({ ...tooltipOpenRecipient, [index]: true });
    setTooltipContentRecipient({ ...tooltipContentRecipient, [index]: sender });
  };

  const handleCloseRecipient = (index) => {
    setTooltipOpenRecipient({ ...tooltipOpenRecipient, [index]: false });
  };
  const [tooltipOpenPermission, setTooltipOpenPermission] = React.useState({});
  const [tooltipContentPermission, setTooltipContentPermission] = React.useState({});

  const handleOpenPermission = (index, sender) => {
    setTooltipOpenPermission({ ...tooltipOpenPermission, [index]: true });
    setTooltipContentPermission({ ...tooltipContentPermission, [index]: sender });
  };

  const handleClosePermission = (index) => {
    setTooltipOpenPermission({ ...tooltipOpenPermission, [index]: false });
  };
  return (
    <Box sx={{display:'flex',justifyContent:'center',mt:3,pb:3}}>
      <TableContainer id="tablelist" component={Paper} sx={{ width: '90%', maxHeight: '90%' }}>
        <Box sx={{p:2,fontWeight:600}}>Request list</Box>
      <Table>
      <TableHead>
        <TableRow id="headtable">
          <TableCell id="cellheader" align="center">ID</TableCell>
          <TableCell id="cellheader" align="center">Date/time</TableCell>
          <TableCell id="cellheader" align="center">File</TableCell>
          <TableCell id="cellheader" align="center">Permission</TableCell>
          <TableCell id="cellheader" align="center">Sender</TableCell>
          <TableCell id="cellheader" align="center">Recipient</TableCell>
          <TableCell id="cellheader" align="center">Status</TableCell>
          <TableCell id="cellheader" align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {handleLeadList.groupedOrders?.map((row,index)=>(
        <TableRow key={`${index}`}>
          <TableCell align="center">{row[0].scdact_reqid}</TableCell>
          <TableCell id="cellheader" align="center">{handleLeadList.convertTimestampToLocalTime(row[0].scdact_timestamp)}</TableCell>
          <TableCell id="bodycell" align="center">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box key={index}>
              <handleLeadList.CustomTooltipRecipient
                open={tooltipOpen[index] || false}
                title={
                  <>
                  {/* <Box component="h5" sx={{color: row[0].scdact_status === "Approved" ? "green" : row[0].scdact_status === "Rejected" ? "red" : "",display: row[0].scdact_status === "Approved"||row[0].scdact_status === "Rejected" ?"flex":"none"}}>
                    {row[0].scdact_status === "Approved"?"Already approved":"Already rejected"}
                  </Box> */}
                  <Box sx={{ p:1,display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Box component="h3" sx={{ ml: 1, color: 'gray.main' }}>All Files</Box>
                    {row.map((item, itemIndex) => (
                      <Button onClick={() => row[0].scdact_status !== 'Approved' && row[0].scdact_status !== 'Rejected' ? handleLeadList.handleClicktoGetFile(item.scdact_id) : ''} key={`button-${itemIndex}`} style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Box sx={{ pr: 1}}>{item.scdact_filename}</Box>
                        <Box >{item.scdact_filesize}</Box>
                      </Button>
                    ))}
                  </Box>
                  </>
                }
                onClose={() => handleClose(index)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={() => handleOpen(index)}>
                  <Button sx={{ display: 'flex', backgroundColor: 'rgba(119, 130, 150, 0.13)', borderRadius: '10px', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Image src={file} alt="file" />
                    <Box sx={{ color: 'gray.main' }}>{row.length}</Box>
                  </Button>
                  <Box sx={{ ml: 0.5, cursor: 'pointer' }}>
                    <Image alt="dropdown" style={{ width:"15px",height:"auto",transform: tooltipOpen[index] ? 'rotate(180deg)' : 'rotate(0)' }} src={dropdown}></Image>
                  </Box>
                </Box>
              </handleLeadList.CustomTooltipRecipient>
            </Box>
            </div>
          </TableCell>
          {/* //*!Permission */}
          <TableCell id="bodycell" className='Permission' align="center">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box key={index}>
              <handleLeadList.CustomTooltipRecipient
                open={tooltipOpenPermission[index] || false}
                title={
                  <>
                  <Box component="h5" sx={{color: row[0].scdact_status === "Approved" ? "green" : row[0].scdact_status === "Rejected" ? "red" : "",display: row[0].scdact_status === "Approved"||row[0].scdact_status === "Rejected" ?"flex":"none"}}>
                    {row[0].scdact_status === "Approved"?"Already approved":"Already rejected"}
                  </Box>
                  <Box sx={{ p:1,display: row[0].scdact_status === "Approved"||row[0].scdact_status === "Rejected" ?"none":"flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Box component="h3" sx={{ ml: 1, color: 'gray.main' }}>All Permission</Box>
                    <Box sx={{display:row[0].scdact_type==="HTML"?"flex":"none",flexDirection:"column"}}>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow convert to original file</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}>{row[0].scdact_cvtoriginal===true?<CheckIcon sx={{fontSize:"20px"}} color="approve"/>:<CloseIcon sx={{fontSize:"20px"}} color="reject"/>}</Box>
                          </Button>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow copy paste</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}>{row[0].scdact_copy===true?<CheckIcon sx={{fontSize:"20px"}} color="approve"/>:<CloseIcon sx={{fontSize:"20px"}} color="reject"/>}</Box>
                          </Button>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow print</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}>{row[0].scdact_print===true?<CheckIcon sx={{fontSize:"20px"}} color="approve"/>:<CloseIcon sx={{fontSize:"20px"}} color="reject"/>}</Box>
                          </Button>
                     </Box>

                     <Box sx={{display:row[0].scdact_type==="FCL"?"flex":"none",flexDirection:"column"}}>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow convert to original file</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}>{row[0].scdact_cvtoriginal===true?<CheckIcon sx={{fontSize:"20px"}} color="approve"/>:<CloseIcon sx={{fontSize:"20px"}} color="reject"/>}</Box>
                          </Button>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow copy paste</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}>{row[0].scdact_copy===true?<CheckIcon sx={{fontSize:"20px"}} color="approve"/>:<CloseIcon sx={{fontSize:"20px"}} color="reject"/>}</Box>
                          </Button>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow print</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}>{row[0].scdact_print===true?<CheckIcon sx={{fontSize:"20px"}} color="approve"/>:<CloseIcon sx={{fontSize:"20px"}} color="reject"/>}</Box>
                          </Button>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow edit secured file</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}>{row[0].scdact_edit===true?<CheckIcon sx={{fontSize:"20px"}} color="approve"/>:<CloseIcon sx={{fontSize:"20px"}} color="reject"/>}</Box>
                          </Button>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow run a macro</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}>{row[0].scdact_marcro===true?<CheckIcon sx={{fontSize:"20px"}} color="approve"/>:<CloseIcon sx={{fontSize:"20px"}} color="reject"/>}</Box>
                          </Button>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Allow convert to browser view file</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}>{row[0].scdact_cvtoriginal===true?<CheckIcon sx={{fontSize:"20px"}} color="approve"/>:<CloseIcon sx={{fontSize:"20px"}} color="reject"/>}</Box>
                          </Button>
                          <Button style={{ textTransform: 'none',display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ pr: 1}}>Enable convert to original file</Box>
                            <Box sx={{display:"flex",alignItems:"center"}}>{row[0].scdact_cvtoriginal===true?<CheckIcon sx={{fontSize:"20px"}} color="approve"/>:<CloseIcon sx={{fontSize:"20px"}} color="reject"/>}</Box>
                          </Button>
                        </Box>
                  </Box>
                  </>
                }
                onClose={() => handleClosePermission(index)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={() => handleOpenPermission(index)}>
                  <Button sx={{ display: 'flex', backgroundColor: 'rgba(119, 130, 150, 0.13)', borderRadius: '10px', justifyContent: 'space-around', alignItems: 'center' }}>
                      <Box sx={{pt:0,pb:0}}>
                       <SecurityIcon color="gray" style={{fontSize:"20px"}}/>
                      </Box>
                  </Button>
                  <Box sx={{ ml: 0.5, cursor: 'pointer' }}>
                    <Image alt="dropdown" style={{ width:"15px",height:"auto",transform: tooltipOpenPermission[index] ? 'rotate(180deg)' : 'rotate(0)' }} src={dropdown}></Image>
                  </Box>
                </Box>
              </handleLeadList.CustomTooltipRecipient>
            </Box>
            </div>
          </TableCell>
          {/* //*!Permission */}
          <TableCell align="center">{row[0].scdact_sender}</TableCell>
          <TableCell id="bodycell" align="center">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box key={index}>
              <handleLeadList.CustomTooltipRecipient
                open={tooltipOpenRecipient[index] || false}
                title={
                  <Box sx={{ p:1,display: "flex", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                   <Box component="h3" sx={{ ml: 1, color: 'gray.main' }}>All Recipients</Box>
                   {Array.from(new Set(row.flatMap(item => item.scdact_reciepient.split(',')))).map((recipient, index) => (
                     <Button key={`button-${index}`} style={{ display: 'flex', justifyContent: 'left', width: '100%' }}>
                       <Box sx={{ textTransform:"lowercase",pr: 1 }}>{`${recipient}`}</Box>
                     </Button>
                   ))}
                 </Box>

                }                
                onClose={() => handleCloseRecipient(index)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={() => handleOpenRecipient(index)}>
                  <Button sx={{ display: 'flex', backgroundColor: 'rgba(119, 130, 150, 0.13)', borderRadius: '10px', justifyContent: 'space-around', alignItems: 'center' }}>
                      <Image src={recipient} alt="recipient" />
                      <Box sx={{ color: 'gray.main' }}>{row[0]?.scdact_reciepient?.split(',').length || 0}</Box>
                  </Button>
                  <Box sx={{ml: 0.5, cursor: 'pointer' }}>
                    <Image alt="dropdown" style={{ width:"15px",height:"auto",transform: tooltipOpenRecipient[index] ? 'rotate(180deg)' : 'rotate(0)' }} src={dropdown}></Image>
                  </Box>
                  <Box sx={{fontWeight:500}}>{row[0].scdact_reciepient.split(',')[0]}</Box>
                </Box>
              </handleLeadList.CustomTooltipRecipient>
            </Box>
            </div>
          </TableCell>
          <TableCell style={{fontWeight:600,color: row[0].scdact_status === "Approved" ? "#00E700" : row[0].scdact_status === "Rejected" ? "#FF0000" : "#0062FF", textAlign: "center"}} align="center">{row[0].scdact_status}</TableCell>
          <TableCell align='center'>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',visibility:row[0].scdact_status === "Approved"||row[0].scdact_status === "Rejected" ?"hidden":"visible" }}>
           <Button id="Approve" onClick={()=>{handleLeadList.handleClicktoApprove(row,"Approve")}} sx={{ flexGrow: 1, marginRight: '8px' }} variant="contained" color="approve" style={{ borderRadius: "7px", minWidth: "50%", textTransform: "capitalize", color: "white", fontWeight: 600 }}>Approve</Button>
           <Button id="Reject" onClick={()=>{handleLeadList.handleReject(row,"Reject")}} variant="contained" color="reject" style={{ borderRadius: "7px", minWidth: "50%", textTransform: "capitalize", color: "white", fontWeight: 600 }}>Reject</Button>
          </Box>
          </TableCell>
        </TableRow>
        ))}
      </TableBody>
      </Table>
      </TableContainer>
    </Box>
  )
}

export default index