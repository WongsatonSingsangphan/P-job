'use client'
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function addcompany() {
    const {state, setState} = useContext(StateContext);
    const router = useRouter();
  const Selectcompany = () => {
    router.back()
  }
  const Register = () => {
    router.push('/Register');
  }
  const Alias = (e) => {
    setState({...state,alias: e.target.value,});
  };
  const Companyname = (e) => {
    setState({...state,companyname: e.target.value,});
  };
  const No = (e) => {
    setState({...state,no: e.target.value,});
  };
  const Street = (e) => {
    setState({...state,street: e.target.value,});
  };
  const Country = (e) => {
    setState({...state,country: e.target.value,});
  };
  
  
  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    setState(prev => ({ ...prev, selectedProvince }));
    const amphoesData = state.data.provinceAmphoeTambonZipcode
      .filter(item => item.ProvinceEng === selectedProvince)
      .map(item => item.DistrictEng);
    setState(prev => ({
      ...prev,
      amphures: Array.from(new Set(amphoesData)).sort(),
      selectedAmphoe: '',
      selectedTambon: '',
      zipcode: ''
    }));
  };
  const handleAmphoeChange = (event) => {
    const selectedAmphoe = event.target.value;
    setState(prev => ({ ...prev, selectedAmphoe }));
    const tambonsData = state.data.provinceAmphoeTambonZipcode
      .filter(item => item.DistrictEng === selectedAmphoe)
      .map(item => item.TambonEng);
    setState(prev => ({
      ...prev,
      tambons: Array.from(new Set(tambonsData)).sort(),
      selectedTambon: '',
      zipcode: ''
    }));
  };
  const handleTambonChange = (event) => {
    const selectedTambon = event.target.value;
    setState(prev => ({ ...prev, selectedTambon }));
    const tambonData = state.data.provinceAmphoeTambonZipcode.find(item => item.TambonEng === selectedTambon);
    if (tambonData) {
      setState(prev => ({ ...prev, zipcode: tambonData.PostCodeMain }));
    }
  }
  const ZIPCode = (e) => {
    setState({...state,zipcode: e.target.value,});
  };
  const GoogleMaps = (e) => {
    setState({...state,googlemaps: e.target.value,});
  };
  const phoneNumber = (e) => {
    setState({...state,phoneNumber: e.target.value,});
  };
  const webSite = (e) => {
    setState({...state,webSite: e.target.value,});
  };
  return {Selectcompany,Register,Alias,Companyname,No,Street,Country,handleProvinceChange,handleAmphoeChange,handleTambonChange,ZIPCode,GoogleMaps,
    phoneNumber,webSite}
}

export default addcompany

