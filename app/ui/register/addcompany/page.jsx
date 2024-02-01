'use client'
import { Box, Button, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import Subtract from '@/assets/assets/images/Subtract.png'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { StateContext } from '@/context/Context';
import handlecompany from "@/handle/addcompany"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function page() {
  const { state, setState } = useContext(StateContext);
  const Handlecompany = handlecompany();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setState({ ...state, selectedImage: e.target.result, selectedFile: file });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', p: 3, }}>
      <Box >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image src={Subtract} alt="logo" style={{ width: "80px" }} />
          <Box sx={{ pl: 3 }}>
            <Box sx={{ fontWeight: '800', fontSize: '18px' }}>Hello good morning {state.email} <br></br>Welcome to ChicCRM registration process now you are in</Box>
            <Box sx={{ fontSize: '13px' }}>After complete all infomation you will received email your password</Box>
          </Box>
        </Box>
      </Box>
      <Box >
        <Box sx={{ mt: 10 }}>
          <Typography variant="h6">Create Company</Typography>
        </Box>
        <Box sx={{ display: 'flex', ml: 5 }}>
          <Box sx={{ mt: '2%', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ mt: '2%', width: '100px', height: '100px', background: '#D9D9D9', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
              <input accept='image/*' style={{ display: 'none' }} id='raised-button-file' type='file' onChange={handleFileChange} />
              <label htmlFor='raised-button-file'>
                {state.selectedImage ? (
                  <img src={state.selectedImage} alt='Selected' style={{ width: '100px', height: '100px', borderRadius: '100%' }} />
                ) : (
                  <IconButton sx={{ color: '#1F2939' }} component='span'>
                    <AddAPhotoIcon />
                  </IconButton>
                )}
              </label>
            </Box>
          </Box>
          <Box sx={{ ml: 5, display: 'flex' }}>
            <Grid container rowGap={2}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mr: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500' }}>Alias</Box>
                  <TextField id="standard-basic" variant="standard" value={state.alias} onChange={Handlecompany.Alias} sx={{ width: "250px" }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500' }}>Company name</Box>
                  <TextField id="standard-basic" variant="standard" value={state.companyname} onChange={Handlecompany.Companyname} sx={{ width: "250px" }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500' }}>No</Box>
                  <TextField id="standard-basic" variant="standard" value={state.no} onChange={Handlecompany.No} sx={{ width: "250px" }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500' }}>Street</Box>
                  <TextField id="standard-basic" variant="standard" value={state.street} onChange={Handlecompany.Street} sx={{ width: "250px" }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500' }}>Country</Box>
                  <Select id="standard-basic" variant="standard" value={state.country} onChange={Handlecompany.Country} sx={{ width: "250px" }}>
                    {state.countries.map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500' }}>Phone Number</Box>
                  <TextField id="standard-basic" variant="standard" value={state.phoneNumber} onChange={Handlecompany.phoneNumber} sx={{ width: "250px" }} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500' }}>Province</Box>
                  <Select labelId="province-select" variant="standard" id="province-select" value={state.selectedProvince} label="Province" onChange={Handlecompany.handleProvinceChange}
                    sx={{ width: "250px" }} size='small'>
                    {state.provinces && state.provinces.map((province, index) => (
                      <MenuItem key={index} value={province}>
                        {province}
                      </MenuItem>))}
                  </Select>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500' }}>District</Box>
                  <Select labelId="amphoe-select-label" variant="standard" id="amphoe-select" value={state.selectedAmphoe} label="Amphoe" onChange={Handlecompany.handleAmphoeChange}
                    sx={{ width: "250px" }} size='small'>
                    {state.selectedProvince && state.amphures?.map((amphoe, index) => (
                      <MenuItem key={index} value={amphoe}>
                        {amphoe}
                      </MenuItem>
                    ))}
                  </Select></Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500' }}>Sub-Distric</Box>
                  <Select labelId="tambon-select-label" variant="standard" id="tambon-select" value={state.selectedTambon} label="Tambon"
                    onChange={Handlecompany.handleTambonChange} sx={{ width: "250px" }} size='small'>
                    {state.selectedAmphoe && state.tambons?.map((tambon, index) => (
                      <MenuItem key={index} value={tambon}>
                        {tambon}
                      </MenuItem>
                    ))}
                  </Select></Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500' }}>ZIP Code</Box>
                  <TextField variant="standard" size='small' value={state.zipcode} InputProps={{ readOnly: true, }} sx={{ width: "250px" }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500' }}>Google Maps</Box>
                  <TextField id="standard-basic" variant="standard" value={state.googlemaps} onChange={Handlecompany.GoogleMaps} sx={{ width: "250px" }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ pt: 1.5, width: '150px', color: '#1F2939', fontWeight: '500' }}>Website</Box>
                  <TextField id="standard-basic" variant="standard" value={state.webSite} onChange={Handlecompany.webSite} sx={{ width: "250px" }} />
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box sx={{ pt: 13, ml: 3, display: 'flex' }}>
        <Button variant="outlined" color="success" onClick={Handlecompany.Selectcompany} style={{ textTransform: 'capitalize', width: '80px', height: 'auto', color: '#84BAA1' }}>Back</Button>
        <Box sx={{ marginLeft: 3 }}>
          <Button variant="contained" onClick={Handlecompany.Register} disabled={!state.alias || !state.googlemaps || !state.webSite || !state.phoneNumber || !state.companyname || !state.street || !state.no || !state.country || !state.selectedProvince || !state.selectedAmphoe || !state.selectedTambon || !state.selectedImage} sx={{ backgroundColor: '#84BAA1', textTransform: 'capitalize', width: '120px', height: 'auto' }}>Next<ArrowRightAltIcon /></Button>
        </Box>
      </Box>
    </Box>
  )
}

export default page