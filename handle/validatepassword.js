'use client'
import { StateContext } from '@/context/Context';
import React, { useContext } from 'react'

function validatepassword() {
    const {state, setState} = useContext(StateContext);
    const updatePassword = (newPassword) => {
        const validations = {
          minLength: newPassword.length >= 8,
          hasNumber: /\d/.test(newPassword),
          hasUpper: /[A-Z]/.test(newPassword),
          hasLower: /[a-z]/.test(newPassword),
          hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
        };
        setState((prevData) => ({ ...prevData, passwordsMatch: newPassword === state.confirmpassword,minLength: validations.minLength,hasNumber: validations.hasNumber,hasUpper: validations.hasUpper,hasLower: validations.hasLower,hasSpecialChar:validations.hasSpecialChar }))
      const strengthLevels = [
          validations.minLength,
          validations.hasNumber,
          validations.hasUpper,
          validations.hasLower,
          validations.hasSpecialChar,
        ].filter(Boolean).length;
        switch (strengthLevels) {
          case 0:
          case 1:
            setState((prevData) => ({ ...prevData, passwordStrength: "Very Weak" }))
            break;
          case 2:
            setState((prevData) => ({ ...prevData, passwordStrength: "Weak" }))
            break;
          case 3:
            setState((prevData) => ({ ...prevData, passwordStrength: "Medium" }))
            break;
          case 4:
            setState((prevData) => ({ ...prevData, passwordStrength: "Strong" }))
            break;
          case 5:
            setState((prevData) => ({ ...prevData, passwordStrength: "Very Strong" }))
            break;
          default:
            setState((prevData) => ({ ...prevData, passwordStrength: "" }))
        }
      };
  return updatePassword;
}

export default validatepassword