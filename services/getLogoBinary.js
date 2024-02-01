import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';


function getLogoBinary() {
    const { state, setState } = useContext(StateContext);
    const router = useRouter();

    useEffect(() => {
        if (state.companyID) {
            setState({ ...state, loading: true });
            fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/getLogoBinary/${state.companyID}`)
                .then(response => response.blob())
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    setState((prevData) => ({ ...prevData, logoImage: imageUrl, loading: false }));
                })
                .catch(error => console.error("Error fetching binary data:", error));
            
        }
    }, [state.companyID, setState, router]);

    return null;
}

export default getLogoBinary;
