import Bar_Chart from '../Components/Bar_Chart'

const BuildingAlerts = () => {
  return (
    <div className='m-2.5'>
      <div>
        <h1 className='text-2xl font-bold'>ALERTS</h1>
        <h3>Alerts by monthly view</h3>
      </div>
      <div className='mt-10'>
        <Bar_Chart isInGrid={false} />
      </div>
    </div>
  )
}

export default BuildingAlerts