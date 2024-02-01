import React, { useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StateContext } from '@/context/Context';


function Index(){
  const {state, setState} = useContext(StateContext);

  const notify = () => state?.alert_type === "success"? toast.success(state.alert_text, {position: "top-center",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,
    progress: undefined,
    theme: "colored",
    }):toast.error(state.alert_text, {position: "top-center",autoClose: 5000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,
    progress: undefined,
    theme: "colored",
    });
    
    useEffect(() => {
      if(state.alert){
        notify();
      }
    }, [state.alert,setState]);
  return (
    <div>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </div>
  );
}

export default Index