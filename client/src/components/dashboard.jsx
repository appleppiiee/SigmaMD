import React from 'react'
import Navbar from './navbar'

const Dashboard = ({sidebarToggle, setSidebarToggle}) => {
  return (
    <div className={`${sidebarToggle ? " ml-64 " : ""} w-full`}>
      <Navbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
     dashboard

    </div>
  )
}

export default Dashboard