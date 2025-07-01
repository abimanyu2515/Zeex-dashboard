import Pie_Chart from './Pie_Chart';
import Line_Chart from './Line_Chart'
import Bar_Chart from './Bar_Chart';
import Recent_Alerts from './Recent_Alerts';

const ChartFeed = () => {
  return (
    <div className='my-4 text-[14px]'>
      <div className='grid m-0 py-1 gap-3 max-sm:grid-cols-1 max-sm:p-0 sm:grid-cols-1 lg:grid-cols-3'>
        
        {/* ANALOG CHART [ALERTS GENERATED] */}
        <div className='col-span-2 rounded-lg shadow-xl/30 shadow-black bg-white max-:w-[360px] w-full h-[300px]'>
          <Line_Chart />
        </div>

        {/* PIE CHART [USERS DATA] */}
        <div className="max-lg:col-span-2 rounded-lg shadow-xl/30 p-2 shadow-black bg-white w-full">
          <h1 className='font-semibold m-3.5'>USERS</h1>
          <Pie_Chart isInGrid={true} />
        </div>
      </div>
      
      <div className='grid grid-cols-3 gap-3 mt-2 py-1 max-sm:grid-cols-1  sm:grid-cols-1 xl:grid-cols-3'>

        {/* BAR CHART [BUILDING ALERTS] */}
        <div className='col-span-2 w-full pt-4 pr-4 rounded-lg shadow-xl/30 shadow-black bg-white '>
          <Bar_Chart />
        </div>

        {/* ALERTS TABLE [RECENT ALERTS] */}
        <div className='bg-white max-xl:col-span-2 rounded-lg shadow-black shadow-xl/30'>
          <Recent_Alerts />
        </div>

      </div>
    </div>
  )
}

export default ChartFeed