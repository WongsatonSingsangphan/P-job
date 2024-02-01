'use client'
import { data_register, input_data } from '@/data/register'
import { Box, FormControl, Grid, Input, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useContext } from 'react'
import handlechangeTitle from '@/handle/register'
import { StateContext } from '@/context/Context'

function Index() {
  const { state, setState } = useContext(StateContext);
  const HandleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({...prevState,[name]: value,}));
  };
  const HandleChangeTitle = (event) => {
    const value = event.target.value;
    setState((prevState) => ({...prevState,titleselect: value,}));};
  return (
    <Box>
      <Box sx={{ fontWeight: 600, mb: 3 }}>{data_register[0].title_content2}</Box>
      <Grid container spacing={1}>
        {input_data.map((item, index) => (
          <Grid key={index} sx={{ display: { xs: 'block', md: 'flex' } }} >
            <Box id={`input_${item.form_title.toLowerCase().replace(' ', '_')}`} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>{item.form_title}</Box>
              <Box sx={{ ml: item.form_title === "Title" ? 11.3 : item.form_title === "First name" ? 5 : item.form_title === "Last name" ? 5 : item.form_title === "Phone number" ? 0.5 :
              item.form_title === "Email" ? 9.9 : item.form_title === "Role" ? 11 : item.form_title === "Job Title" ? 7.5 : "" }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                  {item.form_title === "Title" ? (
                    <Box sx={{width:202}}>
                      <Select name="titleselect" value={state.titleselect} onChange={HandleChangeTitle} sx={{ width: '110%' }}>
                      <MenuItem value="Miss.">Miss.</MenuItem>
                      <MenuItem value="Mr.">Mr.</MenuItem>
                      <MenuItem value="Ms.">Ms.</MenuItem>
                    </Select>
                    </Box>
                  ) : (
                    <Input name={item.form_title.toLowerCase().replace(' ', '_')} onChange={HandleChange}></Input>
                  )}
                </FormControl>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Index;