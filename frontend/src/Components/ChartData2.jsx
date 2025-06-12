import {
  BarChart, Bar, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer,
  CartesianGrid
} from 'recharts'

const barData = [
    {
      building: "Clark",
      Arson: 137,
      Accident: 96,
      Dumping: 72
    },
    {
      building: "Parking",
      Arson: 55,
      Accident: 28,
      Dumping: 58
    },
    {
      building: "Student Union",
      Arson: 109,
      Accident: 23,
      Dumping: 34
    },
    {
      building: "ENG",
      Arson: 133,
      Accident: 52,
      Dumping: 43
    },
    {
      building: "CV1",
      Arson: 81,
      Accident: 80,
      Dumping: 112
    },
    {
      building: "CV2",
      Arson: 66,
      Accident: 111,
      Dumping: 27
    },
    {
      building: "Staffroom",
      Arson: 80,
      Accident: 47,
      Dumping: 158
    },
  ];

const ChartData2 = () => {
  return (
    <div className='grid grid-cols-3 gap-3 mt-2 py-1 max-sm:grid-cols-1  sm:grid-cols-1 xl:grid-cols-3'>
      <div className='col-span-2 w-full h-[400px] pt-4 pr-4 rounded-lg shadow-xl/30 shadow-black bg-white '>
        <ResponsiveContainer width='100%' height='80%'>
          <h1 className='font-semibold mb-5 mx-5'>ALERTS BY BUILDINGS</h1>
          <BarChart data={barData}>
            <CartesianGrid />
            <XAxis dataKey='building' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='Arson' stackId='a' fill='orange' />
            <Bar dataKey='Accident' stackId='a' fill='red' />
            <Bar dataKey='Dumping' stackId='a' fill='blue' />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='bg-white max-xl:col-span-2  rounded-lg shadow-black shadow-xl/30 '>
        <h1 className='font-semibold my-5 mx-5'>RECENT ALERTS</h1>
        <table className='table divide-y w-full px-5 text-[12px]'>
          <tr>
            <td className="px-1 py-4">
                <b>Clark Building</b><br />
                <span>Camera region 2</span>
            </td>
            <td className="px-1 py-4">01-05-2025</td>
            <td className="px-1 py-4 text-center"><span className='bg-green-700 text-white p-2 rounded-md'>Arson</span></td>
          </tr>
          <tr>
            <td className="px-1 py-4">
                <b>Campus Village Building</b><br />
                <span>Camera region 2</span>
            </td>
            <td className="px-1 py-4">01-05-2025</td>
            <td className="px-1 py-4 text-center"><span className='bg-green-700 text-white p-2 rounded-md'>Dumping</span></td>
          </tr>
          <tr>
            <td className="px-1 py-4">
                <b>Engineering Building</b><br />
                <span>First Floor North wing</span>
            </td>
            <td className="px-1 py-4">01-05-2025</td>
            <td className="px-1 py-4 text-center"><span className='bg-green-700 text-white p-2 rounded-md'>Accident</span></td>
          </tr>

          <tr>
            <td className="px-1 py-4">
                <b>Science Building</b><br />
                <span>Camera region 6</span>
            </td>
            <td className="px-1 py-4">01-05-2025</td>
            <td className="px-1 py-4 text-center"><span className='bg-green-700 text-white p-2 rounded-md'>Accident</span></td>
          </tr>

          <tr></tr>
        </table>
      </div>
    </div>
  )
}

export default ChartData2