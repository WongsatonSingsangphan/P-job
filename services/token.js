"use client"
import { StateContext } from '@/context/Context';
import React, { useContext, useEffect } from 'react'

function token() {
    const {state, setState} = useContext(StateContext);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('decode_token'));
        if (items) {
            setState({...state,decode_token: items});
        }
      }, []);
  return null
}

export default token