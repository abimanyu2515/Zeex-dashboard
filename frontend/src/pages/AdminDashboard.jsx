import React from 'react'
import '../App.css'
import CamFeed from '../Components/CamFeed'
// import AdminSideBar from '../Components/AdminSideBar'
import ChartFeed from '../Components/AdminChartFeed'
// import Header from '../Components/Header'

const AdminDashboard = () => {

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
      </div>
    </React.Fragment>
  )
}

export default AdminDashboard