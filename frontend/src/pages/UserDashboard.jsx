<<<<<<< HEAD
import React, { useState } from 'react'
import '../App.css'
import CamFeed from '../Components/CamFeed'
import SideBar from '../Components/UserSideBar'
import Header from '../Components/Header'
import UserChartFeed from '../Components/UserChartFeed'

const UserDashboard = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <React.Fragment>
       <div>
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className={`${isSidebarOpen ? 'sm:ml-44 lg:ml-56' : 'ml-16'} max-sm:ml-0 max-sm:px-3 px-6 bg-[#F5F5F5] min-h-screen overflow-hidden transition-all duration-75`}>
          <Header />
          <CamFeed />
          <UserChartFeed />
        </div>
=======
import React from 'react'
import '../App.css'
import CamFeed from '../Components/CamFeed'
// import AdminSideBar from '../Components/AdminSideBar'
import ChartFeed from '../Components/UserChartFeed'
// import Header from '../Components/Header'

const UserDashboard = () => {

  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <React.Fragment>
        <div className='max-sm:ml-0 max-sm:px-3  min-h-screen overflow-hidden transition-all duration-75'>
          <div className="p-2.5">
            <strong>HI, {user?.name}</strong><br />
            <span>Welcome to the dashboard</span>
          </div>
          <CamFeed />
          <ChartFeed />
>>>>>>> fc3b24a (Your message about what you changed)
      </div>
    </React.Fragment>
  )
}

export default UserDashboard