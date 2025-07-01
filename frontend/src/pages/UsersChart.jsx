import React from 'react'
import Pie_Chart from '../Components/Pie_Chart'

const UsersChart = () => {
  return (
    <React.Fragment>
      <div className='grid grid-cols-1 h-screen overflow-hidden'>
        <div className='col-span-1 p-0 w-full rounded-md'>
          <h1 className='font-bold text-2xl m-3.5'>USERS</h1>
          <h3 className='m-3.5'>USER DISTRIBUTION</h3>
          <Pie_Chart />
        </div>
      </div>
    </React.Fragment>
  )
}

export default UsersChart