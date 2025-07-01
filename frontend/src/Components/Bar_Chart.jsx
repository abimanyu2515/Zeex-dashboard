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

const Bar_Chart = () => {
  return (
    <div className='h-[400px]'>
        <h1 className='font-semibold mb-5 mx-5'>ALERTS BY BUILDINGS</h1>
        <ResponsiveContainer width='100%' height='80%'>
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
  )
}

export default Bar_Chart