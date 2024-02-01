'use client'
import { StateContext } from '@/context/Context';
import React, { useEffect } from 'react'

function sizeprogress() {
    const {state, setState} = React.useContext(StateContext);

    useEffect(() => {
        let totalSizeInBytes = 0;
      state.selectedFile.forEach((file, index) => {
        totalSizeInBytes += file.size;
      });
      
      const totalSizeInMB = totalSizeInBytes / (1024 * 1024);
      const maxSizeInMB = 25;
      
      // คำนวณความคืบหน้าในเลขเปอร์เซ็นต์
      const progressPercentage = (totalSizeInMB / maxSizeInMB) * 100;
      setState((prevData) => ({ ...prevData,size_progress: progressPercentage,sumsize:totalSizeInMB.toFixed(2),sumsize_original:totalSizeInBytes}));
    
      }, [state.selectedFile,setState]);
  return null
}

export default sizeprogress