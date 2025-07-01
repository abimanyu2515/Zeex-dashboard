import React from 'react'

const Recent_Alerts = () => {
  return (
    <div className='h-[400px] overflow-auto'>
        <h1 className='top-0 font-semibold my-5 mx-3.5'>RECENT ALERTS</h1>
        <table className='table divide-y w-full px-5 text-[12px] overflow-y-scroll'>
          <tbody>
            <tr className='border-y-1'>
            <td className="px-4 py-4">
                <b>Clark Building</b><br />
                <span>Camera region 2</span>
            </td>
            <td className="px-4 py-4">01-05-2025</td>
            <td className="px-4 py-4 text-center"><span className='bg-green-700 text-white p-2 rounded-md'>Arson</span></td>
          </tr>
          <tr className='border-y-1'>
            <td className="px-4 py-4">
                <b>Campus Village Building</b><br />
                <span>Camera region 2</span>
            </td>
            <td className="px-4 py-4">01-05-2025</td>
            <td className="px-4 py-4 text-center"><span className='bg-green-700 text-white p-2 rounded-md'>Dumping</span></td>
          </tr>
          <tr className='border-y-1'>
            <td className="px-4 py-4">
                <b>Engineering Building</b><br />
                <span>First Floor North wing</span>
            </td>
            <td className="px-4 py-4">01-05-2025</td>
            <td className="px-4 py-4 text-center"><span className='bg-green-700 text-white p-2 rounded-md'>Accident</span></td>
          </tr>

          <tr className='border-y-1'>
            <td className="px-4 py-4">
                <b>Science Building</b><br />
                <span>Camera region 6</span>
            </td>
            <td className="px-4 py-4">01-05-2025</td>
            <td className="px-4 py-4 text-center"><span className='bg-green-700 text-white p-2 rounded-md'>Accident</span></td>
          </tr>

          <tr className='border-y-1'>
            <td className="px-4 py-4">
                <b>Mechanical Building</b><br />
                <span>Camera region 8</span>
            </td>
            <td className="px-4 py-4">01-05-2025</td>
            <td className="px-4 py-4 text-center"><span className='bg-green-700 text-white p-2 rounded-md'>Accident</span></td>
          </tr>

          <tr className='border-y-1'>
            <td className="px-4 py-4">
                <b>Mechanical Building</b><br />
                <span>Camera region 8</span>
            </td>
            <td className="px-4 py-4">01-05-2025</td>
            <td className="px-4 py-4 text-center"><span className='bg-green-700 text-white p-2 rounded-md'>Accident</span></td>
          </tr>       
          </tbody>
        </table>
    </div>
  )
}

export default Recent_Alerts