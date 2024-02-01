'use client'
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function register() {
  const {state, setState} = useContext(StateContext);
  const router = useRouter();
  const handleRegister = () => {
    setState((prevData) => ({ ...prevData,loading: true,alert: false}));
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "username": state.email,
  "title": state.titleselect,
  "firstname_en": state.first_name,
  "Surname_en": state.last_name,
  "mobile_phone": state.phone_number,
  "country": state.country,
  "province": state.selectedProvince?state.selectedProvince:state.datacompany.Province, 
  "district": state.selectedAmphoe?state.selectedAmphoe:state.datacompany.District,
  "sub_district": state.selectedTambon?state.selectedTambon:state.datacompany.SubDistrict,
  "zipcode": state.zipcode,
  "create_location": state.googlemaps,
  "url_logo": "https://iconscout.com/free-icon/logo-3446031",
  "company_name_en": state.companyname,
  "company_mobile": state.phone_number,
  "company_alias": state.alias,
  "company_geolo": state.googlemaps,
  "address1_en": state.street,
  "address_no": state.no,
  "job_title": state.job_title,
  "role": state.role,
  "Website": "www.tracthai.com"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/registerChicCRM`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      if (result.status === "OK") {
        setState((prevData) => ({ ...prevData, companyID: result.companyID }));
          var formdata = new FormData();
          formdata.append("file",  state.selectedFile);
          formdata.append("organizeID", result.companyID);

          var uploadRequestOptions = {
            method: 'PATCH',
            body: formdata,
            redirect: 'follow'
          };
          fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/uploadLogoBinary`, uploadRequestOptions)
            .then(response => response.json())
            .then(uploadResult => {
              console.log(uploadResult);
              setState({ ...state, registerSuccess: true })
            })
            .catch(uploadError => console.log('Upload error', uploadError));

      } else {
        setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error",loading: false }));         
        console.log("Status is not OK:", result.status);
      }
    })
    .catch(error => console.log('error', error));
};
  const Selectcompany = () => {
    router.back()
  }
  const  handlechangeTitle =(e)=>{
    setState((prevData) => ({ ...prevData, titleselect: e.target.value }))
  }
  const  handlechangeinput =(e, fieldName)=>{
    setState((prevData) => ({ ...prevData, [fieldName]: e.target.value }));
}
  return {handlechangeTitle,handlechangeinput,Selectcompany,handleRegister};
}
export default register

