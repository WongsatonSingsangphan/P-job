import { TableCell, TableRow } from '@mui/material'
import React from 'react'

function index() {
  return (
    <TableRow id="headtable">
    <TableCell id="cellheader" align="center">ID</TableCell>
    <TableCell id="cellheader" align="center">Date/time</TableCell>
    <TableCell id="cellheader" align="center">File</TableCell>
    <TableCell id="cellheader" align="center">Sender</TableCell>
    <TableCell id="cellheader" align="center">Recipient</TableCell>
    <TableCell id="cellheader" align="center">Status</TableCell>
  </TableRow>
  )
}

export default index