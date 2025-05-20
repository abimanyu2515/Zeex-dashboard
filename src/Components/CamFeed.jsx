import React, { useEffect, useState } from 'react'

const CamFeed = () => {
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const [show4, setShow4] = useState(false)
  
  // ONLINE/OFFLINE INDICATOR
  const [status, setStatus] = useState([true, true, true, true])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => prev.map(s => Math.random() > 0.5 ? !s : s))
    }, 7000)

    return() => clearInterval(interval)
  }, [])

  return (
    <React.Fragment>
          <div className='bg-white m-0 p-0 rounded-lg text-black shadow-xl/30 shadow-black justify-items-center grid max-sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4'>
            <div className='my-2 mx-5 p-5 xl:w-60'>
              
              <button className='mt-1' onClick={() => setShow1(true)}>
                <video className='cursor-pointer' src={status[0] ? "https://media.istockphoto.com/id/2084473784/video/home-security-camera-footage-of-package-delivery.mp4?s=mp4-640x640-is&k=20&c=-6aWbhiUCl7ihOwdCzvHJRqVTUSCxyiWA3APppWtxys=" : "https://media.istockphoto.com/id/966290166/video/tv-static-loop.mp4?s=mp4-640x640-is&k=20&c=75F9J6akH8wyUkdWN7ITfzNBFxia_qn89P0YFqJJqmU="}
                loop
                muted
                autoPlay
                />
              </button>
            </div>
            
            <div className="my-2 mx-5 p-5 xl:w-60">
              
              <button className='mt-1' onClick={() => setShow2(true)}>
                <video className='cursor-pointer' src={status[1] ? "https://media.istockphoto.com/id/1214444647/video/person-stealing-bicycle-from-garage-surveillance-camera-view.mp4?s=mp4-640x640-is&k=20&c=FvJ8hEGI5rXd-NzPj3OMSNKKgfedh8qneTakQ-c3gG4=" : "https://media.istockphoto.com/id/966290166/video/tv-static-loop.mp4?s=mp4-640x640-is&k=20&c=75F9J6akH8wyUkdWN7ITfzNBFxia_qn89P0YFqJJqmU="}
                loop
                autoPlay
                muted
                />
              </button>
            </div>

            <div className="my-2 mx-5 p-5 xl:w-60">

              <button className='mt-1' onClick={() => setShow3(true)}>
                <video className='cursor-pointer' src={status[2] ? "https://media.istockphoto.com/id/805202668/video/the-surveillance-camera-captured-as-a-thief-breaks-the-door.mp4?s=mp4-640x640-is&k=20&c=yc9N_ABhUMLA7pgoV8k-K673bmgCu2RfXElxzcijpFE=" : "https://media.istockphoto.com/id/966290166/video/tv-static-loop.mp4?s=mp4-640x640-is&k=20&c=75F9J6akH8wyUkdWN7ITfzNBFxia_qn89P0YFqJJqmU="}
                loop
                autoPlay
                muted
                />
              </button>
            </div>

            <div className="my-2 mx-5 p-5 xl:w-60">
              
              <button className='mt-1' onClick={() => setShow4(true)}>
                <video className='cursor-pointer' src={status[3] ? "https://media.istockphoto.com/id/1405617072/video/the-man-turns-off-the-surveillance-camera.mp4?s=mp4-640x640-is&k=20&c=IsUTeJHDO3EJsN76Is4zK2jLuWIls5OGn-eUbSxSK-c=" : "https://media.istockphoto.com/id/966290166/video/tv-static-loop.mp4?s=mp4-640x640-is&k=20&c=75F9J6akH8wyUkdWN7ITfzNBFxia_qn89P0YFqJJqmU="}
                loop
                autoPlay
                muted
                />
              </button>
            </div>
        </div>

        {show1 &&(
          <div className="fixed inset-0 bg-black/75 flex z-10 items-center justify-center">
            <div className='bg-white p-6 rounded-lg shadow-lg relative'>
              <button className='absolute top-2 right-5 text-red-700 text-3xl cursor-pointer hover:text-black' onClick={() => setShow1(false)}>
                &times;
              </button>
              <span className='text-xl'>CAMERA 01</span> <br />
              <span>
                STATUS : {status[0] ? <span className='text-green-500 font-bold'>ONLINE</span> : <span className='font-bold text-red-500'>OFFLINE</span>}
              </span>
              <video src={status[0] ? "https://media.istockphoto.com/id/2084473784/video/home-security-camera-footage-of-package-delivery.mp4?s=mp4-640x640-is&k=20&c=-6aWbhiUCl7ihOwdCzvHJRqVTUSCxyiWA3APppWtxys=" : "https://media.istockphoto.com/id/966290166/video/tv-static-loop.mp4?s=mp4-640x640-is&k=20&c=75F9J6akH8wyUkdWN7ITfzNBFxia_qn89P0YFqJJqmU="}
                loop
                muted
                autoPlay
                />
            </div>
          </div>
        )
        }

        {show2 &&(
          <div className="fixed inset-0 bg-black/75 flex z-10 items-center justify-center">
            <div className='bg-white p-6 rounded-lg shadow-lg relative'>
              <button className='absolute top-2 right-5 text-red-700 text-3xl cursor-pointer hover:text-black' onClick={() => setShow2(false)}>
                &times;
              </button>

              <span className='text-xl'>CAMERA 02</span><br />
              <span>
                STATUS : {status[1] ? <span className='font-bold text-green-500'>ONLINE</span> : <span className='font-bold text-red-500'>OFFLINE</span>}
              </span>
              <video src={status[1] ? "https://media.istockphoto.com/id/1214444647/video/person-stealing-bicycle-from-garage-surveillance-camera-view.mp4?s=mp4-640x640-is&k=20&c=FvJ8hEGI5rXd-NzPj3OMSNKKgfedh8qneTakQ-c3gG4=" : "https://media.istockphoto.com/id/966290166/video/tv-static-loop.mp4?s=mp4-640x640-is&k=20&c=75F9J6akH8wyUkdWN7ITfzNBFxia_qn89P0YFqJJqmU="}
                loop
                muted
                autoPlay
                />
            </div>
          </div>
        )
        }

        {show3 &&(
          <div className="fixed inset-0 bg-black/75 flex z-10 items-center justify-center">
            <div className='bg-white p-6 rounded-lg shadow-lg relative'>
              <button className='absolute top-2 right-5 text-red-700 text-3xl cursor-pointer hover:text-black' onClick={() => setShow3(false)}>
                &times;
              </button>

              <span className='text-xl'>CAMERA 03</span><br />
              <span>
                STATUS : {status[2] ? <span className='font-bold text-green-500'>ONLINE</span> : <span className='font-bold text-red-500'>OFFLINE</span>}
              </span>
              <video src={status[2] ? "https://media.istockphoto.com/id/805202668/video/the-surveillance-camera-captured-as-a-thief-breaks-the-door.mp4?s=mp4-640x640-is&k=20&c=yc9N_ABhUMLA7pgoV8k-K673bmgCu2RfXElxzcijpFE=" : "https://media.istockphoto.com/id/966290166/video/tv-static-loop.mp4?s=mp4-640x640-is&k=20&c=75F9J6akH8wyUkdWN7ITfzNBFxia_qn89P0YFqJJqmU="}
                loop
                muted
                autoPlay
                />
            </div>
          </div>
        )
        }

        {show4 &&(
          <div className="fixed inset-0 bg-black/75 flex z-10 items-center justify-center">
            <div className='bg-white p-6 rounded-lg shadow-lg relative'>
              <button className='absolute top-2 right-5 text-red-700 text-3xl cursor-pointer hover:text-black' onClick={() => setShow4(false)}>
                &times;
              </button>

              <span className='text-xl'>CAMERA 04</span><br />
              <span>
                STATUS : {status[3] ? <span className='font-bold text-green-500'>ONLINE</span> : <span className='font-bold text-red-500'>OFFLINE</span>}
              </span>
              <video src={status[3] ? "https://media.istockphoto.com/id/1405617072/video/the-man-turns-off-the-surveillance-camera.mp4?s=mp4-640x640-is&k=20&c=IsUTeJHDO3EJsN76Is4zK2jLuWIls5OGn-eUbSxSK-c=" : "https://media.istockphoto.com/id/966290166/video/tv-static-loop.mp4?s=mp4-640x640-is&k=20&c=75F9J6akH8wyUkdWN7ITfzNBFxia_qn89P0YFqJJqmU="}
                loop
                muted
                autoPlay
                />
            </div>
          </div>
        )
        }
        
    </React.Fragment>
  )
}

export default CamFeed