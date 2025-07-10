import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const chartData = [
  {month: 'Jan', Arson: 1, Autoaccident: 3, Dumping: 5},
  {month: 'Feb', Arson: 4, Autoaccident: 1, Dumping: 2},
  {month: 'Mar', Arson: 5, Autoaccident: 4, Dumping: 3},
  {month: 'Apr', Arson: 3, Autoaccident: 5, Dumping: 2},
  {month: 'May', Arson: 2, Autoaccident: 3, Dumping: 4},
  {month: 'Jun', Arson: 4, Autoaccident: 2, Dumping: 5},
  {month: 'Jul', Arson: 2, Autoaccident: 4, Dumping: 3},
  {month: 'Aug', Arson: 5, Autoaccident: 2, Dumping: 1},
  {month: 'Sep', Arson: 4, Autoaccident: 1, Dumping: 2},
  {month: 'Oct', Arson: 3, Autoaccident: 2, Dumping: 1},
  {month: 'Nov', Arson: 1, Autoaccident: 4, Dumping: 3},
  {month: 'Dec', Arson: 2, Autoaccident: 3, Dumping: 5}
]

const Line_Chart = ({isInGrid=false}) => {
  return (
    <div className='p-0.5 rounded-lg w-full h-[300px]'>
        <h1 className={`font-semibold m-5 ${isInGrid ? '' : 'hidden'}`}>ALERTS GENERATED</h1>
          <ResponsiveContainer width="100%" height={`${isInGrid ? '70%' : '150%'}`}>
            <LineChart data={chartData} margin={{ top: 0, right: 30, left: -10, bottom: 0 }}>
              <XAxis dataKey="month" stroke="black" />
              <YAxis stroke="black" />
              <Tooltip
                contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #333',
                color: 'black'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="Arson" stroke="orange" strokeWidth={2} dot={{ r: 5 }} activeDot={{ r: 7 }} />
              <Line type="monotone" dataKey="Autoaccident" stroke="red" strokeWidth={2} dot={{ r: 5 }} activeDot={{ r: 7 }} />
              <Line type="monotone" dataKey="Dumping" stroke="blue" strokeWidth={2} dot={{ r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
    </div>
  )
}

export default Line_Chart