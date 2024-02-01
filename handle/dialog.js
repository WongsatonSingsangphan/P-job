import { Box, Button, Dialog } from '@mui/material'
import Image from 'next/image';
import React, { useContext } from 'react'
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import MessageFill from '@/assets/assets/images/MessageFill.png'
import Checked from '@/assets/assets/images/checked.png'
import Success from '@/assets/assets/images/checked.png'
import Error from '@/assets/assets/images/cross.png'

function dialod() {
  const { state, setState } = useContext(StateContext);
  const router = useRouter();
  const handleClose = () => {
    setState({...state,open: false})
  };
  const resetpassword = () => {
    setState({...state,resetpassword: false})
    router.push('/Login');
  };
  const registerSuccess = () => {
    setState({...state,registerSuccess: false})
    router.push('/Login');
  };
  const error = () => {
    setState({...state,error: false})
  };
  return (
    <Box>
      {/* check you email */}
        <Dialog open={state.open} onClose={handleClose} PaperProps={{ style: { borderRadius: '15px' } }}>
            <Box sx={{ width: '430px', height: '480px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Box sx={{ width: '100%', height: '50%', background: '#87CEFA', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image src={MessageFill} alt='Message' width={100}></Image>
              </Box>
              <Box sx={{ width: '100%', height: '50%', background: '#ffffff', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', px: '45px', rowGap: '10px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700' }}>Email Verification</h1>
                <p style={{ fontSize: '14px', textAlign: 'center' }}>A verification link has been sent to your email. Please check and click on the link to verify.</p>
                <Button variant='outline' onClick={handleClose} sx={{ border: 'solid 1px #CECECE', borderRadius: '30px', px: '70px', py: '8px' }} style={{ color: '#CECECE', fontWeight: '400' }}>Close</Button>
              </Box>
            </Box>
          </Dialog>
        {/* resetpassword Success */}
          <Dialog open={state.resetpassword} onClose={resetpassword} PaperProps={{ style: { borderRadius: '15px' } }}>
            <Box sx={{ width: '430px', height: '480px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Box sx={{ width: '100%', height: '50%', background: '#32C38D', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image src={Checked} alt='Checked' width={100}></Image>
              </Box>
              <Box sx={{ width: '100%', height: '50%', background: '#ffffff', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', px: '45px', rowGap: '10px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700' }}>Success</h1>
                <p style={{ fontSize: '14px', textAlign: 'center' }}>Password reset successful. You can now sign in using your new password.</p>
                <Button variant='outline' onClick={resetpassword} sx={{ border: 'solid 1px #CECECE', borderRadius: '30px', px: '70px', py: '8px' }} style={{ color: '#CECECE', fontWeight: '400' }}>Close</Button>
              </Box>
            </Box>
          </Dialog>
          {/* register Success */}
          <Dialog open={state.registerSuccess} onClose={registerSuccess} PaperProps={{ style: { borderRadius: '15px' } }}>
            <Box sx={{ width: '430px', height: '480px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Box sx={{ width: '100%', height: '50%', background: '#6BCB77', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image src={Success} alt='Message' width={100}></Image>
              </Box>
              <Box sx={{ width: '100%', height: '50%', background: '#ffffff', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', px: '45px', rowGap: '10px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700' }}>Success</h1>
                <p style={{ fontSize: '14px', textAlign: 'center' }}>Your action has been completed successfully.</p>
                <Button variant='outline' onClick={registerSuccess} sx={{ border: 'solid 1px #CECECE', borderRadius: '30px', px: '70px', py: '8px' }} style={{ color: '#CECECE', fontWeight: '400' }}>Close</Button>
              </Box>
            </Box>
          </Dialog>
        {/* error */}
          <Dialog open={state.error} onClose={handleClose} PaperProps={{ style: { borderRadius: '15px' } }}>
            <Box sx={{ width: '430px', height: '480px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Box sx={{ width: '100%', height: '50%', background: '#FF6B6B', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image src={Error} alt='Message' width={100}></Image>
              </Box>
              <Box sx={{ width: '100%', height: '50%', background: '#ffffff', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', px: '45px', rowGap: '10px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700' }}>{state.status}</h1>
                <p style={{ fontSize: '14px', textAlign: 'center',textTransform:'capitalize' }}>{state.message}</p>
                <Button variant='outline' onClick={error} sx={{ border: 'solid 1px #CECECE', borderRadius: '30px', px: '70px', py: '8px' }} style={{ color: '#CECECE', fontWeight: '400' }}>Close</Button>
              </Box>
            </Box>
          </Dialog>
    </Box>
  )
}

export default dialod