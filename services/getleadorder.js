"use client"
import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react'

function token() {
    const {state, setState} = useContext(StateContext);

    useEffect(() => {
      if (state.decode_token && state.decode_token.TeamleadID) {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_LOGIN}:${process.env.NEXT_PUBLIC_API_PORT_TEST}/api/getlogSecuredocActivityByTeamlead/${state.decode_token.TeamleadID}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setState({...state,allleadorder: result.logSecuredogActivityTeamlead});
            })
            .catch(error => console.log('error', error));
          }
      }, [state.decode_token]);
  return null
}

export default token