// UseefOutsideClick.js
import { useEffect } from 'react';

const UseefOutsideClick = ({ handleOutsideClick }) => {
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return null;
};

export default UseefOutsideClick;
