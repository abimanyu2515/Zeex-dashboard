import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const pieData = [
  { name: 'Admin', value: 3 },
  { name: 'Staff', value: 1 }
];

const COLORS = ['#FFBB28', '#FF6B6B', '#82ca9d'];

const Pie_Chart = ({isInGrid = false}) => {

  const pieSize = isInGrid ? {innerRadius: 45, outerRadius: 80 } : {innerRadius: 100, outerRadius: 200}
  return (
        <React.Fragment>
        <ResponsiveContainer width="100%" height="70%">
          <PieChart>
            <Pie
            data={pieData}
            cx='50%'
            cy='50%'
            innerRadius={pieSize.innerRadius}
            outerRadius={pieSize.outerRadius}
            fill='black'
            dataKey='value'
            >
              {
                pieData.map((entry, index) => (
                  <Cell key={`cell=${index}`} fill={COLORS[index % COLORS.length]} />
                ))
              }
            </Pie>
            <Tooltip
              contentStyle={{
                border: '1px solid black'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </React.Fragment>
  )
}

export default Pie_Chart