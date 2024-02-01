'use client'
import { StateContext } from '@/context/Context';
import { Box, FormControlLabel, Switch } from '@mui/material';
import React, { useContext, useRef, useState,useCallback } from 'react'
import { useRouter } from "next/navigation";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

function leadlist() {
  const {state, setState} = useContext(StateContext);

    const router = useRouter();
    const handleNewRequest = ()=>{
        router.push('/ShareDocument');
      }
    
      const handleTooltipOpen = () => {
          setState((prevData) => ({ ...prevData, viewfile: !state.viewfile}));
      };
      const handleTooltipClose = () => {
        setState((prevData) => ({ ...prevData, viewfile: false}));
      };
      const handleTooltipOpenRecipient = () => {
        setState((prevData) => ({ ...prevData, viewRecipient: !state.viewRecipient}));
      };
      const handleTooltipCloseRecipient = () => {
        setState((prevData) => ({ ...prevData, viewRecipient: false}));
      };

      const handleClicktoGetFile = (uuid) => {
        var requestOptions = {
          method: 'GET',
          responseType: 'blob',
          redirect: 'follow'
        };
    
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_API_PORT}/api/requestFile/${uuid}`, requestOptions)
          .then(response => response.blob())
          .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
    
            window.open(blobUrl, '_blank');
          })
          .catch(error => console.log('error', error));
      };

      const CustomTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))({
        [`& .${tooltipClasses.tooltip}`]: {
          maxWidth: 500,
          borderRadius: 7,
          border: '1px solid rgba(119, 130, 150, 0.20)',
          background: '#FFF',
          boxShadow: '0px 4px 60px 0px rgba(0, 0, 0, 0.08)',
        },
      });
      const CustomTooltipRecipient = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))({
        [`& .${tooltipClasses.tooltip}`]: {
          maxWidth: 500,
          borderRadius: 7,
          border: '1px solid rgba(119, 130, 150, 0.20)',
          background: '#FFF',
          boxShadow: '0px 4px 60px 0px rgba(0, 0, 0, 0.08)',
        },
      });
      
      const convertTimestampToLocalTime = (timestamp) => {

        const utcDate = new Date(timestamp * 1000);
        const localDate = new Intl.DateTimeFormat('th-TH', {
          timeZone: 'Asia/Bangkok',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false,
        }).formatToParts(utcDate);
    
        const formattedDate = `${localDate[0].value}/${localDate[2].value}/${localDate[4].value}`;
        const formattedTime = `${localDate[6].value}:${localDate[8].value}:${localDate[10].value}`;
      
        return `${formattedDate} ${formattedTime}`;
      };

      const groupedOrders = state.allleadorder?.reduce((acc, item) => {
        const existingOrder = acc.find((group) => group[0]?.scdact_reqid === item.scdact_reqid);
      
        if (existingOrder) {
          existingOrder.push(item);
        } else {
          acc.push([item]);
        }
      
        return acc;
      }, []);

      const handleBatchApprove = async (uuids,  orderIds, commands,emails,senders,subjects,bodys) => {
        setState((prevData) => ({ ...prevData, pageloader: true}));

        const blobArray = [];
        const requestOptions = {
          method: 'GET',
          responseType: 'blob',
          redirect: 'follow'
        };
      
        // Fetch files sequentially
        for (let i = 0; i < uuids.length; i++) {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_API_PORT}/api/requestFile/${uuids[i]}`, requestOptions);
            if (response.ok) {
              const blob = await response.blob();
              blobArray.push(blob);
            } else {
              console.log(`Error fetching file for uuid: ${uuids[i]}, Status: ${response.status}`);
            }
          } catch (error) {
            console.log('Error:', error);
          }
        }
      
        // Create FormData
        const formdata = new FormData();
        formdata.append("order_id", orderIds[0]);
      
        // Append files to FormData
        blobArray.forEach((blob, index) => {
          const filenameMatch = commands[index].match(/-src:([^ ]+)/);
          const fullPath = filenameMatch[1];
          const filename = fullPath.split('/').pop();
      
          formdata.append("cmd", commands[index]);
          formdata.append("file", blob, `/D:/Downloads/${filename}`);
        });
      
        // Make the log request after all files have been fetched
        const logRequestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
      
        try {
          const logResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_API_PORT}/api/fileEncrypt`, logRequestOptions);
          const logResult = await logResponse.json();
      
          if (logResult.status === 'OK') {
            console.log("🚀 ~ handleBatchApprove ~ logResult:", logResult)
            var formdataSendmail = new FormData();
            formdataSendmail.append("order_id", orderIds[0]);
            formdataSendmail.append("action", "Approve");
            formdataSendmail.append("email", emails[0]);
            formdataSendmail.append("sender", senders[0]);
            formdataSendmail.append("subject", subjects[0]);
            formdataSendmail.append("body", bodys[0]);
            
            var requestOptionsSendmail = {
              method: 'POST',
              body: formdataSendmail,
              redirect: 'follow'
            };
            
            fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_API_PORT}/api/reustDoc`, requestOptionsSendmail)
              .then(response => response.json())
              .then(result => {
                if(result.status === "OK"){
                  setState((prevData) => ({ ...prevData, alert: true, pageloader: false, alert_text: "Operation successfully", alert_type: "success" }));
                  setTimeout(() => {
                    window.location.reload();
                  }, 3000);
                }else{
                  setState((prevData) => ({ ...prevData, alert: true, loading: false, alert_text: "Operation failed", alert_type: "error" }));
                  setTimeout(() => {
                    window.location.reload();
                  }, 3000);
                }
              })
              .catch(error => console.log('error', error));
          } else {
            setState((prevData) => ({ ...prevData, loading: false, alert: true, alert_text: logResult.message.Finalcode_result, alert_type: "error" }));
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        } catch (logError) {
          console.log('Error sending log request:', logError);
        }
      };
      
      const handleClicktoApprove = (orderGroup) => {
        const uuids = orderGroup.map(order => order.scdact_id);
        const orderIds = orderGroup.map(order => order.scdact_reqid);
        const commands = orderGroup.map(order => order.scdact_command);
        const emails = orderGroup.map(order => order.scdact_reciepient);
        const senders = orderGroup.map(order => order.scdact_sender);
        const subjects = orderGroup.map(order => order.scdact_subject);
        const bodys = orderGroup.map(order => order.scdact_name);
      
        handleBatchApprove(uuids, orderIds, commands,emails,senders,subjects,bodys);
      };

      const handleReject = (orderGroup,action)=>{
        setState((prevData) => ({ ...prevData, pageloader: true}));
        const orderIds = orderGroup.map(order => order.scdact_reqid);

        var formdata = new FormData();
        formdata.append("order_id", orderIds[0]);
        formdata.append("action", "Reject");
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_API_PORT}/api/reustDoc`, requestOptions)
          .then(response => response.json())
        .then(result => {
          if(result.status === "OK"){
            setState((prevData) => ({ ...prevData, alert: true, pageloader: false, alert_text: "Operation successfully", alert_type: "success" }));
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }else{
            setState((prevData) => ({ ...prevData, alert: true, loading: false, alert_text: "Operation failed", alert_type: "error" }));
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        })
          .catch(error => console.log('error', error));
        
      }
    


  return {handleNewRequest,handleClicktoGetFile,handleTooltipOpen,handleTooltipClose,handleTooltipCloseRecipient,handleTooltipOpenRecipient,CustomTooltip,CustomTooltipRecipient,
    convertTimestampToLocalTime,groupedOrders,handleClicktoApprove,handleReject
  };

}

export default leadlist

