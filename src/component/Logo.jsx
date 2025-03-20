import React from 'react'
import logo from '../assets/8_1sasa11-removebg-preview.png'

function Logo({width = "100px"}) {
  return (
    <img src={logo} width={width} alt="" />
  )
}

export default Logo