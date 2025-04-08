import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Appointment from './components/appointment'
import Sigmapanel from './src/sigmapanel'
import Patient from './src/patient'
import Settings from './src/settings'
import Layout from './components/layout'
const MainRouter = () => {
 return (<div>
 <Layout/>
 <Routes>
 
<Route exact path="/" element={<Appointment />} />
<Route exact path="/sigmapanel" element={<Sigmapanel />} />
<Route exact path="/patient" element={<Patient />} />
<Route exact path="/settings" element={<Settings />} />

 
 </Routes>
 </div>
 )
}
export default MainRouter

