// import { StateContext } from '@/context/Context';
// import React, { useContext, useEffect } from 'react'

// function Address() {
//   const { state, setState } = useContext(StateContext);
//       useEffect(() => {
//         fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/getLogoBinary/${state.companyID}`)
//           .then(response => response.blob())
//           .then(blob => {
//               const imageUrl = URL.createObjectURL(blob);
//               setState((prevData) => ({ ...prevData, logoImage: imageUrl }));
//           })
//           .catch(error => console.error("Error fetching binary data:", error));
//       }, []);
//   return null;
// }
// export default Address;
