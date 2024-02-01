import { data_register } from '@/data/register'
import { Box, Radio } from '@mui/material'
import Image from 'next/image'
import React, { useContext } from 'react'
import website from '@/assets/assets/images/register/website.png'
import tel from '@/assets/assets/images/register/tel.png'
import map from '@/assets/assets/images/register/location.png'
import accountimg from '@/assets/assets/images/register/account.png'
import { StateContext } from '@/context/Context'

function index() {
    const {state, setState} = useContext(StateContext);
  return (
    <Box sx={{mt:3}}>
      <Box sx={{fontWeight:600,mb:3}}>{data_register[0].title_content1}</Box>
      <Box sx={{display:"flex"}}>
      <Box sx={{mr:1,width:'100px'}} >
        {state.logoImage || state.selectedImage ? (
          <Image width={100} height={100} alt="logo" src={state.logoImage || state.selectedImage}></Image>
        ) : (
          <p></p>
        )}
      </Box>
        <Box sx={{display:"flex",flexDirection:"column",alignItems:"left",ml:2}}>
           <Box sx={{fontWeight:600}}>{state.companyname}</Box>
              <Box sx={{display:"flex",mt:1}}>
              <Box sx={{width:"300px"}}>
              <div dangerouslySetInnerHTML={{ __html: `${state.datacompany.AddressNo||state.no} ${state.datacompany.Address1En||state.street}<br>
              ${state.datacompany.District||state.selectedAmphoe } ${state.datacompany.SubDistrict||state.selectedTambon}<br>
              ${state.datacompany.Province||state.selectedProvince} ${state.datacompany.Zipcode||state.zipcode}<br> ${state.datacompany.Country||state.country}` }} />
              </Box>
              <Box sx={{ml:1}}>
                <Box sx={{display:"flex",alignItems:"center"}}>
                  <Image alt="website" src={website}/>
                  <Box sx={{ml:2}}><a href={state.webSite} target="_blank" rel="noopener noreferrer">
                    {state.webSite || "https://www.tracthai.com"}
                  </a></Box>
                </Box>
                <Box sx={{mt:1,display:"flex",alignItems:"center"}}>
                  <Image alt="tel" src={tel}/>
                  <Box sx={{ml:2}}>{state.phoneNumber ||"021019884 "}</Box>
                </Box>
                <Box sx={{mt:1,display:"flex",alignItems:"center"}}>
                  <Image alt="map" src={map}/>
                  <Box sx={{ml:2}}>
                    <a href={state.googlemaps} target="_blank" rel="noopener noreferrer">
                    {state.googlemaps}
                  </a>
                  </Box>
                </Box>
              </Box>
           </Box>
        </Box>
      </Box>
      <Box sx={{display:"flex"}}>
        <Box sx={{width:"125px",height:"auto"}}></Box>
        <Box sx={{ml:2}}>
          <Box sx={{display:"flex",alignItems:"center",mt:2}}>
              <Radio style={{color:"#84BAA1"}} value="male"/>
              <Box>{data_register[0].req_edit}</Box>
            </Box>
       </Box>
      </Box>
    </Box>
  )
}

export default index