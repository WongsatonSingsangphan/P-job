import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react'

function Address() {
  const { state, setState } = useContext(StateContext);
      useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/getProvinceAmphoeTambonZipcode`)
        .then(response => response.json())
        .then(data => {
          const provincesData = Array.from(new Set(data.provinceAmphoeTambonZipcode.map(item => item.ProvinceEng))).sort();
          setState(prev => ({ ...prev, data, provinces: provincesData }));
        })
        .catch(error => console.error('Error fetching data: ', error));
      }, []);
  return null;
}
export default Address;
