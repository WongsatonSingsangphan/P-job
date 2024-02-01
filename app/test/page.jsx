'use client'
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';


export default function App() {
  const [otp, setOtp] = useState('');

  const handleChange = (value) => {
    if (/^\d*$/.test(value)) {
      setOtp(value);
    }
  };
  return (
    <OtpInput
      value={otp}
      onChange={handleChange}
      numInputs={6}
      isInputNum={true}
      separator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
      inputStyle={{
        width: '2rem',
        height: '2rem',
        margin: '0 0.5rem',
        fontSize: '1.5rem',
        borderBottom: `1px solid #BBC0CA`,
      }}
    />
  );
}