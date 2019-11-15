/* eslint-disable */

import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import firebase from "firebase"
import LandingNavbar from './LandingNavbar'
import ReactGA from 'react-ga'
import AppleCal from '../../assets/images/apple-cal.jpg'
import '../../index.css'


export default function Landing() {
  ReactGA.pageview(window.location.pathname + window.location.search);
  return (
     <div className='container'>
     <LandingNavbar/>
     <div className='landing-grid-container'><img
            className='landing-img'
            src={AppleCal}
            alt={"desktopCalendar"}
          /><Link className='landing-link' to='/sign-in'>Sign In</Link></div>
           <div><Link className='landing-link2' to='/register'>Sign Up</Link></div>
     </div>
        

  )
}
