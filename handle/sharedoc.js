'use client'
import { StateContext } from '@/context/Context';
import { Box, FormControlLabel, Switch } from '@mui/material';
import React, { useContext, useRef, useState,useCallback } from 'react'
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import another from '@/assets/assets/images/marco.png'
import pdf from '@/assets/assets/images/pdficon.png'
import jpg from '@/assets/assets/images/jpg.png'
import png from '@/assets/assets/images/png.png'
import text from '@/assets/assets/images/text.png'
import ai from '@/assets/assets/images/ai.png'
import code from '@/assets/assets/images/code.png'
import doc from '@/assets/assets/images/doc.png'
import iso from '@/assets/assets/images/iso.png'
import js from '@/assets/assets/images/js.png'
import mp3 from '@/assets/assets/images/mp3.png'
import mp4 from '@/assets/assets/images/mp4.png'
import ppt from '@/assets/assets/images/ppt.png'
import ps from '@/assets/assets/images/ps.png'
import sql from '@/assets/assets/images/sql.png'
import svg from '@/assets/assets/images/svg.png'
import ttf from '@/assets/assets/images/ttf.png'
import xls from '@/assets/assets/images/xls.png'
import zip from '@/assets/assets/images/zip.png'

function sharedoc(textFieldRef,fileInputRef) {
  const {state, setState} = useContext(StateContext);
  const router = useRouter();

  const HandleSwitchChange = (label) => {
    setSwitchStates((prevSwitchStates) => ({
      ...prevSwitchStates,
      [label]: !prevSwitchStates[label],
    }));
  };

  const handleKeyPress = (event) => {
    console.log("🚀 ~ handleKeyPress ~ event:", event)
    if ((event.key === 'Enter' || event.key === 'Tab') && state.input_recip.trim() !== '') {
      setState((prevData) => ({ ...prevData, recipient: [...state.recipient, state.input_recip.trim()],input_recip:""}));
    }
  };

  const handleInputChange = (event) => {
    setState((prevData) => ({ ...prevData,input_recip:event.target.value}));
  };
  const handlesubjectChange = (event) => {
    setState((prevData) => ({ ...prevData,subject:event.target.value}));
  };
  const handlemessageChange = (event) => {
    setState((prevData) => ({ ...prevData,message:event.target.value}));
  };
  const handlemessageBodyChange = (event) => {
    setState((prevData) => ({ ...prevData,messageBody:event.target.value}));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && state.input_recip === '' && state.recipient.length > 0) {
      const newEmails = [...state.recipient];
      newEmails.pop();
      setState((prevData) => ({ ...prevData,recipient:newEmails}));
    }
  };

 const handleOutsideClick = (event) => {
  if (textFieldRef && !textFieldRef.current.contains(event.target)) {
    // Clicked outside the TextField
    if (state.input_recip.trim() !== '') {
      setState((prevData) => ({ ...prevData, recipient: [...state.recipient, state.input_recip.trim()],input_recip:""}));
    }
  }
};

const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  const maxSize = 25 * 1024 * 1024; // 25 MB
  const currentTotalSize = state.selectedFile.reduce((acc, file) => acc + file.size, 0);
  const incomingTotalSize = files.reduce((acc, file) => acc + file.size, 0);
  const newTotalSize = currentTotalSize + incomingTotalSize;

  if (newTotalSize > maxSize) {
    setState((prevData) => ({ ...prevData,alert: true, loading: false, alert_text: "File size exceeds 25 MB limit. Please select a smaller file.", alert_type: "error"}));
    setTimeout(() => {
      setState((prevData) => ({ ...prevData,alert: false}));
    }, 3000);
    return;
  }
  setState((prevData) => ({ ...prevData, selectedFile: [...prevData.selectedFile, ...files],selectedFileName: [
    ...prevData.selectedFileName,
    ...files.map((file) => file.name),
  ] }));
  document.getElementById('upload').style.backgroundColor = `#F7F8F9`;
};


const handleSecureType = (e) => {
  setState((prevData) => ({ ...prevData, secure_type: !state.secure_type,allowconverttooriginalfile: false,allowcopypaste: false,allowprint: false,alloweditsecuredfile: false,allowrunamacro: false,allowconverttobrowserviewfile: false,enableconverttooriginalfile:false}));
};

const handleDragLeave = (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
    e.currentTarget.style.backgroundColor = `#fff`;
    if(state.selectedFile.length === 0){
    setState((prevData) => ({ ...prevData,dragover: false}));
    }
  }
};

