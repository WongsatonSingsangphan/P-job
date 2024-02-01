'use client'
import React from 'react'

function Map (props)  {
  return (
  <>
   <iframe  
    title="Map"
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d968.2151051837777!2d100.5768343!3d13.90729!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2837069aa861b%3A0x1434e3245625eaea!2sTRAC%20Cafe!5e0!3m2!1sth!2sth!4v1676256508986!5m2!1sth!2sth"
    width={props.width} 
    height={props.height} 
    style={{border:0}} 
    allowFullScreen
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade"
  />
  </>
  )
  }

export default Map
