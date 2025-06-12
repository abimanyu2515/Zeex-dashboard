import React from 'react'
import './App.css'
import CamFeed from './Components/CamFeed'
import SideBar from './Components/SideBar'
import ChartFeed from './Components/ChartFeed'

const  Comps = () => {
  return (
    <React.Fragment>
       <div>
        <SideBar />
        <div className='max-sm:ml-0 sm:ml-44 lg:ml-56 max-sm:px-3 px-6 py-5 bg-[#F5F5F5] min-h-screen overflow-hidden'>
          <CamFeed />
          <ChartFeed />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Comps