const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const droppedFile = Array.from(e.dataTransfer.files);
  const maxSize = 25 * 1024 * 1024; // 25 MB
  const currentTotalSize = state.selectedFile.reduce((acc, file) => acc + file.size, 0);
  const incomingTotalSize = droppedFile.reduce((acc, file) => acc + file.size, 0);
  const newTotalSize = currentTotalSize + incomingTotalSize;

  if (newTotalSize > maxSize) {
    setState((prevData) => ({ ...prevData,alert: true, loading: false, alert_text: "File size exceeds 25 MB limit. Please select a smaller file.", alert_type: "error"}));
    setTimeout(() => {
      setState((prevData) => ({ ...prevData,alert: false}));
    }, 3000);
    return;
  }
  setState((prevData) => ({ ...prevData, selectedFile: [...prevData.selectedFile, ...droppedFile],selectedFileName: [
    ...prevData.selectedFileName,
    ...droppedFile.map((file) => file.name)
  ],dragover:false}));
};

const handleDragOver = (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.currentTarget.style.backgroundColor = `#F7F8F9`;
  if(state.selectedFile.length === 0){
  setState((prevData) => ({ ...prevData,dragover: true}));
  }
};

const handleFileClick = () => {
  fileInputRef.current.click();
};
const handleExit = () => {
  setState((prevData) => ({ ...prevData, titleselect:"",input_last_name:"",input_email:"",input_role:"",
  input_firstName:"",input_phone:"",input_jobtitle:"",email:'',Password:'',Alias:'',Province:'',Companyname:'',District:''
  ,No:'',SubDistric:'',Street:'',ZIPCode:'',Country:'',GoogleMaps:'',Newpassword:'',recipient:[],input_recip:"",subject:"",message:"",secure_type:false,selectedFileName:[],
  selectedFile:[],allowconverttooriginalfile: false,allowcopypaste: false,allowprint: false,alloweditsecuredfile: false,allowrunamacro: false,allowconverttobrowserviewfile: false,enableconverttooriginalfile:false,
  timelimitBeforeOri:"",timelimitBefore:"",timeBefore:"",timelimitAfterOri:"",timelimitAfter:"",timeAfter:"",limitDateTime:false,limitViewablePeriod:false,limitNumberFileOpen:false,noLimit:false,
  periodDays:"",periodHours:"",opensTime:"",loading:false,messageBody:"",screenwatermark:false,watermark:false}));
};

const handleChangeperiodDays = (event) => {
  setState((prevData) => ({ ...prevData, periodDays:event.target.value}));
};
const handleChangeperiodHours = (event) => {
  setState((prevData) => ({ ...prevData, periodHours:event.target.value}));
};
const handleChangeopensTime = (event) => {
  setState((prevData) => ({ ...prevData, opensTime:event.target.value}));
};

const handleSwitchChange = (key, event) => {
  setState((prevData) => {
    const newState = { ...prevData, [key]: event.target.checked };

    if (state.secure_type===true && key === 'allowconverttooriginalfile' && event.target.checked) {
      newState.allowcopypaste = false;
      newState.allowprint = false;
      newState.alloweditsecuredfile = false;
      newState.allowrunamacro = false;
      newState.screenwatermark = false;
      newState.watermark = false;
    }else if (state.secure_type===true && key === 'allowconverttooriginalfile'){
      newState.allowcopypaste = false;
      newState.allowprint = false;
      newState.alloweditsecuredfile = false;
      newState.allowrunamacro = false;
      newState.screenwatermark = false;
      newState.watermark = false;

    }else if (state.secure_type===false && key === 'allowcopypaste' && event.target.checked){
      newState.screenwatermark = false;
    }else if(state.secure_type===true && key === 'allowcopypaste' && event.target.checked){
      newState.screenwatermark = false;
    }

    return newState;
  });
};

