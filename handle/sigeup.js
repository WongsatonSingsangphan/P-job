import { useContext, useEffect } from 'react';
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';

function signup() {
    const { state, setState } = useContext(StateContext);
    const router = useRouter();

    useEffect(() => {
        const fetchLogoImage = () => {
            fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/getLogoBinary/${state.decode_token.CompanyID}`)
                .then(response => response.blob())
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    setState((prevData) => ({ ...prevData, logoImage: imageUrl }));
                })
                .catch(error => console.error("Error fetching binary data:", error));
        };

        const handleSignUpClick = () => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        
            var raw = JSON.stringify({
              "username": state.email
            });
        
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/validateDomainChicCRM`, requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result);
                if (result.match === true) {
                  fetchLogoImage();
                  setState({
                    ...state,
                    datacompany: result.data,
                    companyID: result.data.CompanyID,
                    companyname: result.data.Companyname,
                    alias: result.data.CompanyAlias,
                    no: result.data.AddressNo,
                    street: result.data.Address1En,
                    googlemaps: result.data.Geolocation,
                    province: result.data.Province,
                    district: result.data.District,
                    subdistric: result.data.SubDistrict,
                    zipcode: result.data.Zipcode,
                    country: result.data.Country
                  });
                  router.push('/Selectcompany');
                } else if (result.message === "username already exists"){
                  setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error" }));
                }
                // else {
                //   var formdata = new FormData();
                //   formdata.append("to", state.email);
                //   formdata.append("subject", "Registration");
                //   formdata.append("fromEmail", "worapon@tracthai.com");
                //   formdata.append("body", "Please click the link provided below to proceed.");
                //   formdata.append("body1", "MODULE: chiCRM");
                //   formdata.append("body2", "ADMIN: TRAC-THAI");
                //   formdata.append("bodylink", "http://localhost:3000/CreateCompany");
                //   formdata.append("linkname", "Registration Link");
        
                //   var mailRequestOptions = {
                //     method: 'POST',
                //     body: formdata,
                //     redirect: 'follow'
                //   };
        
                //   fetch("http://192.168.3.113:8888/api/mailChicCRM", mailRequestOptions)
                //     .then(response => response.text())
                //     .then(result => console.log(result))
                //     .catch(error => console.log('error', error));
                // }
              })
              .catch(error => console.log('error', error));
        };
        fetchLogoImage();

    }, [state.email, state.decode_token.CompanyID, setState, router]);

    return { handleSignUpClick };
}

export default signup;
