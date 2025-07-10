import Line_Chart from '../Components/Line_Chart'

const AccumalatedAlerts = () => {
  return (
    <div className='m-2.5'>
      <div>
        <h1 className='text-2xl font-bold'>ALERTS</h1>
        <h3>Alerts by monthly view</h3>
      </div>
      <div className='mt-10'>
        <Line_Chart isInGrid={false} />
      </div>
    </div>
  )
}

export default AccumalatedAlerts