const formatDatetime = (rawDatetime) => {
  const date = new Date(rawDatetime);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${year}/${month}/${day}_${hours}:${minutes}:00`;
};

const handleDatetimeChangeBefore = (event) => {
const rawDateValue = event.target.value;
const formattedDatetime = formatDatetime(rawDateValue + ' ' + state.time + ':00');
setState((prevData) => ({ ...prevData, timelimitBefore: formattedDatetime, timelimitBeforeOri: rawDateValue }));
};

const handleTimeChangeBefore = (event) => {
const rawTimeValue = event.target.value;
setState((prevData) => ({ ...prevData, timeBefore: rawTimeValue }));
if (state.timelimitBefore!=="") {
  const formattedDatetime = formatDatetime(state.timelimitBeforeOri + ' ' + rawTimeValue + ':00');
  setState((prevData) => ({ ...prevData, timelimitBefore: formattedDatetime }));
}
};
const handleDatetimeChangeAfter = (event) => {
const rawDateValue = event.target.value;
const formattedDatetime = formatDatetime(rawDateValue + ' ' + state.time + ':00');
setState((prevData) => ({ ...prevData, timelimitAfter: formattedDatetime, timelimitAfterOri: rawDateValue }));
};

const handleTimeChangeAfter = (event) => {
const rawTimeValue = event.target.value;
setState((prevData) => ({ ...prevData, timeAfter: rawTimeValue }));
if (state.timelimitAfter!=="") {
  const formattedDatetime = formatDatetime(state.timelimitAfterOri + ' ' + rawTimeValue + ':00');
  setState((prevData) => ({ ...prevData, timelimitAfter: formattedDatetime }));
}
};

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const handleCheckboxChange = (checkboxType) => {
  switch (checkboxType) {
    case 'limitDateTime':
      setState((prevData) => ({ ...prevData, limitDateTime: !state.limitDateTime,limitViewablePeriod:false,limitNumberFileOpen:false,noLimit:false,periodDays:"",periodHours:"",opensTime:"",timelimitBeforeOri:"",timelimitBefore:"",timeBefore:"",timelimitAfterOri:"",timelimitAfter:"",timeAfter:"" }));
      break;
    case 'limitViewablePeriod':
      setState((prevData) => ({ ...prevData, limitDateTime: false,limitViewablePeriod:!state.limitViewablePeriod,limitNumberFileOpen:false,noLimit:false,periodDays:"",periodHours:"",opensTime:"",timelimitBeforeOri:"",timelimitBefore:"",timeBefore:"",timelimitAfterOri:"",timelimitAfter:"",timeAfter:"" }));
      break;
    case 'limitNumberFileOpen':
      setState((prevData) => ({ ...prevData, limitDateTime: false,limitViewablePeriod:false,limitNumberFileOpen:!state.limitNumberFileOpen,noLimit:false,periodDays:"",periodHours:"",opensTime:"",timelimitBeforeOri:"",timelimitBefore:"",timeBefore:"",timelimitAfterOri:"",timelimitAfter:"",timeAfter:"" }));
      break;
    case 'noLimit':
      setState((prevData) => ({ ...prevData, limitDateTime: false,limitViewablePeriod:false,limitNumberFileOpen:false,noLimit:!state.noLimit,periodDays:"",periodHours:"",opensTime:"",timelimitBeforeOri:"",timelimitBefore:"",timeBefore:"",timelimitAfterOri:"",timelimitAfter:"",timeAfter:"" }));
      break;
  default:
    break;
  }
};
const IOSSwitchPolicy = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible"  disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#48846B',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#48846B' : '#E9E9EA',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const SwitchBox = ({ label, checked, onChange }) => (
  <Box sx={{ borderRadius:"7px",background: '#F7F8F9', width: '100%', height: '40px',  display: 'flex', alignItems: 'center', fontSize: '10px', justifyContent: 'space-between', p: 3 }}>
    {label}
    <FormControlLabel
      disabled={state.secure_type && state.allowconverttooriginalfile && (label === 'Allow copy paste' || label === 'Allow print' || label === 'Allow run a macro' || label === 'Allow edit secured file'||label === 'Screen Watermark')||
      !state.secure_type && state.allowcopypaste && (label === 'Screen Watermark')||state.secure_type && state.allowcopypaste && (label === 'Screen Watermark')}
      labelPlacement="start"
      control={
      // <Switch checked={checked} onChange={onChange} sx={{
      //   '& .MuiSwitch-switchBase.Mui-checked': { color: '#FFFFFF', '&:hover': { backgroundColor: 'transparent' } },
      //   '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#5DCBFF' },
      // }} />
      <IOSSwitchPolicy  checked={checked} onChange={onChange}/>
    }
      sx={{ color: '#778296', marginLeft: '10px' }}
    />
  </Box>
);

  const handleUpload = useCallback(async () => {
    const uuid = require('uuid');

    if (state.selectedFile.length > 0) {
      setState((prevData) => ({ ...prevData, loading: true }));

      const formdata = new FormData();
      const orderId = uuid.v4(); 
      const currentDate = new Date();
      const timestampInSeconds = Math.floor(currentDate.getTime() / 1000);

      formdata.append("scdact_status", "Pending");
      formdata.append("scdact_reqid", orderId);
      formdata.append("scdact_name", state.messageBody?state.messageBody:"");
      formdata.append("scdact_type", state.secure_type?"FCL":"HTML");
      formdata.append("scdact_starttime", state.timelimitBefore&&state.timeBefore?state.timelimitBefore + state.timeBefore:0);
      formdata.append("scdact_endtime", state.timelimitAfter&&state.timeAfter?state.timelimitAfter + state.timeAfter:0);
      formdata.append("scdact_numberopen", state.opensTime?state.opensTime:0);
      formdata.append("scdact_periodday", state.periodDays?state.periodDays:0);
      formdata.append("scdact_periodhour",state.periodHours?state.periodHours:0);
      formdata.append("scdact_nolimit", state.noLimit?"true":"false");
      formdata.append("scdact_cvtoriginal", state.allowconverttooriginalfile?"true":"false");
      formdata.append("scdact_edit", state.alloweditsecuredfile?"true":"false");
      formdata.append("scdact_print", state.allowprint?"true":"false");
      formdata.append("scdact_copy", state.allowcopypaste?"true":"false");
      formdata.append("scdact_scrwatermark", "true");
      formdata.append("scdact_watermark", "true");
      formdata.append("scdact_cvthtml", state.allowconverttobrowserviewfile?"true":"false");
      formdata.append("scdact_cvtfcl", state.allowconverttofcl?"true":"false"); 
      formdata.append("scdact_marcro", state.allowrunamacro?"true":"false");
      formdata.append("scdact_msgtext", state.message);
      formdata.append("scdact_subject", state.subject);
      formdata.append("scdact_createlocation", "สำเร็จ");
      formdata.append("scdact_updatelocation", "สำเร็จ");
      formdata.append("scdact_reciepient", state.recipient);
      formdata.append("scdact_sender", state.decode_token?state.decode_token.UsernameOriginal:"thananchai@tracthai.com");
      formdata.append("uuid_member", state.decode_token?state.decode_token.ID:"No value");
      formdata.append("scdact_action", "Request");
      formdata.append("scdact_enableconvertoriginal", state.enableconverttooriginalfile?"true":"false");
      formdata.append("scdact_actiontime", timestampInSeconds);

      for (let i = 0; i < state.selectedFile.length; i++) {
        const file = state.selectedFile[i];
        const sanitizedFileName = file.name.replace(/\s+/g, '-');
        const emailText = state.recipient.map((recipient, index) => `${recipient}`)

        formdata.append("scdact_command", `./finalcode_api ${state.secure_type===true?"":"-browserview"} ${state.message?`-mes:"${state.message}"`:""} ${state.enableconverttooriginalfile?"-to_bv_decode":""} ${state.allowconverttobrowserviewfile?"-to_bv_file":""} ${state.allowrunamacro||state.allowconverttooriginalfile?"-nomacro_deny":"-macro_deny"} ${state.alloweditsecuredfile?"-edit":""} -encrypt ${state.secure_type===true?"":"-bv_auth:1"}  -src:../data/${orderId}/${sanitizedFileName} -dest:../data/${orderId}/${sanitizedFileName}"(${emailText})"${state.secure_type===true?".fcl":".html"} ${state.allowconverttooriginalfile?"-decode":""} ${state.allowcopypaste?"-copypaste":""} ${state.allowprint?"-print":""} ${state.timelimitBefore?`-startdate:${state.timelimitBefore}`:""} ${state.timelimitAfter?`-date:${state.timelimitAfter}`:""} ${state.periodDays?`-day:${state.periodDays}`:""} ${state.periodHours?`-hour:${state.periodHours}`:""} ${state.opensTime?`-cnt:${state.opensTime}`:""} -user:thananchai@tracthai.com -mail:${emailText} ${state.watermark?"-watermark:2098":""} ${state.screenwatermark?"-scrnwatermark:2096":""}`);
        formdata.append("scdact_binary", file, `/D:/Downloads/${orderId}/${sanitizedFileName}`);

        formdata.append("scdact_filename", sanitizedFileName);
        formdata.append("scdact_filetype", state.selectedFileName[i].split('.')[1]);
        formdata.append("scdact_filehash", "A");
        formdata.append("scdact_filesize", formatBytes(file.size));
        formdata.append("scdact_filecreated", file.lastModified);
        formdata.append("scdact_filemodified", "A");
        formdata.append("scdact_filelocation", "A");
      }

       const xhr = new XMLHttpRequest();

      xhr.open("POST", `${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_API_PORT}/api/requestDoc`, true);
      xhr.onload = () => {

        if (xhr.status === 200) {
          const result = JSON.parse(xhr.responseText);
          console.log("🚀 ~ file: Upload.js:67 ~ handleUpload ~ result:", result)
          if (result.Status === "OK") {
            // setData((prevData) => ({ ...prevData, alert: true, alert_text: result.message.finalcode_result, alert_type: "success"}));
            //^delay 3 seconds
              setState((prevData) => ({ ...prevData, loading: false,titleselect:"",input_last_name:"",input_email:"",input_role:"",
              input_firstName:"",input_phone:"",input_jobtitle:"",email:'',Password:'',Alias:'',Province:'',Companyname:'',District:''
              ,No:'',SubDistric:'',Street:'',ZIPCode:'',Country:'',GoogleMaps:'',Newpassword:'',recipient:[],input_recip:"",subject:"",message:"",secure_type:false,selectedFileName:[],
              selectedFile:[],allowconverttooriginalfile: false,allowcopypaste: false,allowprint: false,alloweditsecuredfile: false,allowrunamacro: false,allowconverttobrowserviewfile: false,enableconverttooriginalfile:false,
              timelimitBeforeOri:"",timelimitBefore:"",timeBefore:"",timelimitAfterOri:"",timelimitAfter:"",timeAfter:"",limitDateTime:false,limitViewablePeriod:false,limitNumberFileOpen:false,noLimit:false,
              periodDays:"",periodHours:"",opensTime:"",loading:false,messageBody:"",watermark:false,screenwatermark:false}));
              router.push('/RequestLisU');
          } else {
            // setData((prevData) => ({ ...prevData, loading: false, alert: true, alert_text: result.message.finalcode_result, alert_type: "error" }));
          }
        }
      };

      xhr.onerror = () => {
        // Record end time in case of an error
        const endTime = performance.now();
        // const elapsedTime = endTime - startTime;
        // console.error(`API request failed in ${elapsedTime} milliseconds`);
        // setData((prevData) => ({ ...prevData, alert: true, alert_text: 'An error occurred during the upload', alert_type: "error" }));
      };

      xhr.send(formdata);
    }
  }, [state, setState]);


    const IOSSwitch = styled((props) => (
      <Switch focusVisibleClassName=".Mui-focusVisible" checked={state.secure_type} onChange={handleSecureType} disableRipple {...props} />
    ))(({ theme }) => ({
      width: 42,
      height: 26,
      padding: 0,
      '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
          transform: 'translateX(16px)',
          color: '#48846B',
          '& + .MuiSwitch-track': {
            backgroundColor: theme.palette.mode === 'dark' ? '#48846B' : '#E9E9EA',
            opacity: 1,
            border: 0,
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
          },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
          color: '#33cf4d',
          border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
          color:
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
      },
      '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
      },
      '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
          duration: 500,
        }),
      },
    }));

    let selectedFileNames = state.selectedFileName; // Assuming multiple files can be selected

  let fileSources = selectedFileNames.map((fileName) => {
    let filetype = fileName ? fileName.split('.')[1] : '';
  
    if (filetype.length > 5) {
      filetype = filetype.slice(0, 2) + '..';
    }
  
    let src;
    switch (filetype) {
      case 'pdf':
        src = pdf;
        break;
      case 'jpg':
      case 'jpeg':
        src = jpg;
        break;
      case 'txt':
        src = text;
        break;
      case 'png':
        src = png;
        break;
      case 'ai':
        src = ai;
        break;
      case 'py':
      case 'jsx':
      case 'go':
        src = code;
        break;
      case 'doc':
      case 'docx':
        src = doc;
        break;
      case 'iso':
        src = iso;
        break;
      case 'mp3':
        src = mp3;
        break;
      case 'mp4':
        src = mp4;
        break;
      case 'pptx':
      case 'ppt':
        src = ppt;
        break;
      case 'psd':
        src = psd;
        break;
      case 'sql':
        src = sql;
        break;
      case 'svg':
        src = svg;
        break;
      case 'ttf':
        src = ttf;
        break;
      case 'xlsx':
      case 'csv':
        src = xls;
        break;
      case 'zip':
      case 'rar':
        src = zip;
        break;
      default:
        src = another;
    }
    return { fileName, src };
  });



  return {HandleSwitchChange,handleKeyPress,handleInputChange,handleKeyDown,handleOutsideClick,handlesubjectChange,handlemessageChange,
    handleDragOver,handleDrop,handleDragLeave,handleFileChange,handleFileClick,handleExit,handleSecureType,handleSwitchChange,handleDatetimeChangeBefore,
    handleTimeChangeBefore,handleDatetimeChangeAfter,handleTimeChangeAfter,formatBytes,handleCheckboxChange,SwitchBox,handleChangeopensTime,handleChangeperiodHours,
    handleChangeperiodDays,handleUpload,IOSSwitch,fileSources,handlemessageBodyChange
  };}

export default sharedoc
