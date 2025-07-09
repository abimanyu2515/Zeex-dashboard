<<<<<<< HEAD
import React from 'react'

const AccumalatedAlerts = () => {
  return (
    <div>AccumalatedAlerts</div>
=======
import Line_Chart from '../Components/Line_Chart'
const AccumalatedAlerts = () => {
  return (
    <div className='m-2.5'>
      <div>
        <h1 className='font-bold text-2xl'>ALERTS</h1>
        <h2 className='mt-3'>Alerts by monthy view</h2>
      </div>

      <div className='mt-10 py-0.5'>
        <Line_Chart />
      </div>
    </div>
>>>>>>> fc3b24a (Your message about what you changed)
  )
}

export default AccumalatedAlerts