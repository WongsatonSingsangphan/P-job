'use client'
import React, { useContext } from 'react'
import Page from './components/page'
import { StateContext } from '@/context/Context';

function App() {
  const { state, setState } = useContext(StateContext);

  const shouldRenderPage = state.memberAuthorization?.orgmbat_feature || state.leadAuthorization?.orgmbat_feature;

  return (
    <div>
      {shouldRenderPage && <Page />}
    </div>
  )
}

export default